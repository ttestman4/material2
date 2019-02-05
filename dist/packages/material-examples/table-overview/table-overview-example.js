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
/** Constants used to fill up our data base. */
var COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
    'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
var NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
/**
 * @title Data table with sorting, pagination, and filtering.
 */
var TableOverviewExample = /** @class */ (function () {
    function TableOverviewExample() {
        this.displayedColumns = ['id', 'name', 'progress', 'color'];
        // Create 100 users
        var users = Array.from({ length: 100 }, function (_, k) { return createNewUser(k + 1); });
        // Assign the data to the data source for the table to render
        this.dataSource = new material_1.MatTableDataSource(users);
    }
    TableOverviewExample.prototype.ngOnInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    TableOverviewExample.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], TableOverviewExample.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], TableOverviewExample.prototype, "sort", void 0);
    TableOverviewExample = __decorate([
        core_1.Component({
            selector: 'table-overview-example',
            styles: ["table { width: 100%; } .mat-form-field { font-size: 14px; width: 100%; } td, th { width: 25%; } "],
            template: "<mat-form-field><input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\"></mat-form-field><div class=\"mat-elevation-z8\"><table mat-table [dataSource]=\"dataSource\" matSort><ng-container matColumnDef=\"id\"><th mat-header-cell *matHeaderCellDef mat-sort-header>ID</th><td mat-cell *matCellDef=\"let row\">{{row.id}}</td></ng-container><ng-container matColumnDef=\"progress\"><th mat-header-cell *matHeaderCellDef mat-sort-header>Progress</th><td mat-cell *matCellDef=\"let row\">{{row.progress}}%</td></ng-container><ng-container matColumnDef=\"name\"><th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th><td mat-cell *matCellDef=\"let row\">{{row.name}}</td></ng-container><ng-container matColumnDef=\"color\"><th mat-header-cell *matHeaderCellDef mat-sort-header>Color</th><td mat-cell *matCellDef=\"let row\" [style.color]=\"row.color\">{{row.color}}</td></ng-container><tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr><tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr></table><mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator></div>",
        }),
        __metadata("design:paramtypes", [])
    ], TableOverviewExample);
    return TableOverviewExample;
}());
exports.TableOverviewExample = TableOverviewExample;
/** Builds and returns a new User. */
function createNewUser(id) {
    var name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    return {
        id: id.toString(),
        name: name,
        progress: Math.round(Math.random() * 100).toString(),
        color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
}
//# sourceMappingURL=table-overview-example.js.map