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
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { AnimationCurves, AnimationDurations } from '@angular/material/core';
/**
 * Animations used by the Material bottom sheet.
 * @type {?}
 */
export const matBottomSheetAnimations = {
    /**
     * Animation that shows and hides a bottom sheet.
     */
    bottomSheetState: trigger('state', [
        state('void, hidden', style({ transform: 'translateY(100%)' })),
        state('visible', style({ transform: 'translateY(0%)' })),
        transition('visible => void, visible => hidden', animate(`${AnimationDurations.COMPLEX} ${AnimationCurves.ACCELERATION_CURVE}`)),
        transition('void => visible', animate(`${AnimationDurations.EXITING} ${AnimationCurves.DECELERATION_CURVE}`)),
    ])
};
//# sourceMappingURL=bottom-sheet-animations.js.map