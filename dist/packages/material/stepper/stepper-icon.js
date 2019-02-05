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
import { Directive, Input, TemplateRef } from '@angular/core';
/**
 * Template context available to an attached `matStepperIcon`.
 * @record
 */
export function MatStepperIconContext() { }
if (false) {
    /**
     * Index of the step.
     * @type {?}
     */
    MatStepperIconContext.prototype.index;
    /**
     * Whether the step is currently active.
     * @type {?}
     */
    MatStepperIconContext.prototype.active;
    /**
     * Whether the step is optional.
     * @type {?}
     */
    MatStepperIconContext.prototype.optional;
}
/**
 * Template to be used to override the icons inside the step header.
 */
export class MatStepperIcon {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
MatStepperIcon.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[matStepperIcon]',
            },] },
];
/** @nocollapse */
MatStepperIcon.ctorParameters = () => [
    { type: TemplateRef }
];
MatStepperIcon.propDecorators = {
    name: [{ type: Input, args: ['matStepperIcon',] }]
};
if (false) {
    /**
     * Name of the icon to be overridden.
     * @type {?}
     */
    MatStepperIcon.prototype.name;
    /** @type {?} */
    MatStepperIcon.prototype.templateRef;
}
//# sourceMappingURL=stepper-icon.js.map