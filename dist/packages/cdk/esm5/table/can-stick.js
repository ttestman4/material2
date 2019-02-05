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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/**
 * Interface for a mixin to provide a directive with a function that checks if the sticky input has
 * been changed since the last time the function was called. Essentially adds a dirty-check to the
 * sticky value.
 * \@docs-private
 * @record
 */
export function CanStick() { }
if (false) {
    /**
     * Whether sticky positioning should be applied.
     * @type {?}
     */
    CanStick.prototype.sticky;
    /**
     * Whether the sticky input has changed since it was last checked.
     * @type {?}
     */
    CanStick.prototype._hasStickyChanged;
    /**
     * Whether the sticky value has changed since this was last called.
     * @return {?}
     */
    CanStick.prototype.hasStickyChanged = function () { };
    /**
     * Resets the dirty check for cases where the sticky state has been used without checking.
     * @return {?}
     */
    CanStick.prototype.resetStickyChanged = function () { };
}
/**
 * Mixin to provide a directive with a function that checks if the sticky input has been
 * changed since the last time the function was called. Essentially adds a dirty-check to the
 * sticky value.
 * \@docs-private
 * @template T
 * @param {?} base
 * @return {?}
 */
export function mixinHasStickyInput(base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._sticky = false;
            /**
             * Whether the sticky input has changed since it was last checked.
             */
            _this._hasStickyChanged = false;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "sticky", {
            /** Whether sticky positioning should be applied. */
            get: /**
             * Whether sticky positioning should be applied.
             * @return {?}
             */
            function () { return this._sticky; },
            set: /**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                /** @type {?} */
                var prevValue = this._sticky;
                this._sticky = coerceBooleanProperty(v);
                this._hasStickyChanged = prevValue !== this._sticky;
            },
            enumerable: true,
            configurable: true
        });
        /** Whether the sticky value has changed since this was last called. */
        /**
         * Whether the sticky value has changed since this was last called.
         * @return {?}
         */
        class_1.prototype.hasStickyChanged = /**
         * Whether the sticky value has changed since this was last called.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hasStickyChanged = this._hasStickyChanged;
            this._hasStickyChanged = false;
            return hasStickyChanged;
        };
        /** Resets the dirty check for cases where the sticky state has been used without checking. */
        /**
         * Resets the dirty check for cases where the sticky state has been used without checking.
         * @return {?}
         */
        class_1.prototype.resetStickyChanged = /**
         * Resets the dirty check for cases where the sticky state has been used without checking.
         * @return {?}
         */
        function () {
            this._hasStickyChanged = false;
        };
        return class_1;
    }(base));
}
//# sourceMappingURL=can-stick.js.map