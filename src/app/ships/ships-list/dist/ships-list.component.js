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
var development_logs_1 = require("app/core/functions/development_logs");
var operators_1 = require("rxjs/operators");
var ShipsListComponent = /** @class */ (function () {
    function ShipsListComponent(shipService, router) {
        this.shipService = shipService;
        this.router = router;
        this.isLastPage = false;
        this.starshipsList = [];
        this.isLoading = false;
        this.isLastItem = false;
    }
    ShipsListComponent.prototype.ngOnInit = function () {
        this.starshipsList = this.mapResponseWithIdAndImage(this.swapiResponse.results);
        this.nextPage = this.swapiResponse.next;
    };
    ShipsListComponent.prototype.mapResponseWithIdAndImage = function (response) {
        return this.swapiResponse.results.map(function (item, index) {
            development_logs_1.devLog(item);
            var splittedUrl = item.url.split("/");
            item.id = +splittedUrl[splittedUrl.length - 2];
            item.img = "https://starwars-visualguide.com/assets/img/starships/" + item.id + ".jpg";
            return item;
        });
    };
    ShipsListComponent.prototype.onScrolling = function () {
        var _this = this;
        var pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        var max = document.documentElement.scrollHeight;
        // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
        if (pos > max - 400) {
            if (!this.isLoading && this.starshipsList.length <= this.swapiResponse.count) {
                console.log("Getting new page.....", this.nextPage);
                this.shipService.getStarship(this.swapiResponse.next).pipe(operators_1.take(1)).subscribe(function (data) {
                    _this.starshipsList = _this.starshipsList.concat(_this.mapResponseWithIdAndImage(data.results));
                    _this.isLastItem = false;
                    _this.setNextPage(data);
                }, function (err) { }, function () {
                    console.log("Completed");
                    _this.previousMax = max;
                });
                this.isLoading = true;
            }
        }
        else if (pos > this.previousMax) {
            this.isLoading = false;
        }
    };
    ShipsListComponent.prototype.setNextPage = function (data) {
        if (data.next === null) {
            this.isLastPage = true;
        }
        else {
            this.nextPage = data.next;
        }
    };
    /// With the infinite scroll, the array will update and When an array change, Angular re-render the whole DOM
    /// but if we use the trackBy Directive of Angular. With it, it will re-render only the item node node that have
    /// changed
    ShipsListComponent.prototype.trackByID = function (index, ship) {
        return ship.id;
    };
    ShipsListComponent.prototype.goToDetails = function (id) {
        this.router.navigate(["/ship/" + id]);
    };
    __decorate([
        core_1.Input()
    ], ShipsListComponent.prototype, "swapiResponse");
    __decorate([
        core_1.Input()
    ], ShipsListComponent.prototype, "isSearch");
    __decorate([
        core_1.HostListener("window:scroll", ["$event"])
    ], ShipsListComponent.prototype, "onScrolling");
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
