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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
var grid_tile_1 = require("./grid-tile");
var bidi_1 = require("@angular/cdk/bidi");
describe('MatGridList', function () {
    function createComponent(componentType) {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatGridListModule],
            declarations: [componentType],
        }).compileComponents();
        return testing_1.TestBed.createComponent(componentType);
    }
    it('should throw error if cols is not defined', function () {
        var fixture = createComponent(GridListWithoutCols);
        expect(function () { return fixture.detectChanges(); }).toThrowError(/must pass in number of columns/);
    });
    it('should throw error if rowHeight ratio is invalid', function () {
        var fixture = createComponent(GridListWithInvalidRowHeightRatio);
        expect(function () { return fixture.detectChanges(); }).toThrowError(/invalid ratio given for row-height/);
    });
    it('should throw error if tile colspan is wider than total cols', function () {
        var fixture = createComponent(GridListWithTooWideColspan);
        expect(function () { return fixture.detectChanges(); }).toThrowError(/tile with colspan 5 is wider than grid/);
    });
    it('should not throw when setting the `rowHeight` programmatically before init', function () {
        var fixture = createComponent(GridListWithUnspecifiedRowHeight);
        var gridList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        expect(function () {
            // Set the row height twice so the tile styler is initialized.
            gridList.componentInstance.rowHeight = 12.3;
            gridList.componentInstance.rowHeight = 32.1;
            fixture.detectChanges();
        }).not.toThrow();
    });
    it('should preserve value when zero is set as row height', function () {
        var fixture = createComponent(GridListWithUnspecifiedRowHeight);
        var gridList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList)).componentInstance;
        gridList.rowHeight = 0;
        expect(gridList.rowHeight).toBe('0');
    });
    it('should set the columns to zero if a negative number is passed in', function () {
        var fixture = createComponent(GridListWithDynamicCols);
        fixture.detectChanges();
        expect(fixture.componentInstance.gridList.cols).toBe(2);
        expect(function () {
            fixture.componentInstance.cols = -2;
            fixture.detectChanges();
        }).not.toThrow();
        expect(fixture.componentInstance.gridList.cols).toBe(1);
    });
    it('should default to 1:1 row height if undefined ', function () {
        var fixture = createComponent(GridListWithUnspecifiedRowHeight);
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        // In ratio mode, heights are set using the padding-top property.
        expect(getStyle(tile, 'padding-top')).toBe('200px');
    });
    it('should use a ratio row height if passed in', function () {
        var fixture = createComponent(GirdListWithRowHeightRatio);
        fixture.componentInstance.rowHeight = '4:1';
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'padding-top')).toBe('100px');
        fixture.componentInstance.rowHeight = '2:1';
        fixture.detectChanges();
        expect(getStyle(tile, 'padding-top')).toBe('200px');
    });
    it('should divide row height evenly in "fit" mode', function () {
        var fixture = createComponent(GridListWithFitRowHeightMode);
        fixture.componentInstance.totalHeight = '300px';
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        // 149.5 * 2 = 299px + 1px gutter = 300px
        expect(getStyle(tile, 'height')).toBe('149.5px');
        fixture.componentInstance.totalHeight = '200px';
        fixture.detectChanges();
        // 99.5 * 2 = 199px + 1px gutter = 200px
        expect(getStyle(tile, 'height')).toBe('99.5px');
    });
    it('should use the fixed row height if passed in', function () {
        var fixture = createComponent(GridListWithFixedRowHeightMode);
        fixture.componentInstance.rowHeight = '100px';
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'height')).toBe('100px');
        fixture.componentInstance.rowHeight = '200px';
        fixture.detectChanges();
        expect(getStyle(tile, 'height')).toBe('200px');
    });
    it('should default to pixels if row height units are missing', function () {
        var fixture = createComponent(GridListWithUnitlessFixedRowHeight);
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'height')).toBe('100px');
    });
    it('should default gutter size to 1px', function () {
        var fixture = createComponent(GridListWithUnspecifiedGutterSize);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        // check horizontal gutter
        expect(getStyle(tiles[0], 'width')).toBe('99.5px');
        expect(getComputedLeft(tiles[1])).toBe(100.5);
        // check vertical gutter
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getStyle(tiles[2], 'top')).toBe('101px');
    });
    it('should be able to set the gutter size to zero', function () {
        var fixture = createComponent(GridListWithUnspecifiedGutterSize);
        var gridList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        gridList.componentInstance.gutterSize = 0;
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        // check horizontal gutter
        expect(getStyle(tiles[0], 'width')).toBe('100px');
        expect(getComputedLeft(tiles[1])).toBe(100);
        // check vertical gutter
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getStyle(tiles[2], 'top')).toBe('100px');
    });
    it('should lay out the tiles correctly for a nested grid list', function () {
        var fixture = createComponent(NestedGridList);
        fixture.detectChanges();
        var innerTiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile mat-grid-list mat-grid-tile'));
        expect(getStyle(innerTiles[0], 'top')).toBe('0px');
        expect(getStyle(innerTiles[1], 'top')).toBe('101px');
        expect(getStyle(innerTiles[2], 'top')).toBe('202px');
    });
    it('should set the gutter size if passed', function () {
        var fixture = createComponent(GridListWithGutterSize);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        // check horizontal gutter
        expect(getStyle(tiles[0], 'width')).toBe('99px');
        expect(getComputedLeft(tiles[1])).toBe(101);
        // check vertical gutter
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getStyle(tiles[2], 'top')).toBe('102px');
    });
    it('should use pixels if gutter units are missing', function () {
        var fixture = createComponent(GridListWithUnitlessGutterSize);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        // check horizontal gutter
        expect(getStyle(tiles[0], 'width')).toBe('99px');
        expect(getComputedLeft(tiles[1])).toBe(101);
        // check vertical gutter
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getStyle(tiles[2], 'top')).toBe('102px');
    });
    it('should allow alternate units for the gutter size', function () {
        var fixture = createComponent(GridListWithUnspecifiedGutterSize);
        var gridList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        gridList.componentInstance.gutterSize = '10%';
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        expect(getStyle(tiles[0], 'width')).toBe('90px');
        expect(getComputedLeft(tiles[1])).toBe(110);
    });
    it('should set the correct list height in ratio mode', function () {
        var fixture = createComponent(GridListWithRatioHeightAndMulipleRows);
        fixture.detectChanges();
        var list = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        expect(getStyle(list, 'padding-bottom')).toBe('201px');
    });
    it('should set the correct list height in fixed mode', function () {
        var fixture = createComponent(GridListWithFixRowHeightAndMultipleRows);
        fixture.detectChanges();
        var list = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        expect(getStyle(list, 'height')).toBe('201px');
    });
    it('should allow adjustment of tile colspan', function () {
        var fixture = createComponent(GridListWithColspanBinding);
        fixture.componentInstance.colspan = 2;
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'width')).toBe('199.5px');
        fixture.componentInstance.colspan = 3;
        fixture.detectChanges();
        expect(getStyle(tile, 'width')).toBe('299.75px');
    });
    it('should allow adjustment of tile rowspan', function () {
        var fixture = createComponent(GridListWithRowspanBinding);
        fixture.componentInstance.rowspan = 2;
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'height')).toBe('201px');
        fixture.componentInstance.rowspan = 3;
        fixture.detectChanges();
        expect(getStyle(tile, 'height')).toBe('302px');
    });
    it('should lay out tiles correctly for a complex layout', function () {
        var fixture = createComponent(GridListWithComplexLayout);
        fixture.componentInstance.tiles = [
            { cols: 3, rows: 1 },
            { cols: 1, rows: 2 },
            { cols: 1, rows: 1 },
            { cols: 2, rows: 1 }
        ];
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        expect(getStyle(tiles[0], 'width')).toBe('299.75px');
        expect(getStyle(tiles[0], 'height')).toBe('100px');
        expect(getComputedLeft(tiles[0])).toBe(0);
        expect(getStyle(tiles[0], 'top')).toBe('0px');
        expect(getStyle(tiles[1], 'width')).toBe('99.25px');
        expect(getStyle(tiles[1], 'height')).toBe('201px');
        expect(getComputedLeft(tiles[1])).toBe(300.75);
        expect(getStyle(tiles[1], 'top')).toBe('0px');
        expect(getStyle(tiles[2], 'width')).toBe('99.25px');
        expect(getStyle(tiles[2], 'height')).toBe('100px');
        expect(getComputedLeft(tiles[2])).toBe(0);
        expect(getStyle(tiles[2], 'top')).toBe('101px');
        expect(getStyle(tiles[3], 'width')).toBe('199.5px');
        expect(getStyle(tiles[3], 'height')).toBe('100px');
        expect(getComputedLeft(tiles[3])).toBe(100.25);
        expect(getStyle(tiles[3], 'top')).toBe('101px');
    });
    it('should lay out tiles correctly', function () {
        var fixture = createComponent(GridListWithLayout);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        expect(getStyle(tiles[0], 'width')).toBe('40px');
        expect(getStyle(tiles[0], 'height')).toBe('40px');
        expect(getComputedLeft(tiles[0])).toBe(0);
        expect(getStyle(tiles[0], 'top')).toBe('0px');
        expect(getStyle(tiles[1], 'width')).toBe('20px');
        expect(getStyle(tiles[1], 'height')).toBe('20px');
        expect(getComputedLeft(tiles[1])).toBe(40);
        expect(getStyle(tiles[1], 'top')).toBe('0px');
        expect(getStyle(tiles[2], 'width')).toBe('40px');
        expect(getStyle(tiles[2], 'height')).toBe('40px');
        expect(getComputedLeft(tiles[2])).toBe(60);
        expect(getStyle(tiles[2], 'top')).toBe('0px');
        expect(getStyle(tiles[3], 'width')).toBe('40px');
        expect(getStyle(tiles[3], 'height')).toBe('40px');
        expect(getComputedLeft(tiles[3])).toBe(0);
        expect(getStyle(tiles[3], 'top')).toBe('40px');
        expect(getStyle(tiles[4], 'width')).toBe('40px');
        expect(getStyle(tiles[4], 'height')).toBe('40px');
        expect(getComputedLeft(tiles[4])).toBe(40);
        expect(getStyle(tiles[4], 'top')).toBe('40px');
    });
    it('should lay out tiles correctly when single cell to be placed at the beginning', function () {
        var fixture = createComponent(GridListWithSingleCellAtBeginning);
        fixture.detectChanges();
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        expect(getStyle(tiles[0], 'width')).toBe('40px');
        expect(getStyle(tiles[0], 'height')).toBe('40px');
        expect(getComputedLeft(tiles[0])).toBe(0);
        expect(getStyle(tiles[0], 'top')).toBe('0px');
        expect(getStyle(tiles[1], 'width')).toBe('20px');
        expect(getStyle(tiles[1], 'height')).toBe('40px');
        expect(getComputedLeft(tiles[1])).toBe(40);
        expect(getStyle(tiles[1], 'top')).toBe('0px');
        expect(getStyle(tiles[2], 'width')).toBe('40px');
        expect(getStyle(tiles[2], 'height')).toBe('40px');
        expect(getComputedLeft(tiles[2])).toBe(60);
        expect(getStyle(tiles[2], 'top')).toBe('0px');
        expect(getStyle(tiles[3], 'height')).toBe('20px');
        expect(getComputedLeft(tiles[3])).toBe(0);
        expect(getStyle(tiles[3], 'top')).toBe('40px');
    });
    it('should add not add any classes to footers without lines', function () {
        var fixture = createComponent(GridListWithFootersWithoutLines);
        fixture.detectChanges();
        var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTileText));
        expect(footer.nativeElement.classList.contains('mat-2-line')).toBe(false);
    });
    it('should add class to footers with two lines', function () {
        var fixture = createComponent(GridListWithFooterContainingTwoLines);
        fixture.detectChanges();
        var footer = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTileText));
        expect(footer.nativeElement.classList.contains('mat-2-line')).toBe(true);
    });
    it('should not use calc() that evaluates to 0', function () {
        var fixture = createComponent(GirdListWithRowHeightRatio);
        fixture.componentInstance.rowHeight = '4:1';
        fixture.detectChanges();
        var firstTile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile)).nativeElement;
        expect(firstTile.style.marginTop).toBe('0px');
        expect(firstTile.style.left).toBe('0px');
    });
    it('should reset the old styles when switching to a new tile styler', function () {
        var fixture = createComponent(GirdListWithRowHeightRatio);
        fixture.componentInstance.rowHeight = '4:1';
        fixture.detectChanges();
        var list = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'padding-top')).toBe('100px');
        expect(getStyle(list, 'padding-bottom')).toBe('100px');
        fixture.componentInstance.rowHeight = '400px';
        fixture.detectChanges();
        expect(getStyle(tile, 'padding-top')).toBe('0px', 'Expected tile padding to be reset.');
        expect(getStyle(list, 'padding-bottom')).toBe('0px', 'Expected list padding to be reset.');
        expect(getStyle(tile, 'top')).toBe('0px');
        expect(getStyle(tile, 'height')).toBe('400px');
    });
    it('should ensure that all tiles are inside the grid when there are no matching gaps', function () {
        var fixture = createComponent(GridListWithoutMatchingGap);
        var tiles = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-grid-tile'));
        fixture.detectChanges();
        expect(tiles.every(function (tile) { return getComputedLeft(tile) >= 0; }))
            .toBe(true, 'Expected none of the tiles to have a negative `left`');
    });
    it('should default to LTR if empty directionality is given', function () {
        var fixture = createComponent(GridListWithEmptyDirectionality);
        var tile = fixture.debugElement.query(platform_browser_1.By.css('mat-grid-tile')).nativeElement;
        fixture.detectChanges();
        expect(tile.style.left).toBe('0px');
        expect(tile.style.right).toBe('');
    });
    it('should set `right` styles for RTL', function () {
        var fixture = createComponent(GridListWithRtl);
        var tile = fixture.debugElement.query(platform_browser_1.By.css('mat-grid-tile')).nativeElement;
        fixture.detectChanges();
        expect(tile.style.left).toBe('');
        expect(tile.style.right).toBe('0px');
    });
    it('should lay out the tiles if they are not direct descendants of the list', function () {
        var fixture = createComponent(GridListWithIndirectTileDescendants);
        fixture.detectChanges();
        var tile = fixture.debugElement.query(platform_browser_1.By.directive(grid_tile_1.MatGridTile));
        expect(getStyle(tile, 'padding-top')).toBe('200px');
    });
    it('should throw if an invalid value is set as the `rowHeight`', function () {
        var fixture = createComponent(GridListWithUnspecifiedRowHeight);
        var gridList = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatGridList));
        expect(function () {
            // Note the semicolon at the end which will be an invalid value on some browsers (see #13252).
            gridList.componentInstance.rowHeight = '350px;';
            fixture.detectChanges();
        }).toThrowError(/^Invalid value/);
    });
});
function getStyle(el, prop) {
    return getComputedStyle(el.nativeElement).getPropertyValue(prop);
}
/** Gets the `left` position of an element. */
function getComputedLeft(element) {
    // While the other properties in this test use `getComputedStyle`, we use `getBoundingClientRect`
    // for left because iOS Safari doesn't support using `getComputedStyle` to get the calculated
    // `left` value when using CSS `calc`. We subtract the `left` of the document body because
    // browsers, by default, add a margin to the body (typically 8px).
    var elementRect = element.nativeElement.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();
    return elementRect.left - bodyRect.left;
}
var GridListWithoutCols = /** @class */ (function () {
    function GridListWithoutCols() {
    }
    GridListWithoutCols = __decorate([
        core_1.Component({ template: '<mat-grid-list></mat-grid-list>' })
    ], GridListWithoutCols);
    return GridListWithoutCols;
}());
var GridListWithInvalidRowHeightRatio = /** @class */ (function () {
    function GridListWithInvalidRowHeightRatio() {
    }
    GridListWithInvalidRowHeightRatio = __decorate([
        core_1.Component({ template: '<mat-grid-list cols="4" rowHeight="4:3:2"></mat-grid-list>' })
    ], GridListWithInvalidRowHeightRatio);
    return GridListWithInvalidRowHeightRatio;
}());
var GridListWithTooWideColspan = /** @class */ (function () {
    function GridListWithTooWideColspan() {
    }
    GridListWithTooWideColspan = __decorate([
        core_1.Component({ template: '<mat-grid-list cols="4"><mat-grid-tile colspan="5"></mat-grid-tile></mat-grid-list>' })
    ], GridListWithTooWideColspan);
    return GridListWithTooWideColspan;
}());
var GridListWithDynamicCols = /** @class */ (function () {
    function GridListWithDynamicCols() {
        this.cols = 2;
    }
    __decorate([
        core_1.ViewChild(index_1.MatGridList),
        __metadata("design:type", index_1.MatGridList)
    ], GridListWithDynamicCols.prototype, "gridList", void 0);
    GridListWithDynamicCols = __decorate([
        core_1.Component({ template: '<mat-grid-list [cols]="cols"></mat-grid-list>' })
    ], GridListWithDynamicCols);
    return GridListWithDynamicCols;
}());
var GridListWithUnspecifiedRowHeight = /** @class */ (function () {
    function GridListWithUnspecifiedRowHeight() {
    }
    GridListWithUnspecifiedRowHeight = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"1\">\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GridListWithUnspecifiedRowHeight);
    return GridListWithUnspecifiedRowHeight;
}());
var GirdListWithRowHeightRatio = /** @class */ (function () {
    function GirdListWithRowHeightRatio() {
    }
    GirdListWithRowHeightRatio = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"1\" [rowHeight]=\"rowHeight\">\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GirdListWithRowHeightRatio);
    return GirdListWithRowHeightRatio;
}());
var GridListWithFitRowHeightMode = /** @class */ (function () {
    function GridListWithFitRowHeightMode() {
    }
    GridListWithFitRowHeightMode = __decorate([
        core_1.Component({ template: "\n    <mat-grid-list cols=\"1\" rowHeight=\"fit\" [style.height]=\"totalHeight\">\n      <mat-grid-tile></mat-grid-tile>\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" })
    ], GridListWithFitRowHeightMode);
    return GridListWithFitRowHeightMode;
}());
var GridListWithFixedRowHeightMode = /** @class */ (function () {
    function GridListWithFixedRowHeightMode() {
    }
    GridListWithFixedRowHeightMode = __decorate([
        core_1.Component({ template: "\n    <mat-grid-list cols=\"4\" [rowHeight]=\"rowHeight\">\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" })
    ], GridListWithFixedRowHeightMode);
    return GridListWithFixedRowHeightMode;
}());
var GridListWithUnitlessFixedRowHeight = /** @class */ (function () {
    function GridListWithUnitlessFixedRowHeight() {
    }
    GridListWithUnitlessFixedRowHeight = __decorate([
        core_1.Component({ template: "\n    <mat-grid-list cols=\"4\" rowHeight=\"100\">\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" })
    ], GridListWithUnitlessFixedRowHeight);
    return GridListWithUnitlessFixedRowHeight;
}());
var GridListWithUnspecifiedGutterSize = /** @class */ (function () {
    function GridListWithUnspecifiedGutterSize() {
    }
    GridListWithUnspecifiedGutterSize = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"2\" rowHeight=\"100px\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GridListWithUnspecifiedGutterSize);
    return GridListWithUnspecifiedGutterSize;
}());
var GridListWithGutterSize = /** @class */ (function () {
    function GridListWithGutterSize() {
    }
    GridListWithGutterSize = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"2\" gutterSize=\"2px\" rowHeight=\"100px\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GridListWithGutterSize);
    return GridListWithGutterSize;
}());
var GridListWithUnitlessGutterSize = /** @class */ (function () {
    function GridListWithUnitlessGutterSize() {
    }
    GridListWithUnitlessGutterSize = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"2\" gutterSize=\"2\" rowHeight=\"100px\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GridListWithUnitlessGutterSize);
    return GridListWithUnitlessGutterSize;
}());
var GridListWithRatioHeightAndMulipleRows = /** @class */ (function () {
    function GridListWithRatioHeightAndMulipleRows() {
    }
    GridListWithRatioHeightAndMulipleRows = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"1\" rowHeight=\"4:1\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile></mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GridListWithRatioHeightAndMulipleRows);
    return GridListWithRatioHeightAndMulipleRows;
}());
var GridListWithFixRowHeightAndMultipleRows = /** @class */ (function () {
    function GridListWithFixRowHeightAndMultipleRows() {
    }
    GridListWithFixRowHeightAndMultipleRows = __decorate([
        core_1.Component({ template: "\n    <mat-grid-list cols=\"1\" rowHeight=\"100px\">\n      <mat-grid-tile></mat-grid-tile>\n      <mat-grid-tile></mat-grid-tile>\n    </mat-grid-list>" })
    ], GridListWithFixRowHeightAndMultipleRows);
    return GridListWithFixRowHeightAndMultipleRows;
}());
var GridListWithColspanBinding = /** @class */ (function () {
    function GridListWithColspanBinding() {
    }
    GridListWithColspanBinding = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"4\">\n        <mat-grid-tile [colspan]=\"colspan\"></mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GridListWithColspanBinding);
    return GridListWithColspanBinding;
}());
var GridListWithRowspanBinding = /** @class */ (function () {
    function GridListWithRowspanBinding() {
    }
    GridListWithRowspanBinding = __decorate([
        core_1.Component({ template: "\n    <mat-grid-list cols=\"1\" rowHeight=\"100px\">\n      <mat-grid-tile [rowspan]=\"rowspan\"></mat-grid-tile>\n    </mat-grid-list>" })
    ], GridListWithRowspanBinding);
    return GridListWithRowspanBinding;
}());
var GridListWithComplexLayout = /** @class */ (function () {
    function GridListWithComplexLayout() {
    }
    GridListWithComplexLayout = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:400px\">\n      <mat-grid-list cols=\"4\" rowHeight=\"100px\">\n        <mat-grid-tile *ngFor=\"let tile of tiles\" [colspan]=\"tile.cols\" [rowspan]=\"tile.rows\"\n                      [style.background]=\"tile.color\">\n          {{tile.text}}\n        </mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], GridListWithComplexLayout);
    return GridListWithComplexLayout;
}());
var GridListWithLayout = /** @class */ (function () {
    function GridListWithLayout() {
    }
    GridListWithLayout = __decorate([
        core_1.Component({ template: "\n  <div style=\"width:100px\">\n    <mat-grid-list [cols]=\"10\" gutterSize=\"0px\" rowHeight=\"10px\">\n      <mat-grid-tile [colspan]=\"4\" [rowspan]=\"4\"></mat-grid-tile>\n      <mat-grid-tile [colspan]=\"2\" [rowspan]=\"2\"></mat-grid-tile>\n      <mat-grid-tile [colspan]=\"4\" [rowspan]=\"4\"></mat-grid-tile>\n      <mat-grid-tile [colspan]=\"4\" [rowspan]=\"4\"></mat-grid-tile>\n      <mat-grid-tile [colspan]=\"4\" [rowspan]=\"4\"></mat-grid-tile>\n    </mat-grid-list>\n  </div>" })
    ], GridListWithLayout);
    return GridListWithLayout;
}());
var GridListWithSingleCellAtBeginning = /** @class */ (function () {
    function GridListWithSingleCellAtBeginning() {
    }
    GridListWithSingleCellAtBeginning = __decorate([
        core_1.Component({ template: "\n  <div style=\"width:100px\">\n    <mat-grid-list [cols]=\"10\" gutterSize=\"0px\" rowHeight=\"10px\">\n      <mat-grid-tile [colspan]=\"4\" [rowspan]=\"4\"></mat-grid-tile>\n      <mat-grid-tile [colspan]=\"2\" [rowspan]=\"4\"></mat-grid-tile>\n      <mat-grid-tile [colspan]=\"4\" [rowspan]=\"4\"></mat-grid-tile>\n      <mat-grid-tile [colspan]=\"1\" [rowspan]=\"2\"></mat-grid-tile>\n    </mat-grid-list>\n  </div>" })
    ], GridListWithSingleCellAtBeginning);
    return GridListWithSingleCellAtBeginning;
}());
var GridListWithFootersWithoutLines = /** @class */ (function () {
    function GridListWithFootersWithoutLines() {
    }
    GridListWithFootersWithoutLines = __decorate([
        core_1.Component({ template: "\n    <mat-grid-list cols=\"1\">\n      <mat-grid-tile>\n        <mat-grid-tile-footer>\n          I'm a footer!\n        </mat-grid-tile-footer>\n      </mat-grid-tile>\n    </mat-grid-list>" })
    ], GridListWithFootersWithoutLines);
    return GridListWithFootersWithoutLines;
}());
var GridListWithFooterContainingTwoLines = /** @class */ (function () {
    function GridListWithFooterContainingTwoLines() {
    }
    GridListWithFooterContainingTwoLines = __decorate([
        core_1.Component({ template: "\n    <mat-grid-list cols=\"1\">\n      <mat-grid-tile>\n        <mat-grid-tile-footer>\n          <h3 mat-line>First line</h3>\n          <span mat-line>Second line</span>\n        </mat-grid-tile-footer>\n      </mat-grid-tile>\n    </mat-grid-list>" })
    ], GridListWithFooterContainingTwoLines);
    return GridListWithFooterContainingTwoLines;
}());
var GridListWithoutMatchingGap = /** @class */ (function () {
    function GridListWithoutMatchingGap() {
    }
    GridListWithoutMatchingGap = __decorate([
        core_1.Component({ template: "\n  <mat-grid-list cols=\"5\">\n    <mat-grid-tile [rowspan]=\"1\" [colspan]=\"3\">1</mat-grid-tile>\n    <mat-grid-tile [rowspan]=\"2\" [colspan]=\"2\">2</mat-grid-tile>\n    <mat-grid-tile [rowspan]=\"1\" [colspan]=\"2\">3</mat-grid-tile>\n    <mat-grid-tile [rowspan]=\"2\" [colspan]=\"2\">4</mat-grid-tile>\n  </mat-grid-list>\n" })
    ], GridListWithoutMatchingGap);
    return GridListWithoutMatchingGap;
}());
var GridListWithEmptyDirectionality = /** @class */ (function () {
    function GridListWithEmptyDirectionality() {
    }
    GridListWithEmptyDirectionality = __decorate([
        core_1.Component({
            template: "<mat-grid-list cols=\"1\"><mat-grid-tile>Hello</mat-grid-tile></mat-grid-list>",
            providers: [{ provide: bidi_1.Directionality, useValue: {} }]
        })
    ], GridListWithEmptyDirectionality);
    return GridListWithEmptyDirectionality;
}());
var GridListWithRtl = /** @class */ (function () {
    function GridListWithRtl() {
    }
    GridListWithRtl = __decorate([
        core_1.Component({
            template: "<mat-grid-list cols=\"1\"><mat-grid-tile>Hello</mat-grid-tile></mat-grid-list>",
            providers: [{ provide: bidi_1.Directionality, useValue: { value: 'rtl' } }]
        })
    ], GridListWithRtl);
    return GridListWithRtl;
}());
var GridListWithIndirectTileDescendants = /** @class */ (function () {
    function GridListWithIndirectTileDescendants() {
    }
    GridListWithIndirectTileDescendants = __decorate([
        core_1.Component({
            // Note the blank `ngSwitch` which we need in order to hit the bug that we're testing.
            template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"1\">\n        <ng-container [ngSwitch]=\"true\">\n          <mat-grid-tile></mat-grid-tile>\n        </ng-container>\n      </mat-grid-list>\n    </div>\n  "
        })
    ], GridListWithIndirectTileDescendants);
    return GridListWithIndirectTileDescendants;
}());
var NestedGridList = /** @class */ (function () {
    function NestedGridList() {
    }
    NestedGridList = __decorate([
        core_1.Component({ template: "\n    <div style=\"width:200px\">\n      <mat-grid-list cols=\"2\" rowHeight=\"100px\">\n        <mat-grid-tile></mat-grid-tile>\n        <mat-grid-tile>\n          <mat-grid-list cols=\"1\" rowHeight=\"100px\">\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile></mat-grid-tile>\n            <mat-grid-tile></mat-grid-tile>\n          </mat-grid-list>\n        </mat-grid-tile>\n      </mat-grid-list>\n    </div>" })
    ], NestedGridList);
    return NestedGridList;
}());
//# sourceMappingURL=grid-list.spec.js.map