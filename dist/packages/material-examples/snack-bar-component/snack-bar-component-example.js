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
 * @title Snack-bar with a custom component
 */
var SnackBarComponentExample = /** @class */ (function () {
    function SnackBarComponentExample(snackBar) {
        this.snackBar = snackBar;
    }
    SnackBarComponentExample.prototype.openSnackBar = function () {
        this.snackBar.openFromComponent(PizzaPartyComponent, {
            duration: 500,
        });
    };
    SnackBarComponentExample = __decorate([
        core_1.Component({
            selector: 'snack-bar-component-example',
            template: "<button mat-button (click)=\"openSnackBar()\" aria-label=\"Show an example snack-bar\">Pizza party</button>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], SnackBarComponentExample);
    return SnackBarComponentExample;
}());
exports.SnackBarComponentExample = SnackBarComponentExample;
var PizzaPartyComponent = /** @class */ (function () {
    function PizzaPartyComponent() {
    }
    PizzaPartyComponent = __decorate([
        core_1.Component({
            selector: 'snack-bar-component-example-snack',
            template: "<span class=\"example-pizza-party\">Pizza party!!! 🍕</span>",
            styles: ["\n    .example-pizza-party {\n      color: hotpink;\n    }\n  "],
        })
    ], PizzaPartyComponent);
    return PizzaPartyComponent;
}());
exports.PizzaPartyComponent = PizzaPartyComponent;
//# sourceMappingURL=snack-bar-component-example.js.map