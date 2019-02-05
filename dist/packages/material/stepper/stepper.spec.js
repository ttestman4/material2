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
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var stepper_1 = require("@angular/cdk/stepper");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var index_1 = require("./index");
var stepper_2 = require("./stepper");
var stepper_button_1 = require("./stepper-button");
var stepper_intl_1 = require("./stepper-intl");
var form_field_1 = require("@angular/material/form-field");
var input_module_1 = require("../input/input-module");
var VALID_REGEX = /valid/;
var dir;
describe('MatStepper', function () {
    beforeEach(function () {
        dir = {
            value: 'ltr',
            change: new core_1.EventEmitter()
        };
    });
    describe('basic stepper', function () {
        var fixture;
        beforeEach(function () {
            fixture = createComponent(SimpleMatVerticalStepperApp);
            fixture.detectChanges();
        });
        it('should default to the first step', function () {
            var stepperComponent = fixture.debugElement
                .query(platform_browser_1.By.css('mat-vertical-stepper')).componentInstance;
            expect(stepperComponent.selectedIndex).toBe(0);
        });
        it('should throw when a negative `selectedIndex` is assigned', function () {
            var stepperComponent = fixture.debugElement
                .query(platform_browser_1.By.css('mat-vertical-stepper')).componentInstance;
            expect(function () {
                stepperComponent.selectedIndex = -10;
                fixture.detectChanges();
            }).toThrowError(/Cannot assign out-of-bounds/);
        });
        it('should throw when an out-of-bounds `selectedIndex` is assigned', function () {
            var stepperComponent = fixture.debugElement
                .query(platform_browser_1.By.css('mat-vertical-stepper')).componentInstance;
            expect(function () {
                stepperComponent.selectedIndex = 1337;
                fixture.detectChanges();
            }).toThrowError(/Cannot assign out-of-bounds/);
        });
        it('should change selected index on header click', function () {
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'));
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            expect(stepperComponent.selectedIndex).toBe(0);
            expect(stepperComponent.selected instanceof stepper_2.MatStep).toBe(true);
            // select the second step
            var stepHeaderEl = stepHeaders[1].nativeElement;
            stepHeaderEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            expect(stepperComponent.selected instanceof stepper_2.MatStep).toBe(true);
            // select the third step
            stepHeaderEl = stepHeaders[2].nativeElement;
            stepHeaderEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(2);
            expect(stepperComponent.selected instanceof stepper_2.MatStep).toBe(true);
        });
        it('should set the "tablist" role on stepper', function () {
            var stepperEl = fixture.debugElement.query(platform_browser_1.By.css('mat-vertical-stepper')).nativeElement;
            expect(stepperEl.getAttribute('role')).toBe('tablist');
        });
        it('should set aria-expanded of content correctly', function () {
            var stepContents = fixture.debugElement.queryAll(platform_browser_1.By.css(".mat-vertical-stepper-content"));
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            var firstStepContentEl = stepContents[0].nativeElement;
            expect(firstStepContentEl.getAttribute('aria-expanded')).toBe('true');
            stepperComponent.selectedIndex = 1;
            fixture.detectChanges();
            expect(firstStepContentEl.getAttribute('aria-expanded')).toBe('false');
            var secondStepContentEl = stepContents[1].nativeElement;
            expect(secondStepContentEl.getAttribute('aria-expanded')).toBe('true');
        });
        it('should display the correct label', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            var selectedLabel = fixture.nativeElement.querySelector('[aria-selected="true"]');
            expect(selectedLabel.textContent).toMatch('Step 1');
            stepperComponent.selectedIndex = 2;
            fixture.detectChanges();
            selectedLabel = fixture.nativeElement.querySelector('[aria-selected="true"]');
            expect(selectedLabel.textContent).toMatch('Step 3');
            fixture.componentInstance.inputLabel = 'New Label';
            fixture.detectChanges();
            selectedLabel = fixture.nativeElement.querySelector('[aria-selected="true"]');
            expect(selectedLabel.textContent).toMatch('New Label');
        });
        it('should go to next available step when the next button is clicked', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            expect(stepperComponent.selectedIndex).toBe(0);
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[1].nativeElement;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(2);
            nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[2].nativeElement;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(2);
        });
        it('should set the next stepper button type to "submit"', function () {
            var button = fixture.debugElement.query(platform_browser_1.By.directive(stepper_button_1.MatStepperNext)).nativeElement;
            expect(button.type).toBe('submit', "Expected the button to have \"submit\" set as type.");
        });
        it('should go to previous available step when the previous button is clicked', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            expect(stepperComponent.selectedIndex).toBe(0);
            stepperComponent.selectedIndex = 2;
            var previousButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperPrevious))[2].nativeElement;
            previousButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            previousButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperPrevious))[1].nativeElement;
            previousButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(0);
            previousButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperPrevious))[0].nativeElement;
            previousButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(0);
        });
        it('should set the previous stepper button type to "button"', function () {
            var button = fixture.debugElement.query(platform_browser_1.By.directive(stepper_button_1.MatStepperPrevious)).nativeElement;
            expect(button.type).toBe('button', "Expected the button to have \"button\" set as type.");
        });
        it('should set the correct step position for animation', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            expect(stepperComponent._getAnimationDirection(0)).toBe('current');
            expect(stepperComponent._getAnimationDirection(1)).toBe('next');
            expect(stepperComponent._getAnimationDirection(2)).toBe('next');
            stepperComponent.selectedIndex = 1;
            fixture.detectChanges();
            expect(stepperComponent._getAnimationDirection(0)).toBe('previous');
            expect(stepperComponent._getAnimationDirection(2)).toBe('next');
            expect(stepperComponent._getAnimationDirection(1)).toBe('current');
            stepperComponent.selectedIndex = 2;
            fixture.detectChanges();
            expect(stepperComponent._getAnimationDirection(0)).toBe('previous');
            expect(stepperComponent._getAnimationDirection(1)).toBe('previous');
            expect(stepperComponent._getAnimationDirection(2)).toBe('current');
        });
        it('should not set focus on header of selected step if header is not clicked', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            var stepHeaderEl = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-step-header'))[1].nativeElement;
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            spyOn(stepHeaderEl, 'focus');
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            expect(stepHeaderEl.focus).not.toHaveBeenCalled();
        });
        it('should focus next step header if focus is inside the stepper', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            var stepHeaderEl = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-step-header'))[1].nativeElement;
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            spyOn(stepHeaderEl, 'focus');
            nextButtonNativeEl.focus();
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            expect(stepHeaderEl.focus).toHaveBeenCalled();
        });
        it('should only be able to return to a previous step if it is editable', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            stepperComponent.selectedIndex = 1;
            stepperComponent.steps.toArray()[0].editable = false;
            var previousButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperPrevious))[1].nativeElement;
            previousButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            stepperComponent.steps.toArray()[0].editable = true;
            previousButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(0);
        });
        it('should set create icon if step is editable and completed', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            expect(stepperComponent._getIndicatorType(0)).toBe('number');
            stepperComponent.steps.toArray()[0].editable = true;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent._getIndicatorType(0)).toBe('edit');
        });
        it('should set done icon if step is not editable and is completed', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            expect(stepperComponent._getIndicatorType(0)).toBe('number');
            stepperComponent.steps.toArray()[0].editable = false;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent._getIndicatorType(0)).toBe('done');
        });
        it('should emit an event when the enter animation is done', testing_2.fakeAsync(function () {
            var stepper = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            var selectionChangeSpy = jasmine.createSpy('selectionChange spy');
            var animationDoneSpy = jasmine.createSpy('animationDone spy');
            var selectionChangeSubscription = stepper.selectionChange.subscribe(selectionChangeSpy);
            var animationDoneSubscription = stepper.animationDone.subscribe(animationDoneSpy);
            stepper.selectedIndex = 1;
            fixture.detectChanges();
            expect(selectionChangeSpy).toHaveBeenCalledTimes(1);
            expect(animationDoneSpy).not.toHaveBeenCalled();
            testing_2.flush();
            expect(selectionChangeSpy).toHaveBeenCalledTimes(1);
            expect(animationDoneSpy).toHaveBeenCalledTimes(1);
            selectionChangeSubscription.unsubscribe();
            animationDoneSubscription.unsubscribe();
        }));
        it('should set the correct aria-posinset and aria-setsize', function () {
            var headers = Array.from(fixture.nativeElement.querySelectorAll('.mat-step-header'));
            expect(headers.map(function (header) { return header.getAttribute('aria-posinset'); })).toEqual(['1', '2', '3']);
            expect(headers.every(function (header) { return header.getAttribute('aria-setsize') === '3'; })).toBe(true);
        });
        it('should adjust the index when removing a step before the current one', function () {
            var stepperComponent = fixture.debugElement
                .query(platform_browser_1.By.css('mat-vertical-stepper')).componentInstance;
            stepperComponent.selectedIndex = 2;
            fixture.detectChanges();
            // Re-assert since the setter has some extra logic.
            expect(stepperComponent.selectedIndex).toBe(2);
            expect(function () {
                fixture.componentInstance.showStepTwo = false;
                fixture.detectChanges();
            }).not.toThrow();
            expect(stepperComponent.selectedIndex).toBe(1);
        });
        it('should not do anything when pressing the ENTER key with a modifier', function () {
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'));
            assertSelectKeyWithModifierInteraction(fixture, stepHeaders, 'vertical', keycodes_1.ENTER);
        });
        it('should not do anything when pressing the SPACE key with a modifier', function () {
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'));
            assertSelectKeyWithModifierInteraction(fixture, stepHeaders, 'vertical', keycodes_1.SPACE);
        });
    });
    describe('basic stepper when attempting to set the selected step too early', function () {
        it('should not throw', function () {
            var fixture = createComponent(SimpleMatVerticalStepperApp);
            var stepperComponent = fixture.debugElement
                .query(platform_browser_1.By.css('mat-vertical-stepper')).componentInstance;
            expect(function () { return stepperComponent.selected; }).not.toThrow();
        });
    });
    describe('basic stepper when attempting to set the selected step too early', function () {
        it('should not throw', function () {
            var fixture = createComponent(SimpleMatVerticalStepperApp);
            var stepperComponent = fixture.debugElement
                .query(platform_browser_1.By.css('mat-vertical-stepper')).componentInstance;
            expect(function () { return stepperComponent.selected = null; }).not.toThrow();
            expect(stepperComponent.selectedIndex).toBe(-1);
        });
    });
    describe('basic stepper with i18n label change', function () {
        var i18nFixture;
        beforeEach(function () {
            i18nFixture = createComponent(SimpleMatHorizontalStepperApp);
            i18nFixture.detectChanges();
        });
        it('should re-render when the i18n labels change', testing_2.inject([stepper_intl_1.MatStepperIntl], function (intl) {
            var header = i18nFixture.debugElement.queryAll(platform_browser_1.By.css('mat-step-header'))[2].nativeElement;
            var optionalLabel = header.querySelector('.mat-step-optional');
            expect(optionalLabel).toBeTruthy();
            expect(optionalLabel.textContent).toBe('Optional');
            intl.optionalLabel = 'Valgfri';
            intl.changes.next();
            i18nFixture.detectChanges();
            expect(optionalLabel.textContent).toBe('Valgfri');
        }));
    });
    describe('icon overrides', function () {
        var fixture;
        beforeEach(function () {
            fixture = createComponent(IconOverridesStepper);
            fixture.detectChanges();
        });
        it('should allow for the `edit` icon to be overridden', function () {
            var stepperDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper));
            var stepperComponent = stepperDebugElement.componentInstance;
            stepperComponent.steps.toArray()[0].editable = true;
            stepperComponent.next();
            fixture.detectChanges();
            var header = stepperDebugElement.nativeElement.querySelector('mat-step-header');
            expect(header.textContent).toContain('Custom edit');
        });
        it('should allow for the `done` icon to be overridden', function () {
            var stepperDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper));
            var stepperComponent = stepperDebugElement.componentInstance;
            stepperComponent.steps.toArray()[0].editable = false;
            stepperComponent.next();
            fixture.detectChanges();
            var header = stepperDebugElement.nativeElement.querySelector('mat-step-header');
            expect(header.textContent).toContain('Custom done');
        });
        it('should allow for the `number` icon to be overridden with context', function () {
            var stepperDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper));
            var headers = stepperDebugElement.nativeElement.querySelectorAll('mat-step-header');
            expect(headers[2].textContent).toContain('III');
        });
    });
    describe('RTL', function () {
        var fixture;
        beforeEach(function () {
            dir.value = 'rtl';
            fixture = createComponent(SimpleMatVerticalStepperApp);
            fixture.detectChanges();
        });
        it('should reverse animation in RTL mode', function () {
            var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
            expect(stepperComponent._getAnimationDirection(0)).toBe('current');
            expect(stepperComponent._getAnimationDirection(1)).toBe('previous');
            expect(stepperComponent._getAnimationDirection(2)).toBe('previous');
            stepperComponent.selectedIndex = 1;
            fixture.detectChanges();
            expect(stepperComponent._getAnimationDirection(0)).toBe('next');
            expect(stepperComponent._getAnimationDirection(2)).toBe('previous');
            expect(stepperComponent._getAnimationDirection(1)).toBe('current');
            stepperComponent.selectedIndex = 2;
            fixture.detectChanges();
            expect(stepperComponent._getAnimationDirection(0)).toBe('next');
            expect(stepperComponent._getAnimationDirection(1)).toBe('next');
            expect(stepperComponent._getAnimationDirection(2)).toBe('current');
        });
    });
    describe('linear stepper', function () {
        var fixture;
        var testComponent;
        var stepperComponent;
        beforeEach(function () {
            fixture = createComponent(LinearMatVerticalStepperApp);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            stepperComponent = fixture.debugElement
                .query(platform_browser_1.By.css('mat-vertical-stepper')).componentInstance;
        });
        it('should have true linear attribute', function () {
            expect(stepperComponent.linear).toBe(true);
        });
        it('should not move to next step if current step is invalid', function () {
            expect(testComponent.oneGroup.get('oneCtrl').value).toBe('');
            expect(testComponent.oneGroup.get('oneCtrl').valid).toBe(false);
            expect(testComponent.oneGroup.valid).toBe(false);
            expect(testComponent.oneGroup.invalid).toBe(true);
            expect(stepperComponent.selectedIndex).toBe(0);
            var stepHeaderEl = fixture.debugElement
                .queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'))[1].nativeElement;
            stepHeaderEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(0);
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(0);
            testComponent.oneGroup.get('oneCtrl').setValue('answer');
            stepHeaderEl.click();
            fixture.detectChanges();
            expect(testComponent.oneGroup.valid).toBe(true);
            expect(stepperComponent.selectedIndex).toBe(1);
        });
        it('should not move to next step if current step is pending', function () {
            var stepHeaderEl = fixture.debugElement
                .queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'))[2].nativeElement;
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[1].nativeElement;
            testComponent.oneGroup.get('oneCtrl').setValue('input');
            testComponent.twoGroup.get('twoCtrl').setValue('input');
            stepperComponent.selectedIndex = 1;
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            // Step status = PENDING
            // Assert that linear stepper does not allow step selection change
            expect(testComponent.twoGroup.pending).toBe(true);
            stepHeaderEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            // Trigger asynchronous validation
            testComponent.validationTrigger.next();
            // Asynchronous validation completed:
            // Step status = VALID
            expect(testComponent.twoGroup.pending).toBe(false);
            expect(testComponent.twoGroup.valid).toBe(true);
            stepHeaderEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(2);
            stepperComponent.selectedIndex = 1;
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(2);
        });
        it('should be able to focus step header upon click if it is unable to be selected', function () {
            var stepHeaderEl = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-step-header'))[1].nativeElement;
            fixture.detectChanges();
            expect(stepHeaderEl.getAttribute('tabindex')).toBe('-1');
        });
        it('should be able to move to next step even when invalid if current step is optional', function () {
            testComponent.oneGroup.get('oneCtrl').setValue('input');
            testComponent.twoGroup.get('twoCtrl').setValue('input');
            testComponent.validationTrigger.next();
            stepperComponent.selectedIndex = 1;
            fixture.detectChanges();
            stepperComponent.selectedIndex = 2;
            fixture.detectChanges();
            expect(stepperComponent.steps.toArray()[2].optional).toBe(true);
            expect(stepperComponent.selectedIndex).toBe(2);
            expect(testComponent.threeGroup.get('threeCtrl').valid).toBe(true);
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[2].nativeElement;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex)
                .toBe(3, 'Expected selectedIndex to change when optional step input is empty.');
            stepperComponent.selectedIndex = 2;
            testComponent.threeGroup.get('threeCtrl').setValue('input');
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(testComponent.threeGroup.get('threeCtrl').valid).toBe(false);
            expect(stepperComponent.selectedIndex)
                .toBe(3, 'Expected selectedIndex to change when optional step input is invalid.');
        });
        it('should be able to reset the stepper to its initial state', function () {
            var steps = stepperComponent.steps.toArray();
            testComponent.oneGroup.get('oneCtrl').setValue('value');
            fixture.detectChanges();
            stepperComponent.next();
            fixture.detectChanges();
            stepperComponent.next();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            expect(steps[0].interacted).toBe(true);
            expect(steps[0].completed).toBe(true);
            expect(testComponent.oneGroup.get('oneCtrl').valid).toBe(true);
            expect(testComponent.oneGroup.get('oneCtrl').value).toBe('value');
            expect(steps[1].interacted).toBe(true);
            expect(steps[1].completed).toBe(false);
            expect(testComponent.twoGroup.get('twoCtrl').valid).toBe(false);
            stepperComponent.reset();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(0);
            expect(steps[0].interacted).toBe(false);
            expect(steps[0].completed).toBe(false);
            expect(testComponent.oneGroup.get('oneCtrl').valid).toBe(false);
            expect(testComponent.oneGroup.get('oneCtrl').value).toBeFalsy();
            expect(steps[1].interacted).toBe(false);
            expect(steps[1].completed).toBe(false);
            expect(testComponent.twoGroup.get('twoCtrl').valid).toBe(false);
        });
        it('should reset back to the first step when some of the steps are not editable', function () {
            var steps = stepperComponent.steps.toArray();
            steps[0].editable = false;
            testComponent.oneGroup.get('oneCtrl').setValue('value');
            fixture.detectChanges();
            stepperComponent.next();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(1);
            stepperComponent.reset();
            fixture.detectChanges();
            expect(stepperComponent.selectedIndex).toBe(0);
        });
        it('should not clobber the `complete` binding when resetting', function () {
            var steps = stepperComponent.steps.toArray();
            var fillOutStepper = function () {
                testComponent.oneGroup.get('oneCtrl').setValue('input');
                testComponent.twoGroup.get('twoCtrl').setValue('input');
                testComponent.threeGroup.get('threeCtrl').setValue('valid');
                testComponent.validationTrigger.next();
                stepperComponent.selectedIndex = 1;
                fixture.detectChanges();
                stepperComponent.selectedIndex = 2;
                fixture.detectChanges();
                stepperComponent.selectedIndex = 3;
                fixture.detectChanges();
            };
            fillOutStepper();
            expect(steps[2].completed)
                .toBe(true, 'Expected third step to be considered complete after the first run through.');
            stepperComponent.reset();
            fixture.detectChanges();
            fillOutStepper();
            expect(steps[2].completed).toBe(true, 'Expected third step to be considered complete when doing a run after a reset.');
        });
    });
    describe('linear stepper with a pre-defined selectedIndex', function () {
        var preselectedFixture;
        var stepper;
        beforeEach(function () {
            preselectedFixture = createComponent(SimplePreselectedMatHorizontalStepperApp);
            preselectedFixture.detectChanges();
            stepper = preselectedFixture.debugElement
                .query(platform_browser_1.By.directive(stepper_2.MatHorizontalStepper)).componentInstance;
        });
        it('should not throw', function () {
            expect(function () { return preselectedFixture.detectChanges(); }).not.toThrow();
        });
        it('selectedIndex should be typeof number', function () {
            expect(typeof stepper.selectedIndex).toBe('number');
        });
        it('value of selectedIndex should be the pre-defined value', function () {
            expect(stepper.selectedIndex).toBe(0);
        });
    });
    describe('linear stepper with no `stepControl`', function () {
        var noStepControlFixture;
        beforeEach(function () {
            noStepControlFixture = createComponent(SimpleStepperWithoutStepControl);
            noStepControlFixture.detectChanges();
        });
        it('should not move to the next step if the current one is not completed ', function () {
            var stepper = noStepControlFixture.debugElement
                .query(platform_browser_1.By.directive(stepper_2.MatHorizontalStepper)).componentInstance;
            var headers = noStepControlFixture.debugElement
                .queryAll(platform_browser_1.By.css('.mat-horizontal-stepper-header'));
            expect(stepper.selectedIndex).toBe(0);
            headers[1].nativeElement.click();
            noStepControlFixture.detectChanges();
            expect(stepper.selectedIndex).toBe(0);
        });
    });
    describe('linear stepper with `stepControl`', function () {
        var controlAndBindingFixture;
        beforeEach(function () {
            controlAndBindingFixture =
                createComponent(SimpleStepperWithStepControlAndCompletedBinding);
            controlAndBindingFixture.detectChanges();
        });
        it('should have the `stepControl` take precedence when `completed` is set', function () {
            expect(controlAndBindingFixture.componentInstance.steps[0].control.valid).toBe(true);
            expect(controlAndBindingFixture.componentInstance.steps[0].completed).toBe(false);
            var stepper = controlAndBindingFixture.debugElement
                .query(platform_browser_1.By.directive(stepper_2.MatHorizontalStepper)).componentInstance;
            var headers = controlAndBindingFixture.debugElement
                .queryAll(platform_browser_1.By.css('.mat-horizontal-stepper-header'));
            expect(stepper.selectedIndex).toBe(0);
            headers[1].nativeElement.click();
            controlAndBindingFixture.detectChanges();
            expect(stepper.selectedIndex).toBe(1);
        });
    });
    describe('vertical stepper', function () {
        it('should set the aria-orientation to "vertical"', function () {
            var fixture = createComponent(SimpleMatVerticalStepperApp);
            fixture.detectChanges();
            var stepperEl = fixture.debugElement.query(platform_browser_1.By.css('mat-vertical-stepper')).nativeElement;
            expect(stepperEl.getAttribute('aria-orientation')).toBe('vertical');
        });
        it('should support using the left/right arrows to move focus', function () {
            var fixture = createComponent(SimpleMatVerticalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'));
            assertCorrectKeyboardInteraction(fixture, stepHeaders, 'horizontal');
        });
        it('should support using the up/down arrows to move focus', function () {
            var fixture = createComponent(SimpleMatVerticalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'));
            assertCorrectKeyboardInteraction(fixture, stepHeaders, 'vertical');
        });
        it('should reverse arrow key focus in RTL mode', function () {
            dir.value = 'rtl';
            var fixture = createComponent(SimpleMatVerticalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-vertical-stepper-header'));
            assertArrowKeyInteractionInRtl(fixture, stepHeaders);
        });
        it('should be able to disable ripples', function () {
            var fixture = createComponent(SimpleMatVerticalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatStepHeader));
            var headerRipples = stepHeaders.map(function (headerDebugEl) {
                return headerDebugEl.query(platform_browser_1.By.directive(core_2.MatRipple)).injector.get(core_2.MatRipple);
            });
            expect(headerRipples.every(function (ripple) { return ripple.disabled; })).toBe(false);
            fixture.componentInstance.disableRipple = true;
            fixture.detectChanges();
            expect(headerRipples.every(function (ripple) { return ripple.disabled; })).toBe(true);
        });
    });
    describe('horizontal stepper', function () {
        it('should set the aria-orientation to "horizontal"', function () {
            var fixture = createComponent(SimpleMatHorizontalStepperApp);
            fixture.detectChanges();
            var stepperEl = fixture.debugElement.query(platform_browser_1.By.css('mat-horizontal-stepper')).nativeElement;
            expect(stepperEl.getAttribute('aria-orientation')).toBe('horizontal');
        });
        it('should support using the left/right arrows to move focus', function () {
            var fixture = createComponent(SimpleMatHorizontalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-horizontal-stepper-header'));
            assertCorrectKeyboardInteraction(fixture, stepHeaders, 'horizontal');
        });
        it('should reverse arrow key focus in RTL mode', function () {
            dir.value = 'rtl';
            var fixture = createComponent(SimpleMatHorizontalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-horizontal-stepper-header'));
            assertArrowKeyInteractionInRtl(fixture, stepHeaders);
        });
        it('should reverse arrow key focus when switching into RTL after init', function () {
            var fixture = createComponent(SimpleMatHorizontalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-horizontal-stepper-header'));
            assertCorrectKeyboardInteraction(fixture, stepHeaders, 'horizontal');
            dir.value = 'rtl';
            dir.change.emit('rtl');
            fixture.detectChanges();
            assertArrowKeyInteractionInRtl(fixture, stepHeaders);
        });
        it('should be able to disable ripples', function () {
            var fixture = createComponent(SimpleMatHorizontalStepperApp);
            fixture.detectChanges();
            var stepHeaders = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_1.MatStepHeader));
            var headerRipples = stepHeaders.map(function (headerDebugEl) {
                return headerDebugEl.query(platform_browser_1.By.directive(core_2.MatRipple)).injector.get(core_2.MatRipple);
            });
            expect(headerRipples.every(function (ripple) { return ripple.disabled; })).toBe(false);
            fixture.componentInstance.disableRipple = true;
            fixture.detectChanges();
            expect(headerRipples.every(function (ripple) { return ripple.disabled; })).toBe(true);
        });
    });
    describe('linear stepper with valid step', function () {
        var fixture;
        var testComponent;
        var stepper;
        beforeEach(function () {
            fixture = createComponent(LinearStepperWithValidOptionalStep);
            fixture.detectChanges();
            testComponent = fixture.componentInstance;
            stepper = fixture.debugElement
                .query(platform_browser_1.By.css('mat-horizontal-stepper')).componentInstance;
        });
        it('must be visited if not optional', function () {
            stepper.selectedIndex = 2;
            fixture.detectChanges();
            expect(stepper.selectedIndex).toBe(0);
            stepper.selectedIndex = 1;
            fixture.detectChanges();
            expect(stepper.selectedIndex).toBe(1);
            stepper.selectedIndex = 2;
            fixture.detectChanges();
            expect(stepper.selectedIndex).toBe(2);
        });
        it('can be skipped entirely if optional', function () {
            testComponent.step2Optional = true;
            fixture.detectChanges();
            stepper.selectedIndex = 2;
            fixture.detectChanges();
            expect(stepper.selectedIndex).toBe(2);
        });
    });
    describe('aria labelling', function () {
        var fixture;
        var stepHeader;
        beforeEach(function () {
            fixture = createComponent(StepperWithAriaInputs);
            fixture.detectChanges();
            stepHeader = fixture.nativeElement.querySelector('.mat-step-header');
        });
        it('should not set aria-label or aria-labelledby attributes if they are not passed in', function () {
            expect(stepHeader.hasAttribute('aria-label')).toBe(false);
            expect(stepHeader.hasAttribute('aria-labelledby')).toBe(false);
        });
        it('should set the aria-label attribute', function () {
            fixture.componentInstance.ariaLabel = 'First step';
            fixture.detectChanges();
            expect(stepHeader.getAttribute('aria-label')).toBe('First step');
        });
        it('should set the aria-labelledby attribute', function () {
            fixture.componentInstance.ariaLabelledby = 'first-step-label';
            fixture.detectChanges();
            expect(stepHeader.getAttribute('aria-labelledby')).toBe('first-step-label');
        });
        it('should not be able to set both an aria-label and aria-labelledby', function () {
            fixture.componentInstance.ariaLabel = 'First step';
            fixture.componentInstance.ariaLabelledby = 'first-step-label';
            fixture.detectChanges();
            expect(stepHeader.getAttribute('aria-label')).toBe('First step');
            expect(stepHeader.hasAttribute('aria-labelledby')).toBe(false);
        });
    });
    describe('stepper with error state', function () {
        var fixture;
        var stepper;
        beforeEach(function () {
            fixture = createComponent(MatHorizontalStepperWithErrorsApp, [{
                    provide: stepper_1.STEPPER_GLOBAL_OPTIONS,
                    useValue: { showError: true }
                }], [form_field_1.MatFormFieldModule, input_module_1.MatInputModule]);
            fixture.detectChanges();
            stepper = fixture.debugElement
                .query(platform_browser_1.By.css('mat-horizontal-stepper')).componentInstance;
        });
        it('should show error state', function () {
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            stepper.selectedIndex = 1;
            stepper.steps.first.hasError = true;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepper._getIndicatorType(0)).toBe(stepper_1.STEP_STATE.ERROR);
        });
        it('should respect a custom falsy hasError value', function () {
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            stepper.selectedIndex = 1;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepper._getIndicatorType(0)).toBe(stepper_1.STEP_STATE.ERROR);
            stepper.steps.first.hasError = false;
            fixture.detectChanges();
            expect(stepper._getIndicatorType(0)).not.toBe(stepper_1.STEP_STATE.ERROR);
        });
    });
    describe('stepper using Material UI Guideline logic', function () {
        var fixture;
        var stepper;
        beforeEach(function () {
            fixture = createComponent(MatHorizontalStepperWithErrorsApp, [{
                    provide: stepper_1.STEPPER_GLOBAL_OPTIONS,
                    useValue: { displayDefaultIndicatorType: false }
                }], [form_field_1.MatFormFieldModule, input_module_1.MatInputModule]);
            fixture.detectChanges();
            stepper = fixture.debugElement
                .query(platform_browser_1.By.css('mat-horizontal-stepper')).componentInstance;
        });
        it('should show done state when step is completed and its not the current step', function () {
            var nextButtonNativeEl = fixture.debugElement
                .queryAll(platform_browser_1.By.directive(stepper_button_1.MatStepperNext))[0].nativeElement;
            stepper.selectedIndex = 1;
            stepper.steps.first.completed = true;
            nextButtonNativeEl.click();
            fixture.detectChanges();
            expect(stepper._getIndicatorType(0)).toBe(stepper_1.STEP_STATE.DONE);
        });
        it('should show edit state when step is editable and its the current step', function () {
            stepper.selectedIndex = 1;
            stepper.steps.toArray()[1].editable = true;
            fixture.detectChanges();
            expect(stepper._getIndicatorType(1)).toBe(stepper_1.STEP_STATE.EDIT);
        });
    });
});
/** Asserts that keyboard interaction works correctly. */
function assertCorrectKeyboardInteraction(fixture, stepHeaders, orientation) {
    var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
    var nextKey = orientation === 'vertical' ? keycodes_1.DOWN_ARROW : keycodes_1.RIGHT_ARROW;
    var prevKey = orientation === 'vertical' ? keycodes_1.UP_ARROW : keycodes_1.LEFT_ARROW;
    expect(stepperComponent._getFocusIndex()).toBe(0);
    expect(stepperComponent.selectedIndex).toBe(0);
    var stepHeaderEl = stepHeaders[0].nativeElement;
    testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', nextKey);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex())
        .toBe(1, 'Expected index of focused step to increase by 1 after pressing the next key.');
    expect(stepperComponent.selectedIndex)
        .toBe(0, 'Expected index of selected step to remain unchanged after pressing the next key.');
    stepHeaderEl = stepHeaders[1].nativeElement;
    testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', keycodes_1.ENTER);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex())
        .toBe(1, 'Expected index of focused step to remain unchanged after ENTER event.');
    expect(stepperComponent.selectedIndex)
        .toBe(1, 'Expected index of selected step to change to index of focused step after ENTER event.');
    stepHeaderEl = stepHeaders[1].nativeElement;
    testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', prevKey);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex())
        .toBe(0, 'Expected index of focused step to decrease by 1 after pressing the previous key.');
    expect(stepperComponent.selectedIndex).toBe(1, 'Expected index of selected step to remain unchanged after pressing the previous key.');
    // When the focus is on the last step and right arrow key is pressed, the focus should cycle
    // through to the first step.
    stepperComponent._keyManager.updateActiveItemIndex(2);
    stepHeaderEl = stepHeaders[2].nativeElement;
    testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', nextKey);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex()).toBe(0, 'Expected index of focused step to cycle through to index 0 after pressing the next key.');
    expect(stepperComponent.selectedIndex)
        .toBe(1, 'Expected index of selected step to remain unchanged after pressing the next key.');
    stepHeaderEl = stepHeaders[0].nativeElement;
    testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', keycodes_1.SPACE);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex())
        .toBe(0, 'Expected index of focused to remain unchanged after SPACE event.');
    expect(stepperComponent.selectedIndex)
        .toBe(0, 'Expected index of selected step to change to index of focused step after SPACE event.');
    var endEvent = testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', keycodes_1.END);
    expect(stepperComponent._getFocusIndex())
        .toBe(stepHeaders.length - 1, 'Expected last step to be focused when pressing END.');
    expect(endEvent.defaultPrevented).toBe(true, 'Expected default END action to be prevented.');
    var homeEvent = testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', keycodes_1.HOME);
    expect(stepperComponent._getFocusIndex())
        .toBe(0, 'Expected first step to be focused when pressing HOME.');
    expect(homeEvent.defaultPrevented).toBe(true, 'Expected default HOME action to be prevented.');
}
/** Asserts that arrow key direction works correctly in RTL mode. */
function assertArrowKeyInteractionInRtl(fixture, stepHeaders) {
    var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
    expect(stepperComponent._getFocusIndex()).toBe(0);
    var stepHeaderEl = stepHeaders[0].nativeElement;
    testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', keycodes_1.LEFT_ARROW);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex()).toBe(1);
    stepHeaderEl = stepHeaders[1].nativeElement;
    testing_1.dispatchKeyboardEvent(stepHeaderEl, 'keydown', keycodes_1.RIGHT_ARROW);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex()).toBe(0);
}
/** Asserts that keyboard interaction works correctly when the user is pressing a modifier key. */
function assertSelectKeyWithModifierInteraction(fixture, stepHeaders, orientation, selectionKey) {
    var stepperComponent = fixture.debugElement.query(platform_browser_1.By.directive(stepper_2.MatStepper)).componentInstance;
    var modifiers = ['altKey', 'shiftKey', 'ctrlKey', 'metaKey'];
    expect(stepperComponent._getFocusIndex()).toBe(0);
    expect(stepperComponent.selectedIndex).toBe(0);
    testing_1.dispatchKeyboardEvent(stepHeaders[0].nativeElement, 'keydown', orientation === 'vertical' ? keycodes_1.DOWN_ARROW : keycodes_1.RIGHT_ARROW);
    fixture.detectChanges();
    expect(stepperComponent._getFocusIndex())
        .toBe(1, 'Expected index of focused step to increase by 1 after pressing the next key.');
    expect(stepperComponent.selectedIndex)
        .toBe(0, 'Expected index of selected step to remain unchanged after pressing the next key.');
    modifiers.forEach(function (modifier) {
        var event = testing_1.createKeyboardEvent('keydown', selectionKey);
        Object.defineProperty(event, modifier, { get: function () { return true; } });
        testing_1.dispatchEvent(stepHeaders[1].nativeElement, event);
        fixture.detectChanges();
        expect(stepperComponent.selectedIndex).toBe(0, "Expected selected index to remain unchanged " +
            ("when pressing the selection key with " + modifier + " modifier."));
        expect(event.defaultPrevented).toBe(false);
    });
}
function asyncValidator(minLength, validationTrigger) {
    return function (control) {
        return validationTrigger.pipe(operators_1.map(function () { return control.value && control.value.length >= minLength ? null : { asyncValidation: {} }; }), operators_1.take(1));
    };
}
function createComponent(component, providers, imports) {
    if (providers === void 0) { providers = []; }
    if (imports === void 0) { imports = []; }
    testing_2.TestBed.configureTestingModule({
        imports: [
            index_1.MatStepperModule,
            animations_1.NoopAnimationsModule,
            forms_1.ReactiveFormsModule
        ].concat(imports),
        declarations: [component],
        providers: [
            { provide: bidi_1.Directionality, useFactory: function () { return dir; } }
        ].concat(providers),
    }).compileComponents();
    return testing_2.TestBed.createComponent(component);
}
var MatHorizontalStepperWithErrorsApp = /** @class */ (function () {
    function MatHorizontalStepperWithErrorsApp(_formBuilder) {
        this._formBuilder = _formBuilder;
    }
    MatHorizontalStepperWithErrorsApp.prototype.ngOnInit = function () {
        this.formGroup = this._formBuilder.group({
            firstNameCtrl: ['', forms_1.Validators.required],
            lastNameCtrl: ['', forms_1.Validators.required],
        });
    };
    MatHorizontalStepperWithErrorsApp = __decorate([
        core_1.Component({
            template: "\n  <form [formGroup]=\"formGroup\">\n    <mat-horizontal-stepper>\n      <mat-step errorMessage=\"This field is required\"\n        [stepControl]=\"formGroup.get('firstNameCtrl')\">\n        <ng-template matStepLabel>Step 1</ng-template>\n        <mat-form-field>\n          <mat-label>First name</mat-label>\n          <input matInput formControlName=\"firstNameCtrl\" required>\n          <mat-error>This field is required</mat-error>\n        </mat-form-field>\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n      <mat-step>\n        <ng-template matStepLabel>Step 2</ng-template>\n        Content 2\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n    </mat-horizontal-stepper>\n  </form>\n  "
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], MatHorizontalStepperWithErrorsApp);
    return MatHorizontalStepperWithErrorsApp;
}());
var SimpleMatHorizontalStepperApp = /** @class */ (function () {
    function SimpleMatHorizontalStepperApp() {
        this.inputLabel = 'Step 3';
        this.disableRipple = false;
    }
    SimpleMatHorizontalStepperApp = __decorate([
        core_1.Component({
            template: "\n    <mat-horizontal-stepper [disableRipple]=\"disableRipple\">\n      <mat-step>\n        <ng-template matStepLabel>Step 1</ng-template>\n        Content 1\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n      <mat-step>\n        <ng-template matStepLabel>Step 2</ng-template>\n        Content 2\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n      <mat-step [label]=\"inputLabel\" optional>\n        Content 3\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n    </mat-horizontal-stepper>\n  "
        })
    ], SimpleMatHorizontalStepperApp);
    return SimpleMatHorizontalStepperApp;
}());
var SimpleMatVerticalStepperApp = /** @class */ (function () {
    function SimpleMatVerticalStepperApp() {
        this.inputLabel = 'Step 3';
        this.showStepTwo = true;
        this.disableRipple = false;
    }
    SimpleMatVerticalStepperApp = __decorate([
        core_1.Component({
            template: "\n    <mat-vertical-stepper [disableRipple]=\"disableRipple\">\n      <mat-step>\n        <ng-template matStepLabel>Step 1</ng-template>\n        Content 1\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n      <mat-step *ngIf=\"showStepTwo\">\n        <ng-template matStepLabel>Step 2</ng-template>\n        Content 2\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n      <mat-step [label]=\"inputLabel\">\n        Content 3\n        <div>\n          <button mat-button matStepperPrevious>Back</button>\n          <button mat-button matStepperNext>Next</button>\n        </div>\n      </mat-step>\n    </mat-vertical-stepper>\n  "
        })
    ], SimpleMatVerticalStepperApp);
    return SimpleMatVerticalStepperApp;
}());
var LinearMatVerticalStepperApp = /** @class */ (function () {
    function LinearMatVerticalStepperApp() {
        this.validationTrigger = new rxjs_1.Subject();
    }
    LinearMatVerticalStepperApp.prototype.ngOnInit = function () {
        this.oneGroup = new forms_1.FormGroup({
            oneCtrl: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.twoGroup = new forms_1.FormGroup({
            twoCtrl: new forms_1.FormControl('', forms_1.Validators.required, asyncValidator(3, this.validationTrigger))
        });
        this.threeGroup = new forms_1.FormGroup({
            threeCtrl: new forms_1.FormControl('', forms_1.Validators.pattern(VALID_REGEX))
        });
    };
    LinearMatVerticalStepperApp = __decorate([
        core_1.Component({
            template: "\n    <mat-vertical-stepper linear>\n      <mat-step [stepControl]=\"oneGroup\">\n        <form [formGroup]=\"oneGroup\">\n          <ng-template matStepLabel>Step one</ng-template>\n          <input formControlName=\"oneCtrl\" required>\n          <div>\n            <button mat-button matStepperPrevious>Back</button>\n            <button mat-button matStepperNext>Next</button>\n          </div>\n        </form>\n      </mat-step>\n      <mat-step [stepControl]=\"twoGroup\">\n        <form [formGroup]=\"twoGroup\">\n          <ng-template matStepLabel>Step two</ng-template>\n          <input formControlName=\"twoCtrl\" required>\n          <div>\n            <button mat-button matStepperPrevious>Back</button>\n            <button mat-button matStepperNext>Next</button>\n          </div>\n        </form>\n      </mat-step>\n      <mat-step [stepControl]=\"threeGroup\" optional>\n        <form [formGroup]=\"threeGroup\">\n          <ng-template matStepLabel>Step two</ng-template>\n          <input formControlName=\"threeCtrl\">\n          <div>\n            <button mat-button matStepperPrevious>Back</button>\n            <button mat-button matStepperNext>Next</button>\n          </div>\n        </form>\n      </mat-step>\n      <mat-step>\n        Done\n      </mat-step>\n    </mat-vertical-stepper>\n  "
        })
    ], LinearMatVerticalStepperApp);
    return LinearMatVerticalStepperApp;
}());
var SimplePreselectedMatHorizontalStepperApp = /** @class */ (function () {
    function SimplePreselectedMatHorizontalStepperApp() {
        this.index = 0;
    }
    SimplePreselectedMatHorizontalStepperApp = __decorate([
        core_1.Component({
            template: "\n    <mat-horizontal-stepper [linear]=\"true\" [selectedIndex]=\"index\">\n      <mat-step label=\"One\"></mat-step>\n      <mat-step label=\"Two\"></mat-step>\n      <mat-step label=\"Three\"></mat-step>\n    </mat-horizontal-stepper>\n  "
        })
    ], SimplePreselectedMatHorizontalStepperApp);
    return SimplePreselectedMatHorizontalStepperApp;
}());
var SimpleStepperWithoutStepControl = /** @class */ (function () {
    function SimpleStepperWithoutStepControl() {
        this.steps = [
            { label: 'One', completed: false },
            { label: 'Two', completed: false },
            { label: 'Three', completed: false }
        ];
    }
    SimpleStepperWithoutStepControl = __decorate([
        core_1.Component({
            template: "\n    <mat-horizontal-stepper linear>\n      <mat-step\n        *ngFor=\"let step of steps\"\n        [label]=\"step.label\"\n        [completed]=\"step.completed\"></mat-step>\n    </mat-horizontal-stepper>\n  "
        })
    ], SimpleStepperWithoutStepControl);
    return SimpleStepperWithoutStepControl;
}());
var SimpleStepperWithStepControlAndCompletedBinding = /** @class */ (function () {
    function SimpleStepperWithStepControlAndCompletedBinding() {
        this.steps = [
            { label: 'One', completed: false, control: new forms_1.FormControl() },
            { label: 'Two', completed: false, control: new forms_1.FormControl() },
            { label: 'Three', completed: false, control: new forms_1.FormControl() }
        ];
    }
    SimpleStepperWithStepControlAndCompletedBinding = __decorate([
        core_1.Component({
            template: "\n    <mat-horizontal-stepper linear>\n      <mat-step\n        *ngFor=\"let step of steps\"\n        [label]=\"step.label\"\n        [stepControl]=\"step.control\"\n        [completed]=\"step.completed\"></mat-step>\n    </mat-horizontal-stepper>\n  "
        })
    ], SimpleStepperWithStepControlAndCompletedBinding);
    return SimpleStepperWithStepControlAndCompletedBinding;
}());
var IconOverridesStepper = /** @class */ (function () {
    function IconOverridesStepper() {
    }
    IconOverridesStepper.prototype.getRomanNumeral = function (value) {
        var numberMap = {
            1: 'I',
            2: 'II',
            3: 'III',
            4: 'IV',
            5: 'V',
            6: 'VI',
            7: 'VII',
            8: 'VIII',
            9: 'IX'
        };
        return numberMap[value];
    };
    IconOverridesStepper = __decorate([
        core_1.Component({
            template: "\n    <mat-horizontal-stepper>\n      <ng-template matStepperIcon=\"edit\">Custom edit</ng-template>\n      <ng-template matStepperIcon=\"done\">Custom done</ng-template>\n      <ng-template matStepperIcon=\"number\" let-index=\"index\">\n        {{getRomanNumeral(index + 1)}}\n      </ng-template>\n\n      <mat-step>Content 1</mat-step>\n      <mat-step>Content 2</mat-step>\n      <mat-step>Content 3</mat-step>\n    </mat-horizontal-stepper>\n"
        })
    ], IconOverridesStepper);
    return IconOverridesStepper;
}());
var LinearStepperWithValidOptionalStep = /** @class */ (function () {
    function LinearStepperWithValidOptionalStep() {
        this.controls = [0, 0, 0].map(function () { return new forms_1.FormControl(); });
        this.step2Optional = false;
    }
    LinearStepperWithValidOptionalStep = __decorate([
        core_1.Component({
            template: "\n    <mat-horizontal-stepper linear>\n      <mat-step label=\"Step 1\" [stepControl]=\"controls[0]\"></mat-step>\n      <mat-step label=\"Step 2\" [stepControl]=\"controls[1]\" [optional]=\"step2Optional\"></mat-step>\n      <mat-step label=\"Step 3\" [stepControl]=\"controls[2]\"></mat-step>\n    </mat-horizontal-stepper>\n  "
        })
    ], LinearStepperWithValidOptionalStep);
    return LinearStepperWithValidOptionalStep;
}());
var StepperWithAriaInputs = /** @class */ (function () {
    function StepperWithAriaInputs() {
    }
    StepperWithAriaInputs = __decorate([
        core_1.Component({
            template: "\n    <mat-horizontal-stepper>\n      <mat-step [aria-label]=\"ariaLabel\" [aria-labelledby]=\"ariaLabelledby\" label=\"One\"></mat-step>\n    </mat-horizontal-stepper>\n  "
        })
    ], StepperWithAriaInputs);
    return StepperWithAriaInputs;
}());
//# sourceMappingURL=stepper.spec.js.map