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
import { Observable, of as observableOf } from 'rxjs';
import { DataSource } from './data-source';
/**
 * DataSource wrapper for a native array.
 * @template T
 */
export class ArrayDataSource extends DataSource {
    /**
     * @param {?} _data
     */
    constructor(_data) {
        super();
        this._data = _data;
    }
    /**
     * @return {?}
     */
    connect() {
        return this._data instanceof Observable ? this._data : observableOf(this._data);
    }
    /**
     * @return {?}
     */
    disconnect() { }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ArrayDataSource.prototype._data;
}
//# sourceMappingURL=array-data-source.js.map