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
 * @title Paginator
 */
var PaginatorOverviewExample = /** @class */ (function () {
    function PaginatorOverviewExample() {
    }
    PaginatorOverviewExample = __decorate([
        core_1.Component({
            selector: 'paginator-overview-example',
            template: "<mat-paginator [length]=\"100\" [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>",
            styles: ["/** No CSS for this example */ "],
        })
    ], PaginatorOverviewExample);
    return PaginatorOverviewExample;
}());
exports.PaginatorOverviewExample = PaginatorOverviewExample;
//# sourceMappingURL=paginator-overview-example.js.map