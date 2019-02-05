"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auto_size_virtual_scroll_1 = require("./auto-size-virtual-scroll");
var ScrollingModule = /** @class */ (function () {
    function ScrollingModule() {
    }
    ScrollingModule = __decorate([
        core_1.NgModule({
            exports: [auto_size_virtual_scroll_1.CdkAutoSizeVirtualScroll],
            declarations: [auto_size_virtual_scroll_1.CdkAutoSizeVirtualScroll],
        })
    ], ScrollingModule);
    return ScrollingModule;
}());
exports.ScrollingModule = ScrollingModule;
//# sourceMappingURL=scrolling-module.js.map