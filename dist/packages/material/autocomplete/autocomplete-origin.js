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
/**
 * Directive applied to an element to make it usable
 * as a connection point for an autocomplete panel.
 */
export class MatAutocompleteOrigin {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
MatAutocompleteOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[matAutocompleteOrigin]',
                exportAs: 'matAutocompleteOrigin',
            },] },
];
/** @nocollapse */
MatAutocompleteOrigin.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /**
     * Reference to the element on which the directive is applied.
     * @type {?}
     */
    MatAutocompleteOrigin.prototype.elementRef;
}
//# sourceMappingURL=autocomplete-origin.js.map