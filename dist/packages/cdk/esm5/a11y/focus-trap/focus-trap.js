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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Injectable, Input, NgZone, isDevMode, } from '@angular/core';
import { take } from 'rxjs/operators';
import { InteractivityChecker } from '../interactivity-checker/interactivity-checker';
import * as i0 from "@angular/core";
import * as i1 from "../interactivity-checker/interactivity-checker";
import * as i2 from "@angular/common";
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause to two to misalign.
 */
var /**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause to two to misalign.
 */
FocusTrap = /** @class */ (function () {
    function FocusTrap(_element, _checker, _ngZone, _document, deferAnchors) {
        if (deferAnchors === void 0) { deferAnchors = false; }
        var _this = this;
        this._element = _element;
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
        this._hasAttached = false;
        // Event listeners for the anchors. Need to be regular functions so that we can unbind them later.
        this._startAnchorListener = function () { return _this.focusLastTabbableElement(); };
        this._endAnchorListener = function () { return _this.focusFirstTabbableElement(); };
        this._enabled = true;
        if (!deferAnchors) {
            this.attachAnchors();
        }
    }
    Object.defineProperty(FocusTrap.prototype, "enabled", {
        /** Whether the focus trap is active. */
        get: /**
         * Whether the focus trap is active.
         * @return {?}
         */
        function () { return this._enabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._enabled = value;
            if (this._startAnchor && this._endAnchor) {
                this._toggleAnchorTabIndex(value, this._startAnchor);
                this._toggleAnchorTabIndex(value, this._endAnchor);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** Destroys the focus trap by cleaning up the anchors. */
    /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    FocusTrap.prototype.destroy = /**
     * Destroys the focus trap by cleaning up the anchors.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var startAnchor = this._startAnchor;
        /** @type {?} */
        var endAnchor = this._endAnchor;
        if (startAnchor) {
            startAnchor.removeEventListener('focus', this._startAnchorListener);
            if (startAnchor.parentNode) {
                startAnchor.parentNode.removeChild(startAnchor);
            }
        }
        if (endAnchor) {
            endAnchor.removeEventListener('focus', this._endAnchorListener);
            if (endAnchor.parentNode) {
                endAnchor.parentNode.removeChild(endAnchor);
            }
        }
        this._startAnchor = this._endAnchor = null;
    };
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @returns Whether the focus trap managed to attach successfuly. This may not be the case
     * if the target element isn't currently in the DOM.
     */
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?} Whether the focus trap managed to attach successfuly. This may not be the case
     * if the target element isn't currently in the DOM.
     */
    FocusTrap.prototype.attachAnchors = /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @return {?} Whether the focus trap managed to attach successfuly. This may not be the case
     * if the target element isn't currently in the DOM.
     */
    function () {
        var _this = this;
        // If we're not on the browser, there can be no focus to trap.
        if (this._hasAttached) {
            return true;
        }
        this._ngZone.runOutsideAngular(function () {
            if (!_this._startAnchor) {
                _this._startAnchor = _this._createAnchor();
                (/** @type {?} */ (_this._startAnchor)).addEventListener('focus', _this._startAnchorListener);
            }
            if (!_this._endAnchor) {
                _this._endAnchor = _this._createAnchor();
                (/** @type {?} */ (_this._endAnchor)).addEventListener('focus', _this._endAnchorListener);
            }
        });
        if (this._element.parentNode) {
            this._element.parentNode.insertBefore((/** @type {?} */ (this._startAnchor)), this._element);
            this._element.parentNode.insertBefore((/** @type {?} */ (this._endAnchor)), this._element.nextSibling);
            this._hasAttached = true;
        }
        return this._hasAttached;
    };
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element.
     * @return {?} Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    FocusTrap.prototype.focusInitialElementWhenReady = /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element.
     * @return {?} Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._executeOnStable(function () { return resolve(_this.focusInitialElement()); });
        });
    };
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?} Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    FocusTrap.prototype.focusFirstTabbableElementWhenReady = /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @return {?} Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._executeOnStable(function () { return resolve(_this.focusFirstTabbableElement()); });
        });
    };
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?} Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    FocusTrap.prototype.focusLastTabbableElementWhenReady = /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @return {?} Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfuly.
     */
    function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._executeOnStable(function () { return resolve(_this.focusLastTabbableElement()); });
        });
    };
    /**
     * Get the specified boundary element of the trapped region.
     * @param bound The boundary to get (start or end of trapped region).
     * @returns The boundary element.
     */
    /**
     * Get the specified boundary element of the trapped region.
     * @private
     * @param {?} bound The boundary to get (start or end of trapped region).
     * @return {?} The boundary element.
     */
    FocusTrap.prototype._getRegionBoundary = /**
     * Get the specified boundary element of the trapped region.
     * @private
     * @param {?} bound The boundary to get (start or end of trapped region).
     * @return {?} The boundary element.
     */
    function (bound) {
        // Contains the deprecated version of selector, for temporary backwards comparability.
        /** @type {?} */
        var markers = (/** @type {?} */ (this._element.querySelectorAll("[cdk-focus-region-" + bound + "], " +
            ("[cdkFocusRegion" + bound + "], ") +
            ("[cdk-focus-" + bound + "]"))));
        for (var i = 0; i < markers.length; i++) {
            // @breaking-change 8.0.0
            if (markers[i].hasAttribute("cdk-focus-" + bound)) {
                console.warn("Found use of deprecated attribute 'cdk-focus-" + bound + "', " +
                    ("use 'cdkFocusRegion" + bound + "' instead. The deprecated ") +
                    "attribute will be removed in 8.0.0.", markers[i]);
            }
            else if (markers[i].hasAttribute("cdk-focus-region-" + bound)) {
                console.warn("Found use of deprecated attribute 'cdk-focus-region-" + bound + "', " +
                    ("use 'cdkFocusRegion" + bound + "' instead. The deprecated attribute ") +
                    "will be removed in 8.0.0.", markers[i]);
            }
        }
        if (bound == 'start') {
            return markers.length ? markers[0] : this._getFirstTabbableElement(this._element);
        }
        return markers.length ?
            markers[markers.length - 1] : this._getLastTabbableElement(this._element);
    };
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @returns Whether focus was moved successfuly.
     */
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @return {?} Whether focus was moved successfuly.
     */
    FocusTrap.prototype.focusInitialElement = /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @return {?} Whether focus was moved successfuly.
     */
    function () {
        // Contains the deprecated version of selector, for temporary backwards comparability.
        /** @type {?} */
        var redirectToElement = (/** @type {?} */ (this._element.querySelector("[cdk-focus-initial], " +
            "[cdkFocusInitial]")));
        if (redirectToElement) {
            // @breaking-change 8.0.0
            if (redirectToElement.hasAttribute("cdk-focus-initial")) {
                console.warn("Found use of deprecated attribute 'cdk-focus-initial', " +
                    "use 'cdkFocusInitial' instead. The deprecated attribute " +
                    "will be removed in 8.0.0", redirectToElement);
            }
            // Warn the consumer if the element they've pointed to
            // isn't focusable, when not in production mode.
            if (isDevMode() && !this._checker.isFocusable(redirectToElement)) {
                console.warn("Element matching '[cdkFocusInitial]' is not focusable.", redirectToElement);
            }
            redirectToElement.focus();
            return true;
        }
        return this.focusFirstTabbableElement();
    };
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @returns Whether focus was moved successfuly.
     */
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?} Whether focus was moved successfuly.
     */
    FocusTrap.prototype.focusFirstTabbableElement = /**
     * Focuses the first tabbable element within the focus trap region.
     * @return {?} Whether focus was moved successfuly.
     */
    function () {
        /** @type {?} */
        var redirectToElement = this._getRegionBoundary('start');
        if (redirectToElement) {
            redirectToElement.focus();
        }
        return !!redirectToElement;
    };
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @returns Whether focus was moved successfuly.
     */
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?} Whether focus was moved successfuly.
     */
    FocusTrap.prototype.focusLastTabbableElement = /**
     * Focuses the last tabbable element within the focus trap region.
     * @return {?} Whether focus was moved successfuly.
     */
    function () {
        /** @type {?} */
        var redirectToElement = this._getRegionBoundary('end');
        if (redirectToElement) {
            redirectToElement.focus();
        }
        return !!redirectToElement;
    };
    /**
     * Checks whether the focus trap has successfuly been attached.
     */
    /**
     * Checks whether the focus trap has successfuly been attached.
     * @return {?}
     */
    FocusTrap.prototype.hasAttached = /**
     * Checks whether the focus trap has successfuly been attached.
     * @return {?}
     */
    function () {
        return this._hasAttached;
    };
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @private
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getFirstTabbableElement = /**
     * Get the first tabbable element from a DOM subtree (inclusive).
     * @private
     * @param {?} root
     * @return {?}
     */
    function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in DOM order. Note that IE doesn't have `children` for SVG so we fall
        // back to `childNodes` which includes text nodes, comments etc.
        /** @type {?} */
        var children = root.children || root.childNodes;
        for (var i = 0; i < children.length; i++) {
            /** @type {?} */
            var tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                this._getFirstTabbableElement((/** @type {?} */ (children[i]))) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @private
     * @param {?} root
     * @return {?}
     */
    FocusTrap.prototype._getLastTabbableElement = /**
     * Get the last tabbable element from a DOM subtree (inclusive).
     * @private
     * @param {?} root
     * @return {?}
     */
    function (root) {
        if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) {
            return root;
        }
        // Iterate in reverse DOM order.
        /** @type {?} */
        var children = root.children || root.childNodes;
        for (var i = children.length - 1; i >= 0; i--) {
            /** @type {?} */
            var tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ?
                this._getLastTabbableElement((/** @type {?} */ (children[i]))) :
                null;
            if (tabbableChild) {
                return tabbableChild;
            }
        }
        return null;
    };
    /** Creates an anchor element. */
    /**
     * Creates an anchor element.
     * @private
     * @return {?}
     */
    FocusTrap.prototype._createAnchor = /**
     * Creates an anchor element.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var anchor = this._document.createElement('div');
        this._toggleAnchorTabIndex(this._enabled, anchor);
        anchor.classList.add('cdk-visually-hidden');
        anchor.classList.add('cdk-focus-trap-anchor');
        anchor.setAttribute('aria-hidden', 'true');
        return anchor;
    };
    /**
     * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
     * @param isEnabled Whether the focus trap is enabled.
     * @param anchor Anchor on which to toggle the tabindex.
     */
    /**
     * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
     * @private
     * @param {?} isEnabled Whether the focus trap is enabled.
     * @param {?} anchor Anchor on which to toggle the tabindex.
     * @return {?}
     */
    FocusTrap.prototype._toggleAnchorTabIndex = /**
     * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
     * @private
     * @param {?} isEnabled Whether the focus trap is enabled.
     * @param {?} anchor Anchor on which to toggle the tabindex.
     * @return {?}
     */
    function (isEnabled, anchor) {
        // Remove the tabindex completely, rather than setting it to -1, because if the
        // element has a tabindex, the user might still hit it when navigating with the arrow keys.
        isEnabled ? anchor.setAttribute('tabindex', '0') : anchor.removeAttribute('tabindex');
    };
    /** Executes a function when the zone is stable. */
    /**
     * Executes a function when the zone is stable.
     * @private
     * @param {?} fn
     * @return {?}
     */
    FocusTrap.prototype._executeOnStable = /**
     * Executes a function when the zone is stable.
     * @private
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        if (this._ngZone.isStable) {
            fn();
        }
        else {
            this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(fn);
        }
    };
    return FocusTrap;
}());
/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause to two to misalign.
 */
