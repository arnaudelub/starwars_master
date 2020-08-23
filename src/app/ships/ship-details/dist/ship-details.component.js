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
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../../environments/environment");
var ShipDetailsComponent = /** @class */ (function () {
    function ShipDetailsComponent(shipService, route, location) {
        this.shipService = shipService;
        this.route = route;
        this.location = location;
        this.destroyed$ = new rxjs_1.Subject();
        this.fakeData = []; // remove this for production
        this.counter = 1; // can be removed too for production
    }
    ShipDetailsComponent.prototype.ngOnInit = function () {
        this.getShip();
    };
    /* This is for demonstration purpose only
     * Do not use in production
     */
    ShipDetailsComponent.prototype.mockNewData = function () {
        //In case not being removed
        if (!this.isDevelopment())
            return;
        this.fakeData.push("New data received... " + this.counter);
        this.counter++;
    };
    ShipDetailsComponent.prototype.getShip = function () {
        var _this = this;
        /// In this case, we want to receive the new data constantly,
        /// changes in the stock, picture, data so we are using
        /// takeUntil instead of take(1)
        var id = +this.route.snapshot.paramMap.get('id');
        this.shipService.getStarshipDetails(id)
            .pipe(operators_1.takeUntil(this.destroyed$))
            .subscribe(function (ship) {
            _this.ship = ship;
            _this.addImage();
            _this.mockNewData(); // Remove for production
        });
    };
    ShipDetailsComponent.prototype.addImage = function () {
        var splittedUrl = this.ship.url.split("/");
        this.ship.id = +splittedUrl[splittedUrl.length - 2];
        this.ship.img = "https://starwars-visualguide.com/assets/img/starships/" + this.ship.id + ".jpg";
    };
    ShipDetailsComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    ShipDetailsComponent.prototype.isDevelopment = function () {
        return !environment_1.environment.production;
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
