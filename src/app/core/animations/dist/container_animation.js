"use strict";
exports.__esModule = true;
exports.containerAnimation = void 0;
var animations_1 = require("@angular/animations");
exports.containerAnimation = animations_1.trigger('openClose', [
    animations_1.state('open', animations_1.style({ opacity: 1, height: '*' })),
    animations_1.state('closed', animations_1.style({
        opacity: 0, height: 0
    })),
    animations_1.transition('closed => open', [
        animations_1.animate('.5s')
    ]),
    animations_1.transition('open => closed', [
        animations_1.animate('.5s')
    ])
]);
