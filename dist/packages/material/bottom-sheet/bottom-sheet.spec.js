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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var overlay_1 = require("@angular/cdk/overlay");
var scrolling_1 = require("@angular/cdk/scrolling");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var testing_3 = require("@angular/common/testing");
var animations_1 = require("@angular/platform-browser/animations");
var bottom_sheet_1 = require("./bottom-sheet");
var bottom_sheet_config_1 = require("./bottom-sheet-config");
var bottom_sheet_module_1 = require("./bottom-sheet-module");
var bottom_sheet_ref_1 = require("./bottom-sheet-ref");
describe('MatBottomSheet', function () {
    var bottomSheet;
    var overlayContainer;
    var overlayContainerElement;
    var viewportRuler;
    var testViewContainerRef;
    var viewContainerFixture;
    var mockLocation;
    beforeEach(testing_2.fakeAsync(function () {
        testing_2.TestBed
            .configureTestingModule({
            imports: [bottom_sheet_module_1.MatBottomSheetModule, BottomSheetTestModule],
            providers: [{ provide: common_1.Location, useClass: testing_3.SpyLocation }]
        })
            .compileComponents();
    }));
    beforeEach(testing_2.inject([bottom_sheet_1.MatBottomSheet, overlay_1.OverlayContainer, scrolling_1.ViewportRuler, common_1.Location], function (bs, oc, vr, l) {
        bottomSheet = bs;
        overlayContainer = oc;
        viewportRuler = vr;
        overlayContainerElement = oc.getContainerElement();
        mockLocation = l;
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    beforeEach(function () {
        viewContainerFixture = testing_2.TestBed.createComponent(ComponentWithChildViewContainer);
        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });
    it('should open a bottom sheet with a component', function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(bottomSheetRef.instance instanceof PizzaMsg).toBe(true);
        expect(bottomSheetRef.instance.bottomSheetRef).toBe(bottomSheetRef);
    });
    it('should open a bottom sheet with a template', function () {
        var templateRefFixture = testing_2.TestBed.createComponent(ComponentWithTemplateRef);
        templateRefFixture.componentInstance.localValue = 'Bees';
        templateRefFixture.detectChanges();
        var bottomSheetRef = bottomSheet.open(templateRefFixture.componentInstance.templateRef, {
            data: { value: 'Knees' }
        });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
        expect(templateRefFixture.componentInstance.bottomSheetRef).toBe(bottomSheetRef);
    });
    it('should position the bottom sheet at the bottom center of the screen', function () {
        bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        var containerElement = overlayContainerElement.querySelector('mat-bottom-sheet-container');
        var containerRect = containerElement.getBoundingClientRect();
        var viewportSize = viewportRuler.getViewportSize();
        expect(Math.floor(containerRect.bottom)).toBe(Math.floor(viewportSize.height));
        expect(Math.floor(containerRect.left + containerRect.width / 2))
            .toBe(Math.floor(viewportSize.width / 2));
    });
    it('should emit when the bottom sheet opening animation is complete', testing_2.fakeAsync(function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var spy = jasmine.createSpy('afterOpened spy');
        bottomSheetRef.afterOpened().subscribe(spy);
        viewContainerFixture.detectChanges();
        // callback should not be called before animation is complete
        expect(spy).not.toHaveBeenCalled();
        testing_2.flushMicrotasks();
        expect(spy).toHaveBeenCalled();
    }));
    it('should use the correct injector', function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        var injector = bottomSheetRef.instance.injector;
        expect(bottomSheetRef.instance.bottomSheetRef).toBe(bottomSheetRef);
        expect(injector.get(DirectiveWithViewContainer)).toBeTruthy();
    });
    it('should open a bottom sheet with a component and no ViewContainerRef', function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.textContent).toContain('Pizza');
        expect(bottomSheetRef.instance instanceof PizzaMsg).toBe(true);
        expect(bottomSheetRef.instance.bottomSheetRef).toBe(bottomSheetRef);
    });
    it('should apply the correct role to the container element', function () {
        bottomSheet.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        var containerElement = overlayContainerElement.querySelector('mat-bottom-sheet-container');
        expect(containerElement.getAttribute('role')).toBe('dialog');
    });
    it('should close a bottom sheet via the escape key', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeNull();
    }));
    it('should close when clicking on the overlay backdrop', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg, {
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        backdrop.click();
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeFalsy();
    }));
    it('should emit the backdropClick stream when clicking on the overlay backdrop', testing_2.fakeAsync(function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var spy = jasmine.createSpy('backdropClick spy');
        bottomSheetRef.backdropClick().subscribe(spy);
        viewContainerFixture.detectChanges();
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);
        viewContainerFixture.detectChanges();
        testing_2.flush();
        // Additional clicks after the bottom sheet was closed should not be emitted
        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);
    }));
    it('should emit the keyboardEvent stream when key events target the overlay', testing_2.fakeAsync(function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        var spy = jasmine.createSpy('keyboardEvent spy');
        bottomSheetRef.keydownEvents().subscribe(spy);
        viewContainerFixture.detectChanges();
        var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        var container = overlayContainerElement.querySelector('mat-bottom-sheet-container');
        testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.A);
        testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.A, backdrop);
        testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.A, container);
        expect(spy).toHaveBeenCalledTimes(3);
    }));
    it('should allow setting the layout direction', function () {
        bottomSheet.open(PizzaMsg, { direction: 'rtl' });
        viewContainerFixture.detectChanges();
        var overlayPane = overlayContainerElement.querySelector('.cdk-global-overlay-wrapper');
        expect(overlayPane.getAttribute('dir')).toBe('rtl');
    });
    it('should inject the correct direction in the instantiated component', function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg, { direction: 'rtl' });
        viewContainerFixture.detectChanges();
        expect(bottomSheetRef.instance.directionality.value).toBe('rtl');
    });
    it('should fall back to injecting the global direction if none is passed by the config', function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg, {});
        viewContainerFixture.detectChanges();
        expect(bottomSheetRef.instance.directionality.value).toBe('ltr');
    });
    it('should be able to set a custom panel class', function () {
        bottomSheet.open(PizzaMsg, {
            panelClass: 'custom-panel-class',
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.querySelector('.custom-panel-class')).toBeTruthy();
    });
    it('should be able to set a custom aria-label', function () {
        bottomSheet.open(PizzaMsg, {
            ariaLabel: 'Hello there',
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        var container = overlayContainerElement.querySelector('mat-bottom-sheet-container');
        expect(container.getAttribute('aria-label')).toBe('Hello there');
    });
    it('should be able to get dismissed through the service', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);
        bottomSheet.dismiss();
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.childElementCount).toBe(0);
    }));
    it('should dismiss the bottom sheet when the service is destroyed', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);
        bottomSheet.ngOnDestroy();
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.childElementCount).toBe(0);
    }));
    it('should open a new bottom sheet after dismissing a previous sheet', testing_2.fakeAsync(function () {
        var config = { viewContainerRef: testViewContainerRef };
        var bottomSheetRef = bottomSheet.open(PizzaMsg, config);
        viewContainerFixture.detectChanges();
        bottomSheetRef.dismiss();
        viewContainerFixture.detectChanges();
        // Wait for the dismiss animation to finish.
        testing_2.flush();
        bottomSheetRef = bottomSheet.open(TacoMsg, config);
        viewContainerFixture.detectChanges();
        // Wait for the open animation to finish.
        testing_2.flush();
        expect(bottomSheetRef.containerInstance._animationState)
            .toBe('visible', "Expected the animation state would be 'visible'.");
    }));
    it('should remove past bottom sheets when opening new ones', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        bottomSheet.open(TacoMsg);
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.textContent).toContain('Taco');
    }));
    it('should not throw when opening multiple bottom sheet in quick succession', testing_2.fakeAsync(function () {
        expect(function () {
            for (var i = 0; i < 3; i++) {
                bottomSheet.open(PizzaMsg);
                viewContainerFixture.detectChanges();
            }
            testing_2.flush();
        }).not.toThrow();
    }));
    it('should remove bottom sheet if another is shown while its still animating open', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg);
        viewContainerFixture.detectChanges();
        bottomSheet.open(TacoMsg);
        viewContainerFixture.detectChanges();
        testing_2.tick();
        expect(overlayContainerElement.textContent).toContain('Taco');
        testing_2.tick(500);
    }));
    it('should emit after being dismissed', testing_2.fakeAsync(function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg);
        var spy = jasmine.createSpy('afterDismissed spy');
        bottomSheetRef.afterDismissed().subscribe(spy);
        viewContainerFixture.detectChanges();
        bottomSheetRef.dismiss();
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(spy).toHaveBeenCalledTimes(1);
    }));
    it('should be able to pass a result back to the dismissed stream', testing_2.fakeAsync(function () {
        var bottomSheetRef = bottomSheet.open(PizzaMsg);
        var spy = jasmine.createSpy('afterDismissed spy');
        bottomSheetRef.afterDismissed().subscribe(spy);
        viewContainerFixture.detectChanges();
        bottomSheetRef.dismiss(1337);
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(spy).toHaveBeenCalledWith(1337);
    }));
    it('should close the bottom sheet when going forwards/backwards in history', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg);
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
        mockLocation.simulateUrlPop('');
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeFalsy();
    }));
    it('should close the bottom sheet when the location hash changes', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg);
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
        mockLocation.simulateHashChange('');
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeFalsy();
    }));
    it('should allow the consumer to disable closing a bottom sheet on navigation', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg, { closeOnNavigation: false });
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
        mockLocation.simulateUrlPop('');
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
    }));
    describe('passing in data', function () {
        it('should be able to pass in data', function () {
            var config = {
                data: {
                    stringParam: 'hello',
                    dateParam: new Date()
                }
            };
            var instance = bottomSheet.open(BottomSheetWithInjectedData, config).instance;
            expect(instance.data.stringParam).toBe(config.data.stringParam);
            expect(instance.data.dateParam).toBe(config.data.dateParam);
        });
        it('should default to null if no data is passed', function () {
            expect(function () {
                var bottomSheetRef = bottomSheet.open(BottomSheetWithInjectedData);
                expect(bottomSheetRef.instance.data).toBeNull();
            }).not.toThrow();
        });
    });
    describe('disableClose option', function () {
        it('should prevent closing via clicks on the backdrop', testing_2.fakeAsync(function () {
            bottomSheet.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            viewContainerFixture.detectChanges();
            testing_2.flush();
            expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
        }));
        it('should prevent closing via the escape key', testing_2.fakeAsync(function () {
            bottomSheet.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
            viewContainerFixture.detectChanges();
            testing_2.flush();
            expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
        }));
        it('should allow for the disableClose option to be updated while open', testing_2.fakeAsync(function () {
            var bottomSheetRef = bottomSheet.open(PizzaMsg, {
                disableClose: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            var backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
            backdrop.click();
            expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
            bottomSheetRef.disableClose = false;
            backdrop.click();
            viewContainerFixture.detectChanges();
            testing_2.flush();
            expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeFalsy();
        }));
    });
    describe('hasBackdrop option', function () {
        it('should have a backdrop', function () {
            bottomSheet.open(PizzaMsg, {
                hasBackdrop: true,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeTruthy();
        });
        it('should not have a backdrop', function () {
            bottomSheet.open(PizzaMsg, {
                hasBackdrop: false,
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();
        });
    });
    describe('backdropClass option', function () {
        it('should have default backdrop class', function () {
            bottomSheet.open(PizzaMsg, {
                backdropClass: '',
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.cdk-overlay-dark-backdrop')).toBeTruthy();
        });
        it('should have custom backdrop class', function () {
            bottomSheet.open(PizzaMsg, {
                backdropClass: 'custom-backdrop-class',
                viewContainerRef: testViewContainerRef
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.custom-backdrop-class')).toBeTruthy();
        });
    });
    describe('focus management', function () {
        // When testing focus, all of the elements must be in the DOM.
        beforeEach(function () { return document.body.appendChild(overlayContainerElement); });
        afterEach(function () { return document.body.removeChild(overlayContainerElement); });
        it('should focus the bottom sheet container by default', testing_2.fakeAsync(function () {
            bottomSheet.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
            });
            viewContainerFixture.detectChanges();
            testing_2.flushMicrotasks();
            expect(document.activeElement.tagName).toBe('MAT-BOTTOM-SHEET-CONTAINER', 'Expected bottom sheet container to be focused.');
        }));
        it('should focus the first tabbable element of the bottom sheet on open when' +
            'autoFocus is enabled', testing_2.fakeAsync(function () {
            bottomSheet.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                autoFocus: true
            });
            viewContainerFixture.detectChanges();
            testing_2.flushMicrotasks();
            expect(document.activeElement.tagName).toBe('INPUT', 'Expected first tabbable element (input) in the sheet to be focused.');
        }));
        it('should allow disabling focus of the first tabbable element', testing_2.fakeAsync(function () {
            bottomSheet.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                autoFocus: false
            });
            viewContainerFixture.detectChanges();
            testing_2.flushMicrotasks();
            expect(document.activeElement.tagName).not.toBe('INPUT');
        }));
        it('should re-focus trigger element when bottom sheet closes', testing_2.fakeAsync(function () {
            var button = document.createElement('button');
            button.id = 'bottom-sheet-trigger';
            document.body.appendChild(button);
            button.focus();
            var bottomSheetRef = bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
            testing_2.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_2.flushMicrotasks();
            expect(document.activeElement.id)
                .not.toBe('bottom-sheet-trigger', 'Expected the focus to change when sheet was opened.');
            bottomSheetRef.dismiss();
            expect(document.activeElement.id).not.toBe('bottom-sheet-trigger', 'Expcted the focus not to have changed before the animation finishes.');
            testing_2.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_2.tick(500);
            expect(document.activeElement.id).toBe('bottom-sheet-trigger', 'Expected that the trigger was refocused after the sheet is closed.');
            document.body.removeChild(button);
        }));
        it('should be able to disable focus restoration', testing_2.fakeAsync(function () {
            var button = document.createElement('button');
            button.id = 'bottom-sheet-trigger';
            document.body.appendChild(button);
            button.focus();
            var bottomSheetRef = bottomSheet.open(PizzaMsg, {
                viewContainerRef: testViewContainerRef,
                restoreFocus: false
            });
            testing_2.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_2.flushMicrotasks();
            expect(document.activeElement.id)
                .not.toBe('bottom-sheet-trigger', 'Expected the focus to change when sheet was opened.');
            bottomSheetRef.dismiss();
            expect(document.activeElement.id).not.toBe('bottom-sheet-trigger', 'Expcted the focus not to have changed before the animation finishes.');
            testing_2.flushMicrotasks();
            viewContainerFixture.detectChanges();
            testing_2.tick(500);
            expect(document.activeElement.id).not.toBe('bottom-sheet-trigger', 'Expected the trigger not to be refocused on close.');
            document.body.removeChild(button);
        }));
    });
});
describe('MatBottomSheet with parent MatBottomSheet', function () {
    var parentBottomSheet;
    var childBottomSheet;
    var overlayContainer;
    var overlayContainerElement;
    var fixture;
    beforeEach(testing_2.fakeAsync(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [bottom_sheet_module_1.MatBottomSheetModule, BottomSheetTestModule, animations_1.NoopAnimationsModule],
            declarations: [ComponentThatProvidesMatBottomSheet],
        }).compileComponents();
    }));
    beforeEach(testing_2.inject([bottom_sheet_1.MatBottomSheet, overlay_1.OverlayContainer], function (bs, oc) {
        parentBottomSheet = bs;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
        fixture = testing_2.TestBed.createComponent(ComponentThatProvidesMatBottomSheet);
        childBottomSheet = fixture.componentInstance.bottomSheet;
        fixture.detectChanges();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    it('should close bottom sheets opened by parent when opening from child', testing_2.fakeAsync(function () {
        parentBottomSheet.open(PizzaMsg);
        fixture.detectChanges();
        testing_2.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a bottom sheet to be opened');
        childBottomSheet.open(TacoMsg);
        fixture.detectChanges();
        testing_2.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Taco', 'Expected parent bottom sheet to be dismissed by opening from child');
    }));
    it('should close bottom sheets opened by child when opening from parent', testing_2.fakeAsync(function () {
        childBottomSheet.open(PizzaMsg);
        fixture.detectChanges();
        testing_2.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a bottom sheet to be opened');
        parentBottomSheet.open(TacoMsg);
        fixture.detectChanges();
        testing_2.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Taco', 'Expected child bottom sheet to be dismissed by opening from parent');
    }));
    it('should not close parent bottom sheet when child is destroyed', testing_2.fakeAsync(function () {
        parentBottomSheet.open(PizzaMsg);
        fixture.detectChanges();
        testing_2.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a bottom sheet to be opened');
        childBottomSheet.ngOnDestroy();
        fixture.detectChanges();
        testing_2.tick(1000);
        expect(overlayContainerElement.textContent)
            .toContain('Pizza', 'Expected a bottom sheet to stay open');
    }));
});
describe('MatBottomSheet with default options', function () {
    var bottomSheet;
    var overlayContainer;
    var overlayContainerElement;
    var testViewContainerRef;
    var viewContainerFixture;
    beforeEach(testing_2.fakeAsync(function () {
        var defaultConfig = {
            hasBackdrop: false,
            disableClose: true,
            autoFocus: false
        };
        testing_2.TestBed.configureTestingModule({
            imports: [bottom_sheet_module_1.MatBottomSheetModule, BottomSheetTestModule],
            providers: [
                { provide: bottom_sheet_1.MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: defaultConfig },
            ],
        });
        testing_2.TestBed.compileComponents();
    }));
    beforeEach(testing_2.inject([bottom_sheet_1.MatBottomSheet, overlay_1.OverlayContainer], function (b, oc) {
        bottomSheet = b;
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
    });
    beforeEach(function () {
        viewContainerFixture = testing_2.TestBed.createComponent(ComponentWithChildViewContainer);
        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });
    it('should use the provided defaults', function () {
        bottomSheet.open(PizzaMsg, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeFalsy();
        testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeTruthy();
        expect(document.activeElement.tagName).not.toBe('INPUT');
    });
    it('should be overridable by open() options', testing_2.fakeAsync(function () {
        bottomSheet.open(PizzaMsg, {
            hasBackdrop: true,
            disableClose: false,
            viewContainerRef: testViewContainerRef
        });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeTruthy();
        testing_1.dispatchKeyboardEvent(document.body, 'keydown', keycodes_1.ESCAPE);
        viewContainerFixture.detectChanges();
        testing_2.flush();
        expect(overlayContainerElement.querySelector('mat-bottom-sheet-container')).toBeFalsy();
    }));
});
var DirectiveWithViewContainer = /** @class */ (function () {
    function DirectiveWithViewContainer(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    DirectiveWithViewContainer = __decorate([
        core_1.Directive({ selector: 'dir-with-view-container' }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], DirectiveWithViewContainer);
    return DirectiveWithViewContainer;
}());
var ComponentWithChildViewContainer = /** @class */ (function () {
    function ComponentWithChildViewContainer() {
    }
    Object.defineProperty(ComponentWithChildViewContainer.prototype, "childViewContainer", {
        get: function () {
            return this.childWithViewContainer.viewContainerRef;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(DirectiveWithViewContainer),
        __metadata("design:type", DirectiveWithViewContainer)
    ], ComponentWithChildViewContainer.prototype, "childWithViewContainer", void 0);
    ComponentWithChildViewContainer = __decorate([
        core_1.Component({ template: "<dir-with-view-container></dir-with-view-container>" })
    ], ComponentWithChildViewContainer);
    return ComponentWithChildViewContainer;
}());
var ComponentWithTemplateRef = /** @class */ (function () {
    function ComponentWithTemplateRef() {
    }
    ComponentWithTemplateRef.prototype.setRef = function (bottomSheetRef) {
        this.bottomSheetRef = bottomSheetRef;
        return '';
    };
    __decorate([
        core_1.ViewChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], ComponentWithTemplateRef.prototype, "templateRef", void 0);
    ComponentWithTemplateRef = __decorate([
        core_1.Component({
            selector: 'arbitrary-component-with-template-ref',
            template: "<ng-template let-data let-bottomSheetRef=\"bottomSheetRef\">\n      Cheese {{localValue}} {{data?.value}}{{setRef(bottomSheetRef)}}</ng-template>",
        })
    ], ComponentWithTemplateRef);
    return ComponentWithTemplateRef;
}());
var PizzaMsg = /** @class */ (function () {
    function PizzaMsg(bottomSheetRef, injector, directionality) {
        this.bottomSheetRef = bottomSheetRef;
        this.injector = injector;
        this.directionality = directionality;
    }
    PizzaMsg = __decorate([
        core_1.Component({ template: '<p>Pizza</p> <input> <button>Close</button>' }),
        __metadata("design:paramtypes", [bottom_sheet_ref_1.MatBottomSheetRef,
            core_1.Injector,
            bidi_1.Directionality])
    ], PizzaMsg);
    return PizzaMsg;
}());
var TacoMsg = /** @class */ (function () {
    function TacoMsg() {
    }
    TacoMsg = __decorate([
        core_1.Component({ template: '<p>Taco</p>' })
    ], TacoMsg);
    return TacoMsg;
}());
var ComponentThatProvidesMatBottomSheet = /** @class */ (function () {
    function ComponentThatProvidesMatBottomSheet(bottomSheet) {
        this.bottomSheet = bottomSheet;
    }
    ComponentThatProvidesMatBottomSheet = __decorate([
        core_1.Component({
            template: '',
            providers: [bottom_sheet_1.MatBottomSheet]
        }),
        __metadata("design:paramtypes", [bottom_sheet_1.MatBottomSheet])
    ], ComponentThatProvidesMatBottomSheet);
    return ComponentThatProvidesMatBottomSheet;
}());
var BottomSheetWithInjectedData = /** @class */ (function () {
    function BottomSheetWithInjectedData(data) {
        this.data = data;
    }
    BottomSheetWithInjectedData = __decorate([
        core_1.Component({ template: '' }),
        __param(0, core_1.Inject(bottom_sheet_config_1.MAT_BOTTOM_SHEET_DATA)),
        __metadata("design:paramtypes", [Object])
    ], BottomSheetWithInjectedData);
    return BottomSheetWithInjectedData;
}());
// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
var TEST_DIRECTIVES = [
    ComponentWithChildViewContainer,
    ComponentWithTemplateRef,
    PizzaMsg,
    TacoMsg,
    DirectiveWithViewContainer,
    BottomSheetWithInjectedData,
];
var BottomSheetTestModule = /** @class */ (function () {
    function BottomSheetTestModule() {
    }
    BottomSheetTestModule = __decorate([
        core_1.NgModule({
            imports: [bottom_sheet_module_1.MatBottomSheetModule, animations_1.NoopAnimationsModule],
            exports: TEST_DIRECTIVES,
            declarations: TEST_DIRECTIVES,
            entryComponents: [
                ComponentWithChildViewContainer,
                ComponentWithTemplateRef,
                PizzaMsg,
                TacoMsg,
                BottomSheetWithInjectedData,
            ],
        })
    ], BottomSheetTestModule);
    return BottomSheetTestModule;
}());
//# sourceMappingURL=bottom-sheet.spec.js.map