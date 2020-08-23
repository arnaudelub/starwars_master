"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipsService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var BUFFER_SIZE = 1;
var INTERVAL = 10000;
var ShipsService = /** @class */ (function () {
    function ShipsService(http) {
        this.http = http;
        this.uri = "" + environment_1.environment.swapiUrl;
        this.baseUrl = environment_1.environment.swapiUrl + "starships/";
        this.endpoint = 'starships';
    }
    ShipsService.prototype.setEndpoint = function (endpoint) {
        if (endpoint === void 0) { endpoint = 'starships'; }
        this.baseUrl = "" + this.uri + endpoint + "/";
    };
    Object.defineProperty(ShipsService.prototype, "ships", {
        get: function () {
            if (!this.cache$) {
                this.cache$ = this.getStarship();
            }
            return this.cache$;
        },
        enumerable: false,
        configurable: true
    });
    ShipsService.prototype.getStarship = function (url) {
        var _this = this;
        var timer$ = rxjs_1.timer(0, INTERVAL);
        if (!url) {
            url = this.baseUrl;
        }
        url = url.replace(/^http:\/\//i, "https://");
        return timer$.pipe(operators_1.switchMap(function () { return _this.getRequest(url); }), operators_1.shareReplay(BUFFER_SIZE));
    };
    ShipsService.prototype.getStarshipSearch = function (term) {
        var url = this.baseUrl + ("?search=" + term);
        return this.getRequest(url);
    };
    ShipsService.prototype.getStarshipDetails = function (id) {
        var _this = this;
        var timer$ = rxjs_1.timer(0, INTERVAL);
        var url = "" + this.baseUrl + id + "/";
        return timer$.pipe(operators_1.switchMap(function () { return _this.getRequest(url); }), operators_1.shareReplay(BUFFER_SIZE));
    };
    ShipsService.prototype.getRequest = function (url) {
        return this.http.get(url, {
            headers: new http_1.HttpHeaders({
                'Authorization': 'none'
            })
        });
    };
    ShipsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ShipsService);
    return ShipsService;
}());
exports.ShipsService = ShipsService;
