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
/** Horizontal dimension of a connection point on the perimeter of the origin or overlay element. */
import { Optional } from '@angular/core';
/**
 * A connection point on the origin element.
 * @record
 */
export function OriginConnectionPosition() { }
if (false) {
    /** @type {?} */
    OriginConnectionPosition.prototype.originX;
    /** @type {?} */
    OriginConnectionPosition.prototype.originY;
}
/**
 * A connection point on the overlay element.
 * @record
 */
export function OverlayConnectionPosition() { }
if (false) {
    /** @type {?} */
    OverlayConnectionPosition.prototype.overlayX;
    /** @type {?} */
    OverlayConnectionPosition.prototype.overlayY;
}
/**
 * The points of the origin element and the overlay element to connect.
 */
var /**
 * The points of the origin element and the overlay element to connect.
 */
ConnectionPositionPair = /** @class */ (function () {
    function ConnectionPositionPair(origin, overlay, offsetX, offsetY, panelClass) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.panelClass = panelClass;
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
    return ConnectionPositionPair;
}());
/**
 * The points of the origin element and the overlay element to connect.
 */
export { ConnectionPositionPair };
if (false) {
    /**
     * X-axis attachment point for connected overlay origin. Can be 'start', 'end', or 'center'.
     * @type {?}
     */
    ConnectionPositionPair.prototype.originX;
    /**
     * Y-axis attachment point for connected overlay origin. Can be 'top', 'bottom', or 'center'.
     * @type {?}
     */
    ConnectionPositionPair.prototype.originY;
    /**
     * X-axis attachment point for connected overlay. Can be 'start', 'end', or 'center'.
     * @type {?}
     */
    ConnectionPositionPair.prototype.overlayX;
    /**
     * Y-axis attachment point for connected overlay. Can be 'top', 'bottom', or 'center'.
     * @type {?}
     */
    ConnectionPositionPair.prototype.overlayY;
    /**
     * Offset along the X axis.
     * @type {?}
     */
    ConnectionPositionPair.prototype.offsetX;
    /**
     * Offset along the Y axis.
     * @type {?}
     */
    ConnectionPositionPair.prototype.offsetY;
    /**
     * Class(es) to be applied to the panel while this position is active.
     * @type {?}
     */
    ConnectionPositionPair.prototype.panelClass;
}
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 *
 * \@docs-private
 */
var /**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 *
 * \@docs-private
 */
ScrollingVisibility = /** @class */ (function () {
    function ScrollingVisibility() {
    }
    return ScrollingVisibility;
}());
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 *
 * \@docs-private
 */
export { ScrollingVisibility };
if (false) {
    /** @type {?} */
    ScrollingVisibility.prototype.isOriginClipped;
    /** @type {?} */
    ScrollingVisibility.prototype.isOriginOutsideView;
    /** @type {?} */
    ScrollingVisibility.prototype.isOverlayClipped;
    /** @type {?} */
    ScrollingVisibility.prototype.isOverlayOutsideView;
}
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
var ConnectedOverlayPositionChange = /** @class */ (function () {
    function ConnectedOverlayPositionChange(connectionPair, scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
    /** @nocollapse */
    ConnectedOverlayPositionChange.ctorParameters = function () { return [
        { type: ConnectionPositionPair },
        { type: ScrollingVisibility, decorators: [{ type: Optional }] }
    ]; };
    return ConnectedOverlayPositionChange;
}());
export { ConnectedOverlayPositionChange };
if (false) {
    /**
     * The position used as a result of this change.
     * @type {?}
     */
    ConnectedOverlayPositionChange.prototype.connectionPair;
    /**
     * \@docs-private
     * @type {?}
     */
    ConnectedOverlayPositionChange.prototype.scrollableViewProperties;
}
/**
 * Validates whether a vertical position property matches the expected values.
 * \@docs-private
 * @param {?} property Name of the property being validated.
 * @param {?} value Value of the property being validated.
 * @return {?}
 */
export function validateVerticalPosition(property, value) {
    if (value !== 'top' && value !== 'bottom' && value !== 'center') {
        throw Error("ConnectedPosition: Invalid " + property + " \"" + value + "\". " +
            "Expected \"top\", \"bottom\" or \"center\".");
    }
}
/**
 * Validates whether a horizontal position property matches the expected values.
 * \@docs-private
 * @param {?} property Name of the property being validated.
 * @param {?} value Value of the property being validated.
 * @return {?}
 */
export function validateHorizontalPosition(property, value) {
    if (value !== 'start' && value !== 'end' && value !== 'center') {
        throw Error("ConnectedPosition: Invalid " + property + " \"" + value + "\". " +
            "Expected \"start\", \"end\" or \"center\".");
    }
}
//# sourceMappingURL=connected-position.js.map