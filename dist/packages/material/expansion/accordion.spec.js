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
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var index_1 = require("./index");
var testing_2 = require("@angular/cdk/testing");
var keycodes_1 = require("@angular/cdk/keycodes");
var a11y_1 = require("@angular/cdk/a11y");
describe('MatAccordion', function () {
    var focusMonitor;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                index_1.MatExpansionModule
            ],
            declarations: [
                AccordionWithHideToggle,
                NestedPanel,
                SetOfItems,
            ],
        });
        testing_1.TestBed.compileComponents();
        testing_1.inject([a11y_1.FocusMonitor], function (fm) {
            focusMonitor = fm;
        })();
    }));
    it('should ensure only one item is expanded at a time', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var items = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        var panelInstances = fixture.componentInstance.panels.toArray();
        panelInstances[0].expanded = true;
        fixture.detectChanges();
        expect(items[0].classes['mat-expanded']).toBeTruthy();
        expect(items[1].classes['mat-expanded']).toBeFalsy();
        panelInstances[1].expanded = true;
        fixture.detectChanges();
        expect(items[0].classes['mat-expanded']).toBeFalsy();
        expect(items[1].classes['mat-expanded']).toBeTruthy();
    });
    it('should allow multiple items to be expanded simultaneously', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.componentInstance.multi = true;
        fixture.detectChanges();
        var panels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        var panelInstances = fixture.componentInstance.panels.toArray();
        panelInstances[0].expanded = true;
        panelInstances[1].expanded = true;
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeTruthy();
        expect(panels[1].classes['mat-expanded']).toBeTruthy();
    });
    it('should expand or collapse all enabled items', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var panels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        fixture.componentInstance.multi = true;
        fixture.componentInstance.panels.toArray()[1].expanded = true;
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeFalsy();
        expect(panels[1].classes['mat-expanded']).toBeTruthy();
        fixture.componentInstance.accordion.openAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeTruthy();
        expect(panels[1].classes['mat-expanded']).toBeTruthy();
        fixture.componentInstance.accordion.closeAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeFalsy();
        expect(panels[1].classes['mat-expanded']).toBeFalsy();
    });
    it('should not expand or collapse disabled items', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var panels = fixture.debugElement.queryAll(platform_browser_1.By.css('.mat-expansion-panel'));
        fixture.componentInstance.multi = true;
        fixture.componentInstance.panels.toArray()[1].disabled = true;
        fixture.detectChanges();
        fixture.componentInstance.accordion.openAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeTruthy();
        expect(panels[1].classes['mat-expanded']).toBeFalsy();
        fixture.componentInstance.accordion.closeAll();
        fixture.detectChanges();
        expect(panels[0].classes['mat-expanded']).toBeFalsy();
        expect(panels[1].classes['mat-expanded']).toBeFalsy();
    });
    it('should not register nested panels to the same accordion', function () {
        var fixture = testing_1.TestBed.createComponent(NestedPanel);
        var innerPanel = fixture.componentInstance.innerPanel;
        var outerPanel = fixture.componentInstance.outerPanel;
        expect(innerPanel.accordion).not.toBe(outerPanel.accordion);
    });
    it('should update the expansion panel if hideToggle changed', function () {
        var fixture = testing_1.TestBed.createComponent(AccordionWithHideToggle);
        var panel = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatExpansionPanel));
        fixture.detectChanges();
        expect(panel.nativeElement.querySelector('.mat-expansion-indicator'))
            .toBeTruthy('Expected the expansion indicator to be present.');
        fixture.componentInstance.hideToggle = true;
        fixture.detectChanges();
        expect(panel.nativeElement.querySelector('.mat-expansion-indicator'))
            .toBeFalsy('Expected the expansion indicator to be removed.');
    });
    it('should move focus to the next header when pressing the down arrow', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var headerElements = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-expansion-panel-header'));
        var headers = fixture.componentInstance.headers.toArray();
        focusMonitor.focusVia(headerElements[0].nativeElement, 'keyboard');
        headers.forEach(function (header) { return spyOn(header, 'focus'); });
        // Stop at the second-last header so focus doesn't wrap around.
        for (var i = 0; i < headerElements.length - 1; i++) {
            testing_2.dispatchKeyboardEvent(headerElements[i].nativeElement, 'keydown', keycodes_1.DOWN_ARROW);
            fixture.detectChanges();
            expect(headers[i + 1].focus).toHaveBeenCalledTimes(1);
        }
    });
    it('should move focus to the next header when pressing the up arrow', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var headerElements = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-expansion-panel-header'));
        var headers = fixture.componentInstance.headers.toArray();
        focusMonitor.focusVia(headerElements[headerElements.length - 1].nativeElement, 'keyboard');
        headers.forEach(function (header) { return spyOn(header, 'focus'); });
        // Stop before the first header
        for (var i = headers.length - 1; i > 0; i--) {
            testing_2.dispatchKeyboardEvent(headerElements[i].nativeElement, 'keydown', keycodes_1.UP_ARROW);
            fixture.detectChanges();
            expect(headers[i - 1].focus).toHaveBeenCalledTimes(1);
        }
    });
    it('should skip disabled items when moving focus with the keyboard', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var headerElements = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-expansion-panel-header'));
        var panels = fixture.componentInstance.panels.toArray();
        var headers = fixture.componentInstance.headers.toArray();
        focusMonitor.focusVia(headerElements[0].nativeElement, 'keyboard');
        headers.forEach(function (header) { return spyOn(header, 'focus'); });
        panels[1].disabled = true;
        fixture.detectChanges();
        testing_2.dispatchKeyboardEvent(headerElements[0].nativeElement, 'keydown', keycodes_1.DOWN_ARROW);
        fixture.detectChanges();
        expect(headers[1].focus).not.toHaveBeenCalled();
        expect(headers[2].focus).toHaveBeenCalledTimes(1);
    });
    it('should focus the first header when pressing the home key', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var headerElements = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-expansion-panel-header'));
        var headers = fixture.componentInstance.headers.toArray();
        headers.forEach(function (header) { return spyOn(header, 'focus'); });
        testing_2.dispatchKeyboardEvent(headerElements[headerElements.length - 1].nativeElement, 'keydown', keycodes_1.HOME);
        fixture.detectChanges();
        expect(headers[0].focus).toHaveBeenCalledTimes(1);
    });
    it('should focus the last header when pressing the end key', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        fixture.detectChanges();
        var headerElements = fixture.debugElement.queryAll(platform_browser_1.By.css('mat-expansion-panel-header'));
        var headers = fixture.componentInstance.headers.toArray();
        headers.forEach(function (header) { return spyOn(header, 'focus'); });
        testing_2.dispatchKeyboardEvent(headerElements[0].nativeElement, 'keydown', keycodes_1.END);
        fixture.detectChanges();
        expect(headers[headers.length - 1].focus).toHaveBeenCalledTimes(1);
    });
});
var SetOfItems = /** @class */ (function () {
    function SetOfItems() {
        this.multi = false;
    }
    __decorate([
        core_1.ViewChild(index_1.MatAccordion),
        __metadata("design:type", index_1.MatAccordion)
    ], SetOfItems.prototype, "accordion", void 0);
    __decorate([
        core_1.ViewChildren(index_1.MatExpansionPanel),
        __metadata("design:type", core_1.QueryList)
    ], SetOfItems.prototype, "panels", void 0);
    __decorate([
        core_1.ViewChildren(index_1.MatExpansionPanelHeader),
        __metadata("design:type", core_1.QueryList)
    ], SetOfItems.prototype, "headers", void 0);
    SetOfItems = __decorate([
        core_1.Component({ template: "\n  <mat-accordion [multi]=\"multi\">\n    <mat-expansion-panel *ngFor=\"let i of [0, 1, 2, 3]\">\n      <mat-expansion-panel-header>Summary {{i}}</mat-expansion-panel-header>\n      <p>Content</p>\n    </mat-expansion-panel>\n  </mat-accordion>" })
    ], SetOfItems);
    return SetOfItems;
}());
var NestedPanel = /** @class */ (function () {
    function NestedPanel() {
    }
    __decorate([
        core_1.ViewChild('outerPanel'),
        __metadata("design:type", index_1.MatExpansionPanel)
    ], NestedPanel.prototype, "outerPanel", void 0);
    __decorate([
        core_1.ViewChild('innerPanel'),
        __metadata("design:type", index_1.MatExpansionPanel)
    ], NestedPanel.prototype, "innerPanel", void 0);
    NestedPanel = __decorate([
        core_1.Component({ template: "\n  <mat-accordion>\n    <mat-expansion-panel #outerPanel=\"matExpansionPanel\">\n      <mat-expansion-panel-header>Outer Panel</mat-expansion-panel-header>\n      <mat-expansion-panel #innerPanel=\"matExpansionPanel\">\n        <mat-expansion-panel-header>Inner Panel</mat-expansion-panel-header>\n        <p>Content</p>\n      </mat-expansion-panel>\n    </mat-expansion-panel>\n  </mat-accordion>" })
    ], NestedPanel);
    return NestedPanel;
}());
var AccordionWithHideToggle = /** @class */ (function () {
    function AccordionWithHideToggle() {
        this.hideToggle = false;
    }
    AccordionWithHideToggle = __decorate([
        core_1.Component({ template: "\n  <mat-accordion [hideToggle]=\"hideToggle\">\n    <mat-expansion-panel>\n      <mat-expansion-panel-header>Header</mat-expansion-panel-header>\n      <p>Content</p>\n    </mat-expansion-panel>\n  </mat-accordion>"
        })
    ], AccordionWithHideToggle);
    return AccordionWithHideToggle;
}());
//# sourceMappingURL=accordion.spec.js.map