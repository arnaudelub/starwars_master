"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var error_animation_1 = require("../../core/animations/error_animation");
var patterns_1 = require("../../core/patterns");
var development_logs_1 = require("app/core/functions/development_logs");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, router, auth) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.auth = auth;
        this.isSubmitted = false;
        this.showError = false;
        this.isLoading = false;
        this.errorMessage = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(patterns_1.emailPattern)]],
            password: ['', [forms_1.Validators.required]]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "controls", {
        // Easier access to form fields as we are using reactiveForm
        get: function () { return this.loginForm.controls; },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        development_logs_1.devLog("Submitting form ");
        this.isSubmitted = true;
        this.isLoading = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.auth.login(this.controls.email.value, this.controls.password.value)
            .subscribe(function (next) {
            _this.router.navigate(['ships']);
        }, function (err) {
            development_logs_1.devLog(err);
            _this.errorMessage = err.error.message;
            _this.isLoading = false;
            _this.showHideError();
        });
    };
    LoginComponent.prototype.goToRegister = function () {
        this.router.navigate(['/auth/register']);
    };
    LoginComponent.prototype.showHideError = function () {
        var _this = this;
        this.showError = true;
        setTimeout(function () { return _this.showError = false; }, 3000);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            animations: [
                error_animation_1.errorAnimation
            ]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
