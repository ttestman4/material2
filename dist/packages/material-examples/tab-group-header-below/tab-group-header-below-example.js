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
 * @title Tab group with the headers on the bottom
 */
var TabGroupHeaderBelowExample = /** @class */ (function () {
    function TabGroupHeaderBelowExample() {
    }
    TabGroupHeaderBelowExample = __decorate([
        core_1.Component({
            selector: 'tab-group-header-below-example',
            template: "<mat-tab-group headerPosition=\"below\"><mat-tab label=\"First\">Content 1</mat-tab><mat-tab label=\"Second\">Content 2</mat-tab><mat-tab label=\"Third\">Content 3</mat-tab></mat-tab-group>",
            styles: ["/** No CSS for this example */ "],
        })
    ], TabGroupHeaderBelowExample);
    return TabGroupHeaderBelowExample;
}());
exports.TabGroupHeaderBelowExample = TabGroupHeaderBelowExample;
//# sourceMappingURL=tab-group-header-below-example.js.map