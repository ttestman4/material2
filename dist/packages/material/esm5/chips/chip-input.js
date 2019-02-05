/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { MAT_CHIPS_DEFAULT_OPTIONS } from './chip-default-options';
import { MatChipList } from './chip-list';
/**
 * Represents an input event on a `matChipInput`.
 * @record
 */
export function MatChipInputEvent() { }
if (false) {
    /**
     * The native `<input>` element that the event is being fired for.
     * @type {?}
     */
    MatChipInputEvent.prototype.input;
    /**
     * The value of the input.
     * @type {?}
     */
    MatChipInputEvent.prototype.value;
}
// Increasing integer for generating unique ids.
/** @type {?} */
var nextUniqueId = 0;
/**
 * Directive that adds chip-specific behaviors to an input element inside `<mat-form-field>`.
 * May be placed inside or outside of an `<mat-chip-list>`.
 */
var MatChipInput = /** @class */ (function () {
    function MatChipInput(_elementRef, _defaultOptions) {
        this._elementRef = _elementRef;
        this._defaultOptions = _defaultOptions;
        /**
         * Whether the control is focused.
         */
        this.focused = false;
        this._addOnBlur = false;
        /**
         * The list of key codes that will trigger a chipEnd event.
         *
         * Defaults to `[ENTER]`.
         */
        this.separatorKeyCodes = this._defaultOptions.separatorKeyCodes;
        /**
         * Emitted when a chip is to be added.
         */
        this.chipEnd = new EventEmitter();
        /**
         * The input's placeholder text.
         */
        this.placeholder = '';
        /**
         * Unique id for the input.
         */
        this.id = "mat-chip-list-input-" + nextUniqueId++;
        this._disabled = false;
        this._inputElement = (/** @type {?} */ (this._elementRef.nativeElement));
    }
    Object.defineProperty(MatChipInput.prototype, "chipList", {
        /** Register input for chip list */
        set: /**
         * Register input for chip list
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._chipList = value;
                this._chipList.registerInput(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "addOnBlur", {
        /**
         * Whether or not the chipEnd event will be emitted when the input is blurred.
         */
        get: /**
         * Whether or not the chipEnd event will be emitted when the input is blurred.
         * @return {?}
         */
        function () { return this._addOnBlur; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._addOnBlur = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "disabled", {
        /** Whether the input is disabled. */
        get: /**
         * Whether the input is disabled.
         * @return {?}
         */
        function () { return this._disabled || (this._chipList && this._chipList.disabled); },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatChipInput.prototype, "empty", {
        /** Whether the input is empty. */
        get: /**
         * Whether the input is empty.
         * @return {?}
         */
        function () { return !this._inputElement.value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatChipInput.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._chipList.stateChanges.next();
    };
    /** Utility method to make host definition/tests more clear. */
    /**
     * Utility method to make host definition/tests more clear.
     * @param {?=} event
     * @return {?}
     */
    MatChipInput.prototype._keydown = /**
     * Utility method to make host definition/tests more clear.
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        this._emitChipEnd(event);
    };
    /** Checks to see if the blur should emit the (chipEnd) event. */
    /**
     * Checks to see if the blur should emit the (chipEnd) event.
     * @return {?}
     */
    MatChipInput.prototype._blur = /**
     * Checks to see if the blur should emit the (chipEnd) event.
     * @return {?}
     */
    function () {
        if (this.addOnBlur) {
            this._emitChipEnd();
        }
        this.focused = false;
        // Blur the chip list if it is not focused
        if (!this._chipList.focused) {
            this._chipList._blur();
        }
        this._chipList.stateChanges.next();
    };
    /**
     * @return {?}
     */
    MatChipInput.prototype._focus = /**
     * @return {?}
     */
    function () {
        this.focused = true;
        this._chipList.stateChanges.next();
    };
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    /**
     * Checks to see if the (chipEnd) event needs to be emitted.
     * @param {?=} event
     * @return {?}
     */
    MatChipInput.prototype._emitChipEnd = /**
     * Checks to see if the (chipEnd) event needs to be emitted.
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (!this._inputElement.value && !!event) {
            this._chipList._keydown(event);
        }
        if (!event || this._isSeparatorKey(event)) {
            this.chipEnd.emit({ input: this._inputElement, value: this._inputElement.value });
            if (event) {
                event.preventDefault();
            }
        }
    };
    /**
     * @return {?}
     */
    MatChipInput.prototype._onInput = /**
     * @return {?}
     */
    function () {
        // Let chip list know whenever the value changes.
        this._chipList.stateChanges.next();
    };
    /** Focuses the input. */
    /**
     * Focuses the input.
     * @return {?}
     */
    MatChipInput.prototype.focus = /**
     * Focuses the input.
     * @return {?}
     */
    function () {
        this._inputElement.focus();
    };
    /** Checks whether a keycode is one of the configured separators. */
    /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
    MatChipInput.prototype._isSeparatorKey = /**
     * Checks whether a keycode is one of the configured separators.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (hasModifierKey(event)) {
            return false;
        }
        /** @type {?} */
        var separators = this.separatorKeyCodes;
        /** @type {?} */
        var keyCode = event.keyCode;
        return Array.isArray(separators) ? separators.indexOf(keyCode) > -1 : separators.has(keyCode);
    };
    MatChipInput.decorators = [
        { type: Directive, args: [{
                    selector: 'input[matChipInputFor]',
                    exportAs: 'matChipInput, matChipInputFor',
                    host: {
                        'class': 'mat-chip-input mat-input-element',
                        '(keydown)': '_keydown($event)',
                        '(blur)': '_blur()',
                        '(focus)': '_focus()',
                        '(input)': '_onInput()',
                        '[id]': 'id',
                        '[attr.disabled]': 'disabled || null',
                        '[attr.placeholder]': 'placeholder || null',
                        '[attr.aria-invalid]': '_chipList && _chipList.ngControl ? _chipList.ngControl.invalid : null',
                    }
                },] },
    ];
    /** @nocollapse */
    MatChipInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_CHIPS_DEFAULT_OPTIONS,] }] }
    ]; };
    MatChipInput.propDecorators = {
        chipList: [{ type: Input, args: ['matChipInputFor',] }],
        addOnBlur: [{ type: Input, args: ['matChipInputAddOnBlur',] }],
        separatorKeyCodes: [{ type: Input, args: ['matChipInputSeparatorKeyCodes',] }],
        chipEnd: [{ type: Output, args: ['matChipInputTokenEnd',] }],
        placeholder: [{ type: Input }],
        id: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return MatChipInput;
}());
export { MatChipInput };
if (false) {
    /**
     * Whether the control is focused.
     * @type {?}
     */
    MatChipInput.prototype.focused;
    /** @type {?} */
    MatChipInput.prototype._chipList;
    /** @type {?} */
    MatChipInput.prototype._addOnBlur;
    /**
     * The list of key codes that will trigger a chipEnd event.
     *
     * Defaults to `[ENTER]`.
     * @type {?}
     */
    MatChipInput.prototype.separatorKeyCodes;
    /**
     * Emitted when a chip is to be added.
     * @type {?}
     */
    MatChipInput.prototype.chipEnd;
    /**
     * The input's placeholder text.
     * @type {?}
     */
    MatChipInput.prototype.placeholder;
    /**
     * Unique id for the input.
     * @type {?}
     */
    MatChipInput.prototype.id;
    /**
     * @type {?}
     * @private
     */
    MatChipInput.prototype._disabled;
    /**
     * The native input element to which this directive is attached.
     * @type {?}
     * @protected
     */
    MatChipInput.prototype._inputElement;
    /**
     * @type {?}
     * @protected
     */
    MatChipInput.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatChipInput.prototype._defaultOptions;
}
//# sourceMappingURL=chip-input.js.map