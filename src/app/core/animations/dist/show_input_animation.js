"use strict";
exports.__esModule = true;
exports.showInputAnimation = void 0;
var animations_1 = require("@angular/animations");
exports.showInputAnimation = animations_1.trigger('easeAnimation', [
    animations_1.transition(':enter', [
        animations_1.style({ opacity: 0 }),
        animations_1.animate('.4s ease-in', animations_1.style({ opacity: 1 }))
    ]),
    animations_1.transition(':leave', [
        animations_1.style({ opacity: 1, height: 30 }),
        animations_1.animate('.3s ease-out', animations_1.style({ height: 0, opacity: 0 }))
    ])
]);
