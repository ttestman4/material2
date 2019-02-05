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
var text_field_1 = require("@angular/cdk/text-field");
var core_1 = require("@angular/core");
/** @title Monitoring autofill state with AutofillMonitor */
var TextFieldAutofillMonitorExample = /** @class */ (function () {
    function TextFieldAutofillMonitorExample(autofill) {
        this.autofill = autofill;
    }
    TextFieldAutofillMonitorExample.prototype.ngOnInit = function () {
        var _this = this;
        this.autofill.monitor(this.firstName)
            .subscribe(function (e) { return _this.firstNameAutofilled = e.isAutofilled; });
        this.autofill.monitor(this.lastName)
            .subscribe(function (e) { return _this.lastNameAutofilled = e.isAutofilled; });
    };
    TextFieldAutofillMonitorExample.prototype.ngOnDestroy = function () {
        this.autofill.stopMonitoring(this.firstName);
        this.autofill.stopMonitoring(this.lastName);
    };
    __decorate([
        core_1.ViewChild('first', { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], TextFieldAutofillMonitorExample.prototype, "firstName", void 0);
    __decorate([
        core_1.ViewChild('last', { read: core_1.ElementRef }),
        __metadata("design:type", core_1.ElementRef)
    ], TextFieldAutofillMonitorExample.prototype, "lastName", void 0);
    TextFieldAutofillMonitorExample = __decorate([
        core_1.Component({
            selector: 'text-field-autofill-monitor-example',
            template: "<form><mat-form-field><mat-label>First name</mat-label><input matInput #first><mat-hint *ngIf=\"firstNameAutofilled\">Autofilled!</mat-hint></mat-form-field><mat-form-field><mat-label>Last name</mat-label><input matInput #last><mat-hint *ngIf=\"lastNameAutofilled\">Autofilled!</mat-hint></mat-form-field><button mat-raised-button>Submit</button></form>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [text_field_1.AutofillMonitor])
    ], TextFieldAutofillMonitorExample);
    return TextFieldAutofillMonitorExample;
}());
exports.TextFieldAutofillMonitorExample = TextFieldAutofillMonitorExample;
//# sourceMappingURL=text-field-autofill-monitor-example.js.map