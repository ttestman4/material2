"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * @title Tooltip that can be disabled
 */
var TooltipDisabledExample = /** @class */ (function () {
    function TooltipDisabledExample() {
        this.disabled = new forms_1.FormControl(false);
    }
    TooltipDisabledExample = __decorate([
        core_1.Component({
            selector: 'tooltip-disabled-example',
            template: "<button mat-raised-button matTooltip=\"Info about the action\" [matTooltipDisabled]=\"disabled.value\" aria-label=\"Button that displays a tooltip that can be programatically disabled\">Action</button><mat-checkbox [formControl]=\"disabled\" class=\"example-disabled-checkbox\">Tooltip disabled</mat-checkbox>",
            styles: [".example-disabled-checkbox { margin-left: 8px; } "],
        })
    ], TooltipDisabledExample);
    return TooltipDisabledExample;
}());
exports.TooltipDisabledExample = TooltipDisabledExample;
//# sourceMappingURL=tooltip-disabled-example.js.map