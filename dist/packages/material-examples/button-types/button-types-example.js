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
 * @title Button varieties
 */
var ButtonTypesExample = /** @class */ (function () {
    function ButtonTypesExample() {
    }
    ButtonTypesExample = __decorate([
        core_1.Component({
            selector: 'button-types-example',
            template: "<h3>Basic Buttons</h3><div class=\"example-button-row\"><button mat-button>Basic</button> <button mat-button color=\"primary\">Primary</button> <button mat-button color=\"accent\">Accent</button> <button mat-button color=\"warn\">Warn</button> <button mat-button disabled=\"disabled\">Disabled</button> <a mat-button routerLink=\".\">Link</a></div><h3>Raised Buttons</h3><div class=\"example-button-row\"><button mat-raised-button>Basic</button> <button mat-raised-button color=\"primary\">Primary</button> <button mat-raised-button color=\"accent\">Accent</button> <button mat-raised-button color=\"warn\">Warn</button> <button mat-raised-button disabled=\"disabled\">Disabled</button> <a mat-raised-button routerLink=\".\">Link</a></div><h3>Stroked Buttons</h3><div class=\"example-button-row\"><button mat-stroked-button>Basic</button> <button mat-stroked-button color=\"primary\">Primary</button> <button mat-stroked-button color=\"accent\">Accent</button> <button mat-stroked-button color=\"warn\">Warn</button> <button mat-stroked-button disabled=\"disabled\">Disabled</button> <a mat-stroked-button routerLink=\".\">Link</a></div><h3>Flat Buttons</h3><div class=\"example-button-row\"><button mat-flat-button>Basic</button> <button mat-flat-button color=\"primary\">Primary</button> <button mat-flat-button color=\"accent\">Accent</button> <button mat-flat-button color=\"warn\">Warn</button> <button mat-flat-button disabled=\"disabled\">Disabled</button> <a mat-flat-button routerLink=\".\">Link</a></div><h3>Icon Buttons</h3><div class=\"example-button-row\"><button mat-icon-button><mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon></button> <button mat-icon-button color=\"primary\"><mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon></button> <button mat-icon-button color=\"accent\"><mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon></button> <button mat-icon-button color=\"warn\"><mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon></button> <button mat-icon-button disabled=\"disabled\"><mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon></button></div><h3>Fab Buttons</h3><div class=\"example-button-row\"><button mat-fab>Basic</button> <button mat-fab color=\"primary\">Primary</button> <button mat-fab color=\"accent\">Accent</button> <button mat-fab color=\"warn\">Warn</button> <button mat-fab disabled=\"disabled\">Disabled</button> <button mat-fab><mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon></button> <a mat-fab routerLink=\".\">Link</a></div><h3>Mini Fab Buttons</h3><div class=\"example-button-row\"><button mat-mini-fab>Basic</button> <button mat-mini-fab color=\"primary\">Primary</button> <button mat-mini-fab color=\"accent\">Accent</button> <button mat-mini-fab color=\"warn\">Warn</button> <button mat-mini-fab disabled=\"disabled\">Disabled</button> <button mat-mini-fab><mat-icon aria-label=\"Example icon-button with a heart icon\">favorite</mat-icon></button> <a mat-mini-fab routerLink=\".\">Link</a></div>",
            styles: [".example-button-row button, .example-button-row a { margin-right: 8px; } "],
        })
    ], ButtonTypesExample);
    return ButtonTypesExample;
}());
exports.ButtonTypesExample = ButtonTypesExample;
//# sourceMappingURL=button-types-example.js.map