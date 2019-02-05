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
 * @title Tooltip that demonstrates auto-hiding when it clips out of its scrolling container.
 */
var TooltipAutoHideExample = /** @class */ (function () {
    function TooltipAutoHideExample() {
        this.positionOptions = ['below', 'above', 'left', 'right'];
        this.position = new forms_1.FormControl(this.positionOptions[0]);
    }
    TooltipAutoHideExample = __decorate([
        core_1.Component({
            selector: 'tooltip-auto-hide-example',
            template: "<mat-form-field><mat-select placeholder=\"Tooltip position\" [formControl]=\"position\"><mat-option *ngFor=\"let positionOption of positionOptions\" [value]=\"positionOption\">{{positionOption}}</mat-option></mat-select></mat-form-field><div class=\"example-container\" cdk-scrollable><button mat-raised-button #tooltip=\"matTooltip\" matTooltip=\"Info about the action\" [matTooltipPosition]=\"position.value\" matTooltipHideDelay=\"100000\" aria-label=\"Button that displays a tooltip that hides when scrolled out of the container\" class=\"example-button\">Action</button></div>",
            styles: [".example-button { display: block; margin: 80px auto 400px; } .example-container { height: 200px; overflow: auto; border: 1px solid #ccc; } "],
        })
    ], TooltipAutoHideExample);
    return TooltipAutoHideExample;
}());
exports.TooltipAutoHideExample = TooltipAutoHideExample;
//# sourceMappingURL=tooltip-auto-hide-example.js.map