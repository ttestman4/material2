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
 * @title Basic divider
 */
var DividerOverviewExample = /** @class */ (function () {
    function DividerOverviewExample() {
    }
    DividerOverviewExample = __decorate([
        core_1.Component({
            selector: 'divider-overview-example',
            template: "<mat-list><mat-list-item>Item 1</mat-list-item><mat-divider></mat-divider><mat-list-item>Item 2</mat-list-item><mat-divider></mat-divider><mat-list-item>Item 3</mat-list-item></mat-list>",
            styles: ["/** No CSS for this example */ "],
        })
    ], DividerOverviewExample);
    return DividerOverviewExample;
}());
exports.DividerOverviewExample = DividerOverviewExample;
//# sourceMappingURL=divider-overview-example.js.map