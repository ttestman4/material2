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
 * @title Button toggle appearance
 */
var ButtonToggleAppearanceExample = /** @class */ (function () {
    function ButtonToggleAppearanceExample() {
    }
    ButtonToggleAppearanceExample = __decorate([
        core_1.Component({
            selector: 'button-toggle-appearance-example',
            template: "<p>Default appearance:<mat-button-toggle-group name=\"fontStyle\" aria-label=\"Font Style\"><mat-button-toggle value=\"bold\">Bold</mat-button-toggle><mat-button-toggle value=\"italic\">Italic</mat-button-toggle><mat-button-toggle value=\"underline\">Underline</mat-button-toggle></mat-button-toggle-group></p><p>Legacy appearance:<mat-button-toggle-group appearance=\"legacy\" name=\"fontStyle\" aria-label=\"Font Style\"><mat-button-toggle value=\"bold\">Bold</mat-button-toggle><mat-button-toggle value=\"italic\">Italic</mat-button-toggle><mat-button-toggle value=\"underline\">Underline</mat-button-toggle></mat-button-toggle-group></p>",
            styles: ["/** No CSS for this example */ "],
        })
    ], ButtonToggleAppearanceExample);
    return ButtonToggleAppearanceExample;
}());
exports.ButtonToggleAppearanceExample = ButtonToggleAppearanceExample;
//# sourceMappingURL=button-toggle-appearance-example.js.map