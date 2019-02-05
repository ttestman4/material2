/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef } from '@angular/core';
import { mixinDisabled } from '@angular/material/core';
// Boilerplate for applying mixins to MatTabLabelWrapper.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to MatTabLabelWrapper.
/**
 * \@docs-private
 */
MatTabLabelWrapperBase = /** @class */ (function () {
    function MatTabLabelWrapperBase() {
    }
    return MatTabLabelWrapperBase;
}());
// Boilerplate for applying mixins to MatTabLabelWrapper.
/**
 * \@docs-private
 */
export { MatTabLabelWrapperBase };
/** @type {?} */
export var _MatTabLabelWrapperMixinBase = mixinDisabled(MatTabLabelWrapperBase);
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * \@docs-private
 */
var MatTabLabelWrapper = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabLabelWrapper, _super);
    function MatTabLabelWrapper(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** Sets focus on the wrapper element */
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    MatTabLabelWrapper.prototype.focus = /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MatTabLabelWrapper.prototype.getOffsetLeft = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetLeft;
    };
    /**
     * @return {?}
     */
    MatTabLabelWrapper.prototype.getOffsetWidth = /**
     * @return {?}
     */
    function () {
        return this.elementRef.nativeElement.offsetWidth;
    };
    MatTabLabelWrapper.decorators = [
        { type: Directive, args: [{
                    selector: '[matTabLabelWrapper]',
                    inputs: ['disabled'],
                    host: {
                        '[class.mat-tab-disabled]': 'disabled',
                        '[attr.aria-disabled]': '!!disabled',
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLabelWrapper.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return MatTabLabelWrapper;
}(_MatTabLabelWrapperMixinBase));
export { MatTabLabelWrapper };
if (false) {
    /** @type {?} */
    MatTabLabelWrapper.prototype.elementRef;
}
//# sourceMappingURL=tab-label-wrapper.js.map