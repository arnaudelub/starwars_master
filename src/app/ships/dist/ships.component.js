"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var router_1 = require("@angular/router");
var development_logs_1 = require("app/core/functions/development_logs");
var operators_1 = require("rxjs/operators");
var show_input_animation_1 = require("../core/animations/show_input_animation");
var ShipsComponent = /** @class */ (function () {
    function ShipsComponent(shipsService, router, location) {
        this.shipsService = shipsService;
        this.router = router;
        this.location = location;
        this.inputSubject = new rxjs_1.Subject();
        this.updated$ = new rxjs_1.Subject();
        this.currentRoute = "/starships";
        this.destroyed$ = new rxjs_1.Subject();
        this.navigateTo = "/starships/me";
        this.iconImage = "assets/stormtrooper.png";
        this.showSearchBar = true;
        this.searchInputOpen = false;
        this.isSearchResult = false;
    }
    ShipsComponent.prototype.ngAfterViewInit = function () {
        this.subscribeToInputSubject();
    };
    ShipsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentRoute = this.router.url;
        this.setFromRoute();
        this.subscribeToRouterEvents();
        var shipsAtFirstLoad = this.getShipsOnce();
        var updates$ = this.updated$.pipe(operators_1.mergeMap(function () { return _this.getShipsOnce(); }));
        this.starships$ = this.getShipsOnce();
        var firstNofication$ = this.shipsService.ships.pipe(operators_1.skip(1)); // We don't want to notify at first load => skip(1)
        var open$ = firstNofication$.pipe(operators_1.mapTo(true));
        var close$ = this.updated$.pipe(operators_1.mapTo(false));
        this.notificationToggle$ = rxjs_1.merge(open$, close$);
    };
    ShipsComponent.prototype.subscribeToRouterEvents = function () {
        var _this = this;
        this.router.events.pipe(operators_1.takeUntil(this.destroyed$) // to avoid memory leak
        ).subscribe(function (state) {
            if (state instanceof router_1.NavigationEnd) {
                _this.currentRoute = state.url;
                _this.setFromRoute();
            }
        }, function (err) { }, function () {
            development_logs_1.devLog("Router subsciption completed");
        });
    };
    ShipsComponent.prototype.subscribeToInputSubject = function () {
        var _this = this;
        this.inputSubject
            .pipe(operators_1.takeUntil(this.destroyed$))
            .pipe(operators_1.debounceTime(999))
            .pipe(operators_1.distinctUntilChanged())
            .subscribe(function (data) {
            if (data == "" && !_this.isSearchResult) {
                _this.router.navigate(['starships']);
                return;
            }
            _this.isSearchResult = true;
            _this.starships$ = _this.shipsService.getStarshipSearch(data).pipe(operators_1.take(1));
        }, function (err) { }, function () { return console.log("complete"); });
    };
    ShipsComponent.prototype.getShipsOnce = function () {
        return this.shipsService.getStarship().pipe(operators_1.take(1));
    };
    ShipsComponent.prototype.setFromRoute = function () {
        if (this.currentRoute === "/starships") {
            this.navigateTo = "/starships/me";
            this.iconImage = "assets/stormtrooper.png";
            this.showSearchBar = true;
        }
        else {
            this.navigateTo = "/starships";
            this.iconImage = "assets/close.png";
            this.showSearchBar = false;
        }
    };
    ShipsComponent.prototype.isShipListRoute = function () {
        return this.currentRoute === "/starships";
    };
    ShipsComponent.prototype.showHideInput = function () {
        this.searchInputOpen = !this.searchInputOpen;
    };
    ShipsComponent.prototype.onChange = function (event) {
        this.inputSubject.next(this.searchTerm);
    };
    ShipsComponent.prototype.searchResultReceived = function () {
        this.isSearchResult = false;
    };
    ShipsComponent.prototype.navigate = function () {
        if (this.iconImage === "assets/close.png") {
            this.location.back();
        }
        else {
            this.router.navigate([this.navigateTo]);
        }
    };
    ShipsComponent.prototype.updateList = function () {
        this.updated$.next();
    };
    ShipsComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next;
        this.destroyed$.complete;
    };
    ShipsComponent = __decorate([
        core_1.Component({
            selector: 'app-ships',
            templateUrl: './ships.component.html',
            styleUrls: ['./ships.component.scss'],
            animations: [
                show_input_animation_1.showInputAnimation
            ]
        })
    ], ShipsComponent);
    return ShipsComponent;
}());
exports.ShipsComponent = ShipsComponent;
