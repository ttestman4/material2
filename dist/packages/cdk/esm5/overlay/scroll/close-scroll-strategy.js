/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getMatScrollStrategyAlreadyAttachedError } from './scroll-strategy';
/**
 * Config options for the CloseScrollStrategy.
 * @record
 */
export function CloseScrollStrategyConfig() { }
if (false) {
    /**
     * Amount of pixels the user has to scroll before the overlay is closed.
     * @type {?|undefined}
     */
    CloseScrollStrategyConfig.prototype.threshold;
}
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
var /**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
CloseScrollStrategy = /** @class */ (function () {
    function CloseScrollStrategy(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
        var _this = this;
        this._scrollDispatcher = _scrollDispatcher;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._config = _config;
        this._scrollSubscription = null;
        /**
         * Detaches the overlay ref and disables the scroll strategy.
         */
        this._detach = function () {
            _this.disable();
            if (_this._overlayRef.hasAttached()) {
                _this._ngZone.run(function () { return _this._overlayRef.detach(); });
            }
        };
    }
    /** Attaches this scroll strategy to an overlay. */
    /**
     * Attaches this scroll strategy to an overlay.
     * @param {?} overlayRef
     * @return {?}
     */
    CloseScrollStrategy.prototype.attach = /**
     * Attaches this scroll strategy to an overlay.
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayRef) {
        if (this._overlayRef) {
            throw getMatScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    };
    /** Enables the closing of the attached overlay on scroll. */
    /**
     * Enables the closing of the attached overlay on scroll.
     * @return {?}
     */
    CloseScrollStrategy.prototype.enable = /**
     * Enables the closing of the attached overlay on scroll.
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._scrollSubscription) {
            return;
        }
        /** @type {?} */
        var stream = this._scrollDispatcher.scrolled(0);
        if (this._config && this._config.threshold && this._config.threshold > 1) {
            this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top;
            this._scrollSubscription = stream.subscribe(function () {
                /** @type {?} */
                var scrollPosition = _this._viewportRuler.getViewportScrollPosition().top;
                if (Math.abs(scrollPosition - _this._initialScrollPosition) > (/** @type {?} */ ((/** @type {?} */ (_this._config)).threshold))) {
                    _this._detach();
                }
                else {
                    _this._overlayRef.updatePosition();
                }
            });
        }
        else {
            this._scrollSubscription = stream.subscribe(this._detach);
        }
    };
    /** Disables the closing the attached overlay on scroll. */
    /**
     * Disables the closing the attached overlay on scroll.
     * @return {?}
     */
    CloseScrollStrategy.prototype.disable = /**
     * Disables the closing the attached overlay on scroll.
     * @return {?}
     */
    function () {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    };
    return CloseScrollStrategy;
}());
/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
export { CloseScrollStrategy };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._scrollSubscription;
    /**
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._overlayRef;
    /**
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._initialScrollPosition;
    /**
     * Detaches the overlay ref and disables the scroll strategy.
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._detach;
    /**
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._scrollDispatcher;
    /**
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._viewportRuler;
    /**
     * @type {?}
     * @private
     */
    CloseScrollStrategy.prototype._config;
}
//# sourceMappingURL=close-scroll-strategy.js.map