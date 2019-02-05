"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/cdk/testing");
var keycodes_1 = require("@angular/cdk/keycodes");
var index_1 = require("./index");
describe('MatOption component', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatOptionModule],
            declarations: [BasicOption]
        }).compileComponents();
    }));
    it('should complete the `stateChanges` stream on destroy', function () {
        var fixture = testing_1.TestBed.createComponent(BasicOption);
        fixture.detectChanges();
        var optionInstance = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption)).componentInstance;
        var completeSpy = jasmine.createSpy('complete spy');
        var subscription = optionInstance._stateChanges.subscribe(undefined, undefined, completeSpy);
        fixture.destroy();
        expect(completeSpy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should not emit to `onSelectionChange` if selecting an already-selected option', function () {
        var fixture = testing_1.TestBed.createComponent(BasicOption);
        fixture.detectChanges();
        var optionInstance = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption)).componentInstance;
        optionInstance.select();
        expect(optionInstance.selected).toBe(true);
        var spy = jasmine.createSpy('selection change spy');
        var subscription = optionInstance.onSelectionChange.subscribe(spy);
        optionInstance.select();
        fixture.detectChanges();
        expect(optionInstance.selected).toBe(true);
        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should not emit to `onSelectionChange` if deselecting an unselected option', function () {
        var fixture = testing_1.TestBed.createComponent(BasicOption);
        fixture.detectChanges();
        var optionInstance = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption)).componentInstance;
        optionInstance.deselect();
        expect(optionInstance.selected).toBe(false);
        var spy = jasmine.createSpy('selection change spy');
        var subscription = optionInstance.onSelectionChange.subscribe(spy);
        optionInstance.deselect();
        fixture.detectChanges();
        expect(optionInstance.selected).toBe(false);
        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should be able to set a custom id', function () {
        var fixture = testing_1.TestBed.createComponent(BasicOption);
        fixture.componentInstance.id = 'custom-option';
        fixture.detectChanges();
        var optionInstance = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption)).componentInstance;
        expect(optionInstance.id).toBe('custom-option');
    });
    it('should select the option when pressing space', function () {
        var fixture = testing_1.TestBed.createComponent(BasicOption);
        fixture.detectChanges();
        var optionDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption));
        var optionNativeElement = optionDebugElement.nativeElement;
        var optionInstance = optionDebugElement.componentInstance;
        var spy = jasmine.createSpy('selection change spy');
        var subscription = optionInstance.onSelectionChange.subscribe(spy);
        var event = testing_2.dispatchKeyboardEvent(optionNativeElement, 'keydown', keycodes_1.SPACE);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(true);
        subscription.unsubscribe();
    });
    it('should select the option when pressing enter', function () {
        var fixture = testing_1.TestBed.createComponent(BasicOption);
        fixture.detectChanges();
        var optionDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption));
        var optionNativeElement = optionDebugElement.nativeElement;
        var optionInstance = optionDebugElement.componentInstance;
        var spy = jasmine.createSpy('selection change spy');
        var subscription = optionInstance.onSelectionChange.subscribe(spy);
        var event = testing_2.dispatchKeyboardEvent(optionNativeElement, 'keydown', keycodes_1.ENTER);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(true);
        subscription.unsubscribe();
    });
    it('should not do anything when pressing the selection keys with a modifier', function () {
        var fixture = testing_1.TestBed.createComponent(BasicOption);
        fixture.detectChanges();
        var optionDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption));
        var optionNativeElement = optionDebugElement.nativeElement;
        var optionInstance = optionDebugElement.componentInstance;
        var spy = jasmine.createSpy('selection change spy');
        var subscription = optionInstance.onSelectionChange.subscribe(spy);
        [keycodes_1.ENTER, keycodes_1.SPACE].forEach(function (key) {
            var event = testing_2.createKeyboardEvent('keydown', key);
            Object.defineProperty(event, 'shiftKey', { get: function () { return true; } });
            testing_2.dispatchEvent(optionNativeElement, event);
            fixture.detectChanges();
            expect(event.defaultPrevented).toBe(false);
        });
        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
    });
    describe('ripples', function () {
        var fixture;
        var optionDebugElement;
        var optionNativeElement;
        var optionInstance;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(BasicOption);
            fixture.detectChanges();
            optionDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatOption));
            optionNativeElement = optionDebugElement.nativeElement;
            optionInstance = optionDebugElement.componentInstance;
        });
        it('should show ripples by default', function () {
            expect(optionInstance.disableRipple).toBeFalsy('Expected ripples to be enabled by default');
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up initially');
            testing_2.dispatchFakeEvent(optionNativeElement, 'mousedown');
            testing_2.dispatchFakeEvent(optionNativeElement, 'mouseup');
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(1, 'Expected one ripple to show up after a fake click.');
        });
        it('should not show ripples if the option is disabled', function () {
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up initially');
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            testing_2.dispatchFakeEvent(optionNativeElement, 'mousedown');
            testing_2.dispatchFakeEvent(optionNativeElement, 'mouseup');
            expect(optionNativeElement.querySelectorAll('.mat-ripple-element').length)
                .toBe(0, 'Expected no ripples to show up after click on a disabled option.');
        });
    });
});
var BasicOption = /** @class */ (function () {
    function BasicOption() {
    }
    BasicOption = __decorate([
        core_1.Component({
            template: "<mat-option [id]=\"id\" [disabled]=\"disabled\"></mat-option>"
        })
    ], BasicOption);
    return BasicOption;
}());
//# sourceMappingURL=option.spec.js.map