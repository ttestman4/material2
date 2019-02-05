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
 * @deprecated To be removed. No longer being used. Previously the interface was used to avoid
 * circular imports between `CdkDrag` and `CdkDropList`, however now we're using the
 * `CdkDropListInternal` interface to achieve the same result, without having to maintain
 * this large of an interface.
 * \@breaking-change 8.0.0
 * @record
 * @template T
 */
export function CdkDropListContainer() { }
if (false) {
    /**
     * DOM node that corresponds to the drop container.
     * @type {?}
     */
    CdkDropListContainer.prototype.element;
    /**
     * Arbitrary data to attach to all events emitted by this container.
     * @type {?}
     */
    CdkDropListContainer.prototype.data;
    /**
     * Unique ID for the drop zone.
     * @type {?}
     */
    CdkDropListContainer.prototype.id;
    /**
     * Direction in which the list is oriented.
     * @type {?}
     */
    CdkDropListContainer.prototype.orientation;
    /**
     * Locks the position of the draggable elements inside the container along the specified axis.
     * @type {?}
     */
    CdkDropListContainer.prototype.lockAxis;
    /**
     * Whether starting a dragging sequence from this container is disabled.
     * @type {?}
     */
    CdkDropListContainer.prototype.disabled;
    /** @type {?} */
    CdkDropListContainer.prototype._draggables;
    /**
     * Starts dragging an item.
     * @return {?}
     */
    CdkDropListContainer.prototype.start = function () { };
    /**
     * Drops an item into this container.
     * @param {?} item Item being dropped into the container.
     * @param {?} currentIndex Index at which the item should be inserted.
     * @param {?} previousContainer Container from which the item got dragged in.
     * @param {?} isPointerOverContainer Whether the user's pointer was over the
     *    container when the item was dropped.
     * @return {?}
     */
    CdkDropListContainer.prototype.drop = function (item, currentIndex, previousContainer, isPointerOverContainer) { };
    /**
     * Emits an event to indicate that the user moved an item into the container.
     * @param {?} item Item that was moved into the container.
     * @param {?} pointerX Position of the item along the X axis.
     * @param {?} pointerY Position of the item along the Y axis.
     * @return {?}
     */
    CdkDropListContainer.prototype.enter = function (item, pointerX, pointerY) { };
    /**
     * Removes an item from the container after it was dragged into another container by the user.
     * @param {?} item Item that was dragged out.
     * @return {?}
     */
    CdkDropListContainer.prototype.exit = function (item) { };
    /**
     * Figures out the index of an item in the container.
     * @param {?} item Item whose index should be determined.
     * @return {?}
     */
    CdkDropListContainer.prototype.getItemIndex = function (item) { };
    /**
     * @param {?} item
     * @param {?} pointerX
     * @param {?} pointerY
     * @param {?} delta
     * @return {?}
     */
    CdkDropListContainer.prototype._sortItem = function (item, pointerX, pointerY, delta) { };
    /**
     * @param {?} item
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    CdkDropListContainer.prototype._getSiblingContainerFromPosition = function (item, x, y) { };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    CdkDropListContainer.prototype._isOverContainer = function (x, y) { };
}
/**
 * Injection token that is used to provide a CdkDropList instance to CdkDrag.
 * Used for avoiding circular imports.
 * @type {?}
 */
export var CDK_DROP_LIST = new InjectionToken('CDK_DROP_LIST');
/**
 * Injection token that is used to provide a CdkDropList instance to CdkDrag.
 * Used for avoiding circular imports.
 * @deprecated Use `CDK_DROP_LIST` instead.
 * \@breaking-change 8.0.0
 * @type {?}
 */
export var CDK_DROP_LIST_CONTAINER = CDK_DROP_LIST;
//# sourceMappingURL=drop-list-container.js.map