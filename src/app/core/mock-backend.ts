import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from 'app/models/user';


/// To mock the backend, we have multiple solution,
/// we can use the inMemoryWebApi library available here https://github.com/angular/in-memory-web-api
/// or implement the HttpInterceptor (https://angular.io/api/common/http/HttpInterceptor) ourselves
/// to mock the backend response
/// I'm choosing to implement the HttpInterceptor because we'll have a better control over
/// over the requests we need to intercept and we'll be able to mimic the URI structure of the real backend
/// Then we 'll just add this class as a provider in app.module
let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

export class MockBackend implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // We can simulate the API response by adding some delay, for that, 
        // we need to return an observable:
        return of(null)
            .pipe(mergeMap(registerOrLogin)) // MergeMap because we want to handle every request at the same time
            .pipe(materialize()) // We don't want to throw the error instantly so materialize() allow us to wrap next, error and complete and emit it
            .pipe(delay(300))
            .pipe(dematerialize()); // finally, we dematerialize to unwrap next, error and complete

        function registerOrLogin() {
            if (url.endsWith('register') && method == 'POST') {
                return register();
            } else if (url.endsWith('authenticate') && method == 'POST') {
                return authenticate();
            } else {
                // we don't want to intercept any other request at the moment
                return next.handle(request);
            }
        }

        function authenticate() {
            const { email, password } = body;
            const user = users.find(userItem => userItem.email === email && userItem.password === password);

            if (user) {
                return ok({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstname,
                    lastName: user.lastname
                });
            }
            return ko('Wrong user or password')
        }

        function register() {
            const user = body;
            user.id = users.length ? users.length - 1 : 1;
            if (users.find(x => x.email === user.email)) {
                throwError(`email ${user.email} already taken`);
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function ko(error) {
            return throwError({ status: 401, error: { message: error } });
        }
    }
}
