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
import { MatAnchor, MatButton } from './button';
var MatButtonModule = /** @class */ (function () {
    function MatButtonModule() {
    }
    MatButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatRippleModule,
                        MatCommonModule,
                    ],
                    exports: [
                        MatButton,
                        MatAnchor,
                        MatCommonModule,
                    ],
                    declarations: [
                        MatButton,
                        MatAnchor,
                    ],
                },] },
    ];
    return MatButtonModule;
}());
export { MatButtonModule };
//# sourceMappingURL=button-module.js.map