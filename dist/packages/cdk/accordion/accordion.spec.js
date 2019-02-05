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
var public_api_1 = require("./public-api");
describe('CdkAccordion', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                public_api_1.CdkAccordionModule
            ],
            declarations: [
                SetOfItems,
                NestedItems,
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    it('should ensure only one item is expanded at a time', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var _a = fixture.debugElement
            .queryAll(platform_browser_1.By.directive(public_api_1.CdkAccordionItem))
            .map(function (el) { return el.injector.get(public_api_1.CdkAccordionItem); }), firstPanel = _a[0], secondPanel = _a[1];
        firstPanel.open();
        fixture.detectChanges();
        expect(firstPanel.expanded).toBeTruthy();
        expect(secondPanel.expanded).toBeFalsy();
        secondPanel.open();
        fixture.detectChanges();
        expect(firstPanel.expanded).toBeFalsy();
        expect(secondPanel.expanded).toBeTruthy();
    });
    it('should allow multiple items to be expanded simultaneously', function () {
        var fixture = testing_1.TestBed.createComponent(SetOfItems);
        var _a = fixture.debugElement
            .queryAll(platform_browser_1.By.directive(public_api_1.CdkAccordionItem))
            .map(function (el) { return el.injector.get(public_api_1.CdkAccordionItem); }), firstPanel = _a[0], secondPanel = _a[1];
        fixture.componentInstance.multi = true;
        fixture.detectChanges();
        firstPanel.expanded = true;
        secondPanel.expanded = true;
        fixture.detectChanges();
        expect(firstPanel.expanded).toBeTruthy();
        expect(secondPanel.expanded).toBeTruthy();
    });
    it('should not register nested items to the same accordion', function () {
        var fixture = testing_1.TestBed.createComponent(NestedItems);
        var innerItem = fixture.componentInstance.innerItem;
        var outerItem = fixture.componentInstance.outerItem;
        expect(innerItem.accordion).not.toBe(outerItem.accordion);
    });
});
var SetOfItems = /** @class */ (function () {
    function SetOfItems() {
        this.multi = false;
    }
    SetOfItems = __decorate([
        core_1.Component({ template: "\n  <cdk-accordion [multi]=\"multi\">\n    <cdk-accordion-item></cdk-accordion-item>\n    <cdk-accordion-item></cdk-accordion-item>\n  </cdk-accordion>" })
    ], SetOfItems);
    return SetOfItems;
}());
var NestedItems = /** @class */ (function () {
    function NestedItems() {
    }
    __decorate([
        core_1.ViewChild('outerItem'),
        __metadata("design:type", public_api_1.CdkAccordionItem)
    ], NestedItems.prototype, "outerItem", void 0);
    __decorate([
        core_1.ViewChild('innerItem'),
        __metadata("design:type", public_api_1.CdkAccordionItem)
    ], NestedItems.prototype, "innerItem", void 0);
    NestedItems = __decorate([
        core_1.Component({ template: "\n  <cdk-accordion>\n    <cdk-accordion-item #outerItem=\"cdkAccordionItem\">\n      <cdk-accordion-item #innerItem=\"cdkAccordionItem\"></cdk-accordion-item>\n    </cdk-accordion-item>\n  </cdk-accordion>" })
    ], NestedItems);
    return NestedItems;
}());
//# sourceMappingURL=accordion.spec.js.map