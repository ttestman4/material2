export interface Transaction {
    item: string;
    cost: number;
}
/**
 * @title Table with a sticky footer
 */
export declare class TableStickyFooterExample {
    displayedColumns: string[];
    transactions: Transaction[];
    /** Gets the total cost of all transactions. */
    getTotalCost(): number;
}
