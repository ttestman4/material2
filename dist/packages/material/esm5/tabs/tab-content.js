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
import { Directive, TemplateRef } from '@angular/core';
/**
 * Decorates the `ng-template` tags and reads out the template from it.
 */
var MatTabContent = /** @class */ (function () {
    function MatTabContent(template) {
        this.template = template;
    }
    MatTabContent.decorators = [
        { type: Directive, args: [{ selector: '[matTabContent]' },] },
    ];
    /** @nocollapse */
    MatTabContent.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return MatTabContent;
}());
export { MatTabContent };
if (false) {
    /** @type {?} */
    MatTabContent.prototype.template;
}
//# sourceMappingURL=tab-content.js.map