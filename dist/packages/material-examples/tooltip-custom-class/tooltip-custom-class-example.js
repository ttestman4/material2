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
 * @title Tooltip that can have a custom class applied.
 */
var TooltipCustomClassExample = /** @class */ (function () {
    function TooltipCustomClassExample() {
    }
    TooltipCustomClassExample = __decorate([
        core_1.Component({
            selector: 'tooltip-custom-class-example',
            template: "<button mat-raised-button matTooltip=\"Info about the action\" matTooltipClass=\"example-tooltip-red\" aria-label=\"Button that shows a red tooltip\" class=\"example-button\">Red-tooltip Action</button>",
            styles: [".example-button { margin-top: 16px; } .example-tooltip-red { background: #b71c1c; } "],
            // Need to remove view encapsulation so that the custom tooltip style defined in
            // `tooltip-custom-class-example.css` will not be scoped to this component's view.
            encapsulation: core_1.ViewEncapsulation.None,
        })
    ], TooltipCustomClassExample);
    return TooltipCustomClassExample;
}());
exports.TooltipCustomClassExample = TooltipCustomClassExample;
//# sourceMappingURL=tooltip-custom-class-example.js.map