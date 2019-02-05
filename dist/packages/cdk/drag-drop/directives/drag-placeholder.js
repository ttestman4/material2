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
import { Directive, TemplateRef, Input } from '@angular/core';
/**
 * Element that will be used as a template for the placeholder of a CdkDrag when
 * it is being dragged. The placeholder is displayed in place of the element being dragged.
 * @template T
 */
export class CdkDragPlaceholder {
    /**
     * @param {?} templateRef
     */
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
CdkDragPlaceholder.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[cdkDragPlaceholder]'
            },] },
];
/** @nocollapse */
CdkDragPlaceholder.ctorParameters = () => [
    { type: TemplateRef }
];
CdkDragPlaceholder.propDecorators = {
    data: [{ type: Input }]
};
if (false) {
    /**
     * Context data to be added to the placeholder template instance.
     * @type {?}
     */
    CdkDragPlaceholder.prototype.data;
    /** @type {?} */
    CdkDragPlaceholder.prototype.templateRef;
}
//# sourceMappingURL=drag-placeholder.js.map