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
import { FocusKeyManager } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { SPACE, ENTER, HOME, END, UP_ARROW, DOWN_ARROW, A, hasModifierKey, } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, Input, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MatLine, setLines, mixinDisableRipple, } from '@angular/material/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatListAvatarCssMatStyler, MatListIconCssMatStyler } from './list';
/**
 * \@docs-private
 */
var /**
 * \@docs-private
 */
MatSelectionListBase = /** @class */ (function () {
    function MatSelectionListBase() {
    }
    return MatSelectionListBase;
}());
/**
 * \@docs-private
 */
export { MatSelectionListBase };
/** @type {?} */
export var _MatSelectionListMixinBase = mixinDisableRipple(MatSelectionListBase);
/**
 * \@docs-private
 */
var /**
 * \@docs-private
 */
MatListOptionBase = /** @class */ (function () {
    function MatListOptionBase() {
    }
    return MatListOptionBase;
}());
/**
 * \@docs-private
 */
export { MatListOptionBase };
/** @type {?} */
export var _MatListOptionMixinBase = mixinDisableRipple(MatListOptionBase);
/**
 * \@docs-private
 * @type {?}
 */
export var MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatSelectionList; }),
    multi: true
};
/**
 * Change event that is being fired whenever the selected state of an option changes.
 */
var /**
 * Change event that is being fired whenever the selected state of an option changes.
 */
MatSelectionListChange = /** @class */ (function () {
    function MatSelectionListChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return MatSelectionListChange;
}());
/**
 * Change event that is being fired whenever the selected state of an option changes.
 */
