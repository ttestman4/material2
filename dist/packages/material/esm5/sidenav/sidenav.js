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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, forwardRef, Inject, Input, ViewEncapsulation, QueryList, ElementRef, NgZone, } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from './drawer';
import { matDrawerAnimations } from './drawer-animations';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
var MatSidenavContent = /** @class */ (function (_super) {
    tslib_1.__extends(MatSidenavContent, _super);
    function MatSidenavContent(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
        return _super.call(this, changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) || this;
    }
    MatSidenavContent.decorators = [
        { type: Component, args: [{selector: 'mat-sidenav-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content mat-sidenav-content',
                        '[style.margin-left.px]': '_container._contentMargins.left',
                        '[style.margin-right.px]': '_container._contentMargins.right',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    MatSidenavContent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: MatSidenavContainer, decorators: [{ type: Inject, args: [forwardRef(function () { return MatSidenavContainer; }),] }] },
        { type: ElementRef },
        { type: ScrollDispatcher },
        { type: NgZone }
    ]; };
    return MatSidenavContent;
}(MatDrawerContent));
export { MatSidenavContent };
var MatSidenav = /** @class */ (function (_super) {
    tslib_1.__extends(MatSidenav, _super);
    function MatSidenav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fixedInViewport = false;
        _this._fixedTopGap = 0;
        _this._fixedBottomGap = 0;
        return _this;
    }
    Object.defineProperty(MatSidenav.prototype, "fixedInViewport", {
        /** Whether the sidenav is fixed in the viewport. */
        get: /**
         * Whether the sidenav is fixed in the viewport.
         * @return {?}
         */
        function () { return this._fixedInViewport; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._fixedInViewport = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSidenav.prototype, "fixedTopGap", {
        /**
         * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
         * mode.
         */
        get: /**
         * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
         * mode.
         * @return {?}
         */
        function () { return this._fixedTopGap; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._fixedTopGap = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatSidenav.prototype, "fixedBottomGap", {
        /**
         * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
         * fixed mode.
         */
        get: /**
         * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
         * fixed mode.
         * @return {?}
         */
        function () { return this._fixedBottomGap; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._fixedBottomGap = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    MatSidenav.decorators = [
        { type: Component, args: [{selector: 'mat-sidenav',
                    exportAs: 'matSidenav',
                    template: "<div class=\"mat-drawer-inner-container\"><ng-content></ng-content></div>",
                    animations: [matDrawerAnimations.transformDrawer],
                    host: {
                        'class': 'mat-drawer mat-sidenav',
                        'tabIndex': '-1',
                        '[@transform]': '_animationState',
                        '(@transform.start)': '_animationStarted.next($event)',
                        '(@transform.done)': '_animationEnd.next($event)',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.mat-drawer-end]': 'position === "end"',
                        '[class.mat-drawer-over]': 'mode === "over"',
                        '[class.mat-drawer-push]': 'mode === "push"',
                        '[class.mat-drawer-side]': 'mode === "side"',
                        '[class.mat-sidenav-fixed]': 'fixedInViewport',
                        '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
                        '[style.bottom.px]': 'fixedInViewport ? fixedBottomGap : null',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    MatSidenav.propDecorators = {
        fixedInViewport: [{ type: Input }],
        fixedTopGap: [{ type: Input }],
        fixedBottomGap: [{ type: Input }]
    };
    return MatSidenav;
}(MatDrawer));
export { MatSidenav };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatSidenav.prototype._fixedInViewport;
    /**
     * @type {?}
     * @private
     */
    MatSidenav.prototype._fixedTopGap;
    /**
     * @type {?}
     * @private
     */
    MatSidenav.prototype._fixedBottomGap;
}
var MatSidenavContainer = /** @class */ (function (_super) {
    tslib_1.__extends(MatSidenavContainer, _super);
    function MatSidenavContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatSidenavContainer.decorators = [
        { type: Component, args: [{selector: 'mat-sidenav-container',
                    exportAs: 'matSidenavContainer',
                    template: "<div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\" *ngIf=\"hasBackdrop\" [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div><ng-content select=\"mat-sidenav\"></ng-content><ng-content select=\"mat-sidenav-content\"></ng-content><mat-sidenav-content *ngIf=\"!_content\" cdkScrollable><ng-content></ng-content></mat-sidenav-content>",
                    styles: [".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}@media (-ms-high-contrast:active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media (-ms-high-contrast:active){.mat-drawer.mat-drawer-end,[dir=rtl] .mat-drawer{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}"],
                    host: {
                        'class': 'mat-drawer-container mat-sidenav-container',
                        '[class.mat-drawer-container-explicit-backdrop]': '_backdropOverride',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    MatSidenavContainer.propDecorators = {
        _drawers: [{ type: ContentChildren, args: [MatSidenav,] }],
        _content: [{ type: ContentChild, args: [MatSidenavContent,] }]
    };
    return MatSidenavContainer;
}(MatDrawerContainer));
export { MatSidenavContainer };
if (false) {
    /** @type {?} */
    MatSidenavContainer.prototype._drawers;
    /** @type {?} */
    MatSidenavContainer.prototype._content;
}
//# sourceMappingURL=sidenav.js.map