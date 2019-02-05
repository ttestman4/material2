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
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatCheckbox } from './checkbox';
import { MatCheckboxRequiredValidator } from './checkbox-required-validator';
var MatCheckboxModule = /** @class */ (function () {
    function MatCheckboxModule() {
    }
    MatCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatRippleModule, MatCommonModule, ObserversModule],
                    exports: [MatCheckbox, MatCheckboxRequiredValidator, MatCommonModule],
                    declarations: [MatCheckbox, MatCheckboxRequiredValidator],
                },] },
    ];
    return MatCheckboxModule;
}());
export { MatCheckboxModule };
//# sourceMappingURL=checkbox-module.js.map