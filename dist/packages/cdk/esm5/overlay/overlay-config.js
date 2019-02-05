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
import { NoopScrollStrategy } from './scroll/index';
/**
 * Initial configuration used when creating an overlay.
 */
var /**
 * Initial configuration used when creating an overlay.
 */
OverlayConfig = /** @class */ (function () {
    function OverlayConfig(config) {
        var _this = this;
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = new NoopScrollStrategy();
        /**
         * Custom class to add to the overlay pane.
         */
        this.panelClass = '';
        /**
         * Whether the overlay has a backdrop.
         */
        this.hasBackdrop = false;
        /**
         * Custom class to add to the backdrop
         */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /**
         * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
         * Note that this usually doesn't include clicking on links (unless the user is using
         * the `HashLocationStrategy`).
         */
        this.disposeOnNavigation = false;
        if (config) {
            Object.keys(config).forEach(function (k) {
                /** @type {?} */
                var key = (/** @type {?} */ (k));
                if (typeof config[key] !== 'undefined') {
                    _this[key] = config[key];
                }
            });
        }
    }
    return OverlayConfig;
}());
/**
 * Initial configuration used when creating an overlay.
 */
export { OverlayConfig };
if (false) {
    /**
     * Strategy with which to position the overlay.
     * @type {?}
     */
    OverlayConfig.prototype.positionStrategy;
    /**
     * Strategy to be used when handling scroll events while the overlay is open.
     * @type {?}
     */
    OverlayConfig.prototype.scrollStrategy;
    /**
     * Custom class to add to the overlay pane.
     * @type {?}
     */
    OverlayConfig.prototype.panelClass;
    /**
     * Whether the overlay has a backdrop.
     * @type {?}
     */
    OverlayConfig.prototype.hasBackdrop;
    /**
     * Custom class to add to the backdrop
     * @type {?}
     */
    OverlayConfig.prototype.backdropClass;
    /**
     * The width of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayConfig.prototype.width;
    /**
     * The height of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayConfig.prototype.height;
    /**
     * The min-width of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayConfig.prototype.minWidth;
    /**
     * The min-height of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayConfig.prototype.minHeight;
    /**
     * The max-width of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayConfig.prototype.maxWidth;
    /**
     * The max-height of the overlay panel. If a number is provided, pixel units are assumed.
     * @type {?}
     */
    OverlayConfig.prototype.maxHeight;
    /**
     * Direction of the text in the overlay panel. If a `Directionality` instance
     * is passed in, the overlay will handle changes to its value automatically.
     * @type {?}
     */
    OverlayConfig.prototype.direction;
    /**
     * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     * @type {?}
     */
    OverlayConfig.prototype.disposeOnNavigation;
}
//# sourceMappingURL=overlay-config.js.map