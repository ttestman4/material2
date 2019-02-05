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
/** @title Select with form field features */
var SelectHintErrorExample = /** @class */ (function () {
    function SelectHintErrorExample() {
        this.animalControl = new forms_1.FormControl('', [forms_1.Validators.required]);
        this.selectFormControl = new forms_1.FormControl('', forms_1.Validators.required);
        this.animals = [
            { name: 'Dog', sound: 'Woof!' },
            { name: 'Cat', sound: 'Meow!' },
            { name: 'Cow', sound: 'Moo!' },
            { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
        ];
    }
    SelectHintErrorExample = __decorate([
        core_1.Component({
            selector: 'select-hint-error-example',
            template: "<h4>mat select</h4><mat-form-field><mat-select placeholder=\"Favorite animal\" [formControl]=\"animalControl\" required><mat-option>--</mat-option><mat-option *ngFor=\"let animal of animals\" [value]=\"animal\">{{animal.name}}</mat-option></mat-select><mat-error *ngIf=\"animalControl.hasError('required')\">Please choose an animal</mat-error><mat-hint>{{animalControl.value?.sound}}</mat-hint></mat-form-field><h4>native html select</h4><mat-form-field><mat-label>Select your car (required)</mat-label><select matNativeControl required [formControl]=\"selectFormControl\"><option label=\"--select something --\"></option><option value=\"saab\">Saab</option><option value=\"mercedes\">Mercedes</option><option value=\"audi\">Audi</option></select><mat-error *ngIf=\"selectFormControl.hasError('required')\">This field is required</mat-error><mat-hint>You can pick up your favorite car here</mat-hint></mat-form-field>",
            styles: ["/** No CSS for this example */ "],
        })
    ], SelectHintErrorExample);
    return SelectHintErrorExample;
}());
exports.SelectHintErrorExample = SelectHintErrorExample;
//# sourceMappingURL=select-hint-error-example.js.map