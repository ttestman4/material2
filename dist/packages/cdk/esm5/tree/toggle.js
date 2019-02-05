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
import { Directive, Input, } from '@angular/core';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Node toggle to expand/collapse the node.
 * @template T
 */
var CdkTreeNodeToggle = /** @class */ (function () {
    function CdkTreeNodeToggle(_tree, _treeNode) {
        this._tree = _tree;
        this._treeNode = _treeNode;
        this._recursive = false;
    }
    Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
        /** Whether expand/collapse the node recursively. */
        get: /**
         * Whether expand/collapse the node recursively.
         * @return {?}
         */
        function () { return this._recursive; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._recursive = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    CdkTreeNodeToggle.prototype._toggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.recursive
            ? this._tree.treeControl.toggleDescendants(this._treeNode.data)
            : this._tree.treeControl.toggle(this._treeNode.data);
        event.stopPropagation();
    };
    CdkTreeNodeToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodeToggle]',
                    host: {
                        '(click)': '_toggle($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeToggle.ctorParameters = function () { return [
        { type: CdkTree },
        { type: CdkTreeNode }
    ]; };
    CdkTreeNodeToggle.propDecorators = {
        recursive: [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] }]
    };
    return CdkTreeNodeToggle;
}());
export { CdkTreeNodeToggle };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodeToggle.prototype._recursive;
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodeToggle.prototype._tree;
    /**
     * @type {?}
     * @protected
     */
    CdkTreeNodeToggle.prototype._treeNode;
}
//# sourceMappingURL=toggle.js.map