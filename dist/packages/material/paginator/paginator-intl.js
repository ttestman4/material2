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
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * To modify the labels and text displayed, create a new instance of MatPaginatorIntl and
 * include it in a custom provider
 */
export class MatPaginatorIntl {
    constructor() {
        /**
         * Stream to emit from when labels are changed. Use this to notify components when the labels have
         * changed after initialization.
         */
        this.changes = new Subject();
        /**
         * A label for the page size selector.
         */
        this.itemsPerPageLabel = 'Items per page:';
        /**
         * A label for the button that increments the current page.
         */
        this.nextPageLabel = 'Next page';
        /**
         * A label for the button that decrements the current page.
         */
        this.previousPageLabel = 'Previous page';
        /**
         * A label for the button that moves to the first page.
         */
        this.firstPageLabel = 'First page';
        /**
         * A label for the button that moves to the last page.
         */
        this.lastPageLabel = 'Last page';
        /**
         * A label for the range of items within the current page and the length of the whole list.
         */
        this.getRangeLabel = (page, pageSize, length) => {
            if (length == 0 || pageSize == 0) {
                return `0 of ${length}`;
            }
            length = Math.max(length, 0);
            /** @type {?} */
            const startIndex = page * pageSize;
            // If the start index exceeds the list length, do not try and fix the end index to the end.
            /** @type {?} */
            const endIndex = startIndex < length ?
                Math.min(startIndex + pageSize, length) :
                startIndex + pageSize;
            return `${startIndex + 1} - ${endIndex} of ${length}`;
        };
    }
}
MatPaginatorIntl.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */ MatPaginatorIntl.ngInjectableDef = i0.defineInjectable({ factory: function MatPaginatorIntl_Factory() { return new MatPaginatorIntl(); }, token: MatPaginatorIntl, providedIn: "root" });
if (false) {
    /**
     * Stream to emit from when labels are changed. Use this to notify components when the labels have
     * changed after initialization.
     * @type {?}
     */
    MatPaginatorIntl.prototype.changes;
    /**
     * A label for the page size selector.
     * @type {?}
     */
    MatPaginatorIntl.prototype.itemsPerPageLabel;
    /**
     * A label for the button that increments the current page.
     * @type {?}
     */
    MatPaginatorIntl.prototype.nextPageLabel;
    /**
     * A label for the button that decrements the current page.
     * @type {?}
     */
    MatPaginatorIntl.prototype.previousPageLabel;
    /**
     * A label for the button that moves to the first page.
     * @type {?}
     */
    MatPaginatorIntl.prototype.firstPageLabel;
    /**
     * A label for the button that moves to the last page.
     * @type {?}
     */
    MatPaginatorIntl.prototype.lastPageLabel;
    /**
     * A label for the range of items within the current page and the length of the whole list.
     * @type {?}
     */
    MatPaginatorIntl.prototype.getRangeLabel;
}
/**
 * \@docs-private
 * @param {?} parentIntl
 * @return {?}
 */
export function MAT_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl) {
    return parentIntl || new MatPaginatorIntl();
}
/**
 * \@docs-private
 * @type {?}
 */
export const MAT_PAGINATOR_INTL_PROVIDER = {
    // If there is already an MatPaginatorIntl available, use that. Otherwise, provide a new one.
    provide: MatPaginatorIntl,
    deps: [[new Optional(), new SkipSelf(), MatPaginatorIntl]],
    useFactory: MAT_PAGINATOR_INTL_PROVIDER_FACTORY
};
//# sourceMappingURL=paginator-intl.js.map