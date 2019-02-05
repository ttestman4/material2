"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Basic virtual scroll */
var CdkVirtualScrollOverviewExample = /** @class */ (function () {
    function CdkVirtualScrollOverviewExample() {
        this.items = Array.from({ length: 100000 }).map(function (_, i) { return "Item #" + i; });
    }
    CdkVirtualScrollOverviewExample = __decorate([
        core_1.Component({
            selector: 'cdk-virtual-scroll-overview-example',
            styles: [".example-viewport { height: 200px; width: 200px; border: 1px solid black; } .example-item { height: 50px; } "],
            template: "<cdk-virtual-scroll-viewport itemSize=\"50\" class=\"example-viewport\"><div *cdkVirtualFor=\"let item of items\" class=\"example-item\">{{item}}</div></cdk-virtual-scroll-viewport>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], CdkVirtualScrollOverviewExample);
    return CdkVirtualScrollOverviewExample;
}());
exports.CdkVirtualScrollOverviewExample = CdkVirtualScrollOverviewExample;
//# sourceMappingURL=cdk-virtual-scroll-overview-example.js.map