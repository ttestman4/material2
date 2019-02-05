"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var a11y_1 = require("@angular/cdk/a11y");
var portal_1 = require("@angular/cdk/portal");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var dialog_config_1 = require("./dialog-config");
function throwDialogContentAlreadyAttachedError() {
    throw Error('Attempting to attach dialog content after content is already attached');
}
exports.throwDialogContentAlreadyAttachedError = throwDialogContentAlreadyAttachedError;
/**
 * Internal component that wraps user-provided dialog content.
 * @docs-private
 */
var CdkDialogContainer = /** @class */ (function (_super) {
    __extends(CdkDialogContainer, _super);
    function CdkDialogContainer(_elementRef, _focusTrapFactory, _changeDetectorRef, _document, 
    /** The dialog configuration. */
    _config) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._document = _document;
        _this._config = _config;
        /** State of the dialog animation. */
        _this._state = 'enter';
        /** Element that was focused before the dialog was opened. Save this to restore upon close. */
        _this._elementFocusedBeforeDialogWasOpened = null;
        /** The class that traps and manages focus within the dialog. */
        _this._focusTrap = _this._focusTrapFactory.create(_this._elementRef.nativeElement, false);
        /** A subject emitting before the dialog enters the view. */
        _this._beforeEnter = new rxjs_1.Subject();
        /** A subject emitting after the dialog enters the view. */
        _this._afterEnter = new rxjs_1.Subject();
        /** A subject emitting before the dialog exits the view. */
        _this._beforeExit = new rxjs_1.Subject();
        /** A subject emitting after the dialog exits the view. */
        _this._afterExit = new rxjs_1.Subject();
        /** Stream of animation `done` events. */
        _this._animationDone = new rxjs_1.Subject();
        // We use a Subject with a distinctUntilChanged, rather than a callback attached to .done,
        // because some browsers fire the done event twice and we don't want to emit duplicate events.
        // See: https://github.com/angular/angular/issues/24084
        _this._animationDone.pipe(operators_1.distinctUntilChanged(function (x, y) {
            return x.fromState === y.fromState && x.toState === y.toState;
        })).subscribe(function (event) {
            // Emit lifecycle events based on animation `done` callback.
            if (event.toState === 'enter') {
                _this._autoFocusFirstTabbableElement();
                _this._afterEnter.next();
                _this._afterEnter.complete();
            }
            if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
                _this._returnFocusAfterDialog();
                _this._afterExit.next();
                _this._afterExit.complete();
            }
        });
        return _this;
    }
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaLabel", {
        // @HostBinding is used in the class as it is expected to be extended.  Since @Component decorator
        // metadata is not inherited by child classes, instead the host binding data is defined in a way
        // that can be inherited.
        // tslint:disable:no-host-decorator-in-concrete
        get: function () { return this._config.ariaLabel || null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_ariaDescribedBy", {
        get: function () { return this._config.ariaDescribedBy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_role", {
        get: function () { return this._config.role; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkDialogContainer.prototype, "_tabindex", {
        get: function () { return -1; },
        enumerable: true,
        configurable: true
    });
    /** Destroy focus trap to place focus back to the element focused before the dialog opened. */
    CdkDialogContainer.prototype.ngOnDestroy = function () {
        this._focusTrap.destroy();
        this._animationDone.complete();
    };
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    CdkDialogContainer.prototype.attachComponentPortal = function (portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachComponentPortal(portal);
    };
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    CdkDialogContainer.prototype.attachTemplatePortal = function (portal) {
        if (this._portalHost.hasAttached()) {
            throwDialogContentAlreadyAttachedError();
        }
        this._savePreviouslyFocusedElement();
        return this._portalHost.attachTemplatePortal(portal);
    };
    /** Emit lifecycle events based on animation `start` callback. */
    CdkDialogContainer.prototype._onAnimationStart = function (event) {
        if (event.toState === 'enter') {
            this._beforeEnter.next();
            this._beforeEnter.complete();
        }
        if (event.fromState === 'enter' && (event.toState === 'void' || event.toState === 'exit')) {
            this._beforeExit.next();
            this._beforeExit.complete();
        }
    };
    /** Starts the dialog exit animation. */
    CdkDialogContainer.prototype._startExiting = function () {
        this._state = 'exit';
        // Mark the container for check so it can react if the
        // view container is using OnPush change detection.
        this._changeDetectorRef.markForCheck();
    };
    /** Saves a reference to the element that was focused before the dialog was opened. */
    CdkDialogContainer.prototype._savePreviouslyFocusedElement = function () {
        var _this = this;
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = this._document.activeElement;
            // Move focus onto the dialog immediately in order to prevent the user from accidentally
            // opening multiple dialogs at the same time. Needs to be async, because the element
            // may not be focusable immediately.
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     */
    CdkDialogContainer.prototype._autoFocusFirstTabbableElement = function () {
        var _this = this;
        // If were to attempt to focus immediately, then the content of the dialog would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        if (this._config.autoFocus) {
            this._focusTrap.focusInitialElementWhenReady().then(function (hasMovedFocus) {
                // If we didn't find any focusable elements inside the dialog, focus the
                // container so the user can't tab into other elements behind it.
                if (!hasMovedFocus) {
                    _this._elementRef.nativeElement.focus();
                }
            });
        }
    };
    /** Returns the focus to the element focused before the dialog was open. */
    CdkDialogContainer.prototype._returnFocusAfterDialog = function () {
        var toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
    };
    __decorate([
        core_1.HostBinding('attr.aria-label'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], CdkDialogContainer.prototype, "_ariaLabel", null);
    __decorate([
        core_1.HostBinding('attr.aria-describedby'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], CdkDialogContainer.prototype, "_ariaDescribedBy", null);
    __decorate([
        core_1.HostBinding('attr.role'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], CdkDialogContainer.prototype, "_role", null);
    __decorate([
        core_1.HostBinding('attr.tabindex'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], CdkDialogContainer.prototype, "_tabindex", null);
    __decorate([
        core_1.ViewChild(portal_1.PortalHostDirective),
        __metadata("design:type", portal_1.PortalHostDirective)
    ], CdkDialogContainer.prototype, "_portalHost", void 0);
    CdkDialogContainer = __decorate([
        core_1.Component({selector: 'cdk-dialog-container',
            template: "<ng-template cdkPortalOutlet></ng-template>",
            styles: ["cdk-dialog-container{background:#fff;border-radius:5px;display:block;padding:10px}"],
            encapsulation: core_1.ViewEncapsulation.None,
            // Using OnPush for dialogs caused some G3 sync issues. Disabled until we can track them down.
            // tslint:disable-next-line:validate-decorators
            changeDetection: core_1.ChangeDetectionStrategy.Default,
            animations: [
                animations_1.trigger('dialog', [
                    animations_1.state('enter', animations_1.style({ opacity: 1 })),
                    animations_1.state('exit, void', animations_1.style({ opacity: 0 })),
                    animations_1.transition('* => enter', animations_1.animate('{{enterAnimationDuration}}')),
                    animations_1.transition('* => exit, * => void', animations_1.animate('{{exitAnimationDuration}}')),
                ])
            ],
            host: {
                '[@dialog]': "{\n      value: _state,\n      params: {\n        enterAnimationDuration: _config.enterAnimationDuration,\n        exitAnimationDuration: _config.exitAnimationDuration\n      }\n    }",
                '(@dialog.start)': '_onAnimationStart($event)',
                '(@dialog.done)': '_animationDone.next($event)',
            },
        }),
        __param(3, core_1.Optional()), __param(3, core_1.Inject(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [core_1.ElementRef,
            a11y_1.FocusTrapFactory,
            core_1.ChangeDetectorRef, Object, dialog_config_1.DialogConfig])
    ], CdkDialogContainer);
    return CdkDialogContainer;
}(portal_1.BasePortalOutlet));
exports.CdkDialogContainer = CdkDialogContainer;
//# sourceMappingURL=dialog-container.js.map