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
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { BACKSPACE, END, HOME } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Self, ViewEncapsulation, } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinErrorState, } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { merge, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { MatChip } from './chip';
// Boilerplate for applying mixins to MatChipList.
/**
 * \@docs-private
 */
var 
// Boilerplate for applying mixins to MatChipList.
/**
 * \@docs-private
 */
MatChipListBase = /** @class */ (function () {
    function MatChipListBase(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) {
        this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        this._parentForm = _parentForm;
        this._parentFormGroup = _parentFormGroup;
        this.ngControl = ngControl;
    }
    return MatChipListBase;
}());
// Boilerplate for applying mixins to MatChipList.
/**
 * \@docs-private
 */
export { MatChipListBase };
if (false) {
    /** @type {?} */
    MatChipListBase.prototype._defaultErrorStateMatcher;
    /** @type {?} */
    MatChipListBase.prototype._parentForm;
    /** @type {?} */
    MatChipListBase.prototype._parentFormGroup;
    /**
     * \@docs-private
     * @type {?}
     */
    MatChipListBase.prototype.ngControl;
}
/** @type {?} */
export var _MatChipListMixinBase = mixinErrorState(MatChipListBase);
// Increasing integer for generating unique ids for chip-list components.
/** @type {?} */
var nextUniqueId = 0;
/**
 * Change event object that is emitted when the chip list value has changed.
 */
var /**
 * Change event object that is emitted when the chip list value has changed.
 */
MatChipListChange = /** @class */ (function () {
    function MatChipListChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return MatChipListChange;
}());
/**
 * Change event object that is emitted when the chip list value has changed.
 */
export { MatChipListChange };
if (false) {
    /**
     * Chip list that emitted the event.
     * @type {?}
     */
    MatChipListChange.prototype.source;
    /**
     * Value of the chip list when the event was emitted.
     * @type {?}
     */
    MatChipListChange.prototype.value;
}
/**
 * A material design chips component (named ChipList for its similarity to the List component).
 */
var MatChipList = /** @class */ (function (_super) {
    tslib_1.__extends(MatChipList, _super);
    function MatChipList(_elementRef, _changeDetectorRef, _dir, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, ngControl) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._elementRef = _elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._dir = _dir;
        _this.ngControl = ngControl;
        /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         */
        _this.controlType = 'mat-chip-list';
        /**
         * When a chip is destroyed, we store the index of the destroyed chip until the chips
         * query list notifies about the update. This is necessary because we cannot determine an
         * appropriate chip that should receive focus until the array of chips updated completely.
         */
        _this._lastDestroyedChipIndex = null;
        /**
         * Subject that emits when the component has been destroyed.
         */
        _this._destroyed = new Subject();
        /**
         * Uid of the chip list
         */
        _this._uid = "mat-chip-list-" + nextUniqueId++;
        /**
         * Tab index for the chip list.
         */
        _this._tabIndex = 0;
        /**
         * User defined tab index.
         * When it is not null, use user defined tab index. Otherwise use _tabIndex
         */
        _this._userTabIndex = null;
        /**
         * Function when touched
         */
        _this._onTouched = function () { };
        /**
         * Function when changed
         */
        _this._onChange = function () { };
        _this._multiple = false;
        _this._compareWith = function (o1, o2) { return o1 === o2; };
        _this._required = false;
        _this._disabled = false;
        /**
         * Orientation of the chip list.
         */
        _this.ariaOrientation = 'horizontal';
        _this._selectable = true;
        /**
         * Event emitted when the selected chip list value has been changed by the user.
         */
        _this.change = new EventEmitter();
        /**
         * Event that emits whenever the raw value of the chip-list changes. This is here primarily
         * to facilitate the two-way binding for the `value` input.
         * \@docs-private
         */
        _this.valueChange = new EventEmitter();
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        return _this;
    }
    Object.defineProperty(MatChipList.prototype, "selected", {
        /** The array of selected chips inside chip list. */
        get: /**
         * The array of selected chips inside chip list.
         * @return {?}
         */
        function () {
            return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "role", {
        /** The ARIA role applied to the chip list. */
        get: /**
         * The ARIA role applied to the chip list.
         * @return {?}
         */
        function () { return this.empty ? null : 'listbox'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "multiple", {
        /** Whether the user should be allowed to select multiple chips. */
        get: /**
         * Whether the user should be allowed to select multiple chips.
         * @return {?}
         */
        function () { return this._multiple; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "compareWith", {
        /**
         * A function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         */
        get: /**
         * A function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         * @return {?}
         */
        function () { return this._compareWith; },
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._compareWith = fn;
            if (this._selectionModel) {
                // A different comparator means the selection could change.
                this._initializeSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "value", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.writeValue(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "id", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._chipInput ? this._chipInput.id : this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "required", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "placeholder", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return this._chipInput ? this._chipInput.placeholder : this._placeholder;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "focused", {
        /** Whether any chips or the matChipInput inside of this chip-list has focus. */
        get: /**
         * Whether any chips or the matChipInput inside of this chip-list has focus.
         * @return {?}
         */
        function () {
            return (this._chipInput && this._chipInput.focused) || this._hasFocusedChip();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "empty", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () {
            return (!this._chipInput || this._chipInput.empty) && this.chips.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "shouldLabelFloat", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return !this.empty || this.focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "disabled", {
        /**
         * Implemented as part of MatFormFieldControl.
         * @docs-private
         */
        get: /**
         * Implemented as part of MatFormFieldControl.
         * \@docs-private
         * @return {?}
         */
        function () { return this.ngControl ? !!this.ngControl.disabled : this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = coerceBooleanProperty(value);
            this._syncChipsDisabledState();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "selectable", {
        /**
         * Whether or not this chip list is selectable. When a chip list is not selectable,
         * the selected states for all the chips inside the chip list are always ignored.
         */
        get: /**
         * Whether or not this chip list is selectable. When a chip list is not selectable,
         * the selected states for all the chips inside the chip list are always ignored.
         * @return {?}
         */
        function () { return this._selectable; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._selectable = coerceBooleanProperty(value);
            if (this.chips) {
                this.chips.forEach(function (chip) { return chip.chipListSelectable = _this._selectable; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "tabIndex", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._userTabIndex = value;
            this._tabIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipSelectionChanges", {
        /** Combined stream of all of the child chips' selection change events. */
        get: /**
         * Combined stream of all of the child chips' selection change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.chips.map(function (chip) { return chip.selectionChange; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipFocusChanges", {
        /** Combined stream of all of the child chips' focus change events. */
        get: /**
         * Combined stream of all of the child chips' focus change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.chips.map(function (chip) { return chip._onFocus; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipBlurChanges", {
        /** Combined stream of all of the child chips' blur change events. */
        get: /**
         * Combined stream of all of the child chips' blur change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.chips.map(function (chip) { return chip._onBlur; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipList.prototype, "chipRemoveChanges", {
        /** Combined stream of all of the child chips' remove change events. */
        get: /**
         * Combined stream of all of the child chips' remove change events.
         * @return {?}
         */
        function () {
            return merge.apply(void 0, this.chips.map(function (chip) { return chip.destroyed; }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatChipList.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._keyManager = new FocusKeyManager(this.chips)
            .withWrap()
            .withVerticalOrientation()
            .withHorizontalOrientation(this._dir ? this._dir.value : 'ltr');
        if (this._dir) {
            this._dir.change
                .pipe(takeUntil(this._destroyed))
                .subscribe(function (dir) { return _this._keyManager.withHorizontalOrientation(dir); });
        }
        // Prevents the chip list from capturing focus and redirecting
        // it back to the first chip when the user tabs out.
        this._keyManager.tabOut.pipe(takeUntil(this._destroyed)).subscribe(function () {
            _this._tabIndex = -1;
            setTimeout(function () {
                _this._tabIndex = _this._userTabIndex || 0;
                _this._changeDetectorRef.markForCheck();
            });
        });
        // When the list changes, re-subscribe
        this.chips.changes.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(function () {
            if (_this.disabled) {
                // Since this happens after the content has been
                // checked, we need to defer it to the next tick.
                Promise.resolve().then(function () {
                    _this._syncChipsDisabledState();
                });
            }
            _this._resetChips();
            // Reset chips selected/deselected status
            _this._initializeSelection();
            // Check to see if we need to update our tab index
            _this._updateTabIndex();
            // Check to see if we have a destroyed chip and need to refocus
            _this._updateFocusForDestroyedChips();
            _this.stateChanges.next();
        });
    };
    /**
     * @return {?}
     */
    MatChipList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._selectionModel = new SelectionModel(this.multiple, undefined, false);
        this.stateChanges.next();
    };
    /**
     * @return {?}
     */
    MatChipList.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    };
    /**
     * @return {?}
     */
    MatChipList.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed.next();
        this._destroyed.complete();
        this.stateChanges.complete();
        this._dropSubscriptions();
    };
    /** Associates an HTML input element with this chip list. */
    /**
     * Associates an HTML input element with this chip list.
     * @param {?} inputElement
     * @return {?}
     */
    MatChipList.prototype.registerInput = /**
     * Associates an HTML input element with this chip list.
     * @param {?} inputElement
     * @return {?}
     */
    function (inputElement) {
        this._chipInput = inputElement;
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} ids
     * @return {?}
     */
    MatChipList.prototype.setDescribedByIds = /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} ids
     * @return {?}
     */
    function (ids) { this._ariaDescribedby = ids.join(' '); };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    MatChipList.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.chips) {
            this._setSelectionByValue(value, false);
        }
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    MatChipList.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    MatChipList.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    MatChipList.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        this.stateChanges.next();
    };
    /**
     * Implemented as part of MatFormFieldControl.
     * @docs-private
     */
    /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    MatChipList.prototype.onContainerClick = /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._originatesFromChip(event)) {
            this.focus();
        }
    };
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     */
    /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     * @return {?}
     */
    MatChipList.prototype.focus = /**
     * Focuses the first non-disabled chip in this chip list, or the associated input when there
     * are no eligible chips.
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        // TODO: ARIA says this should focus the first `selected` chip if any are selected.
        // Focus on first element if there's no chipInput inside chip-list
        if (this._chipInput && this._chipInput.focused) {
            // do nothing
        }
        else if (this.chips.length > 0) {
            this._keyManager.setFirstItemActive();
            this.stateChanges.next();
        }
        else {
            this._focusInput();
            this.stateChanges.next();
        }
    };
    /** Attempt to focus an input if we have one. */
    /**
     * Attempt to focus an input if we have one.
     * @return {?}
     */
    MatChipList.prototype._focusInput = /**
     * Attempt to focus an input if we have one.
     * @return {?}
     */
    function () {
        if (this._chipInput) {
            this._chipInput.focus();
        }
    };
    /**
     * Pass events to the keyboard manager. Available here for tests.
     */
    /**
     * Pass events to the keyboard manager. Available here for tests.
     * @param {?} event
     * @return {?}
     */
    MatChipList.prototype._keydown = /**
     * Pass events to the keyboard manager. Available here for tests.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var target = (/** @type {?} */ (event.target));
        // If they are on an empty input and hit backspace, focus the last chip
        if (event.keyCode === BACKSPACE && this._isInputEmpty(target)) {
            this._keyManager.setLastItemActive();
            event.preventDefault();
        }
        else if (target && target.classList.contains('mat-chip')) {
            if (event.keyCode === HOME) {
                this._keyManager.setFirstItemActive();
                event.preventDefault();
            }
            else if (event.keyCode === END) {
                this._keyManager.setLastItemActive();
                event.preventDefault();
            }
            else {
                this._keyManager.onKeydown(event);
            }
            this.stateChanges.next();
        }
    };
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     */
    /**
     * Check the tab index as you should not be allowed to focus an empty list.
     * @protected
     * @return {?}
     */
    MatChipList.prototype._updateTabIndex = /**
     * Check the tab index as you should not be allowed to focus an empty list.
     * @protected
     * @return {?}
     */
    function () {
        // If we have 0 chips, we should not allow keyboard focus
        this._tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
    };
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     */
    /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     * @protected
     * @return {?}
     */
    MatChipList.prototype._updateFocusForDestroyedChips = /**
     * If the amount of chips changed, we need to update the
     * key manager state and focus the next closest chip.
     * @protected
     * @return {?}
     */
    function () {
        if (this._lastDestroyedChipIndex != null && this.chips.length) {
            /** @type {?} */
            var newChipIndex = Math.min(this._lastDestroyedChipIndex, this.chips.length - 1);
            this._keyManager.setActiveItem(newChipIndex);
        }
        this._lastDestroyedChipIndex = null;
    };
    /**
     * Utility to ensure all indexes are valid.
     *
     * @param index The index to be checked.
     * @returns True if the index is valid for our list of chips.
     */
    /**
     * Utility to ensure all indexes are valid.
     *
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of chips.
     */
    MatChipList.prototype._isValidIndex = /**
     * Utility to ensure all indexes are valid.
     *
     * @private
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of chips.
     */
    function (index) {
        return index >= 0 && index < this.chips.length;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    MatChipList.prototype._isInputEmpty = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        if (element && element.nodeName.toLowerCase() === 'input') {
            /** @type {?} */
            var input = (/** @type {?} */ (element));
            return !input.value;
        }
        return false;
    };
    /**
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    MatChipList.prototype._setSelectionByValue = /**
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?}
     */
    function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        this._clearSelection();
        this.chips.forEach(function (chip) { return chip.deselect(); });
        if (Array.isArray(value)) {
            value.forEach(function (currentValue) { return _this._selectValue(currentValue, isUserInput); });
            this._sortValues();
        }
        else {
            /** @type {?} */
            var correspondingChip = this._selectValue(value, isUserInput);
            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what chip the user interacted with last.
            if (correspondingChip) {
                if (isUserInput) {
                    this._keyManager.setActiveItem(correspondingChip);
                }
            }
        }
    };
    /**
     * Finds and selects the chip based on its value.
     * @returns Chip that has the corresponding value.
     */
    /**
     * Finds and selects the chip based on its value.
     * @private
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?} Chip that has the corresponding value.
     */
    MatChipList.prototype._selectValue = /**
     * Finds and selects the chip based on its value.
     * @private
     * @param {?} value
     * @param {?=} isUserInput
     * @return {?} Chip that has the corresponding value.
     */
    function (value, isUserInput) {
        var _this = this;
        if (isUserInput === void 0) { isUserInput = true; }
        /** @type {?} */
        var correspondingChip = this.chips.find(function (chip) {
            return chip.value != null && _this._compareWith(chip.value, value);
        });
        if (correspondingChip) {
            isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
            this._selectionModel.select(correspondingChip);
        }
        return correspondingChip;
    };
    /**
     * @private
     * @return {?}
     */
    MatChipList.prototype._initializeSelection = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Defer setting the value in order to avoid the "Expression
        // has changed after it was checked" errors from Angular.
        Promise.resolve().then(function () {
            if (_this.ngControl || _this._value) {
                _this._setSelectionByValue(_this.ngControl ? _this.ngControl.value : _this._value, false);
                _this.stateChanges.next();
            }
        });
    };
    /**
     * Deselects every chip in the list.
     * @param skip Chip that should not be deselected.
     */
    /**
     * Deselects every chip in the list.
     * @private
     * @param {?=} skip Chip that should not be deselected.
     * @return {?}
     */
    MatChipList.prototype._clearSelection = /**
     * Deselects every chip in the list.
     * @private
     * @param {?=} skip Chip that should not be deselected.
     * @return {?}
     */
    function (skip) {
        this._selectionModel.clear();
        this.chips.forEach(function (chip) {
            if (chip !== skip) {
                chip.deselect();
            }
        });
        this.stateChanges.next();
    };
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @private
     * @return {?}
     */
    MatChipList.prototype._sortValues = /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._multiple) {
            this._selectionModel.clear();
            this.chips.forEach(function (chip) {
                if (chip.selected) {
                    _this._selectionModel.select(chip);
                }
            });
            this.stateChanges.next();
        }
    };
    /** Emits change event to set the model value. */
    /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    MatChipList.prototype._propagateChanges = /**
     * Emits change event to set the model value.
     * @private
     * @param {?=} fallbackValue
     * @return {?}
     */
    function (fallbackValue) {
        /** @type {?} */
        var valueToEmit = null;
        if (Array.isArray(this.selected)) {
            valueToEmit = this.selected.map(function (chip) { return chip.value; });
        }
        else {
            valueToEmit = this.selected ? this.selected.value : fallbackValue;
        }
        this._value = valueToEmit;
        this.change.emit(new MatChipListChange(this, valueToEmit));
        this.valueChange.emit(valueToEmit);
        this._onChange(valueToEmit);
        this._changeDetectorRef.markForCheck();
    };
    /** When blurred, mark the field as touched when focus moved outside the chip list. */
    /**
     * When blurred, mark the field as touched when focus moved outside the chip list.
     * @return {?}
     */
    MatChipList.prototype._blur = /**
     * When blurred, mark the field as touched when focus moved outside the chip list.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._hasFocusedChip()) {
            this._keyManager.setActiveItem(-1);
        }
        if (!this.disabled) {
            if (this._chipInput) {
                // If there's a chip input, we should check whether the focus moved to chip input.
                // If the focus is not moved to chip input, mark the field as touched. If the focus moved
                // to chip input, do nothing.
                // Timeout is needed to wait for the focus() event trigger on chip input.
                setTimeout(function () {
                    if (!_this.focused) {
                        _this._markAsTouched();
                    }
                });
            }
            else {
                // If there's no chip input, then mark the field as touched.
                this._markAsTouched();
            }
        }
    };
    /** Mark the field as touched */
    /**
     * Mark the field as touched
     * @return {?}
     */
    MatChipList.prototype._markAsTouched = /**
     * Mark the field as touched
     * @return {?}
     */
    function () {
        this._onTouched();
        this._changeDetectorRef.markForCheck();
        this.stateChanges.next();
    };
    /**
     * @private
     * @return {?}
     */
    MatChipList.prototype._resetChips = /**
     * @private
     * @return {?}
     */
    function () {
        this._dropSubscriptions();
        this._listenToChipsFocus();
        this._listenToChipsSelection();
        this._listenToChipsRemoved();
    };
    /**
     * @private
     * @return {?}
     */
    MatChipList.prototype._dropSubscriptions = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._chipFocusSubscription) {
            this._chipFocusSubscription.unsubscribe();
            this._chipFocusSubscription = null;
        }
        if (this._chipBlurSubscription) {
            this._chipBlurSubscription.unsubscribe();
            this._chipBlurSubscription = null;
        }
        if (this._chipSelectionSubscription) {
            this._chipSelectionSubscription.unsubscribe();
            this._chipSelectionSubscription = null;
        }
        if (this._chipRemoveSubscription) {
            this._chipRemoveSubscription.unsubscribe();
            this._chipRemoveSubscription = null;
        }
    };
    /** Listens to user-generated selection events on each chip. */
    /**
     * Listens to user-generated selection events on each chip.
     * @private
     * @return {?}
     */
    MatChipList.prototype._listenToChipsSelection = /**
     * Listens to user-generated selection events on each chip.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._chipSelectionSubscription = this.chipSelectionChanges.subscribe(function (event) {
            event.source.selected
                ? _this._selectionModel.select(event.source)
                : _this._selectionModel.deselect(event.source);
            // For single selection chip list, make sure the deselected value is unselected.
            if (!_this.multiple) {
                _this.chips.forEach(function (chip) {
                    if (!_this._selectionModel.isSelected(chip) && chip.selected) {
                        chip.deselect();
                    }
                });
            }
            if (event.isUserInput) {
                _this._propagateChanges();
            }
        });
    };
    /** Listens to user-generated selection events on each chip. */
    /**
     * Listens to user-generated selection events on each chip.
     * @private
     * @return {?}
     */
    MatChipList.prototype._listenToChipsFocus = /**
     * Listens to user-generated selection events on each chip.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._chipFocusSubscription = this.chipFocusChanges.subscribe(function (event) {
            /** @type {?} */
            var chipIndex = _this.chips.toArray().indexOf(event.chip);
            if (_this._isValidIndex(chipIndex)) {
                _this._keyManager.updateActiveItemIndex(chipIndex);
            }
            _this.stateChanges.next();
        });
        this._chipBlurSubscription = this.chipBlurChanges.subscribe(function () {
            _this._blur();
            _this.stateChanges.next();
        });
    };
    /**
     * @private
     * @return {?}
     */
    MatChipList.prototype._listenToChipsRemoved = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._chipRemoveSubscription = this.chipRemoveChanges.subscribe(function (event) {
            /** @type {?} */
            var chip = event.chip;
            /** @type {?} */
            var chipIndex = _this.chips.toArray().indexOf(event.chip);
            // In case the chip that will be removed is currently focused, we temporarily store
            // the index in order to be able to determine an appropriate sibling chip that will
            // receive focus.
            if (_this._isValidIndex(chipIndex) && chip._hasFocus) {
                _this._lastDestroyedChipIndex = chipIndex;
            }
        });
    };
    /** Checks whether an event comes from inside a chip element. */
    /**
     * Checks whether an event comes from inside a chip element.
     * @private
     * @param {?} event
     * @return {?}
     */
    MatChipList.prototype._originatesFromChip = /**
     * Checks whether an event comes from inside a chip element.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currentElement = (/** @type {?} */ (event.target));
        while (currentElement && currentElement !== this._elementRef.nativeElement) {
            if (currentElement.classList.contains('mat-chip')) {
                return true;
            }
            currentElement = currentElement.parentElement;
        }
        return false;
    };
    /** Checks whether any of the chips is focused. */
    /**
     * Checks whether any of the chips is focused.
     * @private
     * @return {?}
     */
    MatChipList.prototype._hasFocusedChip = /**
     * Checks whether any of the chips is focused.
     * @private
     * @return {?}
     */
    function () {
        return this.chips.some(function (chip) { return chip._hasFocus; });
    };
    /** Syncs the list's disabled state with the individual chips. */
    /**
     * Syncs the list's disabled state with the individual chips.
     * @private
     * @return {?}
     */
    MatChipList.prototype._syncChipsDisabledState = /**
     * Syncs the list's disabled state with the individual chips.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.chips) {
            this.chips.forEach(function (chip) {
                chip.disabled = _this._disabled;
            });
        }
    };
    MatChipList.decorators = [
        { type: Component, args: [{selector: 'mat-chip-list',
                    template: "<div class=\"mat-chip-list-wrapper\"><ng-content></ng-content></div>",
                    exportAs: 'matChipList',
                    host: {
                        '[attr.tabindex]': 'disabled ? null : _tabIndex',
                        '[attr.aria-describedby]': '_ariaDescribedby || null',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[attr.aria-invalid]': 'errorState',
                        '[attr.aria-multiselectable]': 'multiple',
                        '[attr.role]': 'role',
                        '[class.mat-chip-list-disabled]': 'disabled',
                        '[class.mat-chip-list-invalid]': 'errorState',
                        '[class.mat-chip-list-required]': 'required',
                        '[attr.aria-orientation]': 'ariaOrientation',
                        'class': 'mat-chip-list',
                        '(focus)': 'focus()',
                        '(blur)': '_blur()',
                        '(keydown)': '_keydown($event)',
                        '[id]': '_uid',
                    },
                    providers: [{ provide: MatFormFieldControl, useExisting: MatChipList }],
                    styles: [".mat-chip{position:relative;overflow:hidden;box-sizing:border-box;-webkit-tap-highlight-color:transparent;transform:translateZ(0)}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}.mat-standard-chip .mat-chip-remove.mat-icon{width:18px;height:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:'';pointer-events:none;transition:opacity .2s cubic-bezier(.35,0,.25,1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:0}.mat-standard-chip:focus::after{opacity:.16}@media (-ms-high-contrast:active){.mat-standard-chip{outline:solid 1px}.mat-standard-chip:focus{outline:dotted 2px}}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper .mat-standard-chip,.mat-chip-list-wrapper input.mat-input-element{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatChipList.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: NgForm, decorators: [{ type: Optional }] },
        { type: FormGroupDirective, decorators: [{ type: Optional }] },
        { type: ErrorStateMatcher },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    MatChipList.propDecorators = {
        errorStateMatcher: [{ type: Input }],
        multiple: [{ type: Input }],
        compareWith: [{ type: Input }],
        value: [{ type: Input }],
        required: [{ type: Input }],
        placeholder: [{ type: Input }],
        disabled: [{ type: Input }],
        ariaOrientation: [{ type: Input, args: ['aria-orientation',] }],
        selectable: [{ type: Input }],
        tabIndex: [{ type: Input }],
        change: [{ type: Output }],
        valueChange: [{ type: Output }],
        chips: [{ type: ContentChildren, args: [MatChip,] }]
    };
    return MatChipList;
}(_MatChipListMixinBase));
export { MatChipList };
if (false) {
    /**
     * Implemented as part of MatFormFieldControl.
     * \@docs-private
     * @type {?}
     */
    MatChipList.prototype.controlType;
    /**
     * When a chip is destroyed, we store the index of the destroyed chip until the chips
     * query list notifies about the update. This is necessary because we cannot determine an
     * appropriate chip that should receive focus until the array of chips updated completely.
     * @type {?}
     * @private
     */
    MatChipList.prototype._lastDestroyedChipIndex;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     * @private
     */
    MatChipList.prototype._destroyed;
    /**
     * Subscription to focus changes in the chips.
     * @type {?}
     * @private
     */
    MatChipList.prototype._chipFocusSubscription;
    /**
     * Subscription to blur changes in the chips.
     * @type {?}
     * @private
     */
    MatChipList.prototype._chipBlurSubscription;
    /**
     * Subscription to selection changes in chips.
     * @type {?}
     * @private
     */
    MatChipList.prototype._chipSelectionSubscription;
    /**
     * Subscription to remove changes in chips.
     * @type {?}
     * @private
     */
    MatChipList.prototype._chipRemoveSubscription;
    /**
     * The chip input to add more chips
     * @type {?}
     * @protected
     */
    MatChipList.prototype._chipInput;
    /**
     * Uid of the chip list
     * @type {?}
     */
    MatChipList.prototype._uid;
    /**
     * The aria-describedby attribute on the chip list for improved a11y.
     * @type {?}
     */
    MatChipList.prototype._ariaDescribedby;
    /**
     * Tab index for the chip list.
     * @type {?}
     */
    MatChipList.prototype._tabIndex;
    /**
     * User defined tab index.
     * When it is not null, use user defined tab index. Otherwise use _tabIndex
     * @type {?}
     */
    MatChipList.prototype._userTabIndex;
    /**
     * The FocusKeyManager which handles focus.
     * @type {?}
     */
    MatChipList.prototype._keyManager;
    /**
     * Function when touched
     * @type {?}
     */
    MatChipList.prototype._onTouched;
    /**
     * Function when changed
     * @type {?}
     */
    MatChipList.prototype._onChange;
    /** @type {?} */
    MatChipList.prototype._selectionModel;
    /**
     * An object used to control when error messages are shown.
     * @type {?}
     */
    MatChipList.prototype.errorStateMatcher;
    /**
     * @type {?}
     * @private
     */
    MatChipList.prototype._multiple;
    /**
     * @type {?}
     * @private
     */
    MatChipList.prototype._compareWith;
    /**
     * @type {?}
     * @protected
     */
    MatChipList.prototype._value;
    /**
     * @type {?}
     * @protected
     */
    MatChipList.prototype._required;
    /**
     * @type {?}
     * @protected
     */
    MatChipList.prototype._placeholder;
    /**
     * @type {?}
     * @protected
     */
    MatChipList.prototype._disabled;
    /**
     * Orientation of the chip list.
     * @type {?}
     */
    MatChipList.prototype.ariaOrientation;
    /**
     * @type {?}
     * @protected
     */
    MatChipList.prototype._selectable;
    /**
     * Event emitted when the selected chip list value has been changed by the user.
     * @type {?}
     */
    MatChipList.prototype.change;
    /**
     * Event that emits whenever the raw value of the chip-list changes. This is here primarily
     * to facilitate the two-way binding for the `value` input.
     * \@docs-private
     * @type {?}
     */
    MatChipList.prototype.valueChange;
    /**
     * The chip components contained within this chip list.
     * @type {?}
     */
    MatChipList.prototype.chips;
    /**
     * @type {?}
     * @protected
     */
    MatChipList.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatChipList.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatChipList.prototype._dir;
    /**
     * \@docs-private
     * @type {?}
     */
    MatChipList.prototype.ngControl;
}
//# sourceMappingURL=chip-list.js.map