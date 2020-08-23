"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.userSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            return this.userSubject.value;
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(environment_1.environment.apiUrl + "/authenticate", { email: email, password: password })
            .pipe(operators_1.map(function (user) {
            localStorage.setItem('user', JSON.stringify(user));
            _this.userSubject.next(user);
            return user;
        }));
    };
    AuthService.prototype.register = function (user) {
        return this.http.post(environment_1.environment.apiUrl + "/register", user);
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['auth/login']);
        console.log(this.user);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
