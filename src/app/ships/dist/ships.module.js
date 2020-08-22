"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShipsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ships_routing_module_1 = require("./ships-routing.module");
var ships_component_1 = require("./ships.component");
var ships_list_component_1 = require("./ships-list/ships-list.component");
var ship_item_component_1 = require("./ships-list/ship-item/ship-item.component");
var ship_details_component_1 = require("./ship-details/ship-details.component");
var me_component_1 = require("./me/me.component");
var forms_1 = require("@angular/forms");
var ShipsModule = /** @class */ (function () {
    function ShipsModule() {
    }
    ShipsModule = __decorate([
        core_1.NgModule({
            declarations: [
                ships_component_1.ShipsComponent,
                ships_list_component_1.ShipsListComponent,
                ship_item_component_1.ShipItemComponent,
                ship_details_component_1.ShipDetailsComponent,
                me_component_1.MeComponent,
            ],
            imports: [
                common_1.CommonModule,
                ships_routing_module_1.ShipsRoutingModule,
                forms_1.FormsModule
            ]
        })
    ], ShipsModule);
    return ShipsModule;
}());
exports.ShipsModule = ShipsModule;