export { FocusTrap };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._startAnchor;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._endAnchor;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._hasAttached;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._startAnchorListener;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._endAnchorListener;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._enabled;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._element;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._checker;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    FocusTrap.prototype._document;
}
/**
 * Factory that allows easy instantiation of focus traps.
 */
var FocusTrapFactory = /** @class */ (function () {
    function FocusTrapFactory(_checker, _ngZone, _document) {
        this._checker = _checker;
        this._ngZone = _ngZone;
        this._document = _document;
    }
    /**
     * Creates a focus-trapped region around the given element.
     * @param element The element around which focus will be trapped.
     * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
     *     manually by the user.
     * @returns The created focus trap instance.
     */
    /**
     * Creates a focus-trapped region around the given element.
     * @param {?} element The element around which focus will be trapped.
     * @param {?=} deferCaptureElements Defers the creation of focus-capturing elements to be done
     *     manually by the user.
     * @return {?} The created focus trap instance.
     */
    FocusTrapFactory.prototype.create = /**
     * Creates a focus-trapped region around the given element.
     * @param {?} element The element around which focus will be trapped.
     * @param {?=} deferCaptureElements Defers the creation of focus-capturing elements to be done
     *     manually by the user.
     * @return {?} The created focus trap instance.
     */
    function (element, deferCaptureElements) {
        if (deferCaptureElements === void 0) { deferCaptureElements = false; }
        return new FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements);
    };
    FocusTrapFactory.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    FocusTrapFactory.ctorParameters = function () { return [
        { type: InteractivityChecker },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ FocusTrapFactory.ngInjectableDef = i0.defineInjectable({ factory: function FocusTrapFactory_Factory() { return new FocusTrapFactory(i0.inject(i1.InteractivityChecker), i0.inject(i0.NgZone), i0.inject(i2.DOCUMENT)); }, token: FocusTrapFactory, providedIn: "root" });
    return FocusTrapFactory;
}());
export { FocusTrapFactory };
if (false) {
    /**
     * @type {?}
     * @private
     */
    FocusTrapFactory.prototype._document;
    /**
     * @type {?}
     * @private
     */
    FocusTrapFactory.prototype._checker;
    /**
     * @type {?}
     * @private
     */
    FocusTrapFactory.prototype._ngZone;
}
/**
 * Directive for trapping focus within a region.
 */
var CdkTrapFocus = /** @class */ (function () {
    function CdkTrapFocus(_elementRef, _focusTrapFactory, _document) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        /**
         * Previously focused element to restore focus to upon destroy when using autoCapture.
         */
        this._previouslyFocusedElement = null;
        this._document = _document;
        this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, true);
    }
    Object.defineProperty(CdkTrapFocus.prototype, "enabled", {
        /** Whether the focus trap is active. */
        get: /**
         * Whether the focus trap is active.
         * @return {?}
         */
        function () { return this.focusTrap.enabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.focusTrap.enabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTrapFocus.prototype, "autoCapture", {
        /**
         * Whether the directive should automatially move focus into the trapped region upon
         * initialization and return focus to the previous activeElement upon destruction.
         */
        get: /**
         * Whether the directive should automatially move focus into the trapped region upon
         * initialization and return focus to the previous activeElement upon destruction.
         * @return {?}
         */
        function () { return this._autoCapture; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._autoCapture = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkTrapFocus.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.focusTrap.destroy();
        // If we stored a previously focused element when using autoCapture, return focus to that
        // element now that the trapped region is being destroyed.
        if (this._previouslyFocusedElement) {
            this._previouslyFocusedElement.focus();
            this._previouslyFocusedElement = null;
        }
    };
    /**
     * @return {?}
     */
    CdkTrapFocus.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.focusTrap.attachAnchors();
        if (this.autoCapture) {
            this._previouslyFocusedElement = (/** @type {?} */ (this._document.activeElement));
            this.focusTrap.focusInitialElementWhenReady();
        }
    };
    /**
     * @return {?}
     */
    CdkTrapFocus.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (!this.focusTrap.hasAttached()) {
            this.focusTrap.attachAnchors();
        }
    };
    CdkTrapFocus.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTrapFocus]',
                    exportAs: 'cdkTrapFocus',
                },] },
    ];
    /** @nocollapse */
    CdkTrapFocus.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FocusTrapFactory },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    CdkTrapFocus.propDecorators = {
        enabled: [{ type: Input, args: ['cdkTrapFocus',] }],
        autoCapture: [{ type: Input, args: ['cdkTrapFocusAutoCapture',] }]
    };
    return CdkTrapFocus;
}());
export { CdkTrapFocus };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CdkTrapFocus.prototype._document;
    /**
     * Underlying FocusTrap instance.
     * @type {?}
     */
    CdkTrapFocus.prototype.focusTrap;
    /**
     * Previously focused element to restore focus to upon destroy when using autoCapture.
     * @type {?}
     * @private
     */
    CdkTrapFocus.prototype._previouslyFocusedElement;
    /**
     * @type {?}
     * @private
     */
    CdkTrapFocus.prototype._autoCapture;
    /**
     * @type {?}
     * @private
     */
    CdkTrapFocus.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    CdkTrapFocus.prototype._focusTrapFactory;
}
//# sourceMappingURL=focus-trap.js.map