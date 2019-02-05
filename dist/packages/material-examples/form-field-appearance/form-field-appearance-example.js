"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Form field appearance variants */
var FormFieldAppearanceExample = /** @class */ (function () {
    function FormFieldAppearanceExample() {
    }
    FormFieldAppearanceExample = __decorate([
        core_1.Component({
            selector: 'form-field-appearance-example',
            template: "<p><mat-form-field appearance=\"legacy\"><mat-label>Legacy form field</mat-label><input matInput placeholder=\"Placeholder\"><mat-icon matSuffix>sentiment_very_satisfied</mat-icon><mat-hint>Hint</mat-hint></mat-form-field></p><p><mat-form-field appearance=\"standard\"><mat-label>Standard form field</mat-label><input matInput placeholder=\"Placeholder\"><mat-icon matSuffix>sentiment_very_satisfied</mat-icon><mat-hint>Hint</mat-hint></mat-form-field></p><p><mat-form-field appearance=\"fill\"><mat-label>Fill form field</mat-label><input matInput placeholder=\"Placeholder\"><mat-icon matSuffix>sentiment_very_satisfied</mat-icon><mat-hint>Hint</mat-hint></mat-form-field></p><p><mat-form-field appearance=\"outline\"><mat-label>Outline form field</mat-label><input matInput placeholder=\"Placeholder\"><mat-icon matSuffix>sentiment_very_satisfied</mat-icon><mat-hint>Hint</mat-hint></mat-form-field></p>",
            styles: ["/** No CSS for this example */ "],
        })
    ], FormFieldAppearanceExample);
    return FormFieldAppearanceExample;
}());
exports.FormFieldAppearanceExample = FormFieldAppearanceExample;
//# sourceMappingURL=form-field-appearance-example.js.map