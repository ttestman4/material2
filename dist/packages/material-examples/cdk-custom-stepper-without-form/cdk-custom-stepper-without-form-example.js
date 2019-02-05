"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var stepper_1 = require("@angular/cdk/stepper");
/** @title A custom CDK stepper without a form */
var CdkCustomStepperWithoutFormExample = /** @class */ (function () {
    function CdkCustomStepperWithoutFormExample() {
    }
    CdkCustomStepperWithoutFormExample = __decorate([
        core_1.Component({
            selector: 'cdk-custom-stepper-without-form-example',
            template: "<example-custom-stepper><cdk-step><p>This is any content of \"Step 1\"</p></cdk-step><cdk-step><p>This is any content of \"Step 2\"</p></cdk-step></example-custom-stepper>",
            styles: [""]
        })
    ], CdkCustomStepperWithoutFormExample);
    return CdkCustomStepperWithoutFormExample;
}());
exports.CdkCustomStepperWithoutFormExample = CdkCustomStepperWithoutFormExample;
/** Custom CDK stepper component */
var CustomStepper = /** @class */ (function (_super) {
    __extends(CustomStepper, _super);
    function CustomStepper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomStepper_1 = CustomStepper;
    CustomStepper.prototype.onClick = function (index) {
        this.selectedIndex = index;
    };
    var CustomStepper_1;
    CustomStepper = CustomStepper_1 = __decorate([
        core_1.Component({
            selector: 'example-custom-stepper',
            template: "<section class=\"example-container\"><header><h2>Step {{ selectedIndex + 1 }}/{{ steps.length }}</h2></header><div [style.display]=\"selected ? 'block' : 'none'\"><ng-container [ngTemplateOutlet]=\"selected.content\"></ng-container></div><footer class=\"example-step-navigation-bar\"><button class=\"example-nav-button\" cdkStepperPrevious>&larr;</button> <button class=\"example-step\" *ngFor=\"let step of steps; let i = index\" [ngClass]=\"{ 'example-active': selectedIndex === i }\" (click)=\"onClick(i)\">Step {{ i + 1 }}</button> <button class=\"example-nav-button\" cdkStepperNext>&rarr;</button></footer></section>",
            styles: [".example-container { border: 1px solid black; padding: 10px; margin: 10px; } .example-step-navigation-bar { display: flex; justify-content: flex-start; margin-top: 10px; } .example-active { color: blue; } .example-step { background: transparent; border: 0; margin: 0 10px; padding: 10px; color: black; } .example-step.example-active { color: blue; border-bottom: 1px solid blue; } .example-nav-button { background: transparent; border: 0; } "],
            providers: [{ provide: stepper_1.CdkStepper, useExisting: CustomStepper_1 }]
        })
    ], CustomStepper);
    return CustomStepper;
}(stepper_1.CdkStepper));
exports.CustomStepper = CustomStepper;
//# sourceMappingURL=cdk-custom-stepper-without-form-example.js.map