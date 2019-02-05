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
import { Directive } from '@angular/core';
import { CdkStepper, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { MatStepper } from './stepper';
/**
 * Button that moves to the next step in a stepper workflow.
 */
export class MatStepperNext extends CdkStepperNext {
}
MatStepperNext.decorators = [
    { type: Directive, args: [{
                selector: 'button[matStepperNext]',
                host: {
                    '(click)': '_stepper.next()',
                    '[type]': 'type',
                },
                inputs: ['type'],
                providers: [{ provide: CdkStepper, useExisting: MatStepper }]
            },] },
];
/**
 * Button that moves to the previous step in a stepper workflow.
 */
export class MatStepperPrevious extends CdkStepperPrevious {
}
MatStepperPrevious.decorators = [
    { type: Directive, args: [{
                selector: 'button[matStepperPrevious]',
                host: {
                    '(click)': '_stepper.previous()',
                    '[type]': 'type',
                },
                inputs: ['type'],
                providers: [{ provide: CdkStepper, useExisting: MatStepper }]
            },] },
];
//# sourceMappingURL=stepper-button.js.map