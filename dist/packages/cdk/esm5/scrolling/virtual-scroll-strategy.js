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
 * The injection token used to specify the virtual scrolling strategy.
 * @type {?}
 */
export var VIRTUAL_SCROLL_STRATEGY = new InjectionToken('VIRTUAL_SCROLL_STRATEGY');
/**
 * A strategy that dictates which items should be rendered in the viewport.
 * @record
 */
export function VirtualScrollStrategy() { }
if (false) {
    /**
     * Emits when the index of the first element visible in the viewport changes.
     * @type {?}
     */
    VirtualScrollStrategy.prototype.scrolledIndexChange;
    /**
     * Attaches this scroll strategy to a viewport.
     * @param {?} viewport The viewport to attach this strategy to.
     * @return {?}
     */
    VirtualScrollStrategy.prototype.attach = function (viewport) { };
    /**
     * Detaches this scroll strategy from the currently attached viewport.
     * @return {?}
     */
    VirtualScrollStrategy.prototype.detach = function () { };
    /**
     * Called when the viewport is scrolled (debounced using requestAnimationFrame).
     * @return {?}
     */
    VirtualScrollStrategy.prototype.onContentScrolled = function () { };
    /**
     * Called when the length of the data changes.
     * @return {?}
     */
    VirtualScrollStrategy.prototype.onDataLengthChanged = function () { };
    /**
     * Called when the range of items rendered in the DOM has changed.
     * @return {?}
     */
    VirtualScrollStrategy.prototype.onContentRendered = function () { };
    /**
     * Called when the offset of the rendered items changed.
     * @return {?}
     */
    VirtualScrollStrategy.prototype.onRenderedOffsetChanged = function () { };
    /**
     * Scroll to the offset for the given index.
     * @param {?} index The index of the element to scroll to.
     * @param {?} behavior The ScrollBehavior to use when scrolling.
     * @return {?}
     */
    VirtualScrollStrategy.prototype.scrollToIndex = function (index, behavior) { };
}
//# sourceMappingURL=virtual-scroll-strategy.js.map