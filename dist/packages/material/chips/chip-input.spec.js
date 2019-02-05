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
var platform_1 = require("@angular/cdk/platform");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var form_field_1 = require("@angular/material/form-field");
var rxjs_1 = require("rxjs");
var chip_input_1 = require("./chip-input");
var index_1 = require("./index");
var chip_default_options_1 = require("./chip-default-options");
var chip_list_1 = require("./chip-list");
describe('MatChipInput', function () {
    var fixture;
    var testChipInput;
    var inputDebugElement;
    var inputNativeElement;
    var chipInputDirective;
    var dir = 'ltr';
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [platform_1.PlatformModule, index_1.MatChipsModule, form_field_1.MatFormFieldModule, animations_1.NoopAnimationsModule],
            declarations: [TestChipInput],
            providers: [{
                    provide: bidi_1.Directionality, useFactory: function () {
                        return {
                            value: dir.toLowerCase(),
                            change: new rxjs_1.Subject()
                        };
                    }
                }]
        });
        testing_2.TestBed.compileComponents();
    }));
    beforeEach(testing_2.async(function () {
        fixture = testing_2.TestBed.createComponent(TestChipInput);
        testChipInput = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(chip_input_1.MatChipInput));
        chipInputDirective = inputDebugElement.injector.get(chip_input_1.MatChipInput);
        inputNativeElement = inputDebugElement.nativeElement;
    }));
    describe('basic behavior', function () {
        it('emits the (chipEnd) on enter keyup', function () {
            var ENTER_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.ENTER, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective._keydown(ENTER_EVENT);
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('should have a default id', function () {
            expect(inputNativeElement.getAttribute('id')).toBeTruthy();
        });
        it('should allow binding to the `placeholder` input', function () {
            expect(inputNativeElement.hasAttribute('placeholder')).toBe(false);
            testChipInput.placeholder = 'bound placeholder';
            fixture.detectChanges();
            expect(inputNativeElement.getAttribute('placeholder')).toBe('bound placeholder');
        });
        it('should propagate the dynamic `placeholder` value to the form field', function () {
            fixture.componentInstance.placeholder = 'add a chip';
            fixture.detectChanges();
            var label = fixture.nativeElement.querySelector('.mat-form-field-label');
            expect(label).toBeTruthy();
            expect(label.textContent).toContain('add a chip');
            fixture.componentInstance.placeholder = 'or don\'t';
            fixture.detectChanges();
            expect(label.textContent).toContain('or don\'t');
        });
        it('should become disabled if the chip list is disabled', function () {
            expect(inputNativeElement.hasAttribute('disabled')).toBe(false);
            expect(chipInputDirective.disabled).toBe(false);
            fixture.componentInstance.chipListInstance.disabled = true;
            fixture.detectChanges();
            expect(inputNativeElement.getAttribute('disabled')).toBe('true');
            expect(chipInputDirective.disabled).toBe(true);
        });
    });
    describe('[addOnBlur]', function () {
        it('allows (chipEnd) when true', function () {
            spyOn(testChipInput, 'add');
            testChipInput.addOnBlur = true;
            fixture.detectChanges();
            chipInputDirective._blur();
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('disallows (chipEnd) when false', function () {
            spyOn(testChipInput, 'add');
            testChipInput.addOnBlur = false;
            fixture.detectChanges();
            chipInputDirective._blur();
            expect(testChipInput.add).not.toHaveBeenCalled();
        });
    });
    describe('[separatorKeyCodes]', function () {
        it('does not emit (chipEnd) when a non-separator key is pressed', function () {
            var ENTER_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.ENTER, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective.separatorKeyCodes = [keycodes_1.COMMA];
            fixture.detectChanges();
            chipInputDirective._keydown(ENTER_EVENT);
            expect(testChipInput.add).not.toHaveBeenCalled();
        });
        it('emits (chipEnd) when a custom separator keys is pressed', function () {
            var COMMA_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.COMMA, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective.separatorKeyCodes = [keycodes_1.COMMA];
            fixture.detectChanges();
            chipInputDirective._keydown(COMMA_EVENT);
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('emits accepts the custom separator keys in a Set', function () {
            var COMMA_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.COMMA, inputNativeElement);
            spyOn(testChipInput, 'add');
            chipInputDirective.separatorKeyCodes = new Set([keycodes_1.COMMA]);
            fixture.detectChanges();
            chipInputDirective._keydown(COMMA_EVENT);
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('emits (chipEnd) when the separator keys are configured globally', function () {
            fixture.destroy();
            testing_2.TestBed
                .resetTestingModule()
                .configureTestingModule({
                imports: [index_1.MatChipsModule, form_field_1.MatFormFieldModule, platform_1.PlatformModule, animations_1.NoopAnimationsModule],
                declarations: [TestChipInput],
                providers: [{
                        provide: chip_default_options_1.MAT_CHIPS_DEFAULT_OPTIONS,
                        useValue: { separatorKeyCodes: [keycodes_1.COMMA] }
                    }]
            })
                .compileComponents();
            fixture = testing_2.TestBed.createComponent(TestChipInput);
            testChipInput = fixture.debugElement.componentInstance;
            fixture.detectChanges();
            inputDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(chip_input_1.MatChipInput));
            chipInputDirective = inputDebugElement.injector.get(chip_input_1.MatChipInput);
            inputNativeElement = inputDebugElement.nativeElement;
            spyOn(testChipInput, 'add');
            fixture.detectChanges();
            chipInputDirective._keydown(testing_1.createKeyboardEvent('keydown', keycodes_1.COMMA, inputNativeElement));
            expect(testChipInput.add).toHaveBeenCalled();
        });
        it('should not emit the chipEnd event if a separator is pressed with a modifier key', function () {
            var ENTER_EVENT = testing_1.createKeyboardEvent('keydown', keycodes_1.ENTER, inputNativeElement);
            Object.defineProperty(ENTER_EVENT, 'shiftKey', { get: function () { return true; } });
            spyOn(testChipInput, 'add');
            chipInputDirective.separatorKeyCodes = [keycodes_1.ENTER];
            fixture.detectChanges();
            chipInputDirective._keydown(ENTER_EVENT);
            expect(testChipInput.add).not.toHaveBeenCalled();
        });
    });
});
var TestChipInput = /** @class */ (function () {
    function TestChipInput() {
        this.addOnBlur = false;
        this.placeholder = '';
    }
    TestChipInput.prototype.add = function (_) {
    };
    __decorate([
        core_1.ViewChild(chip_list_1.MatChipList),
        __metadata("design:type", chip_list_1.MatChipList)
    ], TestChipInput.prototype, "chipListInstance", void 0);
    TestChipInput = __decorate([
        core_1.Component({
            template: "\n    <mat-form-field>\n      <mat-chip-list #chipList>\n      </mat-chip-list>\n      <input matInput [matChipInputFor]=\"chipList\"\n                [matChipInputAddOnBlur]=\"addOnBlur\"\n                (matChipInputTokenEnd)=\"add($event)\"\n                [placeholder]=\"placeholder\" />\n    </mat-form-field>\n  "
        })
    ], TestChipInput);
    return TestChipInput;
}());
//# sourceMappingURL=chip-input.spec.js.map