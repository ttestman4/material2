"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var core_1 = require("@angular/core");
var TreeDemo = /** @class */ (function () {
    function TreeDemo() {
    }
    TreeDemo = __decorate([
        core_1.Component({selector: 'tree-demo',
            template: "<mat-accordion class=\"demo-tree-container\"> <mat-expansion-panel> <mat-expansion-panel-header>Flat tree</mat-expansion-panel-header> <material-example id=\"tree-flat-overview\"></material-example> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>CDK Flat tree</mat-expansion-panel-header> <material-example id=\"cdk-tree-flat\"></material-example> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Nested tree</mat-expansion-panel-header> <material-example id=\"tree-nested-overview\"></material-example> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>CDK Nested tree</mat-expansion-panel-header> <material-example id=\"cdk-tree-nested\"></material-example> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Todo list Flattened tree</mat-expansion-panel-header> <checklist-tree-demo></checklist-tree-demo> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Todo list Nested tree</mat-expansion-panel-header> <checklist-nested-tree-demo></checklist-nested-tree-demo> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Dynamic flat tree</mat-expansion-panel-header> <dynamic-tree-demo></dynamic-tree-demo> </mat-expansion-panel> <mat-expansion-panel> <mat-expansion-panel-header>Load more flat tree</mat-expansion-panel-header> <loadmore-tree-demo></loadmore-tree-demo> </mat-expansion-panel> </mat-accordion> ",
            styles: [".demo-tree-container .demo-tree-node { display: block; } .demo-tree-container .demo-tree-nested-node { padding-left: 20px; } .demo-tree-container .demo-tree-invisible { display: none; } .demo-tree-container ul, .demo-tree-container li { -webkit-margin-before: 0; -webkit-margin-after: 0; list-style-type: none; } .demo-tree-container .mat-card { margin: 16px; } "],
        })
    ], TreeDemo);
    return TreeDemo;
}());
exports.TreeDemo = TreeDemo;
//# sourceMappingURL=tree-demo.js.map