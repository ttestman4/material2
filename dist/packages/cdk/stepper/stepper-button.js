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
import { Directive, Input } from '@angular/core';
import { CdkStepper } from './stepper';
/**
 * Button that moves to the next step in a stepper workflow.
 */
export class CdkStepperNext {
    /**
     * @param {?} _stepper
     */
    constructor(_stepper) {
        this._stepper = _stepper;
        /**
         * Type of the next button. Defaults to "submit" if not specified.
         */
        this.type = 'submit';
    }
}
CdkStepperNext.decorators = [
    { type: Directive, args: [{
                selector: 'button[cdkStepperNext]',
                host: {
                    '(click)': '_stepper.next()',
                    '[type]': 'type',
                }
            },] },
];
/** @nocollapse */
CdkStepperNext.ctorParameters = () => [
    { type: CdkStepper }
];
CdkStepperNext.propDecorators = {
    type: [{ type: Input }]
};
if (false) {
    /**
     * Type of the next button. Defaults to "submit" if not specified.
     * @type {?}
     */
    CdkStepperNext.prototype.type;
    /** @type {?} */
    CdkStepperNext.prototype._stepper;
}
/**
 * Button that moves to the previous step in a stepper workflow.
 */
export class CdkStepperPrevious {
    /**
     * @param {?} _stepper
     */
    constructor(_stepper) {
        this._stepper = _stepper;
        /**
         * Type of the previous button. Defaults to "button" if not specified.
         */
        this.type = 'button';
    }
}
CdkStepperPrevious.decorators = [
    { type: Directive, args: [{
                selector: 'button[cdkStepperPrevious]',
                host: {
                    '(click)': '_stepper.previous()',
                    '[type]': 'type',
                }
            },] },
];
/** @nocollapse */
CdkStepperPrevious.ctorParameters = () => [
    { type: CdkStepper }
];
CdkStepperPrevious.propDecorators = {
    type: [{ type: Input }]
};
if (false) {
    /**
     * Type of the previous button. Defaults to "button" if not specified.
     * @type {?}
     */
    CdkStepperPrevious.prototype.type;
    /** @type {?} */
    CdkStepperPrevious.prototype._stepper;
}
//# sourceMappingURL=stepper-button.js.map