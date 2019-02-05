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
export class MatTabNavBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatTabNavBase.prototype._elementRef;
}
/** @type {?} */
export const _MatTabNavMixinBase = mixinDisableRipple(mixinColor(MatTabNavBase, 'primary'));
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
export class MatTabNav extends _MatTabNavMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _dir
     * @param {?} _ngZone
     * @param {?} _changeDetectorRef
     * @param {?} _viewportRuler
     */
    constructor(elementRef, _dir, _ngZone, _changeDetectorRef, _viewportRuler) {
        super(elementRef);
        this._dir = _dir;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._onDestroy = new Subject();
    }
    /**
     * Background color of the tab nav.
     * @return {?}
     */
    get backgroundColor() { return this._backgroundColor; }
    /**
     * @param {?} value
     * @return {?}
     */
    set backgroundColor(value) {
        /** @type {?} */
        const nativeElement = this._elementRef.nativeElement;
        nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);
        if (value) {
            nativeElement.classList.add(`mat-background-${value}`);
        }
        this._backgroundColor = value;
    }
    /**
     * Notifies the component that the active link has been changed.
     * \@breaking-change 8.0.0 `element` parameter to be removed.
     * @param {?} element
     * @return {?}
     */
    updateActiveLink(element) {
        // Note: keeping the `element` for backwards-compat, but isn't being used for anything.
        // @breaking-change 8.0.0
        this._activeLinkChanged = !!element;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._ngZone.runOutsideAngular(() => {
            /** @type {?} */
            const dirChange = this._dir ? this._dir.change : observableOf(null);
            return merge(dirChange, this._viewportRuler.change(10))
                .pipe(takeUntil(this._onDestroy))
                .subscribe(() => this._alignInkBar());
        });
    }
    /**
     * Checks if the active link has been changed and, if so, will update the ink bar.
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this._activeLinkChanged) {
            /** @type {?} */
            const activeTab = this._tabLinks.find(tab => tab.active);
            this._activeLinkElement = activeTab ? activeTab._elementRef : null;
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Aligns the ink bar to the active link.
     * @return {?}
     */
    _alignInkBar() {
        if (this._activeLinkElement) {
            this._inkBar.show();
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
        }
        else {
            this._inkBar.hide();
        }
    }
}
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
MatTabNav.ctorParameters = () => [
    { type: ElementRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ViewportRuler }
];
MatTabNav.propDecorators = {
    _inkBar: [{ type: ViewChild, args: [MatInkBar,] }],
    _tabLinks: [{ type: ContentChildren, args: [forwardRef(() => MatTabLink), { descendants: true },] }],
    backgroundColor: [{ type: Input }]
};
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
export class MatTabLinkBase {
}
/** @type {?} */
export const _MatTabLinkMixinBase = mixinTabIndex(mixinDisableRipple(mixinDisabled(MatTabLinkBase)));
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
export class MatTabLink extends _MatTabLinkMixinBase {
    /**
     * @param {?} _tabNavBar
     * @param {?} _elementRef
     * @param {?} ngZone
     * @param {?} platform
     * @param {?} globalRippleOptions
     * @param {?} tabIndex
     * @param {?=} _focusMonitor
     */
    constructor(_tabNavBar, _elementRef, ngZone, platform, globalRippleOptions, tabIndex, _focusMonitor) {
        super();
        this._tabNavBar = _tabNavBar;
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        /**
         * Whether the tab link is active or not.
         */
        this._isActive = false;
        this._tabLinkRipple = new RippleRenderer(this, ngZone, _elementRef, platform);
        this._tabLinkRipple.setupTriggerEvents(_elementRef.nativeElement);
        this.rippleConfig = globalRippleOptions || {};
        this.tabIndex = parseInt(tabIndex) || 0;
        if (_focusMonitor) {
            _focusMonitor.monitor(_elementRef);
        }
    }
    /**
     * Whether the link is active.
     * @return {?}
     */
    get active() { return this._isActive; }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value !== this._isActive) {
            this._isActive = value;
            this._tabNavBar.updateActiveLink(this._elementRef);
        }
    }
    /**
     * Whether ripples are disabled on interaction.
     * \@docs-private
     * @return {?}
     */
    get rippleDisabled() {
        return this.disabled || this.disableRipple || this._tabNavBar.disableRipple ||
            !!this.rippleConfig.disabled;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tabLinkRipple._removeTriggerEvents();
        if (this._focusMonitor) {
            this._focusMonitor.stopMonitoring(this._elementRef);
        }
    }
}
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
MatTabLink.ctorParameters = () => [
    { type: MatTabNav },
    { type: ElementRef },
    { type: NgZone },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: FocusMonitor }
];
MatTabLink.propDecorators = {
    active: [{ type: Input }]
};
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