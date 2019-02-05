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
 * @title Using tabs with a custom label template
 */
var TabGroupCustomLabelExample = /** @class */ (function () {
    function TabGroupCustomLabelExample() {
    }
    TabGroupCustomLabelExample = __decorate([
        core_1.Component({
            selector: 'tab-group-custom-label-example',
            template: "<mat-tab-group><mat-tab><ng-template mat-tab-label><mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>First</ng-template>Content 1</mat-tab><mat-tab><ng-template mat-tab-label><mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>Second</ng-template>Content 2</mat-tab><mat-tab><ng-template mat-tab-label><mat-icon class=\"example-tab-icon\">thumb_up</mat-icon>Third</ng-template>Content 3</mat-tab></mat-tab-group>",
            styles: [".example-tab-icon { margin-right: 8px; } "],
        })
    ], TabGroupCustomLabelExample);
    return TabGroupCustomLabelExample;
}());
exports.TabGroupCustomLabelExample = TabGroupCustomLabelExample;
//# sourceMappingURL=tab-group-custom-label-example.js.map