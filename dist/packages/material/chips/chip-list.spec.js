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
var animations_1 = require("@angular/animations");
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var platform_browser_1 = require("@angular/platform-browser");
var animations_2 = require("@angular/platform-browser/animations");
var rxjs_1 = require("rxjs");
var index_1 = require("../input/index");
var chip_1 = require("./chip");
var index_2 = require("./index");
describe('MatChipList', function () {
    var fixture;
    var chipListDebugElement;
    var chipListNativeElement;
    var chipListInstance;
    var testComponent;
    var chips;
    var manager;
    var zone;
    var dirChange;
    describe('StandardChipList', function () {
        describe('basic behaviors', function () {
            beforeEach(function () {
                setupStandardList();
            });
            it('should add the `mat-chip-list` class', function () {
                expect(chipListNativeElement.classList).toContain('mat-chip-list');
            });
            it('should not have the aria-selected attribute when is not selectable', function () {
                testComponent.selectable = false;
                fixture.detectChanges();
                var chipsValid = chips.toArray().every(function (chip) {
                    return !chip.selectable && !chip._elementRef.nativeElement.hasAttribute('aria-selected');
                });
                expect(chipsValid).toBe(true);
            });
            it('should toggle the chips disabled state based on whether it is disabled', function () {
                expect(chips.toArray().every(function (chip) { return chip.disabled; })).toBe(false);
                chipListInstance.disabled = true;
                fixture.detectChanges();
                expect(chips.toArray().every(function (chip) { return chip.disabled; })).toBe(true);
                chipListInstance.disabled = false;
                fixture.detectChanges();
                expect(chips.toArray().every(function (chip) { return chip.disabled; })).toBe(false);
            });
            it('should disable a chip that is added after the list became disabled', testing_2.fakeAsync(function () {
                expect(chips.toArray().every(function (chip) { return chip.disabled; })).toBe(false);
                chipListInstance.disabled = true;
                fixture.detectChanges();
                expect(chips.toArray().every(function (chip) { return chip.disabled; })).toBe(true);
                fixture.componentInstance.items.push(5, 6);
                fixture.detectChanges();
                testing_2.tick();
                fixture.detectChanges();
                expect(chips.toArray().every(function (chip) { return chip.disabled; })).toBe(true);
            }));
        });
        describe('with selected chips', function () {
            beforeEach(function () {
                fixture = createComponent(SelectedChipList);
                fixture.detectChanges();
                chipListDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatChipList));
                chipListNativeElement = chipListDebugElement.nativeElement;
            });
            it('should not override chips selected', function () {
                var instanceChips = fixture.componentInstance.chips.toArray();
                expect(instanceChips[0].selected).toBe(true, 'Expected first option to be selected.');
                expect(instanceChips[1].selected).toBe(false, 'Expected second option to be not selected.');
                expect(instanceChips[2].selected).toBe(true, 'Expected third option to be selected.');
            });
            it('should have role listbox', function () {
                expect(chipListNativeElement.getAttribute('role')).toBe('listbox');
            });
            it('should not have role when empty', function () {
                fixture.componentInstance.foods = [];
                fixture.detectChanges();
                expect(chipListNativeElement.getAttribute('role')).toBeNull('Expect no role attribute');
            });
        });
        describe('focus behaviors', function () {
            beforeEach(function () {
                setupStandardList();
                manager = chipListInstance._keyManager;
            });
            it('should focus the first chip on focus', function () {
                chipListInstance.focus();
                fixture.detectChanges();
                expect(manager.activeItemIndex).toBe(0);
            });
            it('should watch for chip focus', function () {
                var array = chips.toArray();
                var lastIndex = array.length - 1;
                var lastItem = array[lastIndex];
                lastItem.focus();
                fixture.detectChanges();
                expect(manager.activeItemIndex).toBe(lastIndex);
            });
            it('should watch for chip focus', function () {
                var array = chips.toArray();
                var lastIndex = array.length - 1;
                var lastItem = array[lastIndex];
                lastItem.focus();
                fixture.detectChanges();
                expect(manager.activeItemIndex).toBe(lastIndex);
            });
            it('should be able to become focused when disabled', function () {
                expect(chipListInstance.focused).toBe(false, 'Expected list to not be focused.');
                chipListInstance.disabled = true;
                fixture.detectChanges();
                chipListInstance.focus();
                fixture.detectChanges();
                expect(chipListInstance.focused).toBe(false, 'Expected list to continue not to be focused');
            });
            it('should remove the tabindex from the list if it is disabled', function () {
                expect(chipListNativeElement.getAttribute('tabindex')).toBeTruthy();
                chipListInstance.disabled = true;
                fixture.detectChanges();
                expect(chipListNativeElement.hasAttribute('tabindex')).toBeFalsy();
            });
            describe('on chip destroy', function () {
                it('should focus the next item', function () {
                    var array = chips.toArray();
                    var midItem = array[2];
                    // Focus the middle item
                    midItem.focus();
                    // Destroy the middle item
                    testComponent.remove = 2;
                    fixture.detectChanges();
                    // It focuses the 4th item (now at index 2)
                    expect(manager.activeItemIndex).toEqual(2);
                });
                it('should focus the previous item', function () {
                    var array = chips.toArray();
                    var lastIndex = array.length - 1;
                    var lastItem = array[lastIndex];
                    // Focus the last item
                    lastItem.focus();
                    // Destroy the last item
                    testComponent.remove = lastIndex;
                    fixture.detectChanges();
                    // It focuses the next-to-last item
                    expect(manager.activeItemIndex).toEqual(lastIndex - 1);
                });
                it('should not focus if chip list is not focused', function () {
                    var array = chips.toArray();
                    var midItem = array[2];
                    // Focus and blur the middle item
                    midItem.focus();
                    midItem._blur();
                    zone.simulateZoneExit();
                    // Destroy the middle item
                    testComponent.remove = 2;
                    fixture.detectChanges();
                    // Should not have focus
                    expect(chipListInstance._keyManager.activeItemIndex).toEqual(-1);
                });
                it('should move focus to the last chip when the focused chip was deleted inside a' +
                    'component with animations', testing_2.fakeAsync(function () {
                    fixture.destroy();
                    testing_2.TestBed.resetTestingModule();
                    fixture = createComponent(StandardChipListWithAnimations, [], animations_2.BrowserAnimationsModule);
                    fixture.detectChanges();
                    chipListDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatChipList));
                    chipListNativeElement = chipListDebugElement.nativeElement;
                    chipListInstance = chipListDebugElement.componentInstance;
                    testComponent = fixture.debugElement.componentInstance;
                    chips = chipListInstance.chips;
                    chips.last.focus();
                    fixture.detectChanges();
                    expect(chipListInstance._keyManager.activeItemIndex).toBe(chips.length - 1);
                    testing_1.dispatchKeyboardEvent(chips.last._elementRef.nativeElement, 'keydown', keycodes_1.BACKSPACE);
                    fixture.detectChanges();
                    testing_2.tick(500);
                    expect(chipListInstance._keyManager.activeItemIndex).toBe(chips.length - 1);
                }));
            });
        });
        describe('keyboard behavior', function () {
            describe('LTR (default)', function () {
                beforeEach(function () {
                    setupStandardList();
                    manager = chipListInstance._keyManager;
                });
                it('should focus previous item when press LEFT ARROW', function () {
                    var nativeChips = chipListNativeElement.querySelectorAll('mat-chip');
                    var lastNativeChip = nativeChips[nativeChips.length - 1];
                    var LEFT_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.LEFT_ARROW, lastNativeChip);
                    var array = chips.toArray();
                    var lastIndex = array.length - 1;
                    var lastItem = array[lastIndex];
                    // Focus the last item in the array
                    lastItem.focus();
                    expect(manager.activeItemIndex).toEqual(lastIndex);
                    // Press the LEFT arrow
                    chipListInstance._keydown(LEFT_EVENT);
                    chipListInstance._blur(); // Simulate focus leaving the list and going to the chip.
                    fixture.detectChanges();
                    // It focuses the next-to-last item
                    expect(manager.activeItemIndex).toEqual(lastIndex - 1);
                });
                it('should focus next item when press RIGHT ARROW', function () {
                    var nativeChips = chipListNativeElement.querySelectorAll('mat-chip');
                    var firstNativeChip = nativeChips[0];
                    var RIGHT_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.RIGHT_ARROW, firstNativeChip);
                    var array = chips.toArray();
                    var firstItem = array[0];
                    // Focus the last item in the array
                    firstItem.focus();
                    expect(manager.activeItemIndex).toEqual(0);
                    // Press the RIGHT arrow
                    chipListInstance._keydown(RIGHT_EVENT);
                    chipListInstance._blur(); // Simulate focus leaving the list and going to the chip.
                    fixture.detectChanges();
                    // It focuses the next-to-last item
                    expect(manager.activeItemIndex).toEqual(1);
                });
                it('should not handle arrow key events from non-chip elements', function () {
                    var event = testing_1.createKeyboardEvent('keydown', keycodes_1.RIGHT_ARROW, chipListNativeElement);
                    var initialActiveIndex = manager.activeItemIndex;
                    chipListInstance._keydown(event);
                    fixture.detectChanges();
                    expect(manager.activeItemIndex)
                        .toBe(initialActiveIndex, 'Expected focused item not to have changed.');
                });
                it('should focus the first item when pressing HOME', function () {
                    var nativeChips = chipListNativeElement.querySelectorAll('mat-chip');
                    var lastNativeChip = nativeChips[nativeChips.length - 1];
                    var HOME_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.HOME, lastNativeChip);
                    var array = chips.toArray();
                    var lastItem = array[array.length - 1];
                    lastItem.focus();
                    expect(manager.activeItemIndex).toBe(array.length - 1);
                    chipListInstance._keydown(HOME_EVENT);
                    fixture.detectChanges();
                    expect(manager.activeItemIndex).toBe(0);
                    expect(HOME_EVENT.defaultPrevented).toBe(true);
                });
                it('should focus the last item when pressing END', function () {
                    var nativeChips = chipListNativeElement.querySelectorAll('mat-chip');
                    var END_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.END, nativeChips[0]);
                    expect(manager.activeItemIndex).toBe(-1);
                    chipListInstance._keydown(END_EVENT);
                    fixture.detectChanges();
                    expect(manager.activeItemIndex).toBe(chips.length - 1);
                    expect(END_EVENT.defaultPrevented).toBe(true);
                });
            });
            describe('RTL', function () {
                beforeEach(function () {
                    setupStandardList('rtl');
                    manager = chipListInstance._keyManager;
                });
                it('should focus previous item when press RIGHT ARROW', function () {
                    var nativeChips = chipListNativeElement.querySelectorAll('mat-chip');
                    var lastNativeChip = nativeChips[nativeChips.length - 1];
                    var RIGHT_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.RIGHT_ARROW, lastNativeChip);
                    var array = chips.toArray();
                    var lastIndex = array.length - 1;
                    var lastItem = array[lastIndex];
                    // Focus the last item in the array
                    lastItem.focus();
                    expect(manager.activeItemIndex).toEqual(lastIndex);
                    // Press the RIGHT arrow
                    chipListInstance._keydown(RIGHT_EVENT);
                    chipListInstance._blur(); // Simulate focus leaving the list and going to the chip.
                    fixture.detectChanges();
                    // It focuses the next-to-last item
                    expect(manager.activeItemIndex).toEqual(lastIndex - 1);
                });
                it('should focus next item when press LEFT ARROW', function () {
                    var nativeChips = chipListNativeElement.querySelectorAll('mat-chip');
                    var firstNativeChip = nativeChips[0];
                    var LEFT_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.LEFT_ARROW, firstNativeChip);
                    var array = chips.toArray();
                    var firstItem = array[0];
                    // Focus the last item in the array
                    firstItem.focus();
                    expect(manager.activeItemIndex).toEqual(0);
                    // Press the LEFT arrow
                    chipListInstance._keydown(LEFT_EVENT);
                    chipListInstance._blur(); // Simulate focus leaving the list and going to the chip.
                    fixture.detectChanges();
                    // It focuses the next-to-last item
                    expect(manager.activeItemIndex).toEqual(1);
                });
                it('should allow focus to escape when tabbing away', testing_2.fakeAsync(function () {
                    chipListInstance._keyManager.onKeydown(testing_1.createKeyboardEvent('keydown', keycodes_1.TAB));
                    expect(chipListInstance._tabIndex)
                        .toBe(-1, 'Expected tabIndex to be set to -1 temporarily.');
                    testing_2.tick();
                    expect(chipListInstance._tabIndex).toBe(0, 'Expected tabIndex to be reset back to 0');
                }));
                it("should use user defined tabIndex", testing_2.fakeAsync(function () {
                    chipListInstance.tabIndex = 4;
                    fixture.detectChanges();
                    expect(chipListInstance._tabIndex)
                        .toBe(4, 'Expected tabIndex to be set to user defined value 4.');
                    chipListInstance._keyManager.onKeydown(testing_1.createKeyboardEvent('keydown', keycodes_1.TAB));
                    expect(chipListInstance._tabIndex)
                        .toBe(-1, 'Expected tabIndex to be set to -1 temporarily.');
                    testing_2.tick();
                    expect(chipListInstance._tabIndex).toBe(4, 'Expected tabIndex to be reset back to 4');
                }));
            });
            it('should account for the direction changing', function () {
                setupStandardList();
                manager = chipListInstance._keyManager;
                var nativeChips = chipListNativeElement.querySelectorAll('mat-chip');
                var firstNativeChip = nativeChips[0];
                var RIGHT_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.RIGHT_ARROW, firstNativeChip);
                var array = chips.toArray();
                var firstItem = array[0];
                firstItem.focus();
                expect(manager.activeItemIndex).toBe(0);
                chipListInstance._keydown(RIGHT_EVENT);
                chipListInstance._blur();
                fixture.detectChanges();
                expect(manager.activeItemIndex).toBe(1);
                dirChange.next('rtl');
                fixture.detectChanges();
                chipListInstance._keydown(RIGHT_EVENT);
                chipListInstance._blur();
                fixture.detectChanges();
                expect(manager.activeItemIndex).toBe(0);
            });
        });
    });
    describe('FormFieldChipList', function () {
        beforeEach(function () {
            setupInputList();
        });
        describe('keyboard behavior', function () {
            beforeEach(function () {
                manager = chipListInstance._keyManager;
            });
            it('should maintain focus if the active chip is deleted', function () {
                var secondChip = fixture.nativeElement.querySelectorAll('.mat-chip')[1];
                secondChip.focus();
                fixture.detectChanges();
                expect(chipListInstance.chips.toArray().findIndex(function (chip) { return chip._hasFocus; })).toBe(1);
                testing_1.dispatchKeyboardEvent(secondChip, 'keydown', keycodes_1.DELETE);
                fixture.detectChanges();
                expect(chipListInstance.chips.toArray().findIndex(function (chip) { return chip._hasFocus; })).toBe(1);
            });
            describe('when the input has focus', function () {
                it('should not focus the last chip when press DELETE', function () {
                    var nativeInput = fixture.nativeElement.querySelector('input');
                    var DELETE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DELETE, nativeInput);
                    // Focus the input
                    nativeInput.focus();
                    expect(manager.activeItemIndex).toBe(-1);
                    // Press the DELETE key
                    chipListInstance._keydown(DELETE_EVENT);
                    fixture.detectChanges();
                    // It doesn't focus the last chip
                    expect(manager.activeItemIndex).toEqual(-1);
                });
                it('should focus the last chip when press BACKSPACE', function () {
                    var nativeInput = fixture.nativeElement.querySelector('input');
                    var BACKSPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.BACKSPACE, nativeInput);
                    // Focus the input
                    nativeInput.focus();
                    expect(manager.activeItemIndex).toBe(-1);
                    // Press the BACKSPACE key
                    chipListInstance._keydown(BACKSPACE_EVENT);
                    fixture.detectChanges();
                    // It focuses the last chip
                    expect(manager.activeItemIndex).toEqual(chips.length - 1);
                });
            });
        });
        it('should complete the stateChanges stream on destroy', function () {
            var spy = jasmine.createSpy('stateChanges complete');
            var subscription = chipListInstance.stateChanges.subscribe(undefined, undefined, spy);
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should point the label id to the chip input', function () {
            var label = fixture.nativeElement.querySelector('label');
            var input = fixture.nativeElement.querySelector('input');
            fixture.detectChanges();
            expect(label.getAttribute('for')).toBeTruthy();
            expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
            expect(label.getAttribute('aria-owns')).toBe(input.getAttribute('id'));
        });
    });
    describe('with chip remove', function () {
        var chipList;
        var chipRemoveDebugElements;
        beforeEach(function () {
            fixture = createComponent(ChipListWithRemove);
            fixture.detectChanges();
            chipList = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatChipList)).componentInstance;
            chipRemoveDebugElements = fixture.debugElement.queryAll(platform_browser_1.By.directive(index_2.MatChipRemove));
            chips = chipList.chips;
        });
        it('should properly focus next item if chip is removed through click', function () {
            chips.toArray()[2].focus();
            // Destroy the third focused chip by dispatching a bubbling click event on the
            // associated chip remove element.
            testing_1.dispatchMouseEvent(chipRemoveDebugElements[2].nativeElement, 'click');
            fixture.detectChanges();
            expect(chips.toArray()[2].value).not.toBe(2, 'Expected the third chip to be removed.');
            expect(chipList._keyManager.activeItemIndex).toBe(2);
        });
    });
    describe('selection logic', function () {
        var formField;
        var nativeChips;
        beforeEach(function () {
            fixture = createComponent(BasicChipList);
            fixture.detectChanges();
            formField = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field')).nativeElement;
            nativeChips = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-chip'))
                .map(function (chip) { return chip.nativeElement; });
            chipListDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatChipList));
            chipListInstance = chipListDebugElement.componentInstance;
            chips = chipListInstance.chips;
        });
        it('should float placeholder if chip is selected', function () {
            expect(formField.classList.contains('mat-form-field-should-float'))
                .toBe(true, 'placeholder should be floating');
        });
        it('should remove selection if chip has been removed', testing_2.fakeAsync(function () {
            var instanceChips = fixture.componentInstance.chips;
            var chipList = fixture.componentInstance.chipList;
            var firstChip = nativeChips[0];
            testing_1.dispatchKeyboardEvent(firstChip, 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
            expect(instanceChips.first.selected).toBe(true, 'Expected first option to be selected.');
            expect(chipList.selected).toBe(chips.first, 'Expected first option to be selected.');
            fixture.componentInstance.foods = [];
            fixture.detectChanges();
            testing_2.tick();
            expect(chipList.selected)
                .toBe(undefined, 'Expected selection to be removed when option no longer exists.');
        }));
        it('should select an option that was added after initialization', function () {
            fixture.componentInstance.foods.push({ viewValue: 'Potatoes', value: 'potatoes-8' });
            fixture.detectChanges();
            nativeChips = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-chip'))
                .map(function (chip) { return chip.nativeElement; });
            var lastChip = nativeChips[8];
            testing_1.dispatchKeyboardEvent(lastChip, 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
            expect(fixture.componentInstance.chipList.value)
                .toContain('potatoes-8', 'Expect value contain the value of the last option');
            expect(fixture.componentInstance.chips.last.selected)
                .toBeTruthy('Expect last option selected');
        });
        it('should not select disabled chips', function () {
            var array = chips.toArray();
            var disabledChip = nativeChips[2];
            testing_1.dispatchKeyboardEvent(disabledChip, 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
            expect(fixture.componentInstance.chipList.value)
                .toBeUndefined('Expect value to be undefined');
            expect(array[2].selected).toBeFalsy('Expect disabled chip not selected');
            expect(fixture.componentInstance.chipList.selected)
                .toBeUndefined('Expect no selected chips');
        });
    });
    describe('forms integration', function () {
        var nativeChips;
        describe('single selection', function () {
            beforeEach(function () {
                fixture = createComponent(BasicChipList);
                fixture.detectChanges();
                nativeChips = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-chip'))
                    .map(function (chip) { return chip.nativeElement; });
                chips = fixture.componentInstance.chips;
            });
            it('should take an initial view value with reactive forms', function () {
                fixture.componentInstance.control = new forms_1.FormControl('pizza-1');
                fixture.detectChanges();
                var array = chips.toArray();
                expect(array[1].selected).toBeTruthy('Expect pizza-1 chip to be selected');
                testing_1.dispatchKeyboardEvent(nativeChips[1], 'keydown', keycodes_1.SPACE);
                fixture.detectChanges();
                expect(array[1].selected).toBeFalsy('Expect chip to be not selected after toggle selected');
            });
            it('should set the view value from the form', function () {
                var chipList = fixture.componentInstance.chipList;
                var array = chips.toArray();
                expect(chipList.value).toBeFalsy('Expect chip list to have no initial value');
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                expect(array[1].selected).toBeTruthy('Expect chip to be selected');
            });
            it('should update the form value when the view changes', function () {
                expect(fixture.componentInstance.control.value)
                    .toEqual(null, "Expected the control's value to be empty initially.");
                testing_1.dispatchKeyboardEvent(nativeChips[0], 'keydown', keycodes_1.SPACE);
                fixture.detectChanges();
                expect(fixture.componentInstance.control.value)
                    .toEqual('steak-0', "Expected control's value to be set to the new option.");
            });
            it('should clear the selection when a nonexistent option value is selected', function () {
                var array = chips.toArray();
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                expect(array[1].selected)
                    .toBeTruthy("Expected chip with the value to be selected.");
                fixture.componentInstance.control.setValue('gibberish');
                fixture.detectChanges();
                expect(array[1].selected)
                    .toBeFalsy("Expected chip with the old value not to be selected.");
            });
            it('should clear the selection when the control is reset', function () {
                var array = chips.toArray();
                fixture.componentInstance.control.setValue('pizza-1');
                fixture.detectChanges();
                fixture.componentInstance.control.reset();
                fixture.detectChanges();
                expect(array[1].selected)
                    .toBeFalsy("Expected chip with the old value not to be selected.");
            });
            it('should set the control to touched when the chip list is touched', function () {
                expect(fixture.componentInstance.control.touched)
                    .toBe(false, 'Expected the control to start off as untouched.');
                var nativeChipList = fixture.debugElement.query(platform_browser_1.By.css('.mat-chip-list')).nativeElement;
                testing_1.dispatchFakeEvent(nativeChipList, 'blur');
                expect(fixture.componentInstance.control.touched)
                    .toBe(true, 'Expected the control to be touched.');
            });
            it('should not set touched when a disabled chip list is touched', function () {
                expect(fixture.componentInstance.control.touched)
                    .toBe(false, 'Expected the control to start off as untouched.');
                fixture.componentInstance.control.disable();
                var nativeChipList = fixture.debugElement.query(platform_browser_1.By.css('.mat-chip-list')).nativeElement;
                testing_1.dispatchFakeEvent(nativeChipList, 'blur');
                expect(fixture.componentInstance.control.touched)
                    .toBe(false, 'Expected the control to stay untouched.');
            });
            it('should set the control to dirty when the chip list\'s value changes in the DOM', function () {
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(false, "Expected control to start out pristine.");
                testing_1.dispatchKeyboardEvent(nativeChips[1], 'keydown', keycodes_1.SPACE);
                fixture.detectChanges();
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(true, "Expected control to be dirty after value was changed by user.");
            });
            it('should not set the control to dirty when the value changes programmatically', function () {
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(false, "Expected control to start out pristine.");
                fixture.componentInstance.control.setValue('pizza-1');
                expect(fixture.componentInstance.control.dirty)
                    .toEqual(false, "Expected control to stay pristine after programmatic change.");
            });
            it('should set an asterisk after the placeholder if the control is required', function () {
                var requiredMarker = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-required-marker'));
                expect(requiredMarker)
                    .toBeNull("Expected placeholder not to have an asterisk, as control was not required.");
                fixture.componentInstance.isRequired = true;
                fixture.detectChanges();
                requiredMarker = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-required-marker'));
                expect(requiredMarker)
                    .not.toBeNull("Expected placeholder to have an asterisk, as control was required.");
            });
            it('should be able to programmatically select a falsy option', function () {
                fixture.destroy();
                testing_2.TestBed.resetTestingModule();
                var falsyFixture = createComponent(FalsyValueChipList);
                falsyFixture.detectChanges();
                falsyFixture.componentInstance.control.setValue([0]);
                falsyFixture.detectChanges();
                falsyFixture.detectChanges();
                expect(falsyFixture.componentInstance.chips.first.selected)
                    .toBe(true, 'Expected first option to be selected');
            });
            it('should not focus the active chip when the value is set programmatically', function () {
                var chipArray = fixture.componentInstance.chips.toArray();
                spyOn(chipArray[4], 'focus').and.callThrough();
                fixture.componentInstance.control.setValue('chips-4');
                fixture.detectChanges();
                expect(chipArray[4].focus).not.toHaveBeenCalled();
            });
            it('should blur the form field when the active chip is blurred', testing_2.fakeAsync(function () {
                var formField = fixture.nativeElement.querySelector('.mat-form-field');
                nativeChips[0].focus();
                fixture.detectChanges();
                expect(formField.classList).toContain('mat-focused');
                nativeChips[0].blur();
                fixture.detectChanges();
                zone.simulateZoneExit();
                fixture.detectChanges();
                expect(formField.classList).not.toContain('mat-focused');
            }));
        });
        describe('multiple selection', function () {
            beforeEach(function () {
                fixture = createComponent(MultiSelectionChipList);
                fixture.detectChanges();
                nativeChips = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-chip'))
                    .map(function (chip) { return chip.nativeElement; });
                chips = fixture.componentInstance.chips;
            });
            it('should take an initial view value with reactive forms', function () {
                fixture.componentInstance.control = new forms_1.FormControl(['pizza-1']);
                fixture.detectChanges();
                var array = chips.toArray();
                expect(array[1].selected).toBeTruthy('Expect pizza-1 chip to be selected');
                testing_1.dispatchKeyboardEvent(nativeChips[1], 'keydown', keycodes_1.SPACE);
                fixture.detectChanges();
                expect(array[1].selected).toBeFalsy('Expect chip to be not selected after toggle selected');
            });
            it('should set the view value from the form', function () {
                var chipList = fixture.componentInstance.chipList;
                var array = chips.toArray();
                expect(chipList.value).toBeFalsy('Expect chip list to have no initial value');
                fixture.componentInstance.control.setValue(['pizza-1']);
                fixture.detectChanges();
                expect(array[1].selected).toBeTruthy('Expect chip to be selected');
            });
            it('should update the form value when the view changes', function () {
                expect(fixture.componentInstance.control.value)
                    .toEqual(null, "Expected the control's value to be empty initially.");
                testing_1.dispatchKeyboardEvent(nativeChips[0], 'keydown', keycodes_1.SPACE);
                fixture.detectChanges();
                expect(fixture.componentInstance.control.value)
                    .toEqual(['steak-0'], "Expected control's value to be set to the new option.");
            });
            it('should clear the selection when a nonexistent option value is selected', function () {
                var array = chips.toArray();
                fixture.componentInstance.control.setValue(['pizza-1']);
                fixture.detectChanges();
                expect(array[1].selected)
                    .toBeTruthy("Expected chip with the value to be selected.");
                fixture.componentInstance.control.setValue(['gibberish']);
                fixture.detectChanges();
                expect(array[1].selected)
                    .toBeFalsy("Expected chip with the old value not to be selected.");
            });
            it('should clear the selection when the control is reset', function () {
                var array = chips.toArray();
                fixture.componentInstance.control.setValue(['pizza-1']);
                fixture.detectChanges();
                fixture.componentInstance.control.reset();
                fixture.detectChanges();
                expect(array[1].selected)
                    .toBeFalsy("Expected chip with the old value not to be selected.");
            });
        });
    });
    describe('chip list with chip input', function () {
        var nativeChips;
        beforeEach(function () {
            fixture = createComponent(InputChipList);
            fixture.detectChanges();
            nativeChips = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-chip'))
                .map(function (chip) { return chip.nativeElement; });
        });
        it('should take an initial view value with reactive forms', function () {
            fixture.componentInstance.control = new forms_1.FormControl(['pizza-1']);
            fixture.detectChanges();
            var array = fixture.componentInstance.chips.toArray();
            expect(array[1].selected).toBeTruthy('Expect pizza-1 chip to be selected');
            testing_1.dispatchKeyboardEvent(nativeChips[1], 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
            expect(array[1].selected).toBeFalsy('Expect chip to be not selected after toggle selected');
        });
        it('should set the view value from the form', function () {
            var array = fixture.componentInstance.chips.toArray();
            expect(array[1].selected).toBeFalsy('Expect chip to not be selected');
            fixture.componentInstance.control.setValue(['pizza-1']);
            fixture.detectChanges();
            expect(array[1].selected).toBeTruthy('Expect chip to be selected');
        });
        it('should update the form value when the view changes', function () {
            expect(fixture.componentInstance.control.value)
                .toEqual(null, "Expected the control's value to be empty initially.");
            testing_1.dispatchKeyboardEvent(nativeChips[0], 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
            expect(fixture.componentInstance.control.value)
                .toEqual(['steak-0'], "Expected control's value to be set to the new option.");
        });
        it('should clear the selection when a nonexistent option value is selected', function () {
            var array = fixture.componentInstance.chips.toArray();
            fixture.componentInstance.control.setValue(['pizza-1']);
            fixture.detectChanges();
            expect(array[1].selected)
                .toBeTruthy("Expected chip with the value to be selected.");
            fixture.componentInstance.control.setValue(['gibberish']);
            fixture.detectChanges();
            expect(array[1].selected)
                .toBeFalsy("Expected chip with the old value not to be selected.");
        });
        it('should clear the selection when the control is reset', function () {
            var array = fixture.componentInstance.chips.toArray();
            fixture.componentInstance.control.setValue(['pizza-1']);
            fixture.detectChanges();
            fixture.componentInstance.control.reset();
            fixture.detectChanges();
            expect(array[1].selected)
                .toBeFalsy("Expected chip with the old value not to be selected.");
        });
        it('should set the control to touched when the chip list is touched', testing_2.fakeAsync(function () {
            expect(fixture.componentInstance.control.touched)
                .toBe(false, 'Expected the control to start off as untouched.');
            var nativeChipList = fixture.debugElement.query(platform_browser_1.By.css('.mat-chip-list')).nativeElement;
            testing_1.dispatchFakeEvent(nativeChipList, 'blur');
            testing_2.tick();
            expect(fixture.componentInstance.control.touched)
                .toBe(true, 'Expected the control to be touched.');
        }));
        it('should not set touched when a disabled chip list is touched', function () {
            expect(fixture.componentInstance.control.touched)
                .toBe(false, 'Expected the control to start off as untouched.');
            fixture.componentInstance.control.disable();
            var nativeChipList = fixture.debugElement.query(platform_browser_1.By.css('.mat-chip-list')).nativeElement;
            testing_1.dispatchFakeEvent(nativeChipList, 'blur');
            expect(fixture.componentInstance.control.touched)
                .toBe(false, 'Expected the control to stay untouched.');
        });
        it('should set the control to dirty when the chip list\'s value changes in the DOM', function () {
            expect(fixture.componentInstance.control.dirty)
                .toEqual(false, "Expected control to start out pristine.");
            testing_1.dispatchKeyboardEvent(nativeChips[1], 'keydown', keycodes_1.SPACE);
            fixture.detectChanges();
            expect(fixture.componentInstance.control.dirty)
                .toEqual(true, "Expected control to be dirty after value was changed by user.");
        });
        it('should not set the control to dirty when the value changes programmatically', function () {
            expect(fixture.componentInstance.control.dirty)
                .toEqual(false, "Expected control to start out pristine.");
            fixture.componentInstance.control.setValue(['pizza-1']);
            expect(fixture.componentInstance.control.dirty)
                .toEqual(false, "Expected control to stay pristine after programmatic change.");
        });
        it('should set an asterisk after the placeholder if the control is required', function () {
            var requiredMarker = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-required-marker'));
            expect(requiredMarker)
                .toBeNull("Expected placeholder not to have an asterisk, as control was not required.");
            fixture.componentInstance.isRequired = true;
            fixture.detectChanges();
            requiredMarker = fixture.debugElement.query(platform_browser_1.By.css('.mat-form-field-required-marker'));
            expect(requiredMarker)
                .not.toBeNull("Expected placeholder to have an asterisk, as control was required.");
        });
        it('should keep focus on the input after adding the first chip', testing_2.fakeAsync(function () {
            var nativeInput = fixture.nativeElement.querySelector('input');
            var chipEls = Array.from(fixture.nativeElement.querySelectorAll('.mat-chip')).reverse();
            // Remove the chips via backspace to simulate the user removing them.
            chipEls.forEach(function (chip) {
                chip.focus();
                testing_1.dispatchKeyboardEvent(chip, 'keydown', keycodes_1.BACKSPACE);
                fixture.detectChanges();
                testing_2.tick();
            });
            nativeInput.focus();
            expect(fixture.componentInstance.foods).toEqual([], 'Expected all chips to be removed.');
            expect(document.activeElement).toBe(nativeInput, 'Expected input to be focused.');
            testing_1.typeInElement('123', nativeInput);
            fixture.detectChanges();
            testing_1.dispatchKeyboardEvent(nativeInput, 'keydown', keycodes_1.ENTER);
            fixture.detectChanges();
            testing_2.tick();
            expect(document.activeElement).toBe(nativeInput, 'Expected input to remain focused.');
        }));
        it('should set aria-invalid if the form field is invalid', function () {
            fixture.componentInstance.control = new forms_1.FormControl(undefined, [forms_1.Validators.required]);
            fixture.detectChanges();
            var input = fixture.nativeElement.querySelector('input');
            expect(input.getAttribute('aria-invalid')).toBe('true');
            fixture.componentInstance.chips.first.selectViaInteraction();
            fixture.detectChanges();
            expect(input.getAttribute('aria-invalid')).toBe('false');
        });
        describe('keyboard behavior', function () {
            beforeEach(function () {
                chipListDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatChipList));
                chipListInstance = chipListDebugElement.componentInstance;
                chips = chipListInstance.chips;
                manager = fixture.componentInstance.chipList._keyManager;
            });
            describe('when the input has focus', function () {
                it('should not focus the last chip when press DELETE', function () {
                    var nativeInput = fixture.nativeElement.querySelector('input');
                    var DELETE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.DELETE, nativeInput);
                    // Focus the input
                    nativeInput.focus();
                    expect(manager.activeItemIndex).toBe(-1);
                    // Press the DELETE key
                    chipListInstance._keydown(DELETE_EVENT);
                    fixture.detectChanges();
                    // It doesn't focus the last chip
                    expect(manager.activeItemIndex).toEqual(-1);
                });
                it('should focus the last chip when press BACKSPACE', function () {
                    var nativeInput = fixture.nativeElement.querySelector('input');
                    var BACKSPACE_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.BACKSPACE, nativeInput);
                    // Focus the input
                    nativeInput.focus();
                    expect(manager.activeItemIndex).toBe(-1);
                    // Press the BACKSPACE key
                    chipListInstance._keydown(BACKSPACE_EVENT);
                    fixture.detectChanges();
                    // It focuses the last chip
                    expect(manager.activeItemIndex).toEqual(chips.length - 1);
                });
            });
        });
    });
    describe('error messages', function () {
        var errorTestComponent;
        var containerEl;
        var chipListEl;
        beforeEach(function () {
            fixture = createComponent(ChipListWithFormErrorMessages);
            fixture.detectChanges();
            errorTestComponent = fixture.componentInstance;
            containerEl = fixture.debugElement.query(platform_browser_1.By.css('mat-form-field')).nativeElement;
            chipListEl = fixture.debugElement.query(platform_browser_1.By.css('mat-chip-list')).nativeElement;
        });
        it('should not show any errors if the user has not interacted', function () {
            expect(errorTestComponent.formControl.untouched)
                .toBe(true, 'Expected untouched form control');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error message');
            expect(chipListEl.getAttribute('aria-invalid'))
                .toBe('false', 'Expected aria-invalid to be set to "false".');
        });
        it('should display an error message when the list is touched and invalid', testing_2.fakeAsync(function () {
            expect(errorTestComponent.formControl.invalid)
                .toBe(true, 'Expected form control to be invalid');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(0, 'Expected no error message');
            errorTestComponent.formControl.markAsTouched();
            fixture.detectChanges();
            testing_2.tick();
            expect(containerEl.classList)
                .toContain('mat-form-field-invalid', 'Expected container to have the invalid CSS class.');
            expect(containerEl.querySelectorAll('mat-error').length)
                .toBe(1, 'Expected one error message to have been rendered.');
            expect(chipListEl.getAttribute('aria-invalid'))
                .toBe('true', 'Expected aria-invalid to be set to "true".');
        }));
        it('should display an error message when the parent form is submitted', testing_2.fakeAsync(function () {
            expect(errorTestComponent.form.submitted)
                .toBe(false, 'Expected form not to have been submitted');
            expect(errorTestComponent.formControl.invalid)
                .toBe(true, 'Expected form control to be invalid');
            expect(containerEl.querySelectorAll('mat-error').length).toBe(0, 'Expected no error message');
            testing_1.dispatchFakeEvent(fixture.debugElement.query(platform_browser_1.By.css('form')).nativeElement, 'submit');
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                expect(errorTestComponent.form.submitted)
                    .toBe(true, 'Expected form to have been submitted');
                expect(containerEl.classList)
                    .toContain('mat-form-field-invalid', 'Expected container to have the invalid CSS class.');
                expect(containerEl.querySelectorAll('mat-error').length)
                    .toBe(1, 'Expected one error message to have been rendered.');
                expect(chipListEl.getAttribute('aria-invalid'))
                    .toBe('true', 'Expected aria-invalid to be set to "true".');
            });
        }));
        it('should hide the errors and show the hints once the chip list becomes valid', testing_2.fakeAsync(function () {
            errorTestComponent.formControl.markAsTouched();
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                expect(containerEl.classList)
                    .toContain('mat-form-field-invalid', 'Expected container to have the invalid CSS class.');
                expect(containerEl.querySelectorAll('mat-error').length)
                    .toBe(1, 'Expected one error message to have been rendered.');
                expect(containerEl.querySelectorAll('mat-hint').length)
                    .toBe(0, 'Expected no hints to be shown.');
                errorTestComponent.formControl.setValue('something');
                fixture.detectChanges();
                fixture.whenStable().then(function () {
                    expect(containerEl.classList).not.toContain('mat-form-field-invalid', 'Expected container not to have the invalid class when valid.');
                    expect(containerEl.querySelectorAll('mat-error').length)
                        .toBe(0, 'Expected no error messages when the input is valid.');
                    expect(containerEl.querySelectorAll('mat-hint').length)
                        .toBe(1, 'Expected one hint to be shown once the input is valid.');
                });
            });
        }));
        it('should set the proper role on the error messages', function () {
            errorTestComponent.formControl.markAsTouched();
            fixture.detectChanges();
            expect(containerEl.querySelector('mat-error').getAttribute('role')).toBe('alert');
        });
        it('sets the aria-describedby to reference errors when in error state', function () {
            var hintId = fixture.debugElement.query(platform_browser_1.By.css('.mat-hint')).nativeElement.getAttribute('id');
            var describedBy = chipListEl.getAttribute('aria-describedby');
            expect(hintId).toBeTruthy('hint should be shown');
            expect(describedBy).toBe(hintId);
            fixture.componentInstance.formControl.markAsTouched();
            fixture.detectChanges();
            var errorIds = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-error'))
                .map(function (el) { return el.nativeElement.getAttribute('id'); }).join(' ');
            describedBy = chipListEl.getAttribute('aria-describedby');
            expect(errorIds).toBeTruthy('errors should be shown');
            expect(describedBy).toBe(errorIds);
        });
    });
    function createComponent(component, providers, animationsModule) {
        if (providers === void 0) { providers = []; }
        if (animationsModule === void 0) { animationsModule = animations_2.NoopAnimationsModule; }
        testing_2.TestBed.configureTestingModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                index_2.MatChipsModule,
                form_field_1.MatFormFieldModule,
                index_1.MatInputModule,
                animationsModule,
            ],
            declarations: [component],
            providers: [
                { provide: core_1.NgZone, useFactory: function () { return zone = new testing_1.MockNgZone(); } }
            ].concat(providers)
        }).compileComponents();
        return testing_2.TestBed.createComponent(component);
    }
    function setupStandardList(direction) {
        if (direction === void 0) { direction = 'ltr'; }
        dirChange = new rxjs_1.Subject();
        fixture = createComponent(StandardChipList, [{
                provide: bidi_1.Directionality, useFactory: function () { return ({
                    value: direction.toLowerCase(),
                    change: dirChange
                }); }
            }]);
        fixture.detectChanges();
        chipListDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatChipList));
        chipListNativeElement = chipListDebugElement.nativeElement;
        chipListInstance = chipListDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        chips = chipListInstance.chips;
    }
    function setupInputList() {
        fixture = createComponent(FormFieldChipList);
        fixture.detectChanges();
        chipListDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_2.MatChipList));
        chipListNativeElement = chipListDebugElement.nativeElement;
        chipListInstance = chipListDebugElement.componentInstance;
        testComponent = fixture.debugElement.componentInstance;
        chips = chipListInstance.chips;
    }
});
var StandardChipList = /** @class */ (function () {
    function StandardChipList() {
        this.items = [0, 1, 2, 3, 4];
        this.name = 'Test';
        this.selectable = true;
        this.chipSelect = function () { };
        this.chipDeselect = function () { };
        this.tabIndex = 0;
    }
    StandardChipList = __decorate([
        core_1.Component({
            template: "\n    <mat-chip-list [tabIndex]=\"tabIndex\" [selectable]=\"selectable\">\n      <div *ngFor=\"let i of items\">\n       <div *ngIf=\"remove != i\">\n          <mat-chip (select)=\"chipSelect(i)\" (deselect)=\"chipDeselect(i)\">\n            {{name}} {{i + 1}}\n          </mat-chip>\n        </div>\n      </div>\n    </mat-chip-list>"
        })
    ], StandardChipList);
    return StandardChipList;
}());
var FormFieldChipList = /** @class */ (function () {
    function FormFieldChipList() {
        this.chips = ['Chip 0', 'Chip 1', 'Chip 2'];
    }
    FormFieldChipList.prototype.remove = function (chip) {
        var index = this.chips.indexOf(chip);
        if (index > -1) {
            this.chips.splice(index, 1);
        }
    };
    FormFieldChipList = __decorate([
        core_1.Component({
            template: "\n    <mat-form-field>\n      <mat-label>Add a chip</mat-label>\n      <mat-chip-list #chipList>\n        <mat-chip *ngFor=\"let chip of chips\" (removed)=\"remove(chip)\">{{chip}}</mat-chip>\n      </mat-chip-list>\n      <input name=\"test\" [matChipInputFor]=\"chipList\"/>\n    </mat-form-field>\n  "
        })
    ], FormFieldChipList);
    return FormFieldChipList;
}());
var BasicChipList = /** @class */ (function () {
    function BasicChipList() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
            { value: 'sandwich-3', viewValue: 'Sandwich' },
            { value: 'chips-4', viewValue: 'Chips' },
            { value: 'eggs-5', viewValue: 'Eggs' },
            { value: 'pasta-6', viewValue: 'Pasta' },
            { value: 'sushi-7', viewValue: 'Sushi' },
        ];
        this.control = new forms_1.FormControl();
    }
    __decorate([
        core_1.ViewChild(index_2.MatChipList),
        __metadata("design:type", index_2.MatChipList)
    ], BasicChipList.prototype, "chipList", void 0);
    __decorate([
        core_1.ViewChildren(chip_1.MatChip),
        __metadata("design:type", core_1.QueryList)
    ], BasicChipList.prototype, "chips", void 0);
    BasicChipList = __decorate([
        core_1.Component({
            selector: 'basic-chip-list',
            template: "\n    <mat-form-field>\n      <mat-chip-list placeholder=\"Food\" [formControl]=\"control\" [required]=\"isRequired\"\n        [tabIndex]=\"tabIndexOverride\" [selectable]=\"selectable\">\n        <mat-chip *ngFor=\"let food of foods\" [value]=\"food.value\" [disabled]=\"food.disabled\">\n          {{ food.viewValue }}\n        </mat-chip>\n      </mat-chip-list>\n    </mat-form-field>\n  "
        })
    ], BasicChipList);
    return BasicChipList;
}());
var MultiSelectionChipList = /** @class */ (function () {
    function MultiSelectionChipList() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
            { value: 'sandwich-3', viewValue: 'Sandwich' },
            { value: 'chips-4', viewValue: 'Chips' },
            { value: 'eggs-5', viewValue: 'Eggs' },
            { value: 'pasta-6', viewValue: 'Pasta' },
            { value: 'sushi-7', viewValue: 'Sushi' },
        ];
        this.control = new forms_1.FormControl();
    }
    __decorate([
        core_1.ViewChild(index_2.MatChipList),
        __metadata("design:type", index_2.MatChipList)
    ], MultiSelectionChipList.prototype, "chipList", void 0);
    __decorate([
        core_1.ViewChildren(chip_1.MatChip),
        __metadata("design:type", core_1.QueryList)
    ], MultiSelectionChipList.prototype, "chips", void 0);
    MultiSelectionChipList = __decorate([
        core_1.Component({
            selector: 'multi-selection-chip-list',
            template: "\n    <mat-form-field>\n      <mat-chip-list [multiple]=\"true\" placeholder=\"Food\" [formControl]=\"control\"\n        [required]=\"isRequired\"\n        [tabIndex]=\"tabIndexOverride\" [selectable]=\"selectable\">\n        <mat-chip *ngFor=\"let food of foods\" [value]=\"food.value\" [disabled]=\"food.disabled\">\n          {{ food.viewValue }}\n        </mat-chip>\n      </mat-chip-list>\n    </mat-form-field>\n  "
        })
    ], MultiSelectionChipList);
    return MultiSelectionChipList;
}());
var InputChipList = /** @class */ (function () {
    function InputChipList() {
        this.foods = [
            { value: 'steak-0', viewValue: 'Steak' },
            { value: 'pizza-1', viewValue: 'Pizza' },
            { value: 'tacos-2', viewValue: 'Tacos', disabled: true },
            { value: 'sandwich-3', viewValue: 'Sandwich' },
            { value: 'chips-4', viewValue: 'Chips' },
            { value: 'eggs-5', viewValue: 'Eggs' },
            { value: 'pasta-6', viewValue: 'Pasta' },
            { value: 'sushi-7', viewValue: 'Sushi' },
        ];
        this.control = new forms_1.FormControl();
        this.separatorKeyCodes = [keycodes_1.ENTER, keycodes_1.SPACE];
        this.addOnBlur = true;
    }
    InputChipList.prototype.add = function (event) {
        var input = event.input;
        var value = event.value;
        // Add our foods
        if ((value || '').trim()) {
            this.foods.push({
                value: value.trim().toLowerCase() + "-" + this.foods.length,
                viewValue: value.trim()
            });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    };
    InputChipList.prototype.remove = function (food) {
        var index = this.foods.indexOf(food);
        if (index > -1) {
            this.foods.splice(index, 1);
        }
    };
    __decorate([
        core_1.ViewChild(index_2.MatChipList),
        __metadata("design:type", index_2.MatChipList)
    ], InputChipList.prototype, "chipList", void 0);
    __decorate([
        core_1.ViewChildren(chip_1.MatChip),
        __metadata("design:type", core_1.QueryList)
    ], InputChipList.prototype, "chips", void 0);
    InputChipList = __decorate([
        core_1.Component({
            selector: 'input-chip-list',
            template: "\n    <mat-form-field>\n      <mat-chip-list [multiple]=\"true\"\n                    placeholder=\"Food\" [formControl]=\"control\" [required]=\"isRequired\" #chipList1>\n        <mat-chip *ngFor=\"let food of foods\" [value]=\"food.value\" (removed)=\"remove(food)\">\n          {{ food.viewValue }}\n        </mat-chip>\n      </mat-chip-list>\n      <input placeholder=\"New food...\"\n          [matChipInputFor]=\"chipList1\"\n          [matChipInputSeparatorKeyCodes]=\"separatorKeyCodes\"\n          [matChipInputAddOnBlur]=\"addOnBlur\"\n          (matChipInputTokenEnd)=\"add($event)\" />/>\n    </mat-form-field>\n  "
        })
    ], InputChipList);
    return InputChipList;
}());
var FalsyValueChipList = /** @class */ (function () {
    function FalsyValueChipList() {
        this.foods = [
            { value: 0, viewValue: 'Steak' },
            { value: 1, viewValue: 'Pizza' },
        ];
        this.control = new forms_1.FormControl();
    }
    __decorate([
        core_1.ViewChildren(chip_1.MatChip),
        __metadata("design:type", core_1.QueryList)
    ], FalsyValueChipList.prototype, "chips", void 0);
    FalsyValueChipList = __decorate([
        core_1.Component({
            template: "\n    <mat-form-field>\n      <mat-chip-list [formControl]=\"control\">\n        <mat-chip *ngFor=\"let food of foods\" [value]=\"food.value\">{{ food.viewValue }}</mat-chip>\n      </mat-chip-list>\n    </mat-form-field>\n  "
        })
    ], FalsyValueChipList);
    return FalsyValueChipList;
}());
var SelectedChipList = /** @class */ (function () {
    function SelectedChipList() {
        this.foods = [
            { value: 0, viewValue: 'Steak', selected: true },
            { value: 1, viewValue: 'Pizza', selected: false },
            { value: 2, viewValue: 'Pasta', selected: true },
        ];
    }
    __decorate([
        core_1.ViewChildren(chip_1.MatChip),
        __metadata("design:type", core_1.QueryList)
    ], SelectedChipList.prototype, "chips", void 0);
    SelectedChipList = __decorate([
        core_1.Component({
            template: "\n    <mat-chip-list>\n        <mat-chip *ngFor=\"let food of foods\" [value]=\"food.value\" [selected]=\"food.selected\">\n            {{ food.viewValue }}\n        </mat-chip>\n    </mat-chip-list>\n  "
        })
    ], SelectedChipList);
    return SelectedChipList;
}());
var ChipListWithFormErrorMessages = /** @class */ (function () {
    function ChipListWithFormErrorMessages() {
        this.foods = [
            { value: 0, viewValue: 'Steak', selected: true },
            { value: 1, viewValue: 'Pizza', selected: false },
            { value: 2, viewValue: 'Pasta', selected: true },
        ];
        this.formControl = new forms_1.FormControl('', forms_1.Validators.required);
    }
    __decorate([
        core_1.ViewChildren(chip_1.MatChip),
        __metadata("design:type", core_1.QueryList)
    ], ChipListWithFormErrorMessages.prototype, "chips", void 0);
    __decorate([
        core_1.ViewChild('form'),
        __metadata("design:type", forms_1.NgForm)
    ], ChipListWithFormErrorMessages.prototype, "form", void 0);
    ChipListWithFormErrorMessages = __decorate([
        core_1.Component({
            template: "\n<form #form=\"ngForm\" novalidate>\n  <mat-form-field>\n    <mat-chip-list [formControl]=\"formControl\">\n      <mat-chip *ngFor=\"let food of foods\" [value]=\"food.value\" [selected]=\"food.selected\">\n      {{food.viewValue}}\n      </mat-chip>\n    </mat-chip-list>\n    <mat-hint>Please select a chip, or type to add a new chip</mat-hint>\n    <mat-error>Should have value</mat-error>\n  </mat-form-field>\n</form>\n  "
        })
    ], ChipListWithFormErrorMessages);
    return ChipListWithFormErrorMessages;
}());
var StandardChipListWithAnimations = /** @class */ (function () {
    function StandardChipListWithAnimations() {
        this.numbers = [0, 1, 2, 3, 4];
    }
    StandardChipListWithAnimations.prototype.remove = function (item) {
        var index = this.numbers.indexOf(item);
        if (index > -1) {
            this.numbers.splice(index, 1);
        }
    };
    StandardChipListWithAnimations = __decorate([
        core_1.Component({
            template: "\n    <mat-chip-list>\n      <mat-chip *ngFor=\"let i of numbers\" (removed)=\"remove(i)\">{{i}}</mat-chip>\n    </mat-chip-list>",
            animations: [
                // For the case we're testing this animation doesn't
                // have to be used anywhere, it just has to be defined.
                animations_1.trigger('dummyAnimation', [
                    animations_1.transition(':leave', [
                        animations_1.style({ opacity: 0 }),
                        animations_1.animate('500ms', animations_1.style({ opacity: 1 }))
                    ])
                ])
            ]
        })
    ], StandardChipListWithAnimations);
    return StandardChipListWithAnimations;
}());
var ChipListWithRemove = /** @class */ (function () {
    function ChipListWithRemove() {
        this.chips = [0, 1, 2, 3, 4];
    }
    ChipListWithRemove.prototype.removeChip = function (event) {
        this.chips.splice(event.chip.value, 1);
    };
    ChipListWithRemove = __decorate([
        core_1.Component({
            template: "\n    <mat-form-field>\n      <mat-chip-list>\n        <div *ngFor=\"let i of chips\">\n          <mat-chip [value]=\"i\" (removed)=\"removeChip($event)\">\n            Chip {{i + 1}}\n            <span matChipRemove>Remove</span>\n          </mat-chip>\n        </div>\n      </mat-chip-list>\n    </mat-form-field>\n  "
        })
    ], ChipListWithRemove);
    return ChipListWithRemove;
}());
//# sourceMappingURL=chip-list.spec.js.map