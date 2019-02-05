"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Virtual scroll context variables */
var CdkVirtualScrollContextExample = /** @class */ (function () {
    function CdkVirtualScrollContextExample() {
        this.items = Array.from({ length: 100000 }).map(function (_, i) { return "Item #" + i; });
    }
    CdkVirtualScrollContextExample = __decorate([
        core_1.Component({
            selector: 'cdk-virtual-scroll-context-example',
            styles: [".example-viewport { height: 200px; width: 200px; border: 1px solid black; } .example-item-detail { height: 18px; } .example-alternate { background: rgba(127, 127, 127, 0.3); } "],
            template: "<cdk-virtual-scroll-viewport [itemSize]=\"18 * 7\" class=\"example-viewport\"><div *cdkVirtualFor=\"let item of items; let index = index; let count = count; let first = first; let last = last; let even = even; let odd = odd;\" [class.example-alternate]=\"odd\"><div class=\"example-item-detail\">Item: {{item}}</div><div class=\"example-item-detail\">Index: {{index}}</div><div class=\"example-item-detail\">Count: {{count}}</div><div class=\"example-item-detail\">First: {{first ? 'Yes' : 'No'}}</div><div class=\"example-item-detail\">Last: {{last ? 'Yes' : 'No'}}</div><div class=\"example-item-detail\">Even: {{even ? 'Yes' : 'No'}}</div><div class=\"example-item-detail\">Odd: {{odd ? 'Yes' : 'No'}}</div></div></cdk-virtual-scroll-viewport>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], CdkVirtualScrollContextExample);
    return CdkVirtualScrollContextExample;
}());
exports.CdkVirtualScrollContextExample = CdkVirtualScrollContextExample;
//# sourceMappingURL=cdk-virtual-scroll-context-example.js.map