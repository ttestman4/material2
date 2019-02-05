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
 * Default `mat-slide-toggle` options that can be overridden.
 * @record
 */
export function MatSlideToggleDefaultOptions() { }
if (false) {
    /**
     * Whether toggle action triggers value changes in slide toggle.
     * @type {?|undefined}
     */
    MatSlideToggleDefaultOptions.prototype.disableToggleValue;
    /**
     * Whether drag action triggers value changes in slide toggle.
     * @type {?|undefined}
     */
    MatSlideToggleDefaultOptions.prototype.disableDragValue;
}
/**
 * Injection token to be used to override the default options for `mat-slide-toggle`.
 * @type {?}
 */
export const MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken('mat-slide-toggle-default-options', {
    providedIn: 'root',
    factory: () => ({ disableToggleValue: false, disableDragValue: false })
});
//# sourceMappingURL=slide-toggle-config.js.map