"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Table showing each row context properties.
 */
var TableRowContextExample = /** @class */ (function () {
    function TableRowContextExample() {
        this.displayedColumns = ['$implicit', 'index', 'count', 'first', 'last', 'even', 'odd'];
        this.data = ['one', 'two', 'three', 'four', 'five'];
    }
    TableRowContextExample = __decorate([
        core_1.Component({
            selector: 'table-row-context-example',
            styles: ["table { width: 100%; } "],
            template: "<table mat-table [dataSource]=\"data\" class=\"mat-elevation-z8\"><ng-container matColumnDef=\"$implicit\"><th mat-header-cell *matHeaderCellDef>$implicit</th><td mat-cell *matCellDef=\"let data\">{{data}}</td></ng-container><ng-container matColumnDef=\"index\"><th mat-header-cell *matHeaderCellDef>index</th><td mat-cell *matCellDef=\"let index = index\">{{index}}</td></ng-container><ng-container matColumnDef=\"count\"><th mat-header-cell *matHeaderCellDef>count</th><td mat-cell *matCellDef=\"let count = count\">{{count}}</td></ng-container><ng-container matColumnDef=\"first\"><th mat-header-cell *matHeaderCellDef>first</th><td mat-cell *matCellDef=\"let first = first\">{{first}}</td></ng-container><ng-container matColumnDef=\"last\"><th mat-header-cell *matHeaderCellDef>last</th><td mat-cell *matCellDef=\"let last = last\">{{last}}</td></ng-container><ng-container matColumnDef=\"even\"><th mat-header-cell *matHeaderCellDef>even</th><td mat-cell *matCellDef=\"let even = even\">{{even}}</td></ng-container><ng-container matColumnDef=\"odd\"><th mat-header-cell *matHeaderCellDef>odd</th><td mat-cell *matCellDef=\"let odd = odd\">{{odd}}</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr></table>",
        })
    ], TableRowContextExample);
    return TableRowContextExample;
}());
exports.TableRowContextExample = TableRowContextExample;
//# sourceMappingURL=table-row-context-example.js.map