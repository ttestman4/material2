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
import { Directive, ViewContainerRef, } from '@angular/core';
/**
 * Outlet for nested CdkNode. Put `[cdkTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
var CdkTreeNodeOutlet = /** @class */ (function () {
    function CdkTreeNodeOutlet(viewContainer) {
        this.viewContainer = viewContainer;
    }
    CdkTreeNodeOutlet.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodeOutlet]'
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeOutlet.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return CdkTreeNodeOutlet;
}());
export { CdkTreeNodeOutlet };
if (false) {
    /** @type {?} */
    CdkTreeNodeOutlet.prototype.viewContainer;
}
//# sourceMappingURL=outlet.js.map