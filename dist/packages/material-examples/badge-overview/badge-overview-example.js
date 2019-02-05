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
 * @title Badge overview
 */
var BadgeOverviewExample = /** @class */ (function () {
    function BadgeOverviewExample() {
    }
    BadgeOverviewExample = __decorate([
        core_1.Component({
            selector: 'badge-overview-example',
            template: "<p><span matBadge=\"4\" matBadgeOverlap=\"false\">Text with a badge</span></p><p>Button with a badge on the left <button mat-raised-button color=\"primary\" matBadge=\"8\" matBadgePosition=\"before\" matBadgeColor=\"accent\">Action</button></p><p>Icon with a badge<mat-icon matBadge=\"15\" matBadgeColor=\"warn\">home</mat-icon></p>",
            styles: ["/** No CSS for this example */ "],
        })
    ], BadgeOverviewExample);
    return BadgeOverviewExample;
}());
exports.BadgeOverviewExample = BadgeOverviewExample;
//# sourceMappingURL=badge-overview-example.js.map