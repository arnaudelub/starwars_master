"use strict";
exports.__esModule = true;
exports.MockBackend = void 0;
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/// To mock the backend, we have multiple solution,
/// we can use the inMemoryWebApi library available here https://github.com/angular/in-memory-web-api
/// or implement the HttpInterceptor (https://angular.io/api/common/http/HttpInterceptor) ourselves
/// to mock the backend response
/// I'm choosing to implement the HttpInterceptor because we'll have a better control over
/// over the requests we need to intercept and we'll be able to mimic the URI structure of the real backend
/// Then we 'll just add this class as a provider in app.module
var users = JSON.parse(localStorage.getItem('users')) || [];
var MockBackend = /** @class */ (function () {
    function MockBackend() {
    }
    MockBackend.prototype.intercept = function (request, next) {
        var url = request.url, method = request.method, headers = request.headers, body = request.body;
        // We can simulate the API response by adding some delay, for that, 
        // we need to return an observable:
        return rxjs_1.of(null)
            .pipe(operators_1.mergeMap(registerOrLogin)) // MergeMap because we want to handle every request at the same time
            .pipe(operators_1.materialize()) // We don't want to throw the error instantly so materialize() allow us to wrap next, error and complete and emit it
            .pipe(operators_1.delay(300))
            .pipe(operators_1.dematerialize()); // finally, we dematerialize to unwrap next, error and complete
        function registerOrLogin() {
            if (url.endsWith('register') && method == 'POST') {
                return register();
            }
            else if (url.endsWith('authenticate') && method == 'POST') {
                return authenticate();
            }
            else {
                // we don't want to intercept any other request at the moment
                return next.handle(request);
            }
        }
        function authenticate() {
            var email = body.email, password = body.password;
            var user = users.find(function (userItem) { return userItem.email === email && userItem.password === password; });
            if (user) {
                return ok({
                    id: user.id,
                    email: user.email,
                    firstName: user.firstname,
                    lastName: user.lastname
                });
            }
            return ko('Wrong user or password');
        }
        function register() {
            var user = body;
            user.id = users.length ? users.length - 1 : 1;
            if (users.find(function (x) { return x.email === user.email; })) {
                rxjs_1.throwError("email " + user.email + " already taken");
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }
        function ok(body) {
            return rxjs_1.of(new http_1.HttpResponse({ status: 200, body: body }));
        }
        function ko(error) {
            return rxjs_1.throwError({ status: 401, error: { message: error } });
        }
    };
    return MockBackend;
}());
exports.MockBackend = MockBackend;
