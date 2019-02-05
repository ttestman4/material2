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
var animations_1 = require("@angular/platform-browser/animations");
var index_1 = require("./index");
describe('MatProgressBar', function () {
    var fakePath;
    function createComponent(componentType, imports) {
        fakePath = '/fake-path';
        testing_1.TestBed.configureTestingModule({
            imports: imports || [index_1.MatProgressBarModule],
            declarations: [componentType],
            providers: [{
                    provide: index_1.MAT_PROGRESS_BAR_LOCATION,
                    useValue: { getPathname: function () { return fakePath; } }
                }]
        }).compileComponents();
        return testing_1.TestBed.createComponent(componentType);
    }
    describe('with animation', function () {
        describe('basic progress-bar', function () {
            it('should apply a mode of "determinate" if no mode is provided.', function () {
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
                expect(progressElement.componentInstance.mode).toBe('determinate');
            });
            it('should define default values for value and bufferValue attributes', function () {
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
                expect(progressElement.componentInstance.value).toBe(0);
                expect(progressElement.componentInstance.bufferValue).toBe(0);
            });
            it('should clamp value and bufferValue between 0 and 100', function () {
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
                var progressComponent = progressElement.componentInstance;
                progressComponent.value = 50;
                expect(progressComponent.value).toBe(50);
                progressComponent.value = 999;
                expect(progressComponent.value).toBe(100);
                progressComponent.value = -10;
                expect(progressComponent.value).toBe(0);
                progressComponent.bufferValue = -29;
                expect(progressComponent.bufferValue).toBe(0);
                progressComponent.bufferValue = 9;
                expect(progressComponent.bufferValue).toBe(9);
                progressComponent.bufferValue = 1320;
                expect(progressComponent.bufferValue).toBe(100);
            });
            it('should return the transform attribute for bufferValue and mode', function () {
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
                var progressComponent = progressElement.componentInstance;
                expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0)' });
                expect(progressComponent._bufferTransform()).toBe(undefined);
                progressComponent.value = 40;
                expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.4)' });
                expect(progressComponent._bufferTransform()).toBe(undefined);
                progressComponent.value = 35;
                progressComponent.bufferValue = 55;
                expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.35)' });
                expect(progressComponent._bufferTransform()).toBe(undefined);
                progressComponent.mode = 'buffer';
                expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.35)' });
                expect(progressComponent._bufferTransform()).toEqual({ transform: 'scaleX(0.55)' });
                progressComponent.value = 60;
                progressComponent.bufferValue = 60;
                expect(progressComponent._primaryTransform()).toEqual({ transform: 'scaleX(0.6)' });
                expect(progressComponent._bufferTransform()).toEqual({ transform: 'scaleX(0.6)' });
            });
            it('should prefix SVG references with the current path', function () {
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var rect = fixture.debugElement.query(platform_browser_1.By.css('rect')).nativeElement;
                expect(rect.getAttribute('fill')).toMatch(/^url\(['"]?\/fake-path#.*['"]?\)$/);
            });
            it('should account for location hash when prefixing the SVG references', function () {
                fakePath = '/fake-path#anchor';
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var rect = fixture.debugElement.query(platform_browser_1.By.css('rect')).nativeElement;
                expect(rect.getAttribute('fill')).not.toContain('#anchor#');
            });
            it('should not be able to tab into the underlying SVG element', function () {
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var svg = fixture.debugElement.query(platform_browser_1.By.css('svg')).nativeElement;
                expect(svg.getAttribute('focusable')).toBe('false');
            });
            it('should use latest path when prefixing the SVG references', function () {
                var fixture = createComponent(BasicProgressBar);
                fixture.detectChanges();
                var rect = fixture.debugElement.query(platform_browser_1.By.css('rect')).nativeElement;
                expect(rect.getAttribute('fill')).toMatch(/^url\(['"]?\/fake-path#.*['"]?\)$/);
                fixture.destroy();
                fakePath = '/another-fake-path';
                fixture = testing_1.TestBed.createComponent(BasicProgressBar);
                fixture.detectChanges();
                rect = fixture.debugElement.query(platform_browser_1.By.css('rect')).nativeElement;
                expect(rect.getAttribute('fill')).toMatch(/^url\(['"]?\/another-fake-path#.*['"]?\)$/);
            });
        });
        describe('animation trigger on determinate setting', function () {
            var fixture;
            var progressComponent;
            var primaryValueBar;
            beforeEach(function () {
                fixture = createComponent(BasicProgressBar);
                var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
                progressComponent = progressElement.componentInstance;
                primaryValueBar = progressElement.query(platform_browser_1.By.css('.mat-progress-bar-primary'));
            });
            it('should trigger output event on primary value bar animation end', function () {
                fixture.detectChanges();
                spyOn(progressComponent.animationEnd, 'next');
                progressComponent.value = 40;
                expect(progressComponent.animationEnd.next).not.toHaveBeenCalled();
                // On animation end, output should be emitted.
                testing_2.dispatchFakeEvent(primaryValueBar.nativeElement, 'transitionend');
                expect(progressComponent.animationEnd.next).toHaveBeenCalledWith({ value: 40 });
            });
        });
        describe('animation trigger on buffer setting', function () {
            var fixture;
            var progressComponent;
            var primaryValueBar;
            beforeEach(function () {
                fixture = createComponent(BufferProgressBar);
                var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
                progressComponent = progressElement.componentInstance;
                primaryValueBar = progressElement.query(platform_browser_1.By.css('.mat-progress-bar-primary'));
            });
            it('should bind on transitionend eventListener on primaryBarValue', function () {
                spyOn(primaryValueBar.nativeElement, 'addEventListener');
                fixture.detectChanges();
                expect(primaryValueBar.nativeElement.addEventListener).toHaveBeenCalled();
                expect(primaryValueBar.nativeElement.addEventListener
                    .calls.mostRecent().args[0]).toBe('transitionend');
            });
            it('should trigger output event on primary value bar animation end', function () {
                fixture.detectChanges();
                spyOn(progressComponent.animationEnd, 'next');
                progressComponent.value = 40;
                expect(progressComponent.animationEnd.next).not.toHaveBeenCalled();
                // On animation end, output should be emitted.
                testing_2.dispatchFakeEvent(primaryValueBar.nativeElement, 'transitionend');
                expect(progressComponent.animationEnd.next).toHaveBeenCalledWith({ value: 40 });
            });
            it('should trigger output event with value not bufferValue', function () {
                fixture.detectChanges();
                spyOn(progressComponent.animationEnd, 'next');
                progressComponent.value = 40;
                progressComponent.bufferValue = 70;
                expect(progressComponent.animationEnd.next).not.toHaveBeenCalled();
                // On animation end, output should be emitted.
                testing_2.dispatchFakeEvent(primaryValueBar.nativeElement, 'transitionend');
                expect(progressComponent.animationEnd.next).toHaveBeenCalledWith({ value: 40 });
            });
        });
    });
    describe('With NoopAnimations', function () {
        var progressComponent;
        var primaryValueBar;
        var fixture;
        beforeEach(testing_1.async(function () {
            fixture = createComponent(BasicProgressBar, [index_1.MatProgressBarModule, animations_1.NoopAnimationsModule]);
            var progressElement = fixture.debugElement.query(platform_browser_1.By.css('mat-progress-bar'));
            progressComponent = progressElement.componentInstance;
            primaryValueBar = progressElement.query(platform_browser_1.By.css('.mat-progress-bar-primary'));
        }));
        it('should not bind transition end listener', function () {
            spyOn(primaryValueBar.nativeElement, 'addEventListener');
            fixture.detectChanges();
            expect(primaryValueBar.nativeElement.addEventListener).not.toHaveBeenCalled();
        });
        it('should trigger the animationEnd output on value set', function () {
            fixture.detectChanges();
            spyOn(progressComponent.animationEnd, 'next');
            progressComponent.value = 40;
            expect(progressComponent.animationEnd.next).toHaveBeenCalledWith({ value: 40 });
        });
    });
});
var BasicProgressBar = /** @class */ (function () {
    function BasicProgressBar() {
    }
    BasicProgressBar = __decorate([
        core_1.Component({ template: '<mat-progress-bar></mat-progress-bar>' })
    ], BasicProgressBar);
    return BasicProgressBar;
}());
var BufferProgressBar = /** @class */ (function () {
    function BufferProgressBar() {
    }
    BufferProgressBar = __decorate([
        core_1.Component({ template: '<mat-progress-bar mode="buffer"></mat-progress-bar>' })
    ], BufferProgressBar);
    return BufferProgressBar;
}());
//# sourceMappingURL=progress-bar.spec.js.map