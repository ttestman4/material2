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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coercion_1 = require("@angular/cdk/coercion");
var material_1 = require("@angular/material");
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
 * @title Table with a custom column component for easy column definition reuse.
 */
var TableSimpleColumnExample = /** @class */ (function () {
    function TableSimpleColumnExample() {
        this.displayedColumns = ['position', 'name', 'weight', 'symbol'];
        this.dataSource = new material_1.MatTableDataSource(ELEMENT_DATA);
        this.getWeight = function (data) { return '~' + data.weight; };
    }
    TableSimpleColumnExample.prototype.ngOnInit = function () {
        this.dataSource.sort = this.sort;
    };
    __decorate([
        core_1.ViewChild('sort'),
        __metadata("design:type", material_1.MatSort)
    ], TableSimpleColumnExample.prototype, "sort", void 0);
    TableSimpleColumnExample = __decorate([
        core_1.Component({
            selector: 'table-simple-column-example',
            styles: ["table { width: 100%; } "],
            template: "<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" matSort #sort=\"matSort\"><simple-column name=\"name\" sortable></simple-column><simple-column name=\"position\"></simple-column><simple-column name=\"weight\" [dataAccessor]=\"getWeight\"></simple-column><simple-column name=\"symbol\" label=\"SYMBOL!\"></simple-column><tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr><tr mat-row *matRowDef=\"let data; columns: displayedColumns;\"></tr></table>",
        })
    ], TableSimpleColumnExample);
    return TableSimpleColumnExample;
}());
exports.TableSimpleColumnExample = TableSimpleColumnExample;
/**
 * Column that shows simply shows text content for the header and row
 * cells. By default, the name of this column will be assumed to be both the header
 * text and data property used to access the data value to show in cells. To override
 * the header text, provide a label text. To override the data cell values,
 * provide a dataAccessor function that provides the string to display for each row's cell.
 *
 * Note that this component sets itself as visually hidden since it will show up in the `mat-table`
 * DOM because it is an empty element with an ng-container (nothing rendered). It should not
 * interfere with screen readers.
 */
var SimpleColumn = /** @class */ (function () {
    function SimpleColumn(table) {
        this.table = table;
        /** Alignment of the cell values. */
        this.align = 'before';
    }
    Object.defineProperty(SimpleColumn.prototype, "name", {
        /** Column name that should be used to reference this column. */
        get: function () { return this._name; },
        set: function (name) {
            this._name = name;
            this.columnDef.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleColumn.prototype, "sortable", {
        /** Whether the column is sortable */
        get: function () { return this._sortable; },
        set: function (sortable) {
            this._sortable = coercion_1.coerceBooleanProperty(sortable);
        },
        enumerable: true,
        configurable: true
    });
    SimpleColumn.prototype.ngOnInit = function () {
        if (this.table) {
            this.table.addColumnDef(this.columnDef);
        }
    };
    SimpleColumn.prototype.ngOnDestroy = function () {
        if (this.table) {
            this.table.removeColumnDef(this.columnDef);
        }
    };
    SimpleColumn.prototype.getData = function (data) {
        return this.dataAccessor ? this.dataAccessor(data, this.name) : data[this.name];
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], SimpleColumn.prototype, "name", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SimpleColumn.prototype, "label", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], SimpleColumn.prototype, "dataAccessor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SimpleColumn.prototype, "align", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], SimpleColumn.prototype, "sortable", null);
    __decorate([
        core_1.ViewChild(material_1.MatColumnDef),
        __metadata("design:type", material_1.MatColumnDef)
    ], SimpleColumn.prototype, "columnDef", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSortHeader),
        __metadata("design:type", material_1.MatSortHeader)
    ], SimpleColumn.prototype, "sortHeader", void 0);
    SimpleColumn = __decorate([
        core_1.Component({
            selector: 'simple-column',
            template: "\n    <ng-container matColumnDef>\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> {{label || name}} </th>\n      <td mat-cell *matCellDef=\"let data\"> {{getData(data)}}</td>\n    </ng-container>\n  ",
            host: {
                'class': 'simple-column cdk-visually-hidden',
                '[attr.ariaHidden]': 'true',
            }
        }),
        __param(0, core_1.Optional()),
        __metadata("design:paramtypes", [material_1.MatTable])
    ], SimpleColumn);
    return SimpleColumn;
}());
exports.SimpleColumn = SimpleColumn;
//# sourceMappingURL=table-simple-column-example.js.map