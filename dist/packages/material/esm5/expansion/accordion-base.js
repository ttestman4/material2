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
import { InjectionToken } from '@angular/core';
/**
 * Base interface for a `MatAccordion`.
 * \@docs-private
 * @record
 */
export function MatAccordionBase() { }
if (false) {
    /**
     * Whether the expansion indicator should be hidden.
     * @type {?}
     */
    MatAccordionBase.prototype.hideToggle;
    /**
     * Display mode used for all expansion panels in the accordion.
     * @type {?}
     */
    MatAccordionBase.prototype.displayMode;
    /**
     * Handles keyboard events coming in from the panel headers.
     * @type {?}
     */
    MatAccordionBase.prototype._handleHeaderKeydown;
    /**
     * Handles focus events on the panel headers.
     * @type {?}
     */
    MatAccordionBase.prototype._handleHeaderFocus;
}
/**
 * Token used to provide a `MatAccordion` to `MatExpansionPanel`.
 * Used primarily to avoid circular imports between `MatAccordion` and `MatExpansionPanel`.
 * @type {?}
 */
export var MAT_ACCORDION = new InjectionToken('MAT_ACCORDION');
//# sourceMappingURL=accordion-base.js.map