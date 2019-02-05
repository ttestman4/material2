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
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
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
 * @title Table example that shows how to wrap a table component for definition and behavior reuse.
 */
var TableWrappedExample = /** @class */ (function () {
    function TableWrappedExample() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new material_1.MatTableDataSource(ELEMENT_DATA);
    }
    TableWrappedExample.prototype.ngOnInit = function () {
        this.dataSource.sort = this.sort;
    };
    __decorate([
        core_1.ViewChild('sort'),
        __metadata("design:type", material_1.MatSort)
    ], TableWrappedExample.prototype, "sort", void 0);
    TableWrappedExample = __decorate([
        core_1.Component({
            selector: 'table-wrapped-example',
            styles: ["table { width: 100%; } "],
            template: "<wrapper-table [dataSource]=\"dataSource\" [columns]=\"displayedColumns\" matSort #sort=\"matSort\"><ng-container matColumnDef=\"name\"><th mat-header-cell *matHeaderCellDef>Name</th><td mat-cell *matCellDef=\"let element\">{{element.name}}</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns; \"></tr></wrapper-table>",
        })
    ], TableWrappedExample);
    return TableWrappedExample;
}());
exports.TableWrappedExample = TableWrappedExample;
/**
 * Table component that accepts column and row definitions in its content to be registered to the
 * table.
 */
var WrapperTable = /** @class */ (function () {
    function WrapperTable() {
    }
    WrapperTable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.columnDefs.forEach(function (columnDef) { return _this.table.addColumnDef(columnDef); });
        this.rowDefs.forEach(function (rowDef) { return _this.table.addRowDef(rowDef); });
        this.headerRowDefs.forEach(function (headerRowDef) { return _this.table.addHeaderRowDef(headerRowDef); });
    };
    __decorate([
        core_1.ContentChildren(material_1.MatHeaderRowDef),
        __metadata("design:type", core_1.QueryList)
    ], WrapperTable.prototype, "headerRowDefs", void 0);
    __decorate([
        core_1.ContentChildren(material_1.MatRowDef),
        __metadata("design:type", core_1.QueryList)
    ], WrapperTable.prototype, "rowDefs", void 0);
    __decorate([
        core_1.ContentChildren(material_1.MatColumnDef),
        __metadata("design:type", core_1.QueryList)
    ], WrapperTable.prototype, "columnDefs", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatTable),
        __metadata("design:type", material_1.MatTable)
    ], WrapperTable.prototype, "table", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WrapperTable.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", collections_1.DataSource)
    ], WrapperTable.prototype, "dataSource", void 0);
    WrapperTable = __decorate([
        core_1.Component({
            selector: 'wrapper-table',
            template: "<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\"><ng-content></ng-content><ng-container matColumnDef=\"position\"><th mat-header-cell *matHeaderCellDef mat-sort-header>No.</th><td mat-cell *matCellDef=\"let element\">{{element.position}}</td></ng-container><ng-container matColumnDef=\"weight\"><th mat-header-cell *matHeaderCellDef mat-sort-header>Weight</th><td mat-cell *matCellDef=\"let element\">{{element.weight}}</td></ng-container><ng-container matColumnDef=\"symbol\"><th mat-header-cell *matHeaderCellDef>Symbol</th><td mat-cell *matCellDef=\"let element\">{{element.symbol}}</td></ng-container></table>",
            styles: ["\n    table {\n      width: 100%;\n    }\n  "]
        })
    ], WrapperTable);
    return WrapperTable;
}());
exports.WrapperTable = WrapperTable;
//# sourceMappingURL=table-wrapped-example.js.map