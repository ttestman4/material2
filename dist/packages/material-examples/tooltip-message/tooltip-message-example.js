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
 * @title Tooltip with a changing message
 */
var TooltipMessageExample = /** @class */ (function () {
    function TooltipMessageExample() {
        this.message = new forms_1.FormControl('Info about the action');
    }
    TooltipMessageExample = __decorate([
        core_1.Component({
            selector: 'tooltip-message-example',
            template: "<mat-form-field class=\"example-user-input\"><input matInput placeholder=\"Tooltip message\" [formControl]=\"message\"></mat-form-field><button mat-raised-button [matTooltip]=\"message.value\" aria-label=\"Button that displays a tooltip with a custom message\">Action</button>",
            styles: [".example-user-input { margin-right: 8px; } "],
        })
    ], TooltipMessageExample);
    return TooltipMessageExample;
}());
exports.TooltipMessageExample = TooltipMessageExample;
//# sourceMappingURL=tooltip-message-example.js.map