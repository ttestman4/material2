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
var forms_1 = require("@angular/forms");
var stepper_1 = require("@angular/cdk/stepper");
var ɵ0 = { displayDefaultIndicatorType: false };
exports.ɵ0 = ɵ0;
/**
 * @title Stepper with customized states
 */
var StepperStatesExample = /** @class */ (function () {
    function StepperStatesExample(_formBuilder) {
        this._formBuilder = _formBuilder;
    }
    StepperStatesExample.prototype.ngOnInit = function () {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', forms_1.Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', forms_1.Validators.required]
        });
    };
    StepperStatesExample = __decorate([
        core_1.Component({
            selector: 'stepper-states-example',
            template: "<mat-horizontal-stepper #stepper><mat-step [stepControl]=\"firstFormGroup\"><form [formGroup]=\"firstFormGroup\"><ng-template matStepLabel>Fill out your name</ng-template><mat-form-field><input matInput placeholder=\"Last name, First name\" formControlName=\"firstCtrl\" required></mat-form-field><div><button mat-button matStepperNext>Next</button></div></form></mat-step><mat-step [stepControl]=\"secondFormGroup\"><form [formGroup]=\"secondFormGroup\"><ng-template matStepLabel>Fill out your address</ng-template><mat-form-field><input matInput placeholder=\"Address\" formControlName=\"secondCtrl\" required></mat-form-field><div><button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button></div></form></mat-step><mat-step><ng-template matStepLabel>Done</ng-template>You are now done.<div><button mat-button matStepperPrevious>Back</button> <button mat-button (click)=\"stepper.reset()\">Reset</button></div></mat-step></mat-horizontal-stepper><mat-horizontal-stepper><mat-step label=\"Step 1\" state=\"phone\"><p>Put down your phones.</p><div><button mat-button matStepperNext>Next</button></div></mat-step><mat-step label=\"Step 2\" state=\"chat\"><p>Socialize with each other.</p><div><button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button></div></mat-step><mat-step label=\"Step 3\"><p>You're welcome.</p></mat-step><ng-template matStepperIcon=\"phone\"><mat-icon>call_end</mat-icon></ng-template><ng-template matStepperIcon=\"chat\"><mat-icon>forum</mat-icon></ng-template></mat-horizontal-stepper>",
            styles: [""],
            providers: [{
                    provide: stepper_1.STEPPER_GLOBAL_OPTIONS, useValue: ɵ0
                }]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], StepperStatesExample);
    return StepperStatesExample;
}());
exports.StepperStatesExample = StepperStatesExample;
//# sourceMappingURL=stepper-states-example.js.map