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
 * @title Tooltip with a show and hide delay
 */
var TooltipDelayExample = /** @class */ (function () {
    function TooltipDelayExample() {
        this.showDelay = new forms_1.FormControl(1000);
        this.hideDelay = new forms_1.FormControl(2000);
    }
    TooltipDelayExample = __decorate([
        core_1.Component({
            selector: 'tooltip-delay-example',
            template: "<mat-form-field class=\"example-user-input\"><input matInput placeholder=\"Show delay (milliseconds)\" type=\"number\" aria-label=\"Adds a delay between hovering over the button and displaying the tooltip\" [formControl]=\"showDelay\"></mat-form-field><mat-form-field class=\"example-user-input\"><input matInput placeholder=\"Hide delay (milliseconds)\" type=\"number\" aria-label=\"Adds a delay between hovering away from the button and hiding the tooltip\" [formControl]=\"hideDelay\"></mat-form-field><button mat-raised-button matTooltip=\"Info about the action\" [matTooltipShowDelay]=\"showDelay.value\" [matTooltipHideDelay]=\"hideDelay.value\" aria-label=\"Button that displays a tooltip with a customized delay in showing and hiding\">Action</button>",
            styles: [".example-user-input { display: block; width: 150px; } "],
        })
    ], TooltipDelayExample);
    return TooltipDelayExample;
}());
exports.TooltipDelayExample = TooltipDelayExample;
//# sourceMappingURL=tooltip-delay-example.js.map