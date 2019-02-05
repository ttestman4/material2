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
var material_1 = require("@angular/material");
/**
 * @title Accordion with expand/collapse all toggles
 */
var ExpansionExpandCollapseAllExample = /** @class */ (function () {
    function ExpansionExpandCollapseAllExample() {
    }
    __decorate([
        core_1.ViewChild(material_1.MatAccordion),
        __metadata("design:type", material_1.MatAccordion)
    ], ExpansionExpandCollapseAllExample.prototype, "accordion", void 0);
    ExpansionExpandCollapseAllExample = __decorate([
        core_1.Component({
            selector: 'expansion-toggle-all-example',
            template: "<div class=\"example-action-buttons\"><button mat-button (click)=\"accordion.openAll()\">Expand All</button> <button mat-button (click)=\"accordion.closeAll()\">Collapse All</button></div><mat-accordion class=\"example-headers-align\" multi><mat-expansion-panel><mat-expansion-panel-header><mat-panel-title>Personal data</mat-panel-title><mat-panel-description>Type your name and age<mat-icon>account_circle</mat-icon></mat-panel-description></mat-expansion-panel-header><mat-form-field><input matInput placeholder=\"First name\"></mat-form-field><mat-form-field><input matInput type=\"number\" min=\"1\" placeholder=\"Age\"></mat-form-field></mat-expansion-panel><mat-expansion-panel disabled=\"disabled\"><mat-expansion-panel-header><mat-panel-title>Destination</mat-panel-title><mat-panel-description>Type the country name<mat-icon>map</mat-icon></mat-panel-description></mat-expansion-panel-header><mat-form-field><input matInput placeholder=\"Country\"></mat-form-field></mat-expansion-panel><mat-expansion-panel><mat-expansion-panel-header><mat-panel-title>Day of the trip</mat-panel-title><mat-panel-description>Inform the date you wish to travel<mat-icon>date_range</mat-icon></mat-panel-description></mat-expansion-panel-header><mat-form-field><input matInput placeholder=\"Date\" [matDatepicker]=\"picker\" (focus)=\"picker.open()\" readonly=\"readonly\"></mat-form-field><mat-datepicker #picker></mat-datepicker></mat-expansion-panel></mat-accordion>",
            styles: [".example-action-buttons { padding-bottom: 20px; } .example-headers-align .mat-expansion-panel-header-title, .example-headers-align .mat-expansion-panel-header-description { flex-basis: 0; } .example-headers-align .mat-expansion-panel-header-description { justify-content: space-between; align-items: center; } "],
        })
    ], ExpansionExpandCollapseAllExample);
    return ExpansionExpandCollapseAllExample;
}());
exports.ExpansionExpandCollapseAllExample = ExpansionExpandCollapseAllExample;
//# sourceMappingURL=expansion-expand-collapse-all-example.js.map