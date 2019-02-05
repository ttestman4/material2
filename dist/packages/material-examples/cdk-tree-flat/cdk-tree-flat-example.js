"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var tree_1 = require("@angular/cdk/tree");
var core_1 = require("@angular/core");
var TREE_DATA = [
    {
        name: 'Fruit',
        expandable: true,
        level: 0,
    }, {
        name: 'Apple',
        expandable: false,
        level: 1,
    }, {
        name: 'Banana',
        expandable: false,
        level: 1,
    }, {
        name: 'Fruit loops',
        expandable: false,
        level: 1,
    }, {
        name: 'Vegetables',
        expandable: true,
        level: 0,
    }, {
        name: 'Green',
        expandable: true,
        level: 1,
    }, {
        name: 'Broccoli',
        expandable: false,
        level: 2,
    }, {
        name: 'Brussel sprouts',
        expandable: false,
        level: 2,
    }, {
        name: 'Orange',
        expandable: true,
        level: 1,
    }, {
        name: 'Pumpkins',
        expandable: false,
        level: 2,
    }, {
        name: 'Carrots',
        expandable: false,
        level: 2,
    }
];
/**
 * @title Tree with flat nodes
 */
var CdkTreeFlatExample = /** @class */ (function () {
    function CdkTreeFlatExample() {
        this.treeControl = new tree_1.FlatTreeControl(function (node) { return node.level; }, function (node) { return node.expandable; });
        this.dataSource = new collections_1.ArrayDataSource(TREE_DATA);
        this.hasChild = function (_, node) { return node.expandable; };
    }
    CdkTreeFlatExample.prototype.getParentNode = function (node) {
        var nodeIndex = TREE_DATA.indexOf(node);
        for (var i = nodeIndex - 1; i >= 0; i--) {
            if (TREE_DATA[i].level === node.level - 1) {
                return TREE_DATA[i];
            }
        }
        return null;
    };
    CdkTreeFlatExample.prototype.shouldRender = function (node) {
        var parent = this.getParentNode(node);
        return !parent || parent.isExpanded;
    };
    CdkTreeFlatExample = __decorate([
        core_1.Component({
            selector: 'cdk-tree-flat-example',
            template: "<cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"><cdk-tree-node *cdkTreeNodeDef=\"let node\" cdkTreeNodePadding [style.display]=\"shouldRender(node) ? 'flex' : 'none'\" class=\"example-tree-node\"><button mat-icon-button disabled=\"disabled\"></button> {{node.name}}</cdk-tree-node><cdk-tree-node *cdkTreeNodeDef=\"let node; when: hasChild\" cdkTreeNodePadding [style.display]=\"shouldRender(node) ? 'flex' : 'none'\" class=\"example-tree-node\"><button mat-icon-button cdkTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.filename\" (click)=\"node.isExpanded = !node.isExpanded\" [style.visibility]=\"node.expandable ? 'visible' : 'hidden'\"><mat-icon class=\"mat-icon-rtl-mirror\">{{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}</mat-icon></button> {{node.name}}</cdk-tree-node></cdk-tree>",
            styles: [".example-tree-node { display: flex; align-items: center; } "],
        })
    ], CdkTreeFlatExample);
    return CdkTreeFlatExample;
}());
exports.CdkTreeFlatExample = CdkTreeFlatExample;
//# sourceMappingURL=cdk-tree-flat-example.js.map