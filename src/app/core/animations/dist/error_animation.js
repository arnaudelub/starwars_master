"use strict";
exports.__esModule = true;
exports.errorAnimation = void 0;
var animations_1 = require("@angular/animations");
exports.errorAnimation = animations_1.trigger('errorAnimation', [
    animations_1.transition(':enter', [
        animations_1.style({ height: 0, opacity: 0 }),
        animations_1.animate('1s ease-in-out', animations_1.style({ height: 30, opacity: 1 }))
    ]),
    animations_1.transition(':leave', [
        animations_1.style({ opacity: 1, height: 30 }),
        animations_1.animate('1s ease-in-out', animations_1.style({ height: 0, opacity: 0 }))
    ])
]);
