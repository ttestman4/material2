/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * RegExp that can be used to check whether a value will
 * be allowed inside a CSS `calc()` expression.
 * @type {?}
 */
var cssCalcAllowedValue = /^-?\d+((\.\d+)?[A-Za-z%$]?)+$/;
/**
 * Sets the style properties for an individual tile, given the position calculated by the
 * Tile Coordinator.
 * \@docs-private
 * @abstract
 */
var /**
 * Sets the style properties for an individual tile, given the position calculated by the
 * Tile Coordinator.
 * \@docs-private
 * @abstract
 */
TileStyler = /** @class */ (function () {
    function TileStyler() {
        this._rows = 0;
        this._rowspan = 0;
    }
    /**
     * Adds grid-list layout info once it is available. Cannot be processed in the constructor
     * because these properties haven't been calculated by that point.
     *
     * @param gutterSize Size of the grid's gutter.
     * @param tracker Instance of the TileCoordinator.
     * @param cols Amount of columns in the grid.
     * @param direction Layout direction of the grid.
     */
    /**
     * Adds grid-list layout info once it is available. Cannot be processed in the constructor
     * because these properties haven't been calculated by that point.
     *
     * @param {?} gutterSize Size of the grid's gutter.
     * @param {?} tracker Instance of the TileCoordinator.
     * @param {?} cols Amount of columns in the grid.
     * @param {?} direction Layout direction of the grid.
     * @return {?}
     */
    TileStyler.prototype.init = /**
     * Adds grid-list layout info once it is available. Cannot be processed in the constructor
     * because these properties haven't been calculated by that point.
     *
     * @param {?} gutterSize Size of the grid's gutter.
     * @param {?} tracker Instance of the TileCoordinator.
     * @param {?} cols Amount of columns in the grid.
     * @param {?} direction Layout direction of the grid.
     * @return {?}
     */
    function (gutterSize, tracker, cols, direction) {
        this._gutterSize = normalizeUnits(gutterSize);
        this._rows = tracker.rowCount;
        this._rowspan = tracker.rowspan;
        this._cols = cols;
        this._direction = direction;
    };
    /**
     * Computes the amount of space a single 1x1 tile would take up (width or height).
     * Used as a basis for other calculations.
     * @param sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
     * @param gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
     * @return The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
     */
    /**
     * Computes the amount of space a single 1x1 tile would take up (width or height).
     * Used as a basis for other calculations.
     * @param {?} sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
     * @param {?} gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
     * @return {?} The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
     */
    TileStyler.prototype.getBaseTileSize = /**
     * Computes the amount of space a single 1x1 tile would take up (width or height).
     * Used as a basis for other calculations.
     * @param {?} sizePercent Percent of the total grid-list space that one 1x1 tile would take up.
     * @param {?} gutterFraction Fraction of the gutter size taken up by one 1x1 tile.
     * @return {?} The size of a 1x1 tile as an expression that can be evaluated via CSS calc().
     */
    function (sizePercent, gutterFraction) {
        // Take the base size percent (as would be if evenly dividing the size between cells),
        // and then subtracting the size of one gutter. However, since there are no gutters on the
        // edges, each tile only uses a fraction (gutterShare = numGutters / numCells) of the gutter
        // size. (Imagine having one gutter per tile, and then breaking up the extra gutter on the
        // edge evenly among the cells).
        return "(" + sizePercent + "% - (" + this._gutterSize + " * " + gutterFraction + "))";
    };
    /**
     * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
     * @param offset Number of tiles that have already been rendered in the row/column.
     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @return Position of the tile as a CSS calc() expression.
     */
    /**
     * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
     * @param {?} baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @param {?} offset Number of tiles that have already been rendered in the row/column.
     * @return {?} Position of the tile as a CSS calc() expression.
     */
    TileStyler.prototype.getTilePosition = /**
     * Gets The horizontal or vertical position of a tile, e.g., the 'top' or 'left' property value.
     * @param {?} baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @param {?} offset Number of tiles that have already been rendered in the row/column.
     * @return {?} Position of the tile as a CSS calc() expression.
     */
    function (baseSize, offset) {
        // The position comes the size of a 1x1 tile plus gutter for each previous tile in the
        // row/column (offset).
        return offset === 0 ? '0' : calc("(" + baseSize + " + " + this._gutterSize + ") * " + offset);
    };
    /**
     * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
     * @param baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @param span The tile's rowspan or colspan.
     * @return Size of the tile as a CSS calc() expression.
     */
    /**
     * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
     * @param {?} baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @param {?} span The tile's rowspan or colspan.
     * @return {?} Size of the tile as a CSS calc() expression.
     */
    TileStyler.prototype.getTileSize = /**
     * Gets the actual size of a tile, e.g., width or height, taking rowspan or colspan into account.
     * @param {?} baseSize Base size of a 1x1 tile (as computed in getBaseTileSize).
     * @param {?} span The tile's rowspan or colspan.
     * @return {?} Size of the tile as a CSS calc() expression.
     */
    function (baseSize, span) {
        return "(" + baseSize + " * " + span + ") + (" + (span - 1) + " * " + this._gutterSize + ")";
    };
    /**
     * Sets the style properties to be applied to a tile for the given row and column index.
     * @param tile Tile to which to apply the styling.
     * @param rowIndex Index of the tile's row.
     * @param colIndex Index of the tile's column.
     */
    /**
     * Sets the style properties to be applied to a tile for the given row and column index.
     * @param {?} tile Tile to which to apply the styling.
     * @param {?} rowIndex Index of the tile's row.
     * @param {?} colIndex Index of the tile's column.
     * @return {?}
     */
    TileStyler.prototype.setStyle = /**
     * Sets the style properties to be applied to a tile for the given row and column index.
     * @param {?} tile Tile to which to apply the styling.
     * @param {?} rowIndex Index of the tile's row.
     * @param {?} colIndex Index of the tile's column.
     * @return {?}
     */
    function (tile, rowIndex, colIndex) {
        // Percent of the available horizontal space that one column takes up.
        /** @type {?} */
        var percentWidthPerTile = 100 / this._cols;
        // Fraction of the vertical gutter size that each column takes up.
        // For example, if there are 5 columns, each column uses 4/5 = 0.8 times the gutter width.
        /** @type {?} */
        var gutterWidthFractionPerTile = (this._cols - 1) / this._cols;
        this.setColStyles(tile, colIndex, percentWidthPerTile, gutterWidthFractionPerTile);
        this.setRowStyles(tile, rowIndex, percentWidthPerTile, gutterWidthFractionPerTile);
    };
    /** Sets the horizontal placement of the tile in the list. */
    /**
     * Sets the horizontal placement of the tile in the list.
     * @param {?} tile
     * @param {?} colIndex
     * @param {?} percentWidth
     * @param {?} gutterWidth
     * @return {?}
     */
    TileStyler.prototype.setColStyles = /**
     * Sets the horizontal placement of the tile in the list.
     * @param {?} tile
     * @param {?} colIndex
     * @param {?} percentWidth
     * @param {?} gutterWidth
     * @return {?}
     */
    function (tile, colIndex, percentWidth, gutterWidth) {
        // Base horizontal size of a column.
        /** @type {?} */
        var baseTileWidth = this.getBaseTileSize(percentWidth, gutterWidth);
        // The width and horizontal position of each tile is always calculated the same way, but the
        // height and vertical position depends on the rowMode.
        /** @type {?} */
        var side = this._direction === 'rtl' ? 'right' : 'left';
        tile._setStyle(side, this.getTilePosition(baseTileWidth, colIndex));
        tile._setStyle('width', calc(this.getTileSize(baseTileWidth, tile.colspan)));
    };
    /**
     * Calculates the total size taken up by gutters across one axis of a list.
     */
    /**
     * Calculates the total size taken up by gutters across one axis of a list.
     * @return {?}
     */
    TileStyler.prototype.getGutterSpan = /**
     * Calculates the total size taken up by gutters across one axis of a list.
     * @return {?}
     */
    function () {
        return this._gutterSize + " * (" + this._rowspan + " - 1)";
    };
    /**
     * Calculates the total size taken up by tiles across one axis of a list.
     * @param tileHeight Height of the tile.
     */
    /**
     * Calculates the total size taken up by tiles across one axis of a list.
     * @param {?} tileHeight Height of the tile.
     * @return {?}
     */
    TileStyler.prototype.getTileSpan = /**
     * Calculates the total size taken up by tiles across one axis of a list.
     * @param {?} tileHeight Height of the tile.
     * @return {?}
     */
    function (tileHeight) {
        return this._rowspan + " * " + this.getTileSize(tileHeight, 1);
    };
    /**
     * Calculates the computed height and returns the correct style property to set.
     * This method can be implemented by each type of TileStyler.
     * @docs-private
     */
    /**
     * Calculates the computed height and returns the correct style property to set.
     * This method can be implemented by each type of TileStyler.
     * \@docs-private
     * @return {?}
     */
    TileStyler.prototype.getComputedHeight = /**
     * Calculates the computed height and returns the correct style property to set.
     * This method can be implemented by each type of TileStyler.
     * \@docs-private
     * @return {?}
     */
    function () { return null; };
    return TileStyler;
}());
/**
 * Sets the style properties for an individual tile, given the position calculated by the
 * Tile Coordinator.
 * \@docs-private
 * @abstract
 */
