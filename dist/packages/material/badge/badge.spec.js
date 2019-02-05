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
var index_1 = require("./index");
describe('MatBadge', function () {
    var fixture;
    var testComponent;
    var badgeNativeElement;
    var badgeDebugElement;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatBadgeModule],
            declarations: [BadgeTestApp],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(BadgeTestApp);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        badgeDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatBadge));
        badgeNativeElement = badgeDebugElement.nativeElement;
    }));
    it('should update the badge based on attribute', function () {
        var badgeContentDebugElement = badgeNativeElement.querySelector('.mat-badge-content');
        expect(badgeContentDebugElement.textContent).toContain('1');
        testComponent.badgeContent = '22';
        fixture.detectChanges();
        badgeContentDebugElement = badgeNativeElement.querySelector('.mat-badge-content');
        expect(badgeContentDebugElement.textContent).toContain('22');
    });
    it('should apply class based on color attribute', function () {
        testComponent.badgeColor = 'primary';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-primary')).toBe(true);
        testComponent.badgeColor = 'accent';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-accent')).toBe(true);
        testComponent.badgeColor = 'warn';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-warn')).toBe(true);
        testComponent.badgeColor = undefined;
        fixture.detectChanges();
        expect(badgeNativeElement.classList).not.toContain('mat-badge-accent');
    });
    it('should update the badge position on direction change', function () {
        expect(badgeNativeElement.classList.contains('mat-badge-above')).toBe(true);
        expect(badgeNativeElement.classList.contains('mat-badge-after')).toBe(true);
        testComponent.badgeDirection = 'below before';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-below')).toBe(true);
        expect(badgeNativeElement.classList.contains('mat-badge-before')).toBe(true);
    });
    it('should change visibility to hidden', function () {
        expect(badgeNativeElement.classList.contains('mat-badge-hidden')).toBe(false);
        testComponent.badgeHidden = true;
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-hidden')).toBe(true);
    });
    it('should change badge sizes', function () {
        expect(badgeNativeElement.classList.contains('mat-badge-medium')).toBe(true);
        testComponent.badgeSize = 'small';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-small')).toBe(true);
        testComponent.badgeSize = 'large';
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-large')).toBe(true);
    });
    it('should change badge overlap', function () {
        expect(badgeNativeElement.classList.contains('mat-badge-overlap')).toBe(false);
        testComponent.badgeOverlap = true;
        fixture.detectChanges();
        expect(badgeNativeElement.classList.contains('mat-badge-overlap')).toBe(true);
    });
    it('should toggle `aria-describedby` depending on whether the badge has a description', function () {
        var badgeContent = badgeNativeElement.querySelector('.mat-badge-content');
        expect(badgeContent.getAttribute('aria-describedby')).toBeFalsy();
        testComponent.badgeDescription = 'Describing a badge';
        fixture.detectChanges();
        expect(badgeContent.getAttribute('aria-describedby')).toBeTruthy();
        testComponent.badgeDescription = '';
        fixture.detectChanges();
        expect(badgeContent.getAttribute('aria-describedby')).toBeFalsy();
    });
    it('should toggle visibility based on whether the badge has content', function () {
        var classList = badgeNativeElement.classList;
        expect(classList.contains('mat-badge-hidden')).toBe(false);
        testComponent.badgeContent = '';
        fixture.detectChanges();
        expect(classList.contains('mat-badge-hidden')).toBe(true);
        testComponent.badgeContent = 'hello';
        fixture.detectChanges();
        expect(classList.contains('mat-badge-hidden')).toBe(false);
        testComponent.badgeContent = ' ';
        fixture.detectChanges();
        expect(classList.contains('mat-badge-hidden')).toBe(true);
        testComponent.badgeContent = 0;
        fixture.detectChanges();
        expect(classList.contains('mat-badge-hidden')).toBe(false);
    });
    it('should apply view encapsulation on create badge content', function () {
        var badge = badgeNativeElement.querySelector('.mat-badge-content');
        var encapsulationAttr;
        for (var i = 0; i < badge.attributes.length; i++) {
            if (badge.attributes[i].name.startsWith('_ngcontent-')) {
                encapsulationAttr = badge.attributes[i];
                break;
            }
        }
        expect(encapsulationAttr).toBeTruthy();
    });
    it('should toggle a class depending on the badge disabled state', function () {
        var element = badgeDebugElement.nativeElement;
        expect(element.classList).not.toContain('mat-badge-disabled');
        testComponent.badgeDisabled = true;
        fixture.detectChanges();
        expect(element.classList).toContain('mat-badge-disabled');
    });
    it('should update the aria-label if the description changes', function () {
        var badgeContent = badgeNativeElement.querySelector('.mat-badge-content');
        fixture.componentInstance.badgeDescription = 'initial content';
        fixture.detectChanges();
        expect(badgeContent.getAttribute('aria-label')).toBe('initial content');
        fixture.componentInstance.badgeDescription = 'changed content';
        fixture.detectChanges();
        expect(badgeContent.getAttribute('aria-label')).toBe('changed content');
        fixture.componentInstance.badgeDescription = '';
        fixture.detectChanges();
        expect(badgeContent.hasAttribute('aria-label')).toBe(false);
    });
});
/** Test component that contains a MatBadge. */
var BadgeTestApp = /** @class */ (function () {
    function BadgeTestApp() {
        this.badgeContent = '1';
        this.badgeDirection = 'above after';
        this.badgeHidden = false;
        this.badgeSize = 'medium';
        this.badgeOverlap = false;
        this.badgeDisabled = false;
    }
    BadgeTestApp = __decorate([
        core_1.Component({
            // Explicitly set the view encapsulation since we have a test that checks for it.
            encapsulation: core_1.ViewEncapsulation.Emulated,
            styles: ['span { color: hotpink; }'],
            template: "\n    <span [matBadge]=\"badgeContent\"\n          [matBadgeColor]=\"badgeColor\"\n          [matBadgePosition]=\"badgeDirection\"\n          [matBadgeHidden]=\"badgeHidden\"\n          [matBadgeSize]=\"badgeSize\"\n          [matBadgeOverlap]=\"badgeOverlap\"\n          [matBadgeDescription]=\"badgeDescription\"\n          [matBadgeDisabled]=\"badgeDisabled\">\n      home\n    </span>\n  "
        })
    ], BadgeTestApp);
    return BadgeTestApp;
}());
//# sourceMappingURL=badge.spec.js.map