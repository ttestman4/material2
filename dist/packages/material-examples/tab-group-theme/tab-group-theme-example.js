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
 * @title Customizing the theme options on the tab group
 */
var TabGroupThemeExample = /** @class */ (function () {
    function TabGroupThemeExample() {
    }
    TabGroupThemeExample = __decorate([
        core_1.Component({
            selector: 'tab-group-theme-example',
            template: "<div><mat-button-toggle-group #colorToggle=\"matButtonToggleGroup\" value=\"primary\" aria-label=\"Change color\"><mat-button-toggle value=\"primary\">Primary</mat-button-toggle><mat-button-toggle value=\"accent\">Accent</mat-button-toggle></mat-button-toggle-group><span class=\"example-button-toggle-label\">Color</span></div><div><mat-button-toggle-group #backgroundColorToggle=\"matButtonToggleGroup\" value=\"primary\" aria-label=\"Change color\"><mat-button-toggle value=\"primary\">Primary</mat-button-toggle><mat-button-toggle value=\"accent\">Accent</mat-button-toggle></mat-button-toggle-group><span class=\"example-button-toggle-label\">Background Color</span></div><mat-tab-group [color]=\"colorToggle.value\" [backgroundColor]=\"backgroundColorToggle.value\"><mat-tab label=\"First\">Content 1</mat-tab><mat-tab label=\"Second\">Content 2</mat-tab><mat-tab label=\"Third\">Content 3</mat-tab></mat-tab-group>",
            styles: [".example-button-toggle-label { display: inline-block; margin: 16px; } "],
        })
    ], TabGroupThemeExample);
    return TabGroupThemeExample;
}());
exports.TabGroupThemeExample = TabGroupThemeExample;
//# sourceMappingURL=tab-group-theme-example.js.map