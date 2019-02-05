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
 * @title Tab group with aligned labels
 */
var TabGroupAlignExample = /** @class */ (function () {
    function TabGroupAlignExample() {
    }
    TabGroupAlignExample = __decorate([
        core_1.Component({
            selector: 'tab-group-align-example',
            template: "<mat-tab-group mat-align-tabs=\"start\"><mat-tab label=\"First\">Content 1</mat-tab><mat-tab label=\"Second\">Content 2</mat-tab><mat-tab label=\"Third\">Content 3</mat-tab></mat-tab-group><mat-tab-group mat-align-tabs=\"center\"><mat-tab label=\"First\">Content 1</mat-tab><mat-tab label=\"Second\">Content 2</mat-tab><mat-tab label=\"Third\">Content 3</mat-tab></mat-tab-group><mat-tab-group mat-align-tabs=\"end\"><mat-tab label=\"First\">Content 1</mat-tab><mat-tab label=\"Second\">Content 2</mat-tab><mat-tab label=\"Third\">Content 3</mat-tab></mat-tab-group>",
            styles: [".mat-tab-group { margin-bottom: 48px; } "],
        })
    ], TabGroupAlignExample);
    return TabGroupAlignExample;
}());
exports.TabGroupAlignExample = TabGroupAlignExample;
//# sourceMappingURL=tab-group-align-example.js.map