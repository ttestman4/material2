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
/** @title Disabled select */
var SelectDisabledExample = /** @class */ (function () {
    function SelectDisabledExample() {
        this.disableSelect = new forms_1.FormControl(false);
    }
    SelectDisabledExample = __decorate([
        core_1.Component({
            selector: 'select-disabled-example',
            template: "<p><mat-checkbox [formControl]=\"disableSelect\">Disable select</mat-checkbox></p><h4>mat-select</h4><mat-form-field><mat-select placeholder=\"Choose an option\" [disabled]=\"disableSelect.value\"><mat-option value=\"option1\">Option 1</mat-option><mat-option value=\"option2\" disabled=\"disabled\">Option 2 (disabled)</mat-option><mat-option value=\"option3\">Option 3</mat-option></mat-select></mat-form-field><h4>native html select</h4><mat-form-field><select matNativeControl placeholder=\"Choose an option\" [disabled]=\"disableSelect.value\"><option value=\"\" selected=\"selected\"></option><option value=\"volvo\">Volvo</option><option value=\"saab\" disabled=\"disabled\">Saab</option><option value=\"mercedes\">Mercedes</option><option value=\"audi\">Audi</option></select></mat-form-field>",
            styles: ["/** No CSS for this example */ "],
        })
    ], SelectDisabledExample);
    return SelectDisabledExample;
}());
exports.SelectDisabledExample = SelectDisabledExample;
//# sourceMappingURL=select-disabled-example.js.map