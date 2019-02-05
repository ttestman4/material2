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
 * @title Basic chips
 */
var ChipsOverviewExample = /** @class */ (function () {
    function ChipsOverviewExample() {
    }
    ChipsOverviewExample = __decorate([
        core_1.Component({
            selector: 'chips-overview-example',
            template: "<mat-chip-list><mat-chip>One fish</mat-chip><mat-chip>Two fish</mat-chip><mat-chip color=\"primary\" selected=\"selected\">Primary fish</mat-chip><mat-chip color=\"accent\" selected=\"selected\">Accent fish</mat-chip></mat-chip-list>",
            styles: ["/** No CSS for this example */ "],
        })
    ], ChipsOverviewExample);
    return ChipsOverviewExample;
}());
exports.ChipsOverviewExample = ChipsOverviewExample;
//# sourceMappingURL=chips-overview-example.js.map