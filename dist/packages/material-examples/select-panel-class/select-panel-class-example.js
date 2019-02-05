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
 * @title Select with custom panel styling
 */
var SelectPanelClassExample = /** @class */ (function () {
    function SelectPanelClassExample() {
        this.panelColor = new forms_1.FormControl('red');
    }
    SelectPanelClassExample = __decorate([
        core_1.Component({
            selector: 'select-panel-class-example',
            template: "<mat-form-field><mat-select placeholder=\"Panel color\" [formControl]=\"panelColor\" panelClass=\"example-panel-{{panelColor.value}}\"><mat-option value=\"red\">Red</mat-option><mat-option value=\"green\">Green</mat-option><mat-option value=\"blue\">Blue</mat-option></mat-select></mat-form-field>",
            styles: [".example-panel-red.mat-select-panel { background: rgba(255, 0, 0, 0.5); } .example-panel-green.mat-select-panel { background: rgba(0, 255, 0, 0.5); } .example-panel-blue.mat-select-panel { background: rgba(0, 0, 255, 0.5); } "],
            // Encapsulation has to be disabled in order for the
            // component style to apply to the select panel.
            encapsulation: core_1.ViewEncapsulation.None,
        })
    ], SelectPanelClassExample);
    return SelectPanelClassExample;
}());
exports.SelectPanelClassExample = SelectPanelClassExample;
//# sourceMappingURL=select-panel-class-example.js.map