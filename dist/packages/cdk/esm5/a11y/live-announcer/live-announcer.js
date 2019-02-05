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
import { ContentObserver } from '@angular/cdk/observers';
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Injectable, Input, NgZone, Optional, SkipSelf, } from '@angular/core';
import { LIVE_ANNOUNCER_ELEMENT_TOKEN } from './live-announcer-token';
import * as i0 from "@angular/core";
import * as i1 from "./live-announcer-token";
import * as i2 from "@angular/common";
var LiveAnnouncer = /** @class */ (function () {
    function LiveAnnouncer(elementToken, _ngZone, _document) {
        this._ngZone = _ngZone;
        // We inject the live element and document as `any` because the constructor signature cannot
        // reference browser globals (HTMLElement, Document) on non-browser environments, since having
        // a class decorator causes TypeScript to preserve the constructor signature types.
        this._document = _document;
        this._liveElement = elementToken || this._createLiveElement();
    }
    /**
     * @param {?} message
     * @param {...?} args
     * @return {?}
     */
    LiveAnnouncer.prototype.announce = /**
     * @param {?} message
     * @param {...?} args
     * @return {?}
     */
    function (message) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var politeness;
        /** @type {?} */
        var duration;
        if (args.length === 1 && typeof args[0] === 'number') {
            duration = args[0];
        }
        else {
            politeness = args[0], duration = args[1];
        }
        this.clear();
        clearTimeout(this._previousTimeout);
        // TODO: ensure changing the politeness works on all environments we support.
        this._liveElement.setAttribute('aria-live', (/** @type {?} */ (politeness)) || 'polite');
        // This 100ms timeout is necessary for some browser + screen-reader combinations:
        // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
        // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
        //   second time without clearing and then using a non-zero delay.
        // (using JAWS 17 at time of this writing).
        return this._ngZone.runOutsideAngular(function () {
            return new Promise(function (resolve) {
                clearTimeout(_this._previousTimeout);
                _this._previousTimeout = setTimeout(function () {
                    _this._liveElement.textContent = message;
                    resolve();
                    if (typeof duration === 'number') {
                        _this._previousTimeout = setTimeout(function () { return _this.clear(); }, duration);
                    }
                }, 100);
            });
        });
    };
    /**
     * Clears the current text from the announcer element. Can be used to prevent
     * screen readers from reading the text out again while the user is going
     * through the page landmarks.
     */
    /**
     * Clears the current text from the announcer element. Can be used to prevent
     * screen readers from reading the text out again while the user is going
     * through the page landmarks.
     * @return {?}
     */
    LiveAnnouncer.prototype.clear = /**
     * Clears the current text from the announcer element. Can be used to prevent
     * screen readers from reading the text out again while the user is going
     * through the page landmarks.
     * @return {?}
     */
    function () {
        if (this._liveElement) {
            this._liveElement.textContent = '';
        }
    };
    /**
     * @return {?}
     */
    LiveAnnouncer.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        clearTimeout(this._previousTimeout);
        if (this._liveElement && this._liveElement.parentNode) {
            this._liveElement.parentNode.removeChild(this._liveElement);
            this._liveElement = (/** @type {?} */ (null));
        }
    };
    /**
     * @private
     * @return {?}
     */
    LiveAnnouncer.prototype._createLiveElement = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elementClass = 'cdk-live-announcer-element';
        /** @type {?} */
        var previousElements = this._document.getElementsByClassName(elementClass);
        /** @type {?} */
        var liveEl = this._document.createElement('div');
        // Remove any old containers. This can happen when coming in from a server-side-rendered page.
        for (var i = 0; i < previousElements.length; i++) {
            (/** @type {?} */ (previousElements[i].parentNode)).removeChild(previousElements[i]);
        }
        liveEl.classList.add(elementClass);
        liveEl.classList.add('cdk-visually-hidden');
        liveEl.setAttribute('aria-atomic', 'true');
        liveEl.setAttribute('aria-live', 'polite');
        this._document.body.appendChild(liveEl);
        return liveEl;
    };
    LiveAnnouncer.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    LiveAnnouncer.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIVE_ANNOUNCER_ELEMENT_TOKEN,] }] },
        { type: NgZone },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ LiveAnnouncer.ngInjectableDef = i0.defineInjectable({ factory: function LiveAnnouncer_Factory() { return new LiveAnnouncer(i0.inject(i1.LIVE_ANNOUNCER_ELEMENT_TOKEN, 8), i0.inject(i0.NgZone), i0.inject(i2.DOCUMENT)); }, token: LiveAnnouncer, providedIn: "root" });
    return LiveAnnouncer;
}());
export { LiveAnnouncer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LiveAnnouncer.prototype._liveElement;
    /**
     * @type {?}
     * @private
     */
    LiveAnnouncer.prototype._document;
    /**
     * @type {?}
     * @private
     */
    LiveAnnouncer.prototype._previousTimeout;
    /**
     * @type {?}
     * @private
     */
    LiveAnnouncer.prototype._ngZone;
}
/**
 * A directive that works similarly to aria-live, but uses the LiveAnnouncer to ensure compatibility
 * with a wider range of browsers and screen readers.
 */
var CdkAriaLive = /** @class */ (function () {
    function CdkAriaLive(_elementRef, _liveAnnouncer, _contentObserver, _ngZone) {
        this._elementRef = _elementRef;
        this._liveAnnouncer = _liveAnnouncer;
        this._contentObserver = _contentObserver;
        this._ngZone = _ngZone;
        this._politeness = 'off';
    }
    Object.defineProperty(CdkAriaLive.prototype, "politeness", {
        /** The aria-live politeness level to use when announcing messages. */
        get: /**
         * The aria-live politeness level to use when announcing messages.
         * @return {?}
         */
        function () { return this._politeness; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._politeness = value === 'polite' || value === 'assertive' ? value : 'off';
            if (this._politeness === 'off') {
                if (this._subscription) {
                    this._subscription.unsubscribe();
                    this._subscription = null;
                }
            }
            else if (!this._subscription) {
                this._subscription = this._ngZone.runOutsideAngular(function () {
                    return _this._contentObserver
                        .observe(_this._elementRef)
                        .subscribe(function () {
                        // Note that we use textContent here, rather than innerText, in order to avoid a reflow.
                        /** @type {?} */
                        var elementText = _this._elementRef.nativeElement.textContent;
                        // The `MutationObserver` fires also for attribute
                        // changes which we don't want to announce.
                        if (elementText !== _this._previousAnnouncedText) {
                            _this._liveAnnouncer.announce(elementText, _this._politeness);
                            _this._previousAnnouncedText = elementText;
                        }
                    });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkAriaLive.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    };
    CdkAriaLive.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkAriaLive]',
                    exportAs: 'cdkAriaLive',
                },] },
    ];
    /** @nocollapse */
    CdkAriaLive.ctorParameters = function () { return [
        { type: ElementRef },
        { type: LiveAnnouncer },
        { type: ContentObserver },
        { type: NgZone }
    ]; };
    CdkAriaLive.propDecorators = {
        politeness: [{ type: Input, args: ['cdkAriaLive',] }]
    };
    return CdkAriaLive;
}());
export { CdkAriaLive };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CdkAriaLive.prototype._politeness;
    /**
     * @type {?}
     * @private
     */
    CdkAriaLive.prototype._previousAnnouncedText;
    /**
     * @type {?}
     * @private
     */
    CdkAriaLive.prototype._subscription;
    /**
     * @type {?}
     * @private
     */
    CdkAriaLive.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    CdkAriaLive.prototype._liveAnnouncer;
    /**
     * @type {?}
     * @private
     */
    CdkAriaLive.prototype._contentObserver;
    /**
     * @type {?}
     * @private
     */
    CdkAriaLive.prototype._ngZone;
}
/**
 * \@docs-private \@deprecated \@breaking-change 8.0.0
 * @param {?} parentAnnouncer
 * @param {?} liveElement
 * @param {?} _document
 * @param {?} ngZone
 * @return {?}
 */
export function LIVE_ANNOUNCER_PROVIDER_FACTORY(parentAnnouncer, liveElement, _document, ngZone) {
    return parentAnnouncer || new LiveAnnouncer(liveElement, ngZone, _document);
}
/**
 * \@docs-private \@deprecated \@breaking-change 8.0.0
 * @type {?}
 */
export var LIVE_ANNOUNCER_PROVIDER = {
    // If there is already a LiveAnnouncer available, use that. Otherwise, provide a new one.
    provide: LiveAnnouncer,
    deps: [
        [new Optional(), new SkipSelf(), LiveAnnouncer],
        [new Optional(), new Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN)],
        DOCUMENT,
        NgZone,
    ],
    useFactory: LIVE_ANNOUNCER_PROVIDER_FACTORY
};
//# sourceMappingURL=live-announcer.js.map