export { TileStyler };
if (false) {
    /** @type {?} */
    TileStyler.prototype._gutterSize;
    /** @type {?} */
    TileStyler.prototype._rows;
    /** @type {?} */
    TileStyler.prototype._rowspan;
    /** @type {?} */
    TileStyler.prototype._cols;
    /** @type {?} */
    TileStyler.prototype._direction;
    /**
     * Sets the vertical placement of the tile in the list.
     * This method will be implemented by each type of TileStyler.
     * \@docs-private
     * @abstract
     * @param {?} tile
     * @param {?} rowIndex
     * @param {?} percentWidth
     * @param {?} gutterWidth
     * @return {?}
     */
    TileStyler.prototype.setRowStyles = function (tile, rowIndex, percentWidth, gutterWidth) { };
    /**
     * Called when the tile styler is swapped out with a different one. To be used for cleanup.
     * \@docs-private
     * @abstract
     * @param {?} list Grid list that the styler was attached to.
     * @return {?}
     */
    TileStyler.prototype.reset = function (list) { };
}
/**
 * This type of styler is instantiated when the user passes in a fixed row height.
 * Example `<mat-grid-list cols="3" rowHeight="100px">`
 * \@docs-private
 */
var /**
 * This type of styler is instantiated when the user passes in a fixed row height.
 * Example `<mat-grid-list cols="3" rowHeight="100px">`
 * \@docs-private
 */
FixedTileStyler = /** @class */ (function (_super) {
    tslib_1.__extends(FixedTileStyler, _super);
    function FixedTileStyler(fixedRowHeight) {
        var _this = _super.call(this) || this;
        _this.fixedRowHeight = fixedRowHeight;
        return _this;
    }
    /**
     * @param {?} gutterSize
     * @param {?} tracker
     * @param {?} cols
     * @param {?} direction
     * @return {?}
     */
    FixedTileStyler.prototype.init = /**
     * @param {?} gutterSize
     * @param {?} tracker
     * @param {?} cols
     * @param {?} direction
     * @return {?}
     */
    function (gutterSize, tracker, cols, direction) {
        _super.prototype.init.call(this, gutterSize, tracker, cols, direction);
        this.fixedRowHeight = normalizeUnits(this.fixedRowHeight);
        if (!cssCalcAllowedValue.test(this.fixedRowHeight)) {
            throw Error("Invalid value \"" + this.fixedRowHeight + "\" set as rowHeight.");
        }
    };
    /**
     * @param {?} tile
     * @param {?} rowIndex
     * @return {?}
     */
    FixedTileStyler.prototype.setRowStyles = /**
     * @param {?} tile
     * @param {?} rowIndex
     * @return {?}
     */
    function (tile, rowIndex) {
        tile._setStyle('top', this.getTilePosition(this.fixedRowHeight, rowIndex));
        tile._setStyle('height', calc(this.getTileSize(this.fixedRowHeight, tile.rowspan)));
    };
    /**
     * @return {?}
     */
    FixedTileStyler.prototype.getComputedHeight = /**
     * @return {?}
     */
    function () {
        return [
            'height', calc(this.getTileSpan(this.fixedRowHeight) + " + " + this.getGutterSpan())
        ];
    };
    /**
     * @param {?} list
     * @return {?}
     */
    FixedTileStyler.prototype.reset = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        list._setListStyle(['height', null]);
        if (list._tiles) {
            list._tiles.forEach(function (tile) {
                tile._setStyle('top', null);
                tile._setStyle('height', null);
            });
        }
    };
    return FixedTileStyler;
}(TileStyler));
/**
 * This type of styler is instantiated when the user passes in a fixed row height.
 * Example `<mat-grid-list cols="3" rowHeight="100px">`
 * \@docs-private
 */
export { FixedTileStyler };
if (false) {
    /** @type {?} */
    FixedTileStyler.prototype.fixedRowHeight;
}
/**
 * This type of styler is instantiated when the user passes in a width:height ratio
 * for the row height.  Example `<mat-grid-list cols="3" rowHeight="3:1">`
 * \@docs-private
 */
var /**
 * This type of styler is instantiated when the user passes in a width:height ratio
 * for the row height.  Example `<mat-grid-list cols="3" rowHeight="3:1">`
 * \@docs-private
 */
