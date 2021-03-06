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
 * @title Footer row table
 */
var TableFooterRowExample = /** @class */ (function () {
    function TableFooterRowExample() {
        this.displayedColumns = ['item', 'cost'];
        this.transactions = [
            { item: 'Beach ball', cost: 4 },
            { item: 'Towel', cost: 5 },
            { item: 'Frisbee', cost: 2 },
            { item: 'Sunscreen', cost: 4 },
            { item: 'Cooler', cost: 25 },
            { item: 'Swim suit', cost: 15 },
        ];
    }
    /** Gets the total cost of all transactions. */
    TableFooterRowExample.prototype.getTotalCost = function () {
        return this.transactions.map(function (t) { return t.cost; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    TableFooterRowExample = __decorate([
        core_1.Component({
            selector: 'table-footer-row-example',
            styles: ["table { width: 100%; } tr.mat-footer-row { font-weight: bold; } "],
            template: "<table mat-table [dataSource]=\"transactions\" class=\"mat-elevation-z8\"><ng-container matColumnDef=\"item\"><th mat-header-cell *matHeaderCellDef>Item</th><td mat-cell *matCellDef=\"let transaction\">{{transaction.item}}</td><td mat-footer-cell *matFooterCellDef>Total</td></ng-container><ng-container matColumnDef=\"cost\"><th mat-header-cell *matHeaderCellDef>Cost</th><td mat-cell *matCellDef=\"let transaction\">{{transaction.cost | currency}}</td><td mat-footer-cell *matFooterCellDef>{{getTotalCost() | currency}}</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr><tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr></table>",
        })
    ], TableFooterRowExample);
    return TableFooterRowExample;
}());
exports.TableFooterRowExample = TableFooterRowExample;
//# sourceMappingURL=table-footer-row-example.js.map