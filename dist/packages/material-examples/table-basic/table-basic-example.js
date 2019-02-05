"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
/**
 * @title Basic use of `<table mat-table>`
 */
var TableBasicExample = /** @class */ (function () {
    function TableBasicExample() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = ELEMENT_DATA;
    }
    TableBasicExample = __decorate([
        core_1.Component({
            selector: 'table-basic-example',
            styles: ["table { width: 100%; } "],
            template: "<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\"><ng-container matColumnDef=\"position\"><th mat-header-cell *matHeaderCellDef>No.</th><td mat-cell *matCellDef=\"let element\">{{element.position}}</td></ng-container><ng-container matColumnDef=\"name\"><th mat-header-cell *matHeaderCellDef>Name</th><td mat-cell *matCellDef=\"let element\">{{element.name}}</td></ng-container><ng-container matColumnDef=\"weight\"><th mat-header-cell *matHeaderCellDef>Weight</th><td mat-cell *matCellDef=\"let element\">{{element.weight}}</td></ng-container><ng-container matColumnDef=\"symbol\"><th mat-header-cell *matHeaderCellDef>Symbol</th><td mat-cell *matCellDef=\"let element\">{{element.symbol}}</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr></table>",
        })
    ], TableBasicExample);
    return TableBasicExample;
}());
exports.TableBasicExample = TableBasicExample;
//# sourceMappingURL=table-basic-example.js.map