"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipsRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ships_component_1 = require("./ships.component");
var ship_details_component_1 = require("./ship-details/ship-details.component");
var me_component_1 = require("./me/me.component");
var routes = [
    {
        path: '',
        component: ships_component_1.ShipsComponent,
        children: [
            {
                path: 'details/:id',
                component: ship_details_component_1.ShipDetailsComponent
            },
            {
                path: 'me',
                component: me_component_1.MeComponent
            }
        ]
    }
];
var ShipsRoutingModule = /** @class */ (function () {
    function ShipsRoutingModule() {
    }
    ShipsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ShipsRoutingModule);
    return ShipsRoutingModule;
}());
exports.ShipsRoutingModule = ShipsRoutingModule;
