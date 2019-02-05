"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var core_1 = require("@angular/core");
var portal_1 = require("@angular/cdk/portal");
var rxjs_1 = require("rxjs");
var common_1 = require("@angular/common");
var dialog_config_1 = require("./dialog-config");
var bidi_1 = require("@angular/cdk/bidi");
var overlay_1 = require("@angular/cdk/overlay");
var operators_1 = require("rxjs/operators");
var dialog_injectors_1 = require("./dialog-injectors");
/**
 * Service to open modal dialogs.
 */
var Dialog = /** @class */ (function () {
    function Dialog(overlay, injector, dialogRefConstructor, 
    // TODO(crisbeto): the `any` here can be replaced
    // with the proper type once we start using Ivy.
    scrollStrategy, _parentDialog, location) {
        var _this = this;
        this.overlay = overlay;
        this.injector = injector;
        this.dialogRefConstructor = dialogRefConstructor;
        this._parentDialog = _parentDialog;
        this._afterAllClosedBase = new rxjs_1.Subject();
        this.afterAllClosed = rxjs_1.defer(function () { return _this.openDialogs.length ?
            _this._afterAllClosed : _this._afterAllClosed.pipe(operators_1.startWith(undefined)); });
        this._afterOpened = new rxjs_1.Subject();
        this._openDialogs = [];
        // Close all of the dialogs when the user goes forwards/backwards in history or when the
        // location hash changes. Note that this usually doesn't include clicking on links (unless
        // the user is using the `HashLocationStrategy`).
        if (!_parentDialog && location) {
            location.subscribe(function () { return _this.closeAll(); });
        }
        this._scrollStrategy = scrollStrategy;
    }
    Object.defineProperty(Dialog.prototype, "_afterAllClosed", {
        /** Stream that emits when all dialogs are closed. */
        get: function () {
            return this._parentDialog ? this._parentDialog.afterAllClosed : this._afterAllClosedBase;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "afterOpened", {
        /** Stream that emits when a dialog is opened. */
        get: function () {
            return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpened;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "openDialogs", {
        /** Stream that emits when a dialog is opened. */
        get: function () {
            return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogs;
        },
        enumerable: true,
        configurable: true
    });
    /** Gets an open dialog by id. */
    Dialog.prototype.getById = function (id) {
        return this._openDialogs.find(function (ref) { return ref.id === id; });
    };
    /** Closes all open dialogs. */
    Dialog.prototype.closeAll = function () {
        this.openDialogs.forEach(function (ref) { return ref.close(); });
    };
    /** Opens a dialog from a component. */
    Dialog.prototype.openFromComponent = function (component, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        var overlayRef = this._createOverlay(config);
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        var dialogRef = this._attachDialogContentForComponent(component, dialogContainer, overlayRef, config);
        this.registerDialogRef(dialogRef);
        return dialogRef;
    };
    /** Opens a dialog from a template. */
    Dialog.prototype.openFromTemplate = function (template, config) {
        config = this._applyConfigDefaults(config);
        if (config.id && this.getById(config.id)) {
            throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
        }
        var overlayRef = this._createOverlay(config);
        var dialogContainer = this._attachDialogContainer(overlayRef, config);
        var dialogRef = this._attachDialogContentForTemplate(template, dialogContainer, overlayRef, config);
        this.registerDialogRef(dialogRef);
        return dialogRef;
    };
    Dialog.prototype.ngOnDestroy = function () {
        // Only close all the dialogs at this level.
        this._openDialogs.forEach(function (ref) { return ref.close(); });
    };
    /**
     * Forwards emitting events for when dialogs are opened and all dialogs are closed.
     */
    Dialog.prototype.registerDialogRef = function (dialogRef) {
        var _this = this;
        this.openDialogs.push(dialogRef);
        var dialogOpenSub = dialogRef.afterOpened().subscribe(function () {
            _this.afterOpened.next(dialogRef);
            dialogOpenSub.unsubscribe();
        });
        var dialogCloseSub = dialogRef.afterClosed().subscribe(function () {
            var dialogIndex = _this._openDialogs.indexOf(dialogRef);
            if (dialogIndex > -1) {
                _this._openDialogs.splice(dialogIndex, 1);
            }
            if (!_this._openDialogs.length) {
                _this._afterAllClosedBase.next();
                dialogCloseSub.unsubscribe();
            }
        });
    };
    /**
     * Creates an overlay config from a dialog config.
     * @param config The dialog configuration.
     * @returns The overlay configuration.
     */
    Dialog.prototype._createOverlay = function (config) {
        var overlayConfig = new overlay_1.OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: this._scrollStrategy(),
            panelClass: config.panelClass,
            hasBackdrop: config.hasBackdrop,
            direction: config.direction,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight
        });
        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }
        return this.overlay.create(overlayConfig);
    };
    /**
     * Attaches an MatDialogContainer to a dialog's already-created overlay.
     * @param overlay Reference to the dialog's underlying overlay.
     * @param config The dialog configuration.
     * @returns A promise resolving to a ComponentRef for the attached container.
     */
    Dialog.prototype._attachDialogContainer = function (overlay, config) {
        var container = config.containerComponent || this.injector.get(dialog_injectors_1.DIALOG_CONTAINER);
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injector = new portal_1.PortalInjector(userInjector || this.injector, new WeakMap([
            [dialog_config_1.DialogConfig, config]
        ]));
        var containerPortal = new portal_1.ComponentPortal(container, config.viewContainerRef, injector);
        var containerRef = overlay.attach(containerPortal);
        containerRef.instance._config = config;
        return containerRef.instance;
    };
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    Dialog.prototype._attachDialogContentForComponent = function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        var dialogRef = new this.dialogRefConstructor(overlayRef, dialogContainer, config.id);
        var injector = this._createInjector(config, dialogRef, dialogContainer);
        var contentRef = dialogContainer.attachComponentPortal(new portal_1.ComponentPortal(componentOrTemplateRef, undefined, injector));
        dialogRef.componentInstance = contentRef.instance;
        dialogRef.disableClose = config.disableClose;
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * Attaches the user-provided component to the already-created MatDialogContainer.
     * @param componentOrTemplateRef The type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param dialogContainer Reference to the wrapping MatDialogContainer.
     * @param overlayRef Reference to the overlay in which the dialog resides.
     * @param config The dialog configuration.
     * @returns A promise resolving to the MatDialogRef that should be returned to the user.
     */
    Dialog.prototype._attachDialogContentForTemplate = function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        var dialogRef = new this.dialogRefConstructor(overlayRef, dialogContainer, config.id);
        dialogContainer.attachTemplatePortal(new portal_1.TemplatePortal(componentOrTemplateRef, null, { $implicit: config.data, dialogRef: dialogRef }));
        dialogRef.updateSize({ width: config.width, height: config.height })
            .updatePosition(config.position);
        return dialogRef;
    };
    /**
     * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
     * of a dialog to close itself and, optionally, to return a value.
     * @param config Config object that is used to construct the dialog.
     * @param dialogRef Reference to the dialog.
     * @param container Dialog container element that wraps all of the contents.
     * @returns The custom injector that can be used inside the dialog.
     */
    Dialog.prototype._createInjector = function (config, dialogRef, dialogContainer) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injectionTokens = new WeakMap([
            [this.injector.get(dialog_injectors_1.DIALOG_REF), dialogRef],
            [this.injector.get(dialog_injectors_1.DIALOG_CONTAINER), dialogContainer],
            [dialog_injectors_1.DIALOG_DATA, config.data]
        ]);
        if (config.direction &&
            (!userInjector || !userInjector.get(bidi_1.Directionality, null))) {
            injectionTokens.set(bidi_1.Directionality, {
                value: config.direction,
                change: rxjs_1.of()
            });
        }
        return new portal_1.PortalInjector(userInjector || this.injector, injectionTokens);
    };
    /**
     * Expands the provided configuration object to include the default values for properties which
     * are undefined.
     */
    Dialog.prototype._applyConfigDefaults = function (config) {
        var dialogConfig = this.injector.get(dialog_injectors_1.DIALOG_CONFIG);
        return __assign({}, new dialogConfig(), config);
    };
    Dialog = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(dialog_injectors_1.DIALOG_REF)),
        __param(3, core_1.Inject(dialog_injectors_1.DIALOG_SCROLL_STRATEGY)),
        __param(4, core_1.Optional()), __param(4, core_1.SkipSelf()),
        __param(5, core_1.Optional()),
        __metadata("design:paramtypes", [overlay_1.Overlay,
            core_1.Injector,
            core_1.Type, Object, Dialog,
            common_1.Location])
    ], Dialog);
    return Dialog;
}());
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map