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
var material_1 = require("@angular/material");
/**
 * @title Bottom Sheet Overview
 */
var BottomSheetOverviewExample = /** @class */ (function () {
    function BottomSheetOverviewExample(bottomSheet) {
        this.bottomSheet = bottomSheet;
    }
    BottomSheetOverviewExample.prototype.openBottomSheet = function () {
        this.bottomSheet.open(BottomSheetOverviewExampleSheet);
    };
    BottomSheetOverviewExample = __decorate([
        core_1.Component({
            selector: 'bottom-sheet-overview-example',
            template: "<p>You have received a file called \"cat-picture.jpeg\".</p><button mat-raised-button (click)=\"openBottomSheet()\">Open file</button>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [material_1.MatBottomSheet])
    ], BottomSheetOverviewExample);
    return BottomSheetOverviewExample;
}());
exports.BottomSheetOverviewExample = BottomSheetOverviewExample;
var BottomSheetOverviewExampleSheet = /** @class */ (function () {
    function BottomSheetOverviewExampleSheet(bottomSheetRef) {
        this.bottomSheetRef = bottomSheetRef;
    }
    BottomSheetOverviewExampleSheet.prototype.openLink = function (event) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    };
    BottomSheetOverviewExampleSheet = __decorate([
        core_1.Component({
            selector: 'bottom-sheet-overview-example-sheet',
            template: "<mat-nav-list><a href=\"https://keep.google.com/\" mat-list-item (click)=\"openLink($event)\"><span mat-line>Google Keep</span> <span mat-line>Add to a note</span> </a><a href=\"https://docs.google.com/\" mat-list-item (click)=\"openLink($event)\"><span mat-line>Google Docs</span> <span mat-line>Embed in a document</span> </a><a href=\"https://plus.google.com/\" mat-list-item (click)=\"openLink($event)\"><span mat-line>Google Plus</span> <span mat-line>Share with your friends</span> </a><a href=\"https://hangouts.google.com/\" mat-list-item (click)=\"openLink($event)\"><span mat-line>Google Hangouts</span> <span mat-line>Show to your coworkers</span></a></mat-nav-list>",
        }),
        __metadata("design:paramtypes", [material_1.MatBottomSheetRef])
    ], BottomSheetOverviewExampleSheet);
    return BottomSheetOverviewExampleSheet;
}());
exports.BottomSheetOverviewExampleSheet = BottomSheetOverviewExampleSheet;
//# sourceMappingURL=bottom-sheet-overview-example.js.map