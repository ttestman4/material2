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
 * @title Snack-bar with configurable position
 */
var SnackBarPositionExample = /** @class */ (function () {
    function SnackBarPositionExample(snackBar) {
        this.snackBar = snackBar;
        this.horizontalPosition = 'start';
        this.verticalPosition = 'bottom';
    }
    SnackBarPositionExample.prototype.openSnackBar = function () {
        this.snackBar.open('Canonball!!', 'End now', {
            duration: 500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    };
    SnackBarPositionExample = __decorate([
        core_1.Component({
            selector: 'snack-bar-position-example',
            template: "<mat-form-field><mat-select placeholder=\"Horizontal position\" [(value)]=\"horizontalPosition\"><mat-option value=\"start\">Start</mat-option><mat-option value=\"center\">Center</mat-option><mat-option value=\"end\">End</mat-option><mat-option value=\"left\">Left</mat-option><mat-option value=\"right\">Right</mat-option></mat-select></mat-form-field><mat-form-field><mat-select placeholder=\"Vertical position\" [(value)]=\"verticalPosition\"><mat-option value=\"top\">Top</mat-option><mat-option value=\"bottom\">Bottom</mat-option></mat-select></mat-form-field><button mat-button (click)=\"openSnackBar()\" aria-label=\"Show an example snack-bar\">Pool party!</button>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [material_1.MatSnackBar])
    ], SnackBarPositionExample);
    return SnackBarPositionExample;
}());
exports.SnackBarPositionExample = SnackBarPositionExample;
//# sourceMappingURL=snack-bar-position-example.js.map