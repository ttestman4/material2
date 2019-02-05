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
import { Subject } from 'rxjs';
/**
 * Event that is emitted when a snack bar is dismissed.
 * @record
 */
export function MatSnackBarDismiss() { }
if (false) {
    /**
     * Whether the snack bar was dismissed using the action button.
     * @type {?}
     */
    MatSnackBarDismiss.prototype.dismissedByAction;
}
/**
 * Reference to a snack bar dispatched from the snack bar service.
 * @template T
 */
export class MatSnackBarRef {
    /**
     * @param {?} containerInstance
     * @param {?} _overlayRef
     */
    constructor(containerInstance, _overlayRef) {
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the snack bar has been dismissed.
         */
        this._afterDismissed = new Subject();
        /**
         * Subject for notifying the user that the snack bar has opened and appeared.
         */
        this._afterOpened = new Subject();
        /**
         * Subject for notifying the user that the snack bar action was called.
         */
        this._onAction = new Subject();
        /**
         * Whether the snack bar was dismissed using the action button.
         */
        this._dismissedByAction = false;
        this.containerInstance = containerInstance;
        // Dismiss snackbar on action.
        this.onAction().subscribe(() => this.dismiss());
        containerInstance._onExit.subscribe(() => this._finishDismiss());
    }
    /**
     * Dismisses the snack bar.
     * @return {?}
     */
    dismiss() {
        if (!this._afterDismissed.closed) {
            this.containerInstance.exit();
        }
        clearTimeout(this._durationTimeoutId);
    }
    /**
     * Marks the snackbar action clicked.
     * @return {?}
     */
    dismissWithAction() {
        if (!this._onAction.closed) {
            this._dismissedByAction = true;
            this._onAction.next();
            this._onAction.complete();
        }
    }
    /**
     * Marks the snackbar action clicked.
     * @deprecated Use `dismissWithAction` instead.
     * \@breaking-change 8.0.0
     * @return {?}
     */
    closeWithAction() {
        this.dismissWithAction();
    }
    /**
     * Dismisses the snack bar after some duration
     * @param {?} duration
     * @return {?}
     */
    _dismissAfter(duration) {
        this._durationTimeoutId = setTimeout(() => this.dismiss(), duration);
    }
    /**
     * Marks the snackbar as opened
     * @return {?}
     */
    _open() {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    }
    /**
     * Cleans up the DOM after closing.
     * @private
     * @return {?}
     */
    _finishDismiss() {
        this._overlayRef.dispose();
        if (!this._onAction.closed) {
            this._onAction.complete();
        }
        this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
        this._afterDismissed.complete();
        this._dismissedByAction = false;
    }
    /**
     * Gets an observable that is notified when the snack bar is finished closing.
     * @return {?}
     */
    afterDismissed() {
        return this._afterDismissed.asObservable();
    }
    /**
     * Gets an observable that is notified when the snack bar has opened and appeared.
     * @return {?}
     */
    afterOpened() {
        return this.containerInstance._onEnter;
    }
    /**
     * Gets an observable that is notified when the snack bar action is called.
     * @return {?}
     */
    onAction() {
        return this._onAction.asObservable();
    }
}
if (false) {
    /**
     * The instance of the component making up the content of the snack bar.
     * @type {?}
     */
    MatSnackBarRef.prototype.instance;
    /**
     * The instance of the component making up the content of the snack bar.
     * \@docs-private
     * @type {?}
     */
    MatSnackBarRef.prototype.containerInstance;
    /**
     * Subject for notifying the user that the snack bar has been dismissed.
     * @type {?}
     * @private
     */
    MatSnackBarRef.prototype._afterDismissed;
    /**
     * Subject for notifying the user that the snack bar has opened and appeared.
     * @type {?}
     * @private
     */
    MatSnackBarRef.prototype._afterOpened;
    /**
     * Subject for notifying the user that the snack bar action was called.
     * @type {?}
     * @private
     */
    MatSnackBarRef.prototype._onAction;
    /**
     * Timeout ID for the duration setTimeout call. Used to clear the timeout if the snackbar is
     * dismissed before the duration passes.
     * @type {?}
     * @private
     */
    MatSnackBarRef.prototype._durationTimeoutId;
    /**
     * Whether the snack bar was dismissed using the action button.
     * @type {?}
     * @private
     */
    MatSnackBarRef.prototype._dismissedByAction;
    /**
     * @type {?}
     * @private
     */
    MatSnackBarRef.prototype._overlayRef;
}
//# sourceMappingURL=snack-bar-ref.js.map