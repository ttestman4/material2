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
 * @title Select in a form
 */
var SelectFormExample = /** @class */ (function () {
    function SelectFormExample() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos' }
        ];
        this.cars = [
            { value: 'volvo', viewValue: 'Volvo' },
            { value: 'saab', viewValue: 'Saab' },
            { value: 'mercedes', viewValue: 'Mercedes' }
        ];
    }
    SelectFormExample = __decorate([
        core_1.Component({
            selector: 'select-form-example',
            template: "<form><h4>mat-select</h4><mat-form-field><mat-select placeholder=\"Favorite food\" [(ngModel)]=\"selectedValue\" name=\"food\"><mat-option *ngFor=\"let food of foods\" [value]=\"food.value\">{{food.viewValue}}</mat-option></mat-select></mat-form-field><p>Selected food: {{selectedValue}}</p><h4>native html select</h4><mat-form-field><select matNativeControl placeholder=\"Favorite car\" [(ngModel)]=\"selectedCar\" name=\"car\"><option value=\"\" selected=\"selected\"></option><option *ngFor=\"let car of cars\" [value]=\"car.value\">{{car.viewValue}}</option></select></mat-form-field><p>Selected car: {{selectedCar}}</p></form>",
            styles: ["/** No CSS for this example */ "],
        })
    ], SelectFormExample);
    return SelectFormExample;
}());
exports.SelectFormExample = SelectFormExample;
//# sourceMappingURL=select-form-example.js.map