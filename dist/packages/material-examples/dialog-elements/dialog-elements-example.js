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
 * @title Dialog elements
 */
var DialogElementsExample = /** @class */ (function () {
    function DialogElementsExample(dialog) {
        this.dialog = dialog;
    }
    DialogElementsExample.prototype.openDialog = function () {
        this.dialog.open(DialogElementsExampleDialog);
    };
    DialogElementsExample = __decorate([
        core_1.Component({
            selector: 'dialog-elements-example',
            template: "<button mat-button (click)=\"openDialog()\">Launch dialog</button>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], DialogElementsExample);
    return DialogElementsExample;
}());
exports.DialogElementsExample = DialogElementsExample;
var DialogElementsExampleDialog = /** @class */ (function () {
    function DialogElementsExampleDialog() {
    }
    DialogElementsExampleDialog = __decorate([
        core_1.Component({
            selector: 'dialog-elements-example-dialog',
            template: "<h1 mat-dialog-title>Dialog with elements</h1><div mat-dialog-content>This dialog showcases the title, close, content and actions elements.</div><div mat-dialog-actions><button mat-button mat-dialog-close>Close</button></div>",
        })
    ], DialogElementsExampleDialog);
    return DialogElementsExampleDialog;
}());
exports.DialogElementsExampleDialog = DialogElementsExampleDialog;
//# sourceMappingURL=dialog-elements-example.js.map