/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatButtonToggle, MatButtonToggleGroup } from './button-toggle';
var MatButtonToggleModule = /** @class */ (function () {
    function MatButtonToggleModule() {
    }
    MatButtonToggleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, MatRippleModule],
                    exports: [MatCommonModule, MatButtonToggleGroup, MatButtonToggle],
                    declarations: [MatButtonToggleGroup, MatButtonToggle],
                },] },
    ];
    return MatButtonToggleModule;
}());
export { MatButtonToggleModule };
//# sourceMappingURL=button-toggle-module.js.map