export { MatSelectionListChange };
if (false) {
    /**
     * Reference to the selection list that emitted the event.
     * @type {?}
     */
    MatSelectionListChange.prototype.source;
    /**
     * Reference to the option that has been changed.
     * @type {?}
     */
    MatSelectionListChange.prototype.option;
}
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
var MatListOption = /** @class */ (function (_super) {
    tslib_1.__extends(MatListOption, _super);
    function MatListOption(_element, _changeDetector, selectionList) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this._changeDetector = _changeDetector;
        _this.selectionList = selectionList;
        _this._selected = false;
        _this._disabled = false;
        _this._hasFocus = false;
        /**
         * Whether the label should appear before or after the checkbox. Defaults to 'after'
         */
        _this.checkboxPosition = 'after';
        return _this;
    }
    Object.defineProperty(MatListOption.prototype, "value", {
        /** Value of the option */
        get: /**
         * Value of the option
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            if (this.selected && newValue !== this.value) {
                this.selected = false;
            }
            this._value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatListOption.prototype, "disabled", {
        /** Whether the option is disabled. */
        get: /**
         * Whether the option is disabled.
         * @return {?}
         */
        function () { return this._disabled || (this.selectionList && this.selectionList.disabled); },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatListOption.prototype, "selected", {
        /** Whether the option is selected. */
        get: /**
         * Whether the option is selected.
         * @return {?}
         */
        function () { return this.selectionList.selectedOptions.isSelected(this); },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var isSelected = coerceBooleanProperty(value);
            if (isSelected !== this._selected) {
                this._setSelected(isSelected);
                this.selectionList._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatListOption.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // List options that are selected at initialization can't be reported properly to the form
        // control. This is because it takes some time until the selection-list knows about all
        // available options. Also it can happen that the ControlValueAccessor has an initial value
        // that should be used instead. Deferring the value change report to the next tick ensures
        // that the form control value is not being overwritten.
        /** @type {?} */
        var wasSelected = this._selected;
        Promise.resolve().then(function () {
            if (_this._selected || wasSelected) {
                _this.selected = true;
                _this._changeDetector.markForCheck();
            }
        });
    };
    /**
     * @return {?}
     */
    MatListOption.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        setLines(this._lines, this._element);
    };
    /**
     * @return {?}
     */
    MatListOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(function () { return _this.selected = false; });
        }
        /** @type {?} */
        var hadFocus = this._hasFocus;
        /** @type {?} */
        var newActiveItem = this.selectionList._removeOptionFromList(this);
        // Only move focus if this option was focused at the time it was destroyed.
        if (hadFocus && newActiveItem) {
            newActiveItem.focus();
        }
    };
    /** Toggles the selection state of the option. */
    /**
     * Toggles the selection state of the option.
     * @return {?}
     */
    MatListOption.prototype.toggle = /**
     * Toggles the selection state of the option.
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
    /** Allows for programmatic focusing of the option. */
    /**
     * Allows for programmatic focusing of the option.
     * @return {?}
     */
    MatListOption.prototype.focus = /**
     * Allows for programmatic focusing of the option.
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * \@docs-private
     * @return {?}
     */
    MatListOption.prototype.getLabel = /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * \@docs-private
     * @return {?}
     */
    function () {
        return this._text ? (this._text.nativeElement.textContent || '') : '';
    };
    /** Whether this list item should show a ripple effect when clicked. */
    /**
     * Whether this list item should show a ripple effect when clicked.
     * @return {?}
     */
    MatListOption.prototype._isRippleDisabled = /**
     * Whether this list item should show a ripple effect when clicked.
     * @return {?}
     */
    function () {
        return this.disabled || this.disableRipple || this.selectionList.disableRipple;
    };
    /**
     * @return {?}
     */
    MatListOption.prototype._handleClick = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.toggle();
            // Emit a change event if the selected state of the option changed through user interaction.
            this.selectionList._emitChangeEvent(this);
        }
    };
    /**
     * @return {?}
     */
    MatListOption.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this.selectionList._setFocusedOption(this);
        this._hasFocus = true;
    };
    /**
     * @return {?}
     */
    MatListOption.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this.selectionList._onTouched();
        this._hasFocus = false;
    };
    /** Retrieves the DOM element of the component host. */
    /**
     * Retrieves the DOM element of the component host.
     * @return {?}
     */
    MatListOption.prototype._getHostElement = /**
     * Retrieves the DOM element of the component host.
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    /** Sets the selected state of the option. Returns whether the value has changed. */
    /**
     * Sets the selected state of the option. Returns whether the value has changed.
     * @param {?} selected
     * @return {?}
     */
    MatListOption.prototype._setSelected = /**
     * Sets the selected state of the option. Returns whether the value has changed.
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected === this._selected) {
            return false;
        }
        this._selected = selected;
        if (selected) {
            this.selectionList.selectedOptions.select(this);
        }
        else {
            this.selectionList.selectedOptions.deselect(this);
        }
        this._changeDetector.markForCheck();
        return true;
    };
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
     * used to trigger an update of the list option if the disabled state of the selection list
     * changed.
     */
    /**
     * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
     * used to trigger an update of the list option if the disabled state of the selection list
     * changed.
     * @return {?}
     */
    MatListOption.prototype._markForCheck = /**
     * Notifies Angular that the option needs to be checked in the next change detection run. Mainly
     * used to trigger an update of the list option if the disabled state of the selection list
     * changed.
     * @return {?}
     */
    function () {
        this._changeDetector.markForCheck();
    };
    MatListOption.decorators = [
        { type: Component, args: [{selector: 'mat-list-option',
                    exportAs: 'matListOption',
                    inputs: ['disableRipple'],
                    host: {
                        'role': 'option',
                        'class': 'mat-list-item mat-list-option',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                        '(click)': '_handleClick()',
                        'tabindex': '-1',
                        '[class.mat-list-item-disabled]': 'disabled',
                        '[class.mat-list-item-with-avatar]': '_avatar || _icon',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    template: "<div class=\"mat-list-item-content\" [class.mat-list-item-content-reverse]=\"checkboxPosition == 'after'\"><div mat-ripple class=\"mat-list-item-ripple\" [matRippleTrigger]=\"_getHostElement()\" [matRippleDisabled]=\"_isRippleDisabled()\"></div><mat-pseudo-checkbox [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></mat-pseudo-checkbox><div class=\"mat-list-text\" #text><ng-content></ng-content></div><ng-content select=\"[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]\"></ng-content></div>",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatListOption.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: MatSelectionList, decorators: [{ type: Inject, args: [forwardRef(function () { return MatSelectionList; }),] }] }
    ]; };
    MatListOption.propDecorators = {
        _avatar: [{ type: ContentChild, args: [MatListAvatarCssMatStyler,] }],
        _icon: [{ type: ContentChild, args: [MatListIconCssMatStyler,] }],
        _lines: [{ type: ContentChildren, args: [MatLine,] }],
        _text: [{ type: ViewChild, args: ['text',] }],
        checkboxPosition: [{ type: Input }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        selected: [{ type: Input }]
    };
    return MatListOption;
}(_MatListOptionMixinBase));
export { MatListOption };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatListOption.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    MatListOption.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    MatListOption.prototype._hasFocus;
    /** @type {?} */
    MatListOption.prototype._avatar;
    /** @type {?} */
    MatListOption.prototype._icon;
    /** @type {?} */
    MatListOption.prototype._lines;
    /**
     * DOM element containing the item's text.
     * @type {?}
     */
    MatListOption.prototype._text;
    /**
     * Whether the label should appear before or after the checkbox. Defaults to 'after'
     * @type {?}
     */
    MatListOption.prototype.checkboxPosition;
    /**
     * @type {?}
     * @private
     */
    MatListOption.prototype._value;
    /**
     * @type {?}
     * @private
     */
    MatListOption.prototype._element;
    /**
     * @type {?}
     * @private
     */
    MatListOption.prototype._changeDetector;
    /**
     * \@docs-private
     * @type {?}
     */
    MatListOption.prototype.selectionList;
}
/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 */
var MatSelectionList = /** @class */ (function (_super) {
    tslib_1.__extends(MatSelectionList, _super);
    function MatSelectionList(_element, tabIndex) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        /**
         * Emits a change event whenever the selected state of an option changes.
         */
        _this.selectionChange = new EventEmitter();
        /**
         * Tabindex of the selection list.
         */
        _this.tabIndex = 0;
        _this._disabled = false;
        /**
         * The currently selected options.
         */
        _this.selectedOptions = new SelectionModel(true);
        /**
         * View to model callback that should be called whenever the selected options change.
         */
        _this._onChange = function (_) { };
        /**
         * Subscription to sync value changes in the SelectionModel back to the SelectionList.
         */
        _this._modelChanges = Subscription.EMPTY;
        /**
         * View to model callback that should be called if the list or its options lost focus.
         */
        _this._onTouched = function () { };
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    Object.defineProperty(MatSelectionList.prototype, "disabled", {
        /** Whether the selection list is disabled. */
        get: /**
         * Whether the selection list is disabled.
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            // The `MatSelectionList` and `MatListOption` are using the `OnPush` change detection
            // strategy. Therefore the options will not check for any changes if the `MatSelectionList`
            // changed its state. Since we know that a change to `disabled` property of the list affects
            // the state of the options, we manually mark each option for check.
            if (this.options) {
                this.options.forEach(function (option) { return option._markForCheck(); });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatSelectionList.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._keyManager = new FocusKeyManager(this.options)
            .withWrap()
            .withTypeAhead()
            // Allow disabled items to be focusable. For accessibility reasons, there must be a way for
            // screenreader users, that allows reading the different options of the list.
            .skipPredicate(function () { return false; })
            .withAllowedModifierKeys(['shiftKey']);
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
        // Sync external changes to the model back to the options.
        this._modelChanges = this.selectedOptions.onChange.subscribe(function (event) {
            if (event.added) {
                for (var _i = 0, _a = event.added; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.selected = true;
                }
            }
            if (event.removed) {
                for (var _b = 0, _c = event.removed; _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.selected = false;
                }
            }
        });
    };
    /**
     * @return {?}
     */
    MatSelectionList.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._modelChanges.unsubscribe();
    };
    /** Focuses the last active list option. */
    /**
     * Focuses the last active list option.
     * @return {?}
     */
    MatSelectionList.prototype.focus = /**
     * Focuses the last active list option.
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /** Selects all of the options. */
    /**
     * Selects all of the options.
     * @return {?}
     */
    MatSelectionList.prototype.selectAll = /**
     * Selects all of the options.
     * @return {?}
     */
    function () {
        this._setAllOptionsSelected(true);
    };
    /** Deselects all of the options. */
    /**
     * Deselects all of the options.
     * @return {?}
     */
    MatSelectionList.prototype.deselectAll = /**
     * Deselects all of the options.
     * @return {?}
     */
    function () {
        this._setAllOptionsSelected(false);
    };
    /** Sets the focused option of the selection-list. */
    /**
     * Sets the focused option of the selection-list.
     * @param {?} option
     * @return {?}
     */
    MatSelectionList.prototype._setFocusedOption = /**
     * Sets the focused option of the selection-list.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this._keyManager.updateActiveItemIndex(this._getOptionIndex(option));
    };
    /**
     * Removes an option from the selection list and updates the active item.
     * @returns Currently-active item.
     */
    /**
     * Removes an option from the selection list and updates the active item.
     * @param {?} option
     * @return {?} Currently-active item.
     */
    MatSelectionList.prototype._removeOptionFromList = /**
     * Removes an option from the selection list and updates the active item.
     * @param {?} option
     * @return {?} Currently-active item.
     */
    function (option) {
        /** @type {?} */
        var optionIndex = this._getOptionIndex(option);
        if (optionIndex > -1 && this._keyManager.activeItemIndex === optionIndex) {
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.updateActiveItemIndex(optionIndex - 1);
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.updateActiveItemIndex(Math.min(optionIndex + 1, this.options.length - 1));
            }
        }
        return this._keyManager.activeItem;
    };
    /** Passes relevant key presses to our key manager. */
    /**
     * Passes relevant key presses to our key manager.
     * @param {?} event
     * @return {?}
     */
    MatSelectionList.prototype._keydown = /**
     * Passes relevant key presses to our key manager.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = event.keyCode;
        /** @type {?} */
        var manager = this._keyManager;
        /** @type {?} */
        var previousFocusIndex = manager.activeItemIndex;
        /** @type {?} */
        var hasModifier = hasModifierKey(event);
        switch (keyCode) {
            case SPACE:
            case ENTER:
                if (!hasModifier) {
                    this._toggleFocusedOption();
                    // Always prevent space from scrolling the page since the list has focus
                    event.preventDefault();
                }
                break;
            case HOME:
            case END:
                if (!hasModifier) {
                    keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
                    event.preventDefault();
                }
                break;
            case A:
                if (hasModifierKey(event, 'ctrlKey')) {
                    this.options.find(function (option) { return !option.selected; }) ? this.selectAll() : this.deselectAll();
                    event.preventDefault();
                }
                break;
            default:
                manager.onKeydown(event);
        }
        if ((keyCode === UP_ARROW || keyCode === DOWN_ARROW) && event.shiftKey &&
            manager.activeItemIndex !== previousFocusIndex) {
            this._toggleFocusedOption();
        }
    };
    /** Reports a value change to the ControlValueAccessor */
    /**
     * Reports a value change to the ControlValueAccessor
     * @return {?}
     */
    MatSelectionList.prototype._reportValueChange = /**
     * Reports a value change to the ControlValueAccessor
     * @return {?}
     */
    function () {
        if (this.options) {
            this._onChange(this._getSelectedOptionValues());
        }
    };
    /** Emits a change event if the selected state of an option changed. */
    /**
     * Emits a change event if the selected state of an option changed.
     * @param {?} option
     * @return {?}
     */
    MatSelectionList.prototype._emitChangeEvent = /**
     * Emits a change event if the selected state of an option changed.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new MatSelectionListChange(this, option));
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} values
     * @return {?}
     */
    MatSelectionList.prototype.writeValue = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    };
    /** Implemented as a part of ControlValueAccessor. */
    /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    MatSelectionList.prototype.setDisabledState = /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    MatSelectionList.prototype.registerOnChange = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    MatSelectionList.prototype.registerOnTouched = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    /** Sets the selected options based on the specified values. */
    /**
     * Sets the selected options based on the specified values.
     * @private
     * @param {?} values
     * @return {?}
     */
    MatSelectionList.prototype._setOptionsFromValues = /**
     * Sets the selected options based on the specified values.
     * @private
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.options.forEach(function (option) { return option._setSelected(false); });
        values.forEach(function (value) {
            /** @type {?} */
            var correspondingOption = _this.options.find(function (option) {
                // Skip options that are already in the model. This allows us to handle cases
                // where the same primitive value is selected multiple times.
                if (option.selected) {
                    return false;
                }
                return _this.compareWith ? _this.compareWith(option.value, value) : option.value === value;
            });
            if (correspondingOption) {
                correspondingOption._setSelected(true);
            }
        });
    };
    /** Returns the values of the selected options. */
    /**
     * Returns the values of the selected options.
     * @private
     * @return {?}
     */
    MatSelectionList.prototype._getSelectedOptionValues = /**
     * Returns the values of the selected options.
     * @private
     * @return {?}
     */
    function () {
        return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
    };
    /** Toggles the state of the currently focused option if enabled. */
    /**
     * Toggles the state of the currently focused option if enabled.
     * @private
     * @return {?}
     */
    MatSelectionList.prototype._toggleFocusedOption = /**
     * Toggles the state of the currently focused option if enabled.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            /** @type {?} */
            var focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption && !focusedOption.disabled) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user
                // interaction.
                this._emitChangeEvent(focusedOption);
            }
        }
    };
    /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     */
    /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     * @private
     * @param {?} isSelected
     * @return {?}
     */
    MatSelectionList.prototype._setAllOptionsSelected = /**
     * Sets the selected state on all of the options
     * and emits an event if anything changed.
     * @private
     * @param {?} isSelected
     * @return {?}
     */
    function (isSelected) {
        // Keep track of whether anything changed, because we only want to
        // emit the changed event when something actually changed.
        /** @type {?} */
        var hasChanged = false;
        this.options.forEach(function (option) {
            if (option._setSelected(isSelected)) {
                hasChanged = true;
            }
        });
        if (hasChanged) {
            this._reportValueChange();
        }
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of options.
     */
    /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    MatSelectionList.prototype._isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    /** Returns the index of the specified list option. */
    /**
     * Returns the index of the specified list option.
     * @private
     * @param {?} option
     * @return {?}
     */
    MatSelectionList.prototype._getOptionIndex = /**
     * Returns the index of the specified list option.
     * @private
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.options.toArray().indexOf(option);
    };
    MatSelectionList.decorators = [
        { type: Component, args: [{selector: 'mat-selection-list',
                    exportAs: 'matSelectionList',
                    inputs: ['disableRipple'],
                    host: {
                        'role': 'listbox',
                        '[tabIndex]': 'tabIndex',
                        'class': 'mat-selection-list mat-list-base',
                        '(focus)': 'focus()',
                        '(blur)': '_onTouched()',
                        '(keydown)': '_keydown($event)',
                        'aria-multiselectable': 'true',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    template: '<ng-content></ng-content>',
                    styles: [".mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list-base .mat-subheader{margin:0}.mat-list-base{padding-top:8px;display:block;-webkit-tap-highlight-color:transparent}.mat-list-base .mat-subheader{height:48px;line-height:16px}.mat-list-base .mat-subheader:first-child{margin-top:-8px}.mat-list-base .mat-list-item,.mat-list-base .mat-list-option{display:block;height:48px;-webkit-tap-highlight-color:transparent;width:100%;padding:0}.mat-list-base .mat-list-item .mat-list-item-content,.mat-list-base .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base .mat-list-item .mat-list-item-content-reverse,.mat-list-base .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base .mat-list-item .mat-list-item-ripple,.mat-list-base .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar,.mat-list-base .mat-list-option.mat-list-item-with-avatar{height:56px}.mat-list-base .mat-list-item.mat-2-line,.mat-list-base .mat-list-option.mat-2-line{height:72px}.mat-list-base .mat-list-item.mat-3-line,.mat-list-base .mat-list-option.mat-3-line{height:88px}.mat-list-base .mat-list-item.mat-multi-line,.mat-list-base .mat-list-option.mat-multi-line{height:auto}.mat-list-base .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base .mat-list-item .mat-list-text,.mat-list-base .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base .mat-list-item .mat-list-text>*,.mat-list-base .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list-base .mat-list-item .mat-list-text:empty,.mat-list-base .mat-list-option .mat-list-text:empty{display:none}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base .mat-list-item .mat-list-avatar,.mat-list-base .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%;object-fit:cover}.mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:72px;width:calc(100% - 72px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:72px}.mat-list-base .mat-list-item .mat-list-icon,.mat-list-base .mat-list-option .mat-list-icon{flex-shrink:0;width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:64px;width:calc(100% - 64px)}[dir=rtl] .mat-list-base .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:64px}.mat-list-base .mat-list-item .mat-divider,.mat-list-base .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base .mat-list-item .mat-divider,[dir=rtl] .mat-list-base .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-list-base[dense]{padding-top:4px;display:block}.mat-list-base[dense] .mat-subheader{height:40px;line-height:8px}.mat-list-base[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list-base[dense] .mat-list-item,.mat-list-base[dense] .mat-list-option{display:block;height:40px;-webkit-tap-highlight-color:transparent;width:100%;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-item-content,.mat-list-base[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list-base[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list-base[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list-base[dense] .mat-list-item .mat-list-item-ripple,.mat-list-base[dense] .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar{height:48px}.mat-list-base[dense] .mat-list-item.mat-2-line,.mat-list-base[dense] .mat-list-option.mat-2-line{height:60px}.mat-list-base[dense] .mat-list-item.mat-3-line,.mat-list-base[dense] .mat-list-option.mat-3-line{height:76px}.mat-list-base[dense] .mat-list-item.mat-multi-line,.mat-list-base[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list-base[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list-base[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list-base[dense] .mat-list-item .mat-list-text,.mat-list-base[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0}.mat-list-base[dense] .mat-list-item .mat-list-text>*,.mat-list-base[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list-base[dense] .mat-list-item .mat-list-text:empty,.mat-list-base[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:0;padding-left:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content .mat-list-text{padding-right:16px;padding-left:0}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-left:0;padding-right:16px}[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-item.mat-list-option .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar .mat-list-item-content-reverse .mat-list-text,[dir=rtl] .mat-list-base[dense] .mat-list-option.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:0;padding-left:16px}.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-item.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content .mat-list-text,.mat-list-base[dense] .mat-list-option.mat-list-item-with-avatar.mat-list-option .mat-list-item-content-reverse .mat-list-text{padding-right:16px;padding-left:16px}.mat-list-base[dense] .mat-list-item .mat-list-avatar,.mat-list-base[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:36px;height:36px;border-radius:50%;object-fit:cover}.mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:68px;width:calc(100% - 68px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-avatar~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-avatar~.mat-divider-inset{margin-left:auto;margin-right:68px}.mat-list-base[dense] .mat-list-item .mat-list-icon,.mat-list-base[dense] .mat-list-option .mat-list-icon{flex-shrink:0;width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:60px;width:calc(100% - 60px)}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-list-icon~.mat-divider-inset,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-list-icon~.mat-divider-inset{margin-left:auto;margin-right:60px}.mat-list-base[dense] .mat-list-item .mat-divider,.mat-list-base[dense] .mat-list-option .mat-divider{position:absolute;bottom:0;left:0;width:100%;margin:0}[dir=rtl] .mat-list-base[dense] .mat-list-item .mat-divider,[dir=rtl] .mat-list-base[dense] .mat-list-option .mat-divider{margin-left:auto;margin-right:0}.mat-list-base[dense] .mat-list-item .mat-divider.mat-divider-inset,.mat-list-base[dense] .mat-list-option .mat-divider.mat-divider-inset{position:absolute}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item{cursor:pointer;outline:0}mat-action-list button{background:0 0;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:transparent}mat-action-list button::-moz-focus-inner{border:0}mat-action-list .mat-list-item{cursor:pointer;outline:inherit}.mat-list-option:not(.mat-list-item-disabled){cursor:pointer;outline:0}@media (-ms-high-contrast:active){.mat-selection-list:focus{outline-style:dotted}.mat-list-option:focus,.mat-list-option:hover,.mat-nav-list .mat-list-item:focus,.mat-nav-list .mat-list-item:hover,mat-action-list .mat-list-item:focus,mat-action-list .mat-list-item:hover{outline:dotted 1px}}@media (hover:none){.mat-list-option:not(.mat-list-item-disabled):hover,.mat-nav-list .mat-list-item:not(.mat-list-item-disabled):hover{background:0 0}}"],
                    encapsulation: ViewEncapsulation.None,
                    providers: [MAT_SELECTION_LIST_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatSelectionList.ctorParameters = function () { return [
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] }
    ]; };
    MatSelectionList.propDecorators = {
        options: [{ type: ContentChildren, args: [MatListOption, { descendants: true },] }],
        selectionChange: [{ type: Output }],
        tabIndex: [{ type: Input }],
        compareWith: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return MatSelectionList;
}(_MatSelectionListMixinBase));
export { MatSelectionList };
if (false) {
    /**
     * The FocusKeyManager which handles focus.
     * @type {?}
     */
    MatSelectionList.prototype._keyManager;
    /**
     * The option components contained within this selection-list.
     * @type {?}
     */
    MatSelectionList.prototype.options;
    /**
     * Emits a change event whenever the selected state of an option changes.
     * @type {?}
     */
    MatSelectionList.prototype.selectionChange;
    /**
     * Tabindex of the selection list.
     * @type {?}
     */
    MatSelectionList.prototype.tabIndex;
    /**
     * Function used for comparing an option against the selected value when determining which
     * options should appear as selected. The first argument is the value of an options. The second
     * one is a value from the selected value. A boolean must be returned.
     * @type {?}
     */
    MatSelectionList.prototype.compareWith;
    /**
     * @type {?}
     * @private
     */
    MatSelectionList.prototype._disabled;
    /**
     * The currently selected options.
     * @type {?}
     */
    MatSelectionList.prototype.selectedOptions;
    /**
     * View to model callback that should be called whenever the selected options change.
     * @type {?}
     * @private
     */
    MatSelectionList.prototype._onChange;
    /**
     * Used for storing the values that were assigned before the options were initialized.
     * @type {?}
     * @private
     */
    MatSelectionList.prototype._tempValues;
    /**
     * Subscription to sync value changes in the SelectionModel back to the SelectionList.
     * @type {?}
     * @private
     */
    MatSelectionList.prototype._modelChanges;
    /**
     * View to model callback that should be called if the list or its options lost focus.
     * @type {?}
     */
    MatSelectionList.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    MatSelectionList.prototype._element;
}
//# sourceMappingURL=selection-list.js.map