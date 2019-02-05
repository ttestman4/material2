"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var core_2 = require("@angular/material/core");
var ɵ0 = material_moment_adapter_1.MAT_MOMENT_DATE_FORMATS;
exports.ɵ0 = ɵ0;
/** @title Datepicker with different locale */
var DatepickerLocaleExample = /** @class */ (function () {
    function DatepickerLocaleExample(adapter) {
        this.adapter = adapter;
    }
    DatepickerLocaleExample.prototype.french = function () {
        this.adapter.setLocale('fr');
    };
    DatepickerLocaleExample = __decorate([
        core_1.Component({
            selector: 'datepicker-locale-example',
            template: "<mat-form-field><input matInput [matDatepicker]=\"dp\" placeholder=\"Different locale\"><mat-datepicker-toggle matSuffix [for]=\"dp\"></mat-datepicker-toggle><mat-datepicker #dp></mat-datepicker></mat-form-field><button mat-button (click)=\"french()\">Dynamically switch to French</button>",
            styles: ["/** No CSS for this example */ "],
            providers: [
                // The locale would typically be provided on the root module of your application. We do it at
                // the component level here, due to limitations of our example generation script.
                { provide: core_2.MAT_DATE_LOCALE, useValue: 'ja-JP' },
                // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
                // `MatMomentDateModule` in your applications root module. We provide it at the component level
                // here, due to limitations of our example generation script.
                { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: ɵ0 },
            ],
        }),
        __metadata("design:paramtypes", [core_2.DateAdapter])
    ], DatepickerLocaleExample);
    return DatepickerLocaleExample;
}());
exports.DatepickerLocaleExample = DatepickerLocaleExample;
//# sourceMappingURL=datepicker-locale-example.js.map