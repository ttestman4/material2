"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var tree_1 = require("@angular/cdk/tree");
var TREE_DATA = [
    {
        name: 'Fruit',
        children: [
            { name: 'Apple' },
            { name: 'Banana' },
            { name: 'Fruit loops' },
        ]
    }, {
        name: 'Vegetables',
        children: [
            {
                name: 'Green',
                children: [
                    { name: 'Broccoli' },
                    { name: 'Brussel sprouts' },
                ]
            }, {
                name: 'Orange',
                children: [
                    { name: 'Pumpkins' },
                    { name: 'Carrots' },
                ]
            },
        ]
    },
];
/**
 * @title Tree with nested nodes
 */
var CdkTreeNestedExample = /** @class */ (function () {
    function CdkTreeNestedExample() {
        this.treeControl = new tree_1.NestedTreeControl(function (node) { return node.children; });
        this.dataSource = new collections_1.ArrayDataSource(TREE_DATA);
        this.hasChild = function (_, node) { return !!node.children && node.children.length > 0; };
    }
    CdkTreeNestedExample = __decorate([
        core_1.Component({
            selector: 'cdk-tree-nested-example',
            template: "<cdk-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\"><cdk-nested-tree-node *cdkTreeNodeDef=\"let node\" class=\"example-tree-node\"><button mat-icon-button disabled=\"disabled\"></button> {{node.name}}</cdk-nested-tree-node><cdk-nested-tree-node *cdkTreeNodeDef=\"let node; when: hasChild\" class=\"example-tree-node\"><button mat-icon-button [attr.aria-label]=\"'toggle ' + node.name\" cdkTreeNodeToggle><mat-icon class=\"mat-icon-rtl-mirror\">{{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}</mat-icon></button> {{node.name}}<div [class.example-tree-invisible]=\"!treeControl.isExpanded(node)\"><ng-container cdkTreeNodeOutlet></ng-container></div></cdk-nested-tree-node></cdk-tree>",
            styles: [".example-tree-invisible { display: none; } .example-tree ul, .example-tree li { margin-top: 0; margin-bottom: 0; list-style-type: none; } .example-tree-node { display: block; } .example-tree-node .example-tree-node { padding-left: 40px; } "],
        })
    ], CdkTreeNestedExample);
    return CdkTreeNestedExample;
}());
exports.CdkTreeNestedExample = CdkTreeNestedExample;
//# sourceMappingURL=cdk-tree-nested-example.js.map