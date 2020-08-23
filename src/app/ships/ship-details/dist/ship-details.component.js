"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipDetailsComponent = void 0;
var core_1 = require("@angular/core");
var ShipDetailsComponent = /** @class */ (function () {
    function ShipDetailsComponent(shipService, route, location) {
        this.shipService = shipService;
        this.route = route;
        this.location = location;
    }
    ShipDetailsComponent.prototype.ngOnInit = function () {
        this.getShip();
    };
    ShipDetailsComponent.prototype.getShip = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.shipService.getStarshipDetails(id)
            .subscribe(function (ship) { return _this.ship = ship; }, function (err) { return null; }, function () { return _this.addImage(); });
    };
    ShipDetailsComponent.prototype.addImage = function () {
        var splittedUrl = this.ship.url.split("/");
        this.ship.id = +splittedUrl[splittedUrl.length - 2];
        this.ship.img = "https://starwars-visualguide.com/assets/img/starships/" + this.ship.id + ".jpg";
    };
    ShipDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-ship-details',
            templateUrl: './ship-details.component.html',
            styleUrls: ['./ship-details.component.scss']
        })
    ], ShipDetailsComponent);
    return ShipDetailsComponent;
}());
exports.ShipDetailsComponent = ShipDetailsComponent;
