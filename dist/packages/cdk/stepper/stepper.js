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
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { END, ENTER, HOME, SPACE, hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, Directive, EventEmitter, ElementRef, forwardRef, Inject, Input, Optional, Output, QueryList, TemplateRef, ViewChild, ViewEncapsulation, InjectionToken, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { CdkStepLabel } from './step-label';
import { Subject, of as obaservableOf } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { CdkStepHeader } from './step-header';
/**
 * Used to generate unique ID for each stepper component.
 * @type {?}
 */
let nextId = 0;
/**
 * Change event emitted on selection changes.
 */
export class StepperSelectionEvent {
}
if (false) {
    /**
     * Index of the step now selected.
     * @type {?}
     */
    StepperSelectionEvent.prototype.selectedIndex;
    /**
     * Index of the step previously selected.
     * @type {?}
     */
    StepperSelectionEvent.prototype.previouslySelectedIndex;
    /**
     * The step instance now selected.
     * @type {?}
     */
    StepperSelectionEvent.prototype.selectedStep;
    /**
     * The step instance previously selected.
     * @type {?}
     */
    StepperSelectionEvent.prototype.previouslySelectedStep;
}
/**
 * Enum to represent the different states of the steps.
 * @type {?}
 */
export const STEP_STATE = {
    NUMBER: 'number',
    EDIT: 'edit',
    DONE: 'done',
    ERROR: 'error'
};
/**
 * InjectionToken that can be used to specify the global stepper options.
 * @type {?}
 */
export const STEPPER_GLOBAL_OPTIONS = new InjectionToken('STEPPER_GLOBAL_OPTIONS');
/**
 * InjectionToken that can be used to specify the global stepper options.
 * @deprecated Use `STEPPER_GLOBAL_OPTIONS` instead.
 * \@breaking-change 8.0.0.
 * @type {?}
 */
export const MAT_STEPPER_GLOBAL_OPTIONS = STEPPER_GLOBAL_OPTIONS;
/**
 * Configurable options for stepper.
 * @record
 */
export function StepperOptions() { }
if (false) {
    /**
     * Whether the stepper should display an error state or not.
     * Default behavior is assumed to be false.
     * @type {?|undefined}
     */
    StepperOptions.prototype.showError;
    /**
     * Whether the stepper should display the default indicator type
     * or not.
     * Default behavior is assumed to be true.
     * @type {?|undefined}
     */
    StepperOptions.prototype.displayDefaultIndicatorType;
}
export class CdkStep {
    /**
     * \@breaking-change 8.0.0 remove the `?` after `stepperOptions`
     * @param {?} _stepper
     * @param {?=} stepperOptions
     */
    constructor(_stepper, stepperOptions) {
        this._stepper = _stepper;
        /**
         * Whether user has seen the expanded step content or not.
         */
        this.interacted = false;
        this._editable = true;
        this._optional = false;
        this._customCompleted = null;
        this._customError = null;
        this._stepperOptions = stepperOptions ? stepperOptions : {};
        this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
        this._showError = !!this._stepperOptions.showError;
    }
    /**
     * Whether the user can return to this step once it has been marked as completed.
     * @return {?}
     */
    get editable() { return this._editable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set editable(value) {
        this._editable = coerceBooleanProperty(value);
    }
    /**
     * Whether the completion of step is optional.
     * @return {?}
     */
    get optional() { return this._optional; }
    /**
     * @param {?} value
     * @return {?}
     */
    set optional(value) {
        this._optional = coerceBooleanProperty(value);
    }
    /**
     * Whether step is marked as completed.
     * @return {?}
     */
    get completed() {
        return this._customCompleted == null ? this._getDefaultCompleted() : this._customCompleted;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set completed(value) {
        this._customCompleted = coerceBooleanProperty(value);
    }
    /**
     * @private
     * @return {?}
     */
    _getDefaultCompleted() {
        return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
    }
    /**
     * Whether step has an error.
     * @return {?}
     */
    get hasError() {
        return this._customError == null ? this._getDefaultError() : this._customError;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasError(value) {
        this._customError = coerceBooleanProperty(value);
    }
    /**
     * @private
     * @return {?}
     */
    _getDefaultError() {
        return this.stepControl && this.stepControl.invalid && this.interacted;
    }
    /**
     * Selects this step component.
     * @return {?}
     */
    select() {
        this._stepper.selected = this;
    }
    /**
     * Resets the step to its initial state. Note that this includes resetting form data.
     * @return {?}
     */
    reset() {
        this.interacted = false;
        if (this._customCompleted != null) {
            this._customCompleted = false;
        }
        if (this._customError != null) {
            this._customError = false;
        }
        if (this.stepControl) {
            this.stepControl.reset();
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        // Since basically all inputs of the MatStep get proxied through the view down to the
        // underlying MatStepHeader, we have to make sure that change detection runs correctly.
        this._stepper._stateChanged();
    }
}
CdkStep.decorators = [
    { type: Component, args: [{selector: 'cdk-step',
                exportAs: 'cdkStep',
                template: '<ng-template><ng-content></ng-content></ng-template>',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
CdkStep.ctorParameters = () => [
    { type: CdkStepper, decorators: [{ type: Inject, args: [forwardRef(() => CdkStepper),] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [STEPPER_GLOBAL_OPTIONS,] }] }
];
CdkStep.propDecorators = {
    stepLabel: [{ type: ContentChild, args: [CdkStepLabel,] }],
    content: [{ type: ViewChild, args: [TemplateRef,] }],
    stepControl: [{ type: Input }],
    label: [{ type: Input }],
    errorMessage: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    state: [{ type: Input }],
    editable: [{ type: Input }],
    optional: [{ type: Input }],
    completed: [{ type: Input }],
    hasError: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    CdkStep.prototype._stepperOptions;
    /** @type {?} */
    CdkStep.prototype._showError;
    /** @type {?} */
    CdkStep.prototype._displayDefaultIndicatorType;
    /**
     * Template for step label if it exists.
     * @type {?}
     */
    CdkStep.prototype.stepLabel;
    /**
     * Template for step content.
     * @type {?}
     */
    CdkStep.prototype.content;
    /**
     * The top level abstract control of the step.
     * @type {?}
     */
    CdkStep.prototype.stepControl;
    /**
     * Whether user has seen the expanded step content or not.
     * @type {?}
     */
    CdkStep.prototype.interacted;
    /**
     * Plain text label of the step.
     * @type {?}
     */
    CdkStep.prototype.label;
    /**
     * Error message to display when there's an error.
     * @type {?}
     */
    CdkStep.prototype.errorMessage;
    /**
     * Aria label for the tab.
     * @type {?}
     */
    CdkStep.prototype.ariaLabel;
    /**
     * Reference to the element that the tab is labelled by.
     * Will be cleared if `aria-label` is set at the same time.
     * @type {?}
     */
    CdkStep.prototype.ariaLabelledby;
    /**
     * State of the step.
     * @type {?}
     */
    CdkStep.prototype.state;
    /**
     * @type {?}
     * @private
     */
    CdkStep.prototype._editable;
    /**
     * @type {?}
     * @private
     */
    CdkStep.prototype._optional;
    /**
     * @type {?}
     * @private
     */
    CdkStep.prototype._customCompleted;
    /**
     * @type {?}
     * @private
     */
    CdkStep.prototype._customError;
    /**
     * @type {?}
     * @private
     */
    CdkStep.prototype._stepper;
}
export class CdkStepper {
    /**
     * @param {?} _dir
     * @param {?} _changeDetectorRef
     * @param {?=} _elementRef
     * @param {?=} _document
     */
    constructor(_dir, _changeDetectorRef, _elementRef, _document) {
        this._dir = _dir;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        /**
         * Emits when the component is destroyed.
         */
        this._destroyed = new Subject();
        this._linear = false;
        this._selectedIndex = 0;
        /**
         * Event emitted when the selected step has changed.
         */
        this.selectionChange = new EventEmitter();
        this._orientation = 'horizontal';
        this._groupId = nextId++;
        this._document = _document;
    }
    /**
     * The list of step components that the stepper is holding.
     * @return {?}
     */
    get steps() {
        return this._steps;
    }
    /**
     * Whether the validity of previous steps should be checked or not.
     * @return {?}
     */
    get linear() { return this._linear; }
    /**
     * @param {?} value
     * @return {?}
     */
    set linear(value) { this._linear = coerceBooleanProperty(value); }
    /**
     * The index of the selected step.
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * @param {?} index
     * @return {?}
     */
    set selectedIndex(index) {
        /** @type {?} */
        const newIndex = coerceNumberProperty(index);
        if (this.steps) {
            // Ensure that the index can't be out of bounds.
            if (newIndex < 0 || newIndex > this.steps.length - 1) {
                throw Error('cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.');
            }
            if (this._selectedIndex != newIndex &&
                !this._anyControlsInvalidOrPending(newIndex) &&
                (newIndex >= this._selectedIndex || this.steps.toArray()[newIndex].editable)) {
                this._updateSelectedItemIndex(index);
            }
        }
        else {
            this._selectedIndex = newIndex;
        }
    }
    /**
     * The step that is selected.
     * @return {?}
     */
    get selected() {
        // @breaking-change 8.0.0 Change return type to `CdkStep | undefined`.
        return this.steps ? this.steps.toArray()[this.selectedIndex] : (/** @type {?} */ (undefined));
    }
    /**
     * @param {?} step
     * @return {?}
     */
    set selected(step) {
        this.selectedIndex = this.steps ? this.steps.toArray().indexOf(step) : -1;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Note that while the step headers are content children by default, any components that
        // extend this one might have them as view chidren. We initialize the keyboard handling in
        // AfterViewInit so we're guaranteed for both view and content children to be defined.
        this._keyManager = new FocusKeyManager(this._stepHeader)
            .withWrap()
            .withVerticalOrientation(this._orientation === 'vertical');
        (this._dir ? (/** @type {?} */ (this._dir.change)) : obaservableOf())
            .pipe(startWith(this._layoutDirection()), takeUntil(this._destroyed))
            .subscribe(direction => this._keyManager.withHorizontalOrientation(direction));
        this._keyManager.updateActiveItemIndex(this._selectedIndex);
        this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            if (!this.selected) {
                this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * Selects and focuses the next step in list.
     * @return {?}
     */
    next() {
        this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
    }
    /**
     * Selects and focuses the previous step in list.
     * @return {?}
     */
    previous() {
        this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
    }
    /**
     * Resets the stepper to its initial state. Note that this includes clearing form data.
     * @return {?}
     */
    reset() {
        this._updateSelectedItemIndex(0);
        this.steps.forEach(step => step.reset());
        this._stateChanged();
    }
    /**
     * Returns a unique id for each step label element.
     * @param {?} i
     * @return {?}
     */
    _getStepLabelId(i) {
        return `cdk-step-label-${this._groupId}-${i}`;
    }
    /**
     * Returns unique id for each step content element.
     * @param {?} i
     * @return {?}
     */
    _getStepContentId(i) {
        return `cdk-step-content-${this._groupId}-${i}`;
    }
    /**
     * Marks the component to be change detected.
     * @return {?}
     */
    _stateChanged() {
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Returns position state of the step with the given index.
     * @param {?} index
     * @return {?}
     */
    _getAnimationDirection(index) {
        /** @type {?} */
        const position = index - this._selectedIndex;
        if (position < 0) {
            return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
        }
        else if (position > 0) {
            return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
        }
        return 'current';
    }
    /**
     * Returns the type of icon to be displayed.
     * @param {?} index
     * @param {?=} state
     * @return {?}
     */
    _getIndicatorType(index, state = STEP_STATE.NUMBER) {
        /** @type {?} */
        const step = this.steps.toArray()[index];
        /** @type {?} */
        const isCurrentStep = this._isCurrentStep(index);
        return step._displayDefaultIndicatorType
            ? this._getDefaultIndicatorLogic(step, isCurrentStep)
            : this._getGuidelineLogic(step, isCurrentStep, state);
    }
    /**
     * @private
     * @param {?} step
     * @param {?} isCurrentStep
     * @return {?}
     */
    _getDefaultIndicatorLogic(step, isCurrentStep) {
        if (step._showError && step.hasError && !isCurrentStep) {
            return STEP_STATE.ERROR;
        }
        else if (!step.completed || isCurrentStep) {
            return STEP_STATE.NUMBER;
        }
        else {
            return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
        }
    }
    /**
     * @private
     * @param {?} step
     * @param {?} isCurrentStep
     * @param {?=} state
     * @return {?}
     */
    _getGuidelineLogic(step, isCurrentStep, state = STEP_STATE.NUMBER) {
        if (step._showError && step.hasError && !isCurrentStep) {
            return STEP_STATE.ERROR;
        }
        else if (step.completed && !isCurrentStep) {
            return STEP_STATE.DONE;
        }
        else if (step.completed && isCurrentStep) {
            return state;
        }
        else if (step.editable && isCurrentStep) {
            return STEP_STATE.EDIT;
        }
        else {
            return state;
        }
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _isCurrentStep(index) {
        return this._selectedIndex === index;
    }
    /**
     * Returns the index of the currently-focused step header.
     * @return {?}
     */
    _getFocusIndex() {
        return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
    }
    /**
     * @private
     * @param {?} newIndex
     * @return {?}
     */
    _updateSelectedItemIndex(newIndex) {
        /** @type {?} */
        const stepsArray = this.steps.toArray();
        this.selectionChange.emit({
            selectedIndex: newIndex,
            previouslySelectedIndex: this._selectedIndex,
            selectedStep: stepsArray[newIndex],
            previouslySelectedStep: stepsArray[this._selectedIndex],
        });
        // If focus is inside the stepper, move it to the next header, otherwise it may become
        // lost when the active step content is hidden. We can't be more granular with the check
        // (e.g. checking whether focus is inside the active step), because we don't have a
        // reference to the elements that are rendering out the content.
        this._containsFocus() ? this._keyManager.setActiveItem(newIndex) :
            this._keyManager.updateActiveItemIndex(newIndex);
        this._selectedIndex = newIndex;
        this._stateChanged();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onKeydown(event) {
        /** @type {?} */
        const hasModifier = hasModifierKey(event);
        /** @type {?} */
        const keyCode = event.keyCode;
        /** @type {?} */
        const manager = this._keyManager;
        if (manager.activeItemIndex != null && !hasModifier &&
            (keyCode === SPACE || keyCode === ENTER)) {
            this.selectedIndex = manager.activeItemIndex;
            event.preventDefault();
        }
        else if (keyCode === HOME) {
            manager.setFirstItemActive();
            event.preventDefault();
        }
        else if (keyCode === END) {
            manager.setLastItemActive();
            event.preventDefault();
        }
        else {
            manager.onKeydown(event);
        }
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _anyControlsInvalidOrPending(index) {
        /** @type {?} */
        const steps = this.steps.toArray();
        steps[this._selectedIndex].interacted = true;
        if (this._linear && index >= 0) {
            return steps.slice(0, index).some(step => {
                /** @type {?} */
                const control = step.stepControl;
                /** @type {?} */
                const isIncomplete = control ?
                    (control.invalid || control.pending || !step.interacted) :
                    !step.completed;
                return isIncomplete && !step.optional;
            });
        }
        return false;
    }
    /**
     * @private
     * @return {?}
     */
    _layoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Checks whether the stepper contains the focused element.
     * @private
     * @return {?}
     */
    _containsFocus() {
        if (!this._document || !this._elementRef) {
            return false;
        }
        /** @type {?} */
        const stepperElement = this._elementRef.nativeElement;
        /** @type {?} */
        const focusedElement = this._document.activeElement;
        return stepperElement === focusedElement || stepperElement.contains(focusedElement);
    }
}
CdkStepper.decorators = [
    { type: Directive, args: [{
                selector: '[cdkStepper]',
                exportAs: 'cdkStepper',
            },] },
];
/** @nocollapse */
CdkStepper.ctorParameters = () => [
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
CdkStepper.propDecorators = {
    _steps: [{ type: ContentChildren, args: [CdkStep,] }],
    _stepHeader: [{ type: ContentChildren, args: [CdkStepHeader,] }],
    linear: [{ type: Input }],
    selectedIndex: [{ type: Input }],
    selected: [{ type: Input }],
    selectionChange: [{ type: Output }]
};
if (false) {
    /**
     * Emits when the component is destroyed.
     * @type {?}
     * @protected
     */
    CdkStepper.prototype._destroyed;
    /**
     * Used for managing keyboard focus.
     * @type {?}
     * @private
     */
    CdkStepper.prototype._keyManager;
    /**
     * \@breaking-change 8.0.0 Remove `| undefined` once the `_document`
     * constructor param is required.
     * @type {?}
     * @private
     */
    CdkStepper.prototype._document;
    /**
     * The list of step components that the stepper is holding.
     * @deprecated use `steps` instead
     * \@breaking-change 9.0.0 remove this property
     * @type {?}
     */
    CdkStepper.prototype._steps;
    /**
     * The list of step headers of the steps in the stepper.
     * @deprecated Type to be changed to `QueryList<CdkStepHeader>`.
     * \@breaking-change 8.0.0
     * @type {?}
     */
    CdkStepper.prototype._stepHeader;
    /**
     * @type {?}
     * @private
     */
    CdkStepper.prototype._linear;
    /**
     * @type {?}
     * @private
     */
    CdkStepper.prototype._selectedIndex;
    /**
     * Event emitted when the selected step has changed.
     * @type {?}
     */
    CdkStepper.prototype.selectionChange;
    /**
     * Used to track unique ID for each stepper component.
     * @type {?}
     */
    CdkStepper.prototype._groupId;
    /**
     * @type {?}
     * @protected
     */
    CdkStepper.prototype._orientation;
    /**
     * @type {?}
     * @private
     */
    CdkStepper.prototype._dir;
    /**
     * @type {?}
     * @private
     */
    CdkStepper.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    CdkStepper.prototype._elementRef;
}
//# sourceMappingURL=stepper.js.map