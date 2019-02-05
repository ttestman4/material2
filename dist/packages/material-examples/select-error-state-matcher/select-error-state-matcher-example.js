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
/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
exports.MyErrorStateMatcher = MyErrorStateMatcher;
/** @title Select with a custom ErrorStateMatcher */
var SelectErrorStateMatcherExample = /** @class */ (function () {
    function SelectErrorStateMatcherExample() {
        this.selected = new forms_1.FormControl('valid', [
            forms_1.Validators.required,
            forms_1.Validators.pattern('valid'),
        ]);
        this.selectFormControl = new forms_1.FormControl('valid', [
            forms_1.Validators.required,
            forms_1.Validators.pattern('valid'),
        ]);
        this.nativeSelectFormControl = new forms_1.FormControl('valid', [
            forms_1.Validators.required,
            forms_1.Validators.pattern('valid'),
        ]);
        this.matcher = new MyErrorStateMatcher();
    }
    SelectErrorStateMatcherExample = __decorate([
        core_1.Component({
            selector: 'select-error-state-matcher-example',
            template: "<h4>mat-select</h4><mat-form-field><mat-select placeholder=\"Choose one\" [formControl]=\"selected\" [errorStateMatcher]=\"matcher\"><mat-option>Clear</mat-option><mat-option value=\"valid\">Valid option</mat-option><mat-option value=\"invalid\">Invalid option</mat-option></mat-select><mat-hint>Errors appear instantly!</mat-hint><mat-error *ngIf=\"selected.hasError('required')\">You must make a selection</mat-error><mat-error *ngIf=\"selected.hasError('pattern') && !selected.hasError('required')\">Your selection is invalid</mat-error></mat-form-field><h4>native html select</h4><mat-form-field class=\"demo-full-width\"><select matNativeControl placeholder=\"Choose one\" [formControl]=\"nativeSelectFormControl\" [errorStateMatcher]=\"matcher\"><option value=\"\"></option><option value=\"valid\" selected=\"selected\">Valid option</option><option value=\"invalid\">Invalid option</option></select><mat-error *ngIf=\"nativeSelectFormControl.hasError('required')\">You must make a selection</mat-error><mat-error *ngIf=\"nativeSelectFormControl.hasError('pattern') && !nativeSelectFormControl.hasError('required')\">Your selection is invalid</mat-error></mat-form-field>",
            styles: ["/** No CSS for this example */ "],
        })
    ], SelectErrorStateMatcherExample);
    return SelectErrorStateMatcherExample;
}());
exports.SelectErrorStateMatcherExample = SelectErrorStateMatcherExample;
//# sourceMappingURL=select-error-state-matcher-example.js.map