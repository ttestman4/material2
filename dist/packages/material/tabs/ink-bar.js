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
import { Directive, ElementRef, Inject, InjectionToken, NgZone } from '@angular/core';
/**
 * Interface for a a MatInkBar positioner method, defining the positioning and width of the ink
 * bar in a set of tabs.
 * @record
 */
export function _MatInkBarPositioner() { }
/**
 * Injection token for the MatInkBar's Positioner.
 * @type {?}
 */
export const _MAT_INK_BAR_POSITIONER = new InjectionToken('MatInkBarPositioner', {
    providedIn: 'root',
    factory: _MAT_INK_BAR_POSITIONER_FACTORY
});
/**
 * The default positioner function for the MatInkBar.
 * \@docs-private
 * @return {?}
 */
export function _MAT_INK_BAR_POSITIONER_FACTORY() {
    /** @type {?} */
    const method = (element) => ({
        left: element ? (element.offsetLeft || 0) + 'px' : '0',
        width: element ? (element.offsetWidth || 0) + 'px' : '0',
    });
    return method;
}
/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * \@docs-private
 */
export class MatInkBar {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _inkBarPositioner
     */
    constructor(_elementRef, _ngZone, _inkBarPositioner) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._inkBarPositioner = _inkBarPositioner;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param {?} element
     * @return {?}
     */
    alignToElement(element) {
        this.show();
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => this._setStyles(element));
            });
        }
        else {
            this._setStyles(element);
        }
    }
    /**
     * Shows the ink bar.
     * @return {?}
     */
    show() {
        this._elementRef.nativeElement.style.visibility = 'visible';
    }
    /**
     * Hides the ink bar.
     * @return {?}
     */
    hide() {
        this._elementRef.nativeElement.style.visibility = 'hidden';
    }
    /**
     * Sets the proper styles to the ink bar element.
     * @private
     * @param {?} element
     * @return {?}
     */
    _setStyles(element) {
        /** @type {?} */
        const positions = this._inkBarPositioner(element);
        /** @type {?} */
        const inkBar = this._elementRef.nativeElement;
        inkBar.style.left = positions.left;
        inkBar.style.width = positions.width;
    }
}
MatInkBar.decorators = [
    { type: Directive, args: [{
                selector: 'mat-ink-bar',
                host: {
                    'class': 'mat-ink-bar',
                },
            },] },
];
/** @nocollapse */
MatInkBar.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [_MAT_INK_BAR_POSITIONER,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatInkBar.prototype._inkBarPositioner;
}
//# sourceMappingURL=ink-bar.js.map