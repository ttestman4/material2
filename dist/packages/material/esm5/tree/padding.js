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
import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';
/**
 * Wrapper for the CdkTree padding with Material design styles.
 * @template T
 */
var MatTreeNodePadding = /** @class */ (function (_super) {
    tslib_1.__extends(MatTreeNodePadding, _super);
    function MatTreeNodePadding() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[matTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: MatTreeNodePadding }]
                },] },
    ];
    MatTreeNodePadding.propDecorators = {
        level: [{ type: Input, args: ['matTreeNodePadding',] }],
        indent: [{ type: Input, args: ['matTreeNodePaddingIndent',] }]
    };
    return MatTreeNodePadding;
}(CdkTreeNodePadding));
export { MatTreeNodePadding };
if (false) {
    /**
     * The level of depth of the tree node. The padding will be `level * indent` pixels.
     * @type {?}
     */
    MatTreeNodePadding.prototype.level;
    /**
     * The indent for each level. Default number 40px from material design menu sub-menu spec.
     * @type {?}
     */
    MatTreeNodePadding.prototype.indent;
}
//# sourceMappingURL=padding.js.map