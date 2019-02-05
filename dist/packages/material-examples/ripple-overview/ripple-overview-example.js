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
 * @title MatRipple basic usage
 */
var RippleOverviewExample = /** @class */ (function () {
    function RippleOverviewExample() {
        this.centered = false;
        this.disabled = false;
        this.unbounded = false;
    }
    RippleOverviewExample = __decorate([
        core_1.Component({
            selector: 'ripple-overview-example',
            template: "<mat-checkbox [(ngModel)]=\"centered\" class=\"example-ripple-checkbox\">Centered</mat-checkbox><mat-checkbox [(ngModel)]=\"disabled\" class=\"example-ripple-checkbox\">Disabled</mat-checkbox><mat-checkbox [(ngModel)]=\"unbounded\" class=\"example-ripple-checkbox\">Unbounded</mat-checkbox><mat-form-field class=\"example-ripple-form-field\"><input matInput [(ngModel)]=\"radius\" type=\"number\" placeholder=\"Radius\"></mat-form-field><mat-form-field class=\"example-ripple-form-field\"><input matInput [(ngModel)]=\"color\" type=\"text\" placeholder=\"Color\"></mat-form-field><div class=\"example-ripple-container mat-elevation-z4\" matRipple [matRippleCentered]=\"centered\" [matRippleDisabled]=\"disabled\" [matRippleUnbounded]=\"unbounded\" [matRippleRadius]=\"radius\" [matRippleColor]=\"color\">Click me</div>",
            styles: [".example-ripple-container { cursor: pointer; text-align: center; width: 300px; height: 300px; line-height: 300px; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; } /** Styles to make the demo look better. */ .example-ripple-checkbox { margin: 6px 12px 6px 0; } .example-ripple-form-field { margin: 0 12px 0 0; } "],
        })
    ], RippleOverviewExample);
    return RippleOverviewExample;
}());
exports.RippleOverviewExample = RippleOverviewExample;
//# sourceMappingURL=ripple-overview-example.js.map