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
 * @title Tooltip that can be manually shown/hidden.
 */
var TooltipManualExample = /** @class */ (function () {
    function TooltipManualExample() {
    }
    TooltipManualExample = __decorate([
        core_1.Component({
            selector: 'tooltip-manual-example',
            template: "<div><span>Mouse over to </span><button mat-button (mouseenter)=\"tooltip.show()\" aria-label=\"Button that progamatically shows a tooltip on another button\" class=\"example-action-button\">show</button> <button mat-button (mouseenter)=\"tooltip.hide()\" aria-label=\"Button that progamatically hides a tooltip on another button\" class=\"example-action-button\">hide</button> <button mat-button (mouseenter)=\"tooltip.toggle()\" aria-label=\"Button that progamatically toggles a tooltip on another button to show/hide\" class=\"example-action-button\">toggle show/hide</button></div><button mat-raised-button #tooltip=\"matTooltip\" matTooltip=\"Info about the action\" matTooltipPosition=\"right\" aria-tooltip=\"Button that displays and hides a tooltip triggered by other buttons\">Action</button>",
            styles: [".example-action-button { margin-top: 16px; } "],
        })
    ], TooltipManualExample);
    return TooltipManualExample;
}());
exports.TooltipManualExample = TooltipManualExample;
//# sourceMappingURL=tooltip-manual-example.js.map