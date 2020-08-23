"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipDetailsHeaderComponent = void 0;
var core_1 = require("@angular/core");
var container_animation_1 = require("../../../core/animations/container_animation");
var operators_1 = require("rxjs/operators");
var requestType;
(function (requestType) {
    requestType[requestType["film"] = 0] = "film";
    requestType[requestType["people"] = 1] = "people";
})(requestType || (requestType = {}));
var ShipDetailsHeaderComponent = /** @class */ (function () {
    function ShipDetailsHeaderComponent(shipService) {
        this.shipService = shipService;
        this.isToggled = true;
        this.toggleSymbole = '-';
        this.filmNames = [];
        this.peopleNames = [];
    }
    ShipDetailsHeaderComponent.prototype.ngOnInit = function () {
        if (this.isDetailsPage) {
            this.getFilms();
            this.getPilots();
        }
    };
    ShipDetailsHeaderComponent.prototype.getPilots = function () {
        var _this = this;
        if (this.ship.pilots.length == 0)
            return;
        this.ship.pilots.forEach(function (pilot) { return _this.getPilotDetails(pilot); });
    };
    ShipDetailsHeaderComponent.prototype.getFilms = function () {
        var _this = this;
        if (this.ship.films.length == 0)
            return;
        this.ship.films.forEach(function (film) { return _this.getFilmDetails(film); });
    };
    ShipDetailsHeaderComponent.prototype.parseResponse = function (url, type) {
        var _this = this;
        this.shipService.getStarship(url)
            .pipe(operators_1.take(1))
            .subscribe(function (data) {
            if (type === requestType.film) {
                _this.filmNames.push(data['title']);
            }
            else {
                _this.peopleNames.push(data['name']);
            }
        }, function (err) { }, function () { return _this.shipService.setEndpoint('starships'); });
    };
    ShipDetailsHeaderComponent.prototype.priceIsUnknown = function () {
        return this.ship.cost_in_credits === 'unknown';
    };
    ShipDetailsHeaderComponent.prototype.updateUrl = function () {
        this.ship.img = "assets/nostarships.png";
    };
    ShipDetailsHeaderComponent.prototype.toggleDetails = function () {
        this.isToggled = !this.isToggled;
        this.toggleSymbole = this.isToggled ? '-' : '+';
    };
    ShipDetailsHeaderComponent.prototype.getFilmDetails = function (url) {
        this.shipService.setEndpoint('films');
        this.parseResponse(url, requestType.film);
    };
    ShipDetailsHeaderComponent.prototype.getPilotDetails = function (url) {
        this.shipService.setEndpoint('people');
        this.parseResponse(url, requestType.people);
    };
    __decorate([
        core_1.Input()
    ], ShipDetailsHeaderComponent.prototype, "ship");
    __decorate([
        core_1.Input()
    ], ShipDetailsHeaderComponent.prototype, "isDetailsPage");
    ShipDetailsHeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-ship-details-header',
            templateUrl: './ship-details-header.component.html',
            styleUrls: ['./ship-details-header.component.scss'],
            animations: [
                container_animation_1.containerAnimation
            ]
        })
    ], ShipDetailsHeaderComponent);
    return ShipDetailsHeaderComponent;
}());
exports.ShipDetailsHeaderComponent = ShipDetailsHeaderComponent;
