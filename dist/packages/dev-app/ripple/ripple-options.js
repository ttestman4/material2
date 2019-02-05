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
/**
 * Global ripple options for the dev-app. The ripple options are used as a class
 * so that the global options can be changed at runtime.
 */
var DevAppRippleOptions = /** @class */ (function () {
    function DevAppRippleOptions() {
        /** Whether ripples should be disabled */
        this.disabled = false;
    }
    DevAppRippleOptions = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], DevAppRippleOptions);
    return DevAppRippleOptions;
}());
exports.DevAppRippleOptions = DevAppRippleOptions;
//# sourceMappingURL=ripple-options.js.map