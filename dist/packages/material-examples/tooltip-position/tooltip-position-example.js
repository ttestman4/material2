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
 * @title Tooltip with a custom position
 */
var TooltipPositionExample = /** @class */ (function () {
    function TooltipPositionExample() {
        this.positionOptions = ['after', 'before', 'above', 'below', 'left', 'right'];
        this.position = new forms_1.FormControl(this.positionOptions[0]);
    }
    TooltipPositionExample = __decorate([
        core_1.Component({
            selector: 'tooltip-position-example',
            template: "<mat-form-field class=\"example-user-input\"><mat-select placeholder=\"Tooltip position\" [formControl]=\"position\"><mat-option *ngFor=\"let positionOption of positionOptions\" [value]=\"positionOption\">{{positionOption}}</mat-option></mat-select></mat-form-field><button mat-raised-button matTooltip=\"Info about the action\" [matTooltipPosition]=\"position.value\" aria-label=\"Button that displays a tooltip in various positions\">Action</button>",
            styles: [".example-user-input { margin-right: 8px; } "],
        })
    ], TooltipPositionExample);
    return TooltipPositionExample;
}());
exports.TooltipPositionExample = TooltipPositionExample;
//# sourceMappingURL=tooltip-position-example.js.map