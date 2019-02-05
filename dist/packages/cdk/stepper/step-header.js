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
import { Directive, ElementRef } from '@angular/core';
export class CdkStepHeader {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
    /**
     * Focuses the step header.
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
}
CdkStepHeader.decorators = [
    { type: Directive, args: [{
                selector: '[cdkStepHeader]',
                host: {
                    'role': 'tab',
                },
            },] },
];
/** @nocollapse */
CdkStepHeader.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkStepHeader.prototype._elementRef;
}
//# sourceMappingURL=step-header.js.map