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
import { Directive, Input, Optional, ElementRef, } from '@angular/core';
import { MatDialog } from './dialog';
import { MatDialogRef } from './dialog-ref';
/**
 * Counter used to generate unique IDs for dialog elements.
 * @type {?}
 */
let dialogElementUid = 0;
/**
 * Button that will close the current dialog.
 */
export class MatDialogClose {
    /**
     * @param {?} dialogRef
     * @param {?} _elementRef
     * @param {?} _dialog
     */
    constructor(dialogRef, _elementRef, _dialog) {
        this.dialogRef = dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        /**
         * Screenreader label for the button.
         */
        this.ariaLabel = 'Close dialog';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.dialogRef) {
            // When this directive is included in a dialog via TemplateRef (rather than being
            // in a Component), the DialogRef isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the DialogRef by
            // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
            // be resolved at constructor time.
            this.dialogRef = (/** @type {?} */ (getClosestDialog(this._elementRef, this._dialog.openDialogs)));
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const proxiedChange = changes._matDialogClose || changes._matDialogCloseResult;
        if (proxiedChange) {
            this.dialogResult = proxiedChange.currentValue;
        }
    }
}
MatDialogClose.decorators = [
    { type: Directive, args: [{
                selector: `button[mat-dialog-close], button[matDialogClose]`,
                exportAs: 'matDialogClose',
                host: {
                    '(click)': 'dialogRef.close(dialogResult)',
                    '[attr.aria-label]': 'ariaLabel',
                    'type': 'button',
                }
            },] },
];
/** @nocollapse */
MatDialogClose.ctorParameters = () => [
    { type: MatDialogRef, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: MatDialog }
];
MatDialogClose.propDecorators = {
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    dialogResult: [{ type: Input, args: ['mat-dialog-close',] }],
    _matDialogClose: [{ type: Input, args: ['matDialogClose',] }]
};
if (false) {
    /**
     * Screenreader label for the button.
     * @type {?}
     */
    MatDialogClose.prototype.ariaLabel;
    /**
     * Dialog close input.
     * @type {?}
     */
    MatDialogClose.prototype.dialogResult;
    /** @type {?} */
    MatDialogClose.prototype._matDialogClose;
    /** @type {?} */
    MatDialogClose.prototype.dialogRef;
    /**
     * @type {?}
     * @private
     */
    MatDialogClose.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatDialogClose.prototype._dialog;
}
/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
export class MatDialogTitle {
    /**
     * @param {?} _dialogRef
     * @param {?} _elementRef
     * @param {?} _dialog
     */
    constructor(_dialogRef, _elementRef, _dialog) {
        this._dialogRef = _dialogRef;
        this._elementRef = _elementRef;
        this._dialog = _dialog;
        this.id = `mat-dialog-title-${dialogElementUid++}`;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this._dialogRef) {
            this._dialogRef = (/** @type {?} */ (getClosestDialog(this._elementRef, this._dialog.openDialogs)));
        }
        if (this._dialogRef) {
            Promise.resolve().then(() => {
                /** @type {?} */
                const container = this._dialogRef._containerInstance;
                if (container && !container._ariaLabelledBy) {
                    container._ariaLabelledBy = this.id;
                }
            });
        }
    }
}
MatDialogTitle.decorators = [
    { type: Directive, args: [{
                selector: '[mat-dialog-title], [matDialogTitle]',
                exportAs: 'matDialogTitle',
                host: {
                    'class': 'mat-dialog-title',
                    '[id]': 'id',
                },
            },] },
];
/** @nocollapse */
MatDialogTitle.ctorParameters = () => [
    { type: MatDialogRef, decorators: [{ type: Optional }] },
    { type: ElementRef },
    { type: MatDialog }
];
MatDialogTitle.propDecorators = {
    id: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MatDialogTitle.prototype.id;
    /**
     * @type {?}
     * @private
     */
    MatDialogTitle.prototype._dialogRef;
    /**
     * @type {?}
     * @private
     */
    MatDialogTitle.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatDialogTitle.prototype._dialog;
}
/**
 * Scrollable content container of a dialog.
 */
export class MatDialogContent {
}
MatDialogContent.decorators = [
    { type: Directive, args: [{
                selector: `[mat-dialog-content], mat-dialog-content, [matDialogContent]`,
                host: { 'class': 'mat-dialog-content' }
            },] },
];
/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
export class MatDialogActions {
}
MatDialogActions.decorators = [
    { type: Directive, args: [{
                selector: `[mat-dialog-actions], mat-dialog-actions, [matDialogActions]`,
                host: { 'class': 'mat-dialog-actions' }
            },] },
];
/**
 * Finds the closest MatDialogRef to an element by looking at the DOM.
 * @param {?} element Element relative to which to look for a dialog.
 * @param {?} openDialogs References to the currently-open dialogs.
 * @return {?}
 */
function getClosestDialog(element, openDialogs) {
    /** @type {?} */
    let parent = element.nativeElement.parentElement;
    while (parent && !parent.classList.contains('mat-dialog-container')) {
        parent = parent.parentElement;
    }
    return parent ? openDialogs.find(dialog => dialog.id === (/** @type {?} */ (parent)).id) : null;
}
//# sourceMappingURL=dialog-content-directives.js.map