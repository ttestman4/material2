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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCommonModule, MatRippleModule } from '@angular/material/core';
import { MatRadioButton, MatRadioGroup } from './radio';
export class MatRadioModule {
}
MatRadioModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatRippleModule, MatCommonModule],
                exports: [MatRadioGroup, MatRadioButton, MatCommonModule],
                declarations: [MatRadioGroup, MatRadioButton],
            },] },
];
//# sourceMappingURL=radio-module.js.map