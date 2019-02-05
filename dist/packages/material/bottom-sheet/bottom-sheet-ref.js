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
import { ESCAPE } from '@angular/cdk/keycodes';
import { merge, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Reference to a bottom sheet dispatched from the bottom sheet service.
 * @template T, R
 */
export class MatBottomSheetRef {
    /**
     * @param {?} containerInstance
     * @param {?} _overlayRef
     * @param {?=} _location
     */
    constructor(containerInstance, _overlayRef, 
    // @breaking-change 8.0.0 `_location` parameter to be removed.
    _location) {
        this._overlayRef = _overlayRef;
        /**
         * Subject for notifying the user that the bottom sheet has been dismissed.
         */
        this._afterDismissed = new Subject();
        /**
         * Subject for notifying the user that the bottom sheet has opened and appeared.
         */
        this._afterOpened = new Subject();
        this.containerInstance = containerInstance;
        this.disableClose = containerInstance.bottomSheetConfig.disableClose;
        // Emit when opening animation completes
        containerInstance._animationStateChanged.pipe(filter(event => event.phaseName === 'done' && event.toState === 'visible'), take(1))
            .subscribe(() => {
            this._afterOpened.next();
            this._afterOpened.complete();
        });
        // Dispose overlay when closing animation is complete
        containerInstance._animationStateChanged.pipe(filter(event => event.phaseName === 'done' && event.toState === 'hidden'), take(1))
            .subscribe(() => {
            this._overlayRef.dispose();
            this._afterDismissed.next(this._result);
            this._afterDismissed.complete();
        });
        merge(_overlayRef.backdropClick(), _overlayRef.keydownEvents().pipe(filter(event => event.keyCode === ESCAPE))).subscribe(() => {
            if (!this.disableClose) {
                this.dismiss();
            }
        });
    }
    /**
     * Dismisses the bottom sheet.
     * @param {?=} result Data to be passed back to the bottom sheet opener.
     * @return {?}
     */
    dismiss(result) {
        if (!this._afterDismissed.closed) {
            // Transition the backdrop in parallel to the bottom sheet.
            this.containerInstance._animationStateChanged.pipe(filter(event => event.phaseName === 'start'), take(1)).subscribe(() => this._overlayRef.detachBackdrop());
            this._result = result;
            this.containerInstance.exit();
        }
    }
    /**
     * Gets an observable that is notified when the bottom sheet is finished closing.
     * @return {?}
     */
    afterDismissed() {
        return this._afterDismissed.asObservable();
    }
    /**
     * Gets an observable that is notified when the bottom sheet has opened and appeared.
     * @return {?}
     */
    afterOpened() {
        return this._afterOpened.asObservable();
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._overlayRef.backdropClick();
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this._overlayRef.keydownEvents();
    }
}
if (false) {
    /**
     * Instance of the component making up the content of the bottom sheet.
     * @type {?}
     */
    MatBottomSheetRef.prototype.instance;
    /**
     * Instance of the component into which the bottom sheet content is projected.
     * \@docs-private
     * @type {?}
     */
    MatBottomSheetRef.prototype.containerInstance;
    /**
     * Whether the user is allowed to close the bottom sheet.
     * @type {?}
     */
    MatBottomSheetRef.prototype.disableClose;
    /**
     * Subject for notifying the user that the bottom sheet has been dismissed.
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._afterDismissed;
    /**
     * Subject for notifying the user that the bottom sheet has opened and appeared.
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._afterOpened;
    /**
     * Result to be passed down to the `afterDismissed` stream.
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._result;
    /**
     * @type {?}
     * @private
     */
    MatBottomSheetRef.prototype._overlayRef;
}
//# sourceMappingURL=bottom-sheet-ref.js.map