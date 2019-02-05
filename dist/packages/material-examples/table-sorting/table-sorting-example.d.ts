import { OnInit } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}
/**
 * @title Table with sorting
 */
export declare class TableSortingExample implements OnInit {
    displayedColumns: string[];
    dataSource: MatTableDataSource<PeriodicElement>;
    sort: MatSort;
    ngOnInit(): void;
}
