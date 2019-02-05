/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, } from '@angular/core';
/**
 * Outlet for nested CdkNode. Put `[matTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
var MatTreeNodeOutlet = /** @class */ (function () {
    function MatTreeNodeOutlet(viewContainer) {
        this.viewContainer = viewContainer;
    }
    MatTreeNodeOutlet.decorators = [
        { type: Directive, args: [{
                    selector: '[matTreeNodeOutlet]'
                },] },
    ];
    /** @nocollapse */
    MatTreeNodeOutlet.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return MatTreeNodeOutlet;
}());
export { MatTreeNodeOutlet };
if (false) {
    /** @type {?} */
    MatTreeNodeOutlet.prototype.viewContainer;
}
//# sourceMappingURL=outlet.js.map