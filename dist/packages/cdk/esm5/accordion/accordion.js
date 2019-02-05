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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Used to generate unique ID for each accordion.
 * @type {?}
 */
var nextId = 0;
/**
 * Directive whose purpose is to manage the expanded state of CdkAccordionItem children.
 */
var CdkAccordion = /** @class */ (function () {
    function CdkAccordion() {
        /**
         * Emits when the state of the accordion changes
         */
        this._stateChanges = new Subject();
        /**
         * Stream that emits true/false when openAll/closeAll is triggered.
         */
        this._openCloseAllActions = new Subject();
        /**
         * A readonly id value to use for unique selection coordination.
         */
        this.id = "cdk-accordion-" + nextId++;
        this._multi = false;
    }
    Object.defineProperty(CdkAccordion.prototype, "multi", {
        /** Whether the accordion should allow multiple expanded accordion items simultaneously. */
        get: /**
         * Whether the accordion should allow multiple expanded accordion items simultaneously.
         * @return {?}
         */
        function () { return this._multi; },
        set: /**
         * @param {?} multi
         * @return {?}
         */
        function (multi) { this._multi = coerceBooleanProperty(multi); },
        enumerable: true,
        configurable: true
    });
    /** Opens all enabled accordion items in an accordion where multi is enabled. */
    /**
     * Opens all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    CdkAccordion.prototype.openAll = /**
     * Opens all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    function () {
        this._openCloseAll(true);
    };
    /** Closes all enabled accordion items in an accordion where multi is enabled. */
    /**
     * Closes all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    CdkAccordion.prototype.closeAll = /**
     * Closes all enabled accordion items in an accordion where multi is enabled.
     * @return {?}
     */
    function () {
        this._openCloseAll(false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CdkAccordion.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._stateChanges.next(changes);
    };
    /**
     * @return {?}
     */
    CdkAccordion.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._stateChanges.complete();
    };
    /**
     * @private
     * @param {?} expanded
     * @return {?}
     */
    CdkAccordion.prototype._openCloseAll = /**
     * @private
     * @param {?} expanded
     * @return {?}
     */
    function (expanded) {
        if (this.multi) {
            this._openCloseAllActions.next(expanded);
        }
    };
    CdkAccordion.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-accordion, [cdkAccordion]',
                    exportAs: 'cdkAccordion',
                },] },
    ];
    CdkAccordion.propDecorators = {
        multi: [{ type: Input }]
    };
    return CdkAccordion;
}());
export { CdkAccordion };
if (false) {
    /**
     * Emits when the state of the accordion changes
     * @type {?}
     */
    CdkAccordion.prototype._stateChanges;
    /**
     * Stream that emits true/false when openAll/closeAll is triggered.
     * @type {?}
     */
    CdkAccordion.prototype._openCloseAllActions;
    /**
     * A readonly id value to use for unique selection coordination.
     * @type {?}
     */
    CdkAccordion.prototype.id;
    /**
     * @type {?}
     * @private
     */
    CdkAccordion.prototype._multi;
}
//# sourceMappingURL=accordion.js.map