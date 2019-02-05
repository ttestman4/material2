"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var CustomVirtualScrollStrategy = /** @class */ (function (_super) {
    __extends(CustomVirtualScrollStrategy, _super);
    function CustomVirtualScrollStrategy() {
        return _super.call(this, 50, 250, 500) || this;
    }
    return CustomVirtualScrollStrategy;
}(scrolling_1.FixedSizeVirtualScrollStrategy));
exports.CustomVirtualScrollStrategy = CustomVirtualScrollStrategy;
/** @title Virtual scroll with a custom strategy */
var CdkVirtualScrollCustomStrategyExample = /** @class */ (function () {
    function CdkVirtualScrollCustomStrategyExample() {
        this.items = Array.from({ length: 100000 }).map(function (_, i) { return "Item #" + i; });
    }
    CdkVirtualScrollCustomStrategyExample = __decorate([
        core_1.Component({
            selector: 'cdk-virtual-scroll-custom-strategy-example',
            styles: [".example-viewport { height: 200px; width: 200px; border: 1px solid black; } .example-item { height: 50px; } "],
            template: "<cdk-virtual-scroll-viewport class=\"example-viewport\"><div *cdkVirtualFor=\"let item of items\" class=\"example-item\">{{item}}</div></cdk-virtual-scroll-viewport>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [{ provide: scrolling_1.VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy }]
        })
    ], CdkVirtualScrollCustomStrategyExample);
    return CdkVirtualScrollCustomStrategyExample;
}());
exports.CdkVirtualScrollCustomStrategyExample = CdkVirtualScrollCustomStrategyExample;
//# sourceMappingURL=cdk-virtual-scroll-custom-strategy-example.js.map