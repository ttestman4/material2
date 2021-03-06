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
import { NgModule } from '@angular/core';
import { GestureConfig, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatSlideToggle } from './slide-toggle';
var MatSlideToggleModule = /** @class */ (function () {
    function MatSlideToggleModule() {
    }
    MatSlideToggleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatRippleModule, MatCommonModule, ObserversModule],
                    exports: [MatSlideToggle, MatCommonModule],
                    declarations: [MatSlideToggle],
                    providers: [
                        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
                    ],
                },] },
    ];
    return MatSlideToggleModule;
}());
export { MatSlideToggleModule };
//# sourceMappingURL=slide-toggle-module.js.map