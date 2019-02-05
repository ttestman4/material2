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
/**
 * Interface for a class that can flatten hierarchical structured data and re-expand the flattened
 * data back into its original structure. Should be used in conjunction with the cdk-tree.
 * @record
 * @template T
 */
export function TreeDataNodeFlattener() { }
if (false) {
    /**
     * Transforms a set of hierarchical structured data into a flattened data array.
     * @param {?} structuredData
     * @return {?}
     */
    TreeDataNodeFlattener.prototype.flattenNodes = function (structuredData) { };
    /**
     * Expands a flattened array of data into its hierarchical form using the provided expansion
     * model.
     * @param {?} nodes
     * @param {?} expansionModel
     * @return {?}
     */
    TreeDataNodeFlattener.prototype.expandFlattenedNodes = function (nodes, expansionModel) { };
    /**
     * Put node descendants of node in array.
     * If `onlyExpandable` is true, then only process expandable descendants.
     * @param {?} node
     * @param {?} nodes
     * @param {?} onlyExpandable
     * @return {?}
     */
    TreeDataNodeFlattener.prototype.nodeDescendents = function (node, nodes, onlyExpandable) { };
}
//# sourceMappingURL=tree-adapter.js.map