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
/**
 * Event emitted when the user starts dragging a draggable.
 * @record
 * @template T
 */
export function CdkDragStart() { }
if (false) {
    /**
     * Draggable that emitted the event.
     * @type {?}
     */
    CdkDragStart.prototype.source;
}
/**
 * Event emitted when the user releases an item, before any animations have started.
 * @record
 * @template T
 */
export function CdkDragRelease() { }
if (false) {
    /**
     * Draggable that emitted the event.
     * @type {?}
     */
    CdkDragRelease.prototype.source;
}
/**
 * Event emitted when the user stops dragging a draggable.
 * @record
 * @template T
 */
export function CdkDragEnd() { }
if (false) {
    /**
     * Draggable that emitted the event.
     * @type {?}
     */
    CdkDragEnd.prototype.source;
}
/**
 * Event emitted when the user moves an item into a new drop container.
 * @record
 * @template T, I
 */
export function CdkDragEnter() { }
if (false) {
    /**
     * Container into which the user has moved the item.
     * @type {?}
     */
    CdkDragEnter.prototype.container;
    /**
     * Item that was removed from the container.
     * @type {?}
     */
    CdkDragEnter.prototype.item;
}
/**
 * Event emitted when the user removes an item from a
 * drop container by moving it into another one.
 * @record
 * @template T, I
 */
export function CdkDragExit() { }
if (false) {
    /**
     * Container from which the user has a removed an item.
     * @type {?}
     */
    CdkDragExit.prototype.container;
    /**
     * Item that was removed from the container.
     * @type {?}
     */
    CdkDragExit.prototype.item;
}
/**
 * Event emitted when the user drops a draggable item inside a drop container.
 * @record
 * @template T, O
 */
export function CdkDragDrop() { }
if (false) {
    /**
     * Index of the item when it was picked up.
     * @type {?}
     */
    CdkDragDrop.prototype.previousIndex;
    /**
     * Current index of the item.
     * @type {?}
     */
    CdkDragDrop.prototype.currentIndex;
    /**
     * Item that is being dropped.
     * @type {?}
     */
    CdkDragDrop.prototype.item;
    /**
     * Container in which the item was dropped.
     * @type {?}
     */
    CdkDragDrop.prototype.container;
    /**
     * Container from which the item was picked up. Can be the same as the `container`.
     * @type {?}
     */
    CdkDragDrop.prototype.previousContainer;
    /**
     * Whether the user's pointer was over the container when the item was dropped.
     * @type {?}
     */
    CdkDragDrop.prototype.isPointerOverContainer;
}
/**
 * Event emitted as the user is dragging a draggable item.
 * @record
 * @template T
 */
export function CdkDragMove() { }
if (false) {
    /**
     * Item that is being dragged.
     * @type {?}
     */
    CdkDragMove.prototype.source;
    /**
     * Position of the user's pointer on the page.
     * @type {?}
     */
    CdkDragMove.prototype.pointerPosition;
    /**
     * Native event that is causing the dragging.
     * @type {?}
     */
    CdkDragMove.prototype.event;
    /**
     * Indicates the direction in which the user is dragging the element along each axis.
     * `1` means that the position is increasing (e.g. the user is moving to the right or downwards),
     * whereas `-1` means that it's decreasing (they're moving to the left or upwards). `0` means
     * that the position hasn't changed.
     * @type {?}
     */
    CdkDragMove.prototype.delta;
}
/**
 * Event emitted when the user swaps the position of two drag items.
 * @record
 * @template T, I
 */
export function CdkDragSortEvent() { }
if (false) {
    /**
     * Index from which the item was sorted previously.
     * @type {?}
     */
    CdkDragSortEvent.prototype.previousIndex;
    /**
     * Index that the item is currently in.
     * @type {?}
     */
    CdkDragSortEvent.prototype.currentIndex;
    /**
     * Container that the item belongs to.
     * @type {?}
     */
    CdkDragSortEvent.prototype.container;
    /**
     * Item that is being sorted.
     * @type {?}
     */
    CdkDragSortEvent.prototype.item;
}
//# sourceMappingURL=drag-events.js.map