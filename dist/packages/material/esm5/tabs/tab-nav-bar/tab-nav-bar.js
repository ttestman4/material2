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
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, NgZone, Optional, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, mixinColor, mixinDisabled, mixinDisableRipple, mixinTabIndex, RippleRenderer, } from '@angular/material/core';
import { merge, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatInkBar } from '../ink-bar';
import { FocusMonitor } from '@angular/cdk/a11y';
// Boilerplate for applying mixins to MatTabNav.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to MatTabNav.
/**
 * \@docs-private
 */
MatTabNavBase = /** @class */ (function () {
    function MatTabNavBase(_elementRef) {
        this._elementRef = _elementRef;
    }
    return MatTabNavBase;
}());
// Boilerplate for applying mixins to MatTabNav.
/**
 * \@docs-private
 */
export { MatTabNavBase };
if (false) {
    /** @type {?} */
    MatTabNavBase.prototype._elementRef;
}
/** @type {?} */
export var _MatTabNavMixinBase = mixinDisableRipple(mixinColor(MatTabNavBase, 'primary'));
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
var MatTabNav = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabNav, _super);
    function MatTabNav(elementRef, _dir, _ngZone, _changeDetectorRef, _viewportRuler) {
        var _this = _super.call(this, elementRef) || this;
        _this._dir = _dir;
        _this._ngZone = _ngZone;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._viewportRuler = _viewportRuler;
        /**
         * Subject that emits when the component has been destroyed.
         */
        _this._onDestroy = new Subject();
        return _this;
    }
    Object.defineProperty(MatTabNav.prototype, "backgroundColor", {
        /** Background color of the tab nav. */
        get: /**
         * Background color of the tab nav.
         * @return {?}
         */
        function () { return this._backgroundColor; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var nativeElement = this._elementRef.nativeElement;
            nativeElement.classList.remove("mat-background-" + this.backgroundColor);
            if (value) {
                nativeElement.classList.add("mat-background-" + value);
            }
            this._backgroundColor = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Notifies the component that the active link has been changed.
     * @breaking-change 8.0.0 `element` parameter to be removed.
     */
    /**
     * Notifies the component that the active link has been changed.
     * \@breaking-change 8.0.0 `element` parameter to be removed.
     * @param {?} element
     * @return {?}
     */
    MatTabNav.prototype.updateActiveLink = /**
     * Notifies the component that the active link has been changed.
     * \@breaking-change 8.0.0 `element` parameter to be removed.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        // Note: keeping the `element` for backwards-compat, but isn't being used for anything.
        // @breaking-change 8.0.0
        this._activeLinkChanged = !!element;
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @return {?}
     */
    MatTabNav.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            /** @type {?} */
            var dirChange = _this._dir ? _this._dir.change : observableOf(null);
            return merge(dirChange, _this._viewportRuler.change(10))
                .pipe(takeUntil(_this._onDestroy))
                .subscribe(function () { return _this._alignInkBar(); });
        });
    };
    /** Checks if the active link has been changed and, if so, will update the ink bar. */
    /**
     * Checks if the active link has been changed and, if so, will update the ink bar.
     * @return {?}
     */
    MatTabNav.prototype.ngAfterContentChecked = /**
     * Checks if the active link has been changed and, if so, will update the ink bar.
     * @return {?}
     */
    function () {
        if (this._activeLinkChanged) {
            /** @type {?} */
            var activeTab = this._tabLinks.find(function (tab) { return tab.active; });
            this._activeLinkElement = activeTab ? activeTab._elementRef : null;
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    };
    /**
     * @return {?}
     */
    MatTabNav.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Aligns the ink bar to the active link. */
    /**
     * Aligns the ink bar to the active link.
     * @return {?}
     */
    MatTabNav.prototype._alignInkBar = /**
     * Aligns the ink bar to the active link.
     * @return {?}
     */
    function () {
        if (this._activeLinkElement) {
            this._inkBar.show();
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
        }
        else {
            this._inkBar.hide();
        }
    };
    MatTabNav.decorators = [
        { type: Component, args: [{selector: '[mat-tab-nav-bar]',
                    exportAs: 'matTabNavBar, matTabNav',
                    inputs: ['color', 'disableRipple'],
                    template: "<div class=\"mat-tab-links\" (cdkObserveContent)=\"_alignInkBar()\"><ng-content></ng-content><mat-ink-bar></mat-ink-bar></div>",
                    styles: [".mat-tab-nav-bar{overflow:hidden;position:relative;flex-shrink:0}.mat-tab-links{position:relative;display:flex}[mat-align-tabs=center] .mat-tab-links{justify-content:center}[mat-align-tabs=end] .mat-tab-links{justify-content:flex-end}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent}.mat-tab-link:focus{outline:0}.mat-tab-link:focus:not(.mat-tab-disabled){opacity:1}@media (-ms-high-contrast:active){.mat-tab-link:focus{outline:dotted 2px}}.mat-tab-link.mat-tab-disabled{cursor:default}@media (-ms-high-contrast:active){.mat-tab-link.mat-tab-disabled{opacity:.5}}.mat-tab-link .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media (-ms-high-contrast:active){.mat-tab-link{opacity:1}}[mat-stretch-tabs] .mat-tab-link{flex-basis:0;flex-grow:1}.mat-tab-link.mat-tab-disabled{pointer-events:none}@media (max-width:599px){.mat-tab-link{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}"],
                    host: { 'class': 'mat-tab-nav-bar' },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatTabNav.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: ViewportRuler }
    ]; };
    MatTabNav.propDecorators = {
        _inkBar: [{ type: ViewChild, args: [MatInkBar,] }],
        _tabLinks: [{ type: ContentChildren, args: [forwardRef(function () { return MatTabLink; }), { descendants: true },] }],
        backgroundColor: [{ type: Input }]
    };
    return MatTabNav;
}(_MatTabNavMixinBase));
export { MatTabNav };
if (false) {
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @private
     */
    MatTabNav.prototype._onDestroy;
    /**
     * @type {?}
     * @private
     */
    MatTabNav.prototype._activeLinkChanged;
    /**
     * @type {?}
     * @private
     */
    MatTabNav.prototype._activeLinkElement;
    /** @type {?} */
    MatTabNav.prototype._inkBar;
    /**
     * Query list of all tab links of the tab navigation.
     * @type {?}
     */
    MatTabNav.prototype._tabLinks;
    /**
     * @type {?}
     * @private
     */
    MatTabNav.prototype._backgroundColor;
    /**
     * @type {?}
     * @private
     */
    MatTabNav.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    MatTabNav.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatTabNav.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatTabNav.prototype._viewportRuler;
}
// Boilerplate for applying mixins to MatTabLink.
var 
// Boilerplate for applying mixins to MatTabLink.
MatTabLinkBase = /** @class */ (function () {
    function MatTabLinkBase() {
    }
    return MatTabLinkBase;
}());
// Boilerplate for applying mixins to MatTabLink.
export { MatTabLinkBase };
/** @type {?} */
export var _MatTabLinkMixinBase = mixinTabIndex(mixinDisableRipple(mixinDisabled(MatTabLinkBase)));
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
var MatTabLink = /** @class */ (function (_super) {
    tslib_1.__extends(MatTabLink, _super);
    function MatTabLink(_tabNavBar, _elementRef, ngZone, platform, globalRippleOptions, tabIndex, _focusMonitor) {
        var _this = _super.call(this) || this;
        _this._tabNavBar = _tabNavBar;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        _this._isActive = false;
        _this._tabLinkRipple = new RippleRenderer(_this, ngZone, _elementRef, platform);
        _this._tabLinkRipple.setupTriggerEvents(_elementRef.nativeElement);
        _this.rippleConfig = globalRippleOptions || {};
        _this.tabIndex = parseInt(tabIndex) || 0;
        if (_focusMonitor) {
            _focusMonitor.monitor(_elementRef);
        }
        return _this;
    }
    Object.defineProperty(MatTabLink.prototype, "active", {
        /** Whether the link is active. */
        get: /**
         * Whether the link is active.
         * @return {?}
         */
        function () { return this._isActive; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._isActive) {
                this._isActive = value;
                this._tabNavBar.updateActiveLink(this._elementRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatTabLink.prototype, "rippleDisabled", {
        /**
         * Whether ripples are disabled on interaction.
         * @docs-private
         */
        get: /**
         * Whether ripples are disabled on interaction.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this.disabled || this.disableRipple || this._tabNavBar.disableRipple ||
                !!this.rippleConfig.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatTabLink.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._tabLinkRipple._removeTriggerEvents();
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef);
        }
    };
    MatTabLink.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-tab-link], [matTabLink]',
                    exportAs: 'matTabLink',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    host: {
                        'class': 'mat-tab-link',
                        '[attr.aria-current]': 'active',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.tabIndex]': 'tabIndex',
                        '[class.mat-tab-disabled]': 'disabled',
                        '[class.mat-tab-label-active]': 'active',
                    }
                },] },
    ];
    /** @nocollapse */
    MatTabLink.ctorParameters = function () { return [
        { type: MatTabNav },
        { type: ElementRef },
        { type: NgZone },
        { type: Platform },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
        { type: FocusMonitor }
    ]; };
    MatTabLink.propDecorators = {
        active: [{ type: Input }]
    };
    return MatTabLink;
}(_MatTabLinkMixinBase));
export { MatTabLink };
if (false) {
    /**
     * Whether the tab link is active or not.
     * @type {?}
     * @protected
     */
    MatTabLink.prototype._isActive;
    /**
     * Reference to the RippleRenderer for the tab-link.
     * @type {?}
     * @protected
     */
    MatTabLink.prototype._tabLinkRipple;
    /**
     * Ripple configuration for ripples that are launched on pointer down. The ripple config
     * is set to the global ripple options since we don't have any configurable options for
     * the tab link ripples.
     * \@docs-private
     * @type {?}
     */
    MatTabLink.prototype.rippleConfig;
    /**
     * @type {?}
     * @private
     */
    MatTabLink.prototype._tabNavBar;
    /** @type {?} */
    MatTabLink.prototype._elementRef;
    /**
     * @deprecated
     * \@breaking-change 8.0.0 `_focusMonitor` parameter to be made required.
     * @type {?}
     * @private
     */
    MatTabLink.prototype._focusMonitor;
}
//# sourceMappingURL=tab-nav-bar.js.map