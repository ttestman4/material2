"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Horizontal virtual scroll */
var CdkVirtualScrollHorizontalExample = /** @class */ (function () {
    function CdkVirtualScrollHorizontalExample() {
        this.items = Array.from({ length: 100000 }).map(function (_, i) { return "Item #" + i; });
    }
    CdkVirtualScrollHorizontalExample = __decorate([
        core_1.Component({
            selector: 'cdk-virtual-scroll-horizontal-example',
            styles: [".cdk-virtual-scroll-data-source-example .example-viewport { height: 200px; width: 200px; border: 1px solid black; } .cdk-virtual-scroll-data-source-example .example-viewport .cdk-virtual-scroll-content-wrapper { display: flex; flex-direction: row; } .cdk-virtual-scroll-data-source-example .example-item { width: 50px; height: 100%; writing-mode: vertical-lr; } "],
            template: "<div class=\"cdk-virtual-scroll-data-source-example\"><cdk-virtual-scroll-viewport orientation=\"horizontal\" itemSize=\"50\" class=\"example-viewport\"><div *cdkVirtualFor=\"let item of items\" class=\"example-item\">{{item}}</div></cdk-virtual-scroll-viewport></div>",
            encapsulation: core_1.ViewEncapsulation.None,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], CdkVirtualScrollHorizontalExample);
    return CdkVirtualScrollHorizontalExample;
}());
exports.CdkVirtualScrollHorizontalExample = CdkVirtualScrollHorizontalExample;
//# sourceMappingURL=cdk-virtual-scroll-horizontal-example.js.map