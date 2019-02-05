"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var tree_1 = require("@angular/cdk/tree");
var core_1 = require("@angular/core");
var tree_2 = require("@angular/material/tree");
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
var TreeNestedOverviewExample = /** @class */ (function () {
    function TreeNestedOverviewExample() {
        this.treeControl = new tree_1.NestedTreeControl(function (node) { return node.children; });
        this.dataSource = new tree_2.MatTreeNestedDataSource();
        this.hasChild = function (_, node) { return !!node.children && node.children.length > 0; };
        this.dataSource.data = TREE_DATA;
    }
    TreeNestedOverviewExample = __decorate([
        core_1.Component({
            selector: 'tree-nested-overview-example',
            template: "<mat-tree [dataSource]=\"dataSource\" [treeControl]=\"treeControl\" class=\"example-tree\"><mat-tree-node *matTreeNodeDef=\"let node\" matTreeNodeToggle><li class=\"mat-tree-node\"><button mat-icon-button disabled=\"disabled\"></button> {{node.name}}</li></mat-tree-node><mat-nested-tree-node *matTreeNodeDef=\"let node; when: hasChild\"><li><div class=\"mat-tree-node\"><button mat-icon-button matTreeNodeToggle [attr.aria-label]=\"'toggle ' + node.name\"><mat-icon class=\"mat-icon-rtl-mirror\">{{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}</mat-icon></button> {{node.name}}</div><ul [class.example-tree-invisible]=\"!treeControl.isExpanded(node)\"><ng-container matTreeNodeOutlet></ng-container></ul></li></mat-nested-tree-node></mat-tree>",
            styles: [".example-tree-invisible { display: none; } .example-tree ul, .example-tree li { margin-top: 0; margin-bottom: 0; list-style-type: none; } "],
        }),
        __metadata("design:paramtypes", [])
    ], TreeNestedOverviewExample);
    return TreeNestedOverviewExample;
}());
exports.TreeNestedOverviewExample = TreeNestedOverviewExample;
//# sourceMappingURL=tree-nested-overview-example.js.map