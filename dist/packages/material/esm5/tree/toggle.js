/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';
/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 * @template T
 */
var MatTreeNodeToggle = /** @class */ (function (_super) {
    tslib_1.__extends(MatTreeNodeToggle, _super);
    function MatTreeNodeToggle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.recursive = false;
        return _this;
    }
    MatTreeNodeToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[matTreeNodeToggle]',
                    host: {
                        '(click)': '_toggle($event)',
                    },
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: MatTreeNodeToggle }]
                },] },
    ];
    MatTreeNodeToggle.propDecorators = {
        recursive: [{ type: Input, args: ['matTreeNodeToggleRecursive',] }]
    };
    return MatTreeNodeToggle;
}(CdkTreeNodeToggle));
export { MatTreeNodeToggle };
if (false) {
    /** @type {?} */
    MatTreeNodeToggle.prototype.recursive;
}
//# sourceMappingURL=toggle.js.map