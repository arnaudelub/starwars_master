"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipsListComponent = void 0;
var core_1 = require("@angular/core");
var ShipsListComponent = /** @class */ (function () {
    function ShipsListComponent() {
        this.isLastPage = false;
        this.starshipsList = [];
    }
    ShipsListComponent.prototype.ngOnInit = function () {
        if (this.swapiResponse.next === null) {
            this.isLastPage = true;
        }
        this.starshipsList = this.swapiResponse.results;
        this.starshipsList.forEach(function (item) {
            var splittedUrl = item.url.split("/");
            item.id = +splittedUrl[splittedUrl.length - 2];
            console.log("This is the id", item.id);
            item.img = "https://starwars-visualguide.com/assets/img/starships/" + item.id + ".jpg";
        });
    };
    /// With the infinite scroll, the array will update and When an array change, Angular re-render the whole DOM
    /// but if we use the trackBy Directive of Angular. With it, it will re-render only the item node node that have
    /// changed
    ShipsListComponent.prototype.trackByID = function (index, ship) {
        return ship.id;
    };
    __decorate([
        core_1.Input()
    ], ShipsListComponent.prototype, "swapiResponse");
    ShipsListComponent = __decorate([
        core_1.Component({
            selector: 'app-ships-list',
            templateUrl: './ships-list.component.html',
            styleUrls: ['./ships-list.component.scss']
        })
    ], ShipsListComponent);
    return ShipsListComponent;
}());
exports.ShipsListComponent = ShipsListComponent;
