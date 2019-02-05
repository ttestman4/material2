"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * @title Tab group with asynchronously loading tab contents
 */
var TabGroupAsyncExample = /** @class */ (function () {
    function TabGroupAsyncExample() {
        this.asyncTabs = new rxjs_1.Observable(function (observer) {
            setTimeout(function () {
                observer.next([
                    { label: 'First', content: 'Content 1' },
                    { label: 'Second', content: 'Content 2' },
                    { label: 'Third', content: 'Content 3' },
                ]);
            }, 1000);
        });
    }
    TabGroupAsyncExample = __decorate([
        core_1.Component({
            selector: 'tab-group-async-example',
            template: "<ng-container *ngIf=\"(asyncTabs | async) === null\">Loading tabs...</ng-container><mat-tab-group><mat-tab *ngFor=\"let tab of asyncTabs | async\"><ng-template mat-tab-label>{{tab.label}}</ng-template>{{tab.content}}</mat-tab></mat-tab-group>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [])
    ], TabGroupAsyncExample);
    return TabGroupAsyncExample;
}());
exports.TabGroupAsyncExample = TabGroupAsyncExample;
//# sourceMappingURL=tab-group-async-example.js.map