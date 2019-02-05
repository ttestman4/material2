"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Basic slider
 */
var SliderOverviewExample = /** @class */ (function () {
    function SliderOverviewExample() {
    }
    SliderOverviewExample = __decorate([
        core_1.Component({
            selector: 'slider-overview-example',
            template: "<mat-slider></mat-slider>",
            styles: ["/** No CSS for this example */ mat-slider { width: 300px; } "],
        })
    ], SliderOverviewExample);
    return SliderOverviewExample;
}());
exports.SliderOverviewExample = SliderOverviewExample;
//# sourceMappingURL=slider-overview-example.js.map