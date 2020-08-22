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
var ShipsService = /** @class */ (function () {
    function ShipsService(http) {
        this.http = http;
        this.baseUrl = environment_1.environment.swapiUrl + "starships/";
    }
    ShipsService.prototype.getStarship = function (url) {
        if (!url) {
            url = this.baseUrl;
        }
        url = url.replace(/^http:\/\//i, "https://");
        return this.getRequest(url);
    };
    ShipsService.prototype.getStarshipSearch = function (term) {
        var url = this.baseUrl + ("?search=" + term);
        return this.getRequest(url);
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