RatioTileStyler = /** @class */ (function (_super) {
    tslib_1.__extends(RatioTileStyler, _super);
    function RatioTileStyler(value) {
        var _this = _super.call(this) || this;
        _this._parseRatio(value);
        return _this;
    }
    /**
     * @param {?} tile
     * @param {?} rowIndex
     * @param {?} percentWidth
     * @param {?} gutterWidth
     * @return {?}
     */
    RatioTileStyler.prototype.setRowStyles = /**
     * @param {?} tile
     * @param {?} rowIndex
     * @param {?} percentWidth
     * @param {?} gutterWidth
     * @return {?}
     */
    function (tile, rowIndex, percentWidth, gutterWidth) {
        /** @type {?} */
        var percentHeightPerTile = percentWidth / this.rowHeightRatio;
        this.baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterWidth);
        // Use padding-top and margin-top to maintain the given aspect ratio, as
        // a percentage-based value for these properties is applied versus the *width* of the
        // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
        tile._setStyle('marginTop', this.getTilePosition(this.baseTileHeight, rowIndex));
        tile._setStyle('paddingTop', calc(this.getTileSize(this.baseTileHeight, tile.rowspan)));
    };
    /**
     * @return {?}
     */
    RatioTileStyler.prototype.getComputedHeight = /**
     * @return {?}
     */
    function () {
        return [
            'paddingBottom', calc(this.getTileSpan(this.baseTileHeight) + " + " + this.getGutterSpan())
        ];
    };
    /**
     * @param {?} list
     * @return {?}
     */
    RatioTileStyler.prototype.reset = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        list._setListStyle(['paddingBottom', null]);
        list._tiles.forEach(function (tile) {
            tile._setStyle('marginTop', null);
            tile._setStyle('paddingTop', null);
        });
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    RatioTileStyler.prototype._parseRatio = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var ratioParts = value.split(':');
        if (ratioParts.length !== 2) {
            throw Error("mat-grid-list: invalid ratio given for row-height: \"" + value + "\"");
        }
        this.rowHeightRatio = parseFloat(ratioParts[0]) / parseFloat(ratioParts[1]);
    };
    return RatioTileStyler;
}(TileStyler));
/**
 * This type of styler is instantiated when the user passes in a width:height ratio
 * for the row height.  Example `<mat-grid-list cols="3" rowHeight="3:1">`
 * \@docs-private
 */
export { RatioTileStyler };
if (false) {
    /**
     * Ratio width:height given by user to determine row height.
     * @type {?}
     */
    RatioTileStyler.prototype.rowHeightRatio;
    /** @type {?} */
    RatioTileStyler.prototype.baseTileHeight;
}
/**
 * This type of styler is instantiated when the user selects a "fit" row height mode.
 * In other words, the row height will reflect the total height of the container divided
 * by the number of rows.  Example `<mat-grid-list cols="3" rowHeight="fit">`
 *
 * \@docs-private
 */
var /**
 * This type of styler is instantiated when the user selects a "fit" row height mode.
 * In other words, the row height will reflect the total height of the container divided
 * by the number of rows.  Example `<mat-grid-list cols="3" rowHeight="fit">`
 *
 * \@docs-private
 */
FitTileStyler = /** @class */ (function (_super) {
    tslib_1.__extends(FitTileStyler, _super);
    function FitTileStyler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} tile
     * @param {?} rowIndex
     * @return {?}
     */
    FitTileStyler.prototype.setRowStyles = /**
     * @param {?} tile
     * @param {?} rowIndex
     * @return {?}
     */
    function (tile, rowIndex) {
        // Percent of the available vertical space that one row takes up.
        /** @type {?} */
        var percentHeightPerTile = 100 / this._rowspan;
        // Fraction of the horizontal gutter size that each column takes up.
        /** @type {?} */
        var gutterHeightPerTile = (this._rows - 1) / this._rows;
        // Base vertical size of a column.
        /** @type {?} */
        var baseTileHeight = this.getBaseTileSize(percentHeightPerTile, gutterHeightPerTile);
        tile._setStyle('top', this.getTilePosition(baseTileHeight, rowIndex));
        tile._setStyle('height', calc(this.getTileSize(baseTileHeight, tile.rowspan)));
    };
    /**
     * @param {?} list
     * @return {?}
     */
    FitTileStyler.prototype.reset = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        if (list._tiles) {
            list._tiles.forEach(function (tile) {
                tile._setStyle('top', null);
                tile._setStyle('height', null);
            });
        }
    };
    return FitTileStyler;
}(TileStyler));
/**
 * This type of styler is instantiated when the user selects a "fit" row height mode.
 * In other words, the row height will reflect the total height of the container divided
 * by the number of rows.  Example `<mat-grid-list cols="3" rowHeight="fit">`
 *
 * \@docs-private
 */
export { FitTileStyler };
/**
 * Wraps a CSS string in a calc function
 * @param {?} exp
 * @return {?}
 */
function calc(exp) {
    return "calc(" + exp + ")";
}
/**
 * Appends pixels to a CSS string if no units are given.
 * @param {?} value
 * @return {?}
 */
function normalizeUnits(value) {
    return value.match(/([A-Za-z%]+)$/) ? value : value + "px";
}
//# sourceMappingURL=tile-styler.js.map