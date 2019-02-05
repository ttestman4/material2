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
var scrolling_1 = require("@angular/cdk/scrolling");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
function expectOverlapping(el1, el2, expected) {
    if (expected === void 0) { expected = true; }
    var r1 = el1.nativeElement.getBoundingClientRect();
    var r2 = el2.nativeElement.getBoundingClientRect();
    var actual = r1.left < r2.right && r1.right > r2.left && r1.top < r2.bottom && r1.bottom > r2.top;
    if (expected) {
        expect(actual)
            .toBe(expected, JSON.stringify(r1) + " should overlap with " + JSON.stringify(r2));
    }
    else {
        expect(actual)
            .toBe(expected, JSON.stringify(r1) + " should not overlap with " + JSON.stringify(r2));
    }
}
describe('CdkScrollable', function () {
    var fixture;
    var testComponent;
    var maxOffset = 0;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [scrolling_1.ScrollingModule],
            declarations: [ScrollableViewport],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(ScrollableViewport);
        testComponent = fixture.componentInstance;
    });
    describe('in LTR context', function () {
        beforeEach(function () {
            fixture.detectChanges();
            maxOffset = testComponent.scrollContainer.nativeElement.scrollHeight -
                testComponent.scrollContainer.nativeElement.clientHeight;
        });
        it('should initially be scrolled to top-left', function () {
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scrollTo top-left', function () {
            testComponent.scrollable.scrollTo({ top: 0, left: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scrollTo bottom-right', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, right: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, true);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scroll to top-end', function () {
            testComponent.scrollable.scrollTo({ top: 0, end: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scroll to bottom-start', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, start: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
    });
    describe('in RTL context', function () {
        beforeEach(function () {
            testComponent.dir = 'rtl';
            fixture.detectChanges();
            maxOffset = testComponent.scrollContainer.nativeElement.scrollHeight -
                testComponent.scrollContainer.nativeElement.clientHeight;
        });
        it('should initially be scrolled to top-right', function () {
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scrollTo top-left', function () {
            testComponent.scrollable.scrollTo({ top: 0, left: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scrollTo bottom-right', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, right: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
        it('should scroll to top-end', function () {
            testComponent.scrollable.scrollTo({ top: 0, end: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(0);
        });
        it('should scroll to bottom-start', function () {
            testComponent.scrollable.scrollTo({ bottom: 0, start: 0 });
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowStart, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.firstRowEnd, false);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowStart, true);
            expectOverlapping(testComponent.scrollContainer, testComponent.lastRowEnd, false);
            expect(testComponent.scrollable.measureScrollOffset('top')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('bottom')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('left')).toBe(maxOffset);
            expect(testComponent.scrollable.measureScrollOffset('right')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('start')).toBe(0);
            expect(testComponent.scrollable.measureScrollOffset('end')).toBe(maxOffset);
        });
    });
});
var ScrollableViewport = /** @class */ (function () {
    function ScrollableViewport() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ScrollableViewport.prototype, "dir", void 0);
    __decorate([
        core_1.ViewChild(scrolling_1.CdkScrollable),
        __metadata("design:type", scrolling_1.CdkScrollable)
    ], ScrollableViewport.prototype, "scrollable", void 0);
    __decorate([
        core_1.ViewChild('scrollContainer'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableViewport.prototype, "scrollContainer", void 0);
    __decorate([
        core_1.ViewChild('firstRowStart'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableViewport.prototype, "firstRowStart", void 0);
    __decorate([
        core_1.ViewChild('firstRowEnd'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableViewport.prototype, "firstRowEnd", void 0);
    __decorate([
        core_1.ViewChild('lastRowStart'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableViewport.prototype, "lastRowStart", void 0);
    __decorate([
        core_1.ViewChild('lastRowEnd'),
        __metadata("design:type", core_1.ElementRef)
    ], ScrollableViewport.prototype, "lastRowEnd", void 0);
    ScrollableViewport = __decorate([
        core_1.Component({
            template: "\n    <div #scrollContainer class=\"scroll-container\" cdkScrollable [dir]=\"dir\">\n      <div class=\"row\">\n        <div #firstRowStart class=\"cell\"></div>\n        <div #firstRowEnd class=\"cell\"></div>\n      </div>\n      <div class=\"row\">\n        <div #lastRowStart class=\"cell\"></div>\n        <div #lastRowEnd class=\"cell\"></div>\n      </div>\n    </div>",
            styles: ["\n    .scroll-container {\n      width: 100px;\n      height: 100px;\n      overflow: auto;\n    }\n\n    .row {\n      display: flex;\n      flex-direction: row;\n    }\n\n    .cell {\n      flex: none;\n      width: 100px;\n      height: 100px;\n    }\n  "]
        })
    ], ScrollableViewport);
    return ScrollableViewport;
}());
//# sourceMappingURL=scrollable.spec.js.map