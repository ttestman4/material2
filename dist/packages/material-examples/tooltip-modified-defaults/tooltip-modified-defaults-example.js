"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
/** Custom options the configure the tooltip's default show/hide delays. */
exports.myCustomTooltipDefaults = {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
};
/**
 * @title Tooltip with a show and hide delay
 */
var TooltipModifiedDefaultsExample = /** @class */ (function () {
    function TooltipModifiedDefaultsExample() {
    }
    TooltipModifiedDefaultsExample = __decorate([
        core_1.Component({
            selector: 'tooltip-modified-defaults-example',
            template: "<button mat-raised-button matTooltip=\"By default, I delay\" aria-label=\"Button that displays a tooltip that has custom delays through a default config\">Button with delay-default tooltip</button>",
            styles: ["/** No CSS for this example */ "],
            providers: [
                { provide: material_1.MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: exports.myCustomTooltipDefaults }
            ],
        })
    ], TooltipModifiedDefaultsExample);
    return TooltipModifiedDefaultsExample;
}());
exports.TooltipModifiedDefaultsExample = TooltipModifiedDefaultsExample;
//# sourceMappingURL=tooltip-modified-defaults-example.js.map