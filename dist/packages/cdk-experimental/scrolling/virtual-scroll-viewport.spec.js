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
var scrolling_module_1 = require("./scrolling-module");
describe('CdkVirtualScrollViewport', function () {
    describe('with AutoSizeVirtualScrollStrategy', function () {
        var fixture;
        var testComponent;
        var viewport;
        beforeEach(testing_1.async(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [scrolling_1.ScrollingModule, scrolling_module_1.ScrollingModule],
                declarations: [AutoSizeVirtualScroll],
            }).compileComponents();
        }));
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(AutoSizeVirtualScroll);
            testComponent = fixture.componentInstance;
            viewport = testComponent.viewport;
        });
        it('should render initial state for uniform items', testing_1.fakeAsync(function () {
            finishInit(fixture);
            var contentWrapper = viewport.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper');
            expect(contentWrapper.children.length)
                .toBe(4, 'should render 4 50px items to fill 200px space');
        }));
        it('should render extra content if first item is smaller than average', testing_1.fakeAsync(function () {
            testComponent.items = [50, 200, 200, 200, 200, 200];
            finishInit(fixture);
            var contentWrapper = viewport.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper');
            expect(contentWrapper.children.length).toBe(4, 'should render 4 items to fill 200px space based on 50px estimate from first item');
        }));
        it('should throw if maxBufferPx is less than minBufferPx', testing_1.fakeAsync(function () {
            testComponent.minBufferPx = 100;
            testComponent.maxBufferPx = 99;
            expect(function () { return finishInit(fixture); }).toThrow();
        }));
        // TODO(mmalerba): Add test that it corrects the initial render if it didn't render enough,
        // once it actually does that.
    });
});
/** Finish initializing the virtual scroll component at the beginning of a test. */
function finishInit(fixture) {
    // On the first cycle we render and measure the viewport.
    fixture.detectChanges();
    testing_1.flush();
    // On the second cycle we render the items.
    fixture.detectChanges();
    testing_1.flush();
}
var AutoSizeVirtualScroll = /** @class */ (function () {
    function AutoSizeVirtualScroll() {
        this.orientation = 'vertical';
        this.viewportSize = 200;
        this.viewportCrossSize = 100;
        this.minBufferPx = 0;
        this.maxBufferPx = 0;
        this.items = Array(10).fill(50);
    }
    Object.defineProperty(AutoSizeVirtualScroll.prototype, "viewportWidth", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportSize : this.viewportCrossSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoSizeVirtualScroll.prototype, "viewportHeight", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportCrossSize : this.viewportSize;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(scrolling_1.CdkVirtualScrollViewport),
        __metadata("design:type", scrolling_1.CdkVirtualScrollViewport)
    ], AutoSizeVirtualScroll.prototype, "viewport", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSizeVirtualScroll.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSizeVirtualScroll.prototype, "viewportSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSizeVirtualScroll.prototype, "viewportCrossSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSizeVirtualScroll.prototype, "minBufferPx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSizeVirtualScroll.prototype, "maxBufferPx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoSizeVirtualScroll.prototype, "items", void 0);
    AutoSizeVirtualScroll = __decorate([
        core_1.Component({
            template: "\n    <cdk-virtual-scroll-viewport\n        autosize [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\"\n        [orientation]=\"orientation\" [style.height.px]=\"viewportHeight\"\n        [style.width.px]=\"viewportWidth\">\n      <div class=\"item\" *cdkVirtualFor=\"let size of items; let i = index\" [style.height.px]=\"size\"\n           [style.width.px]=\"size\">\n        {{i}} - {{size}}\n      </div>\n    </cdk-virtual-scroll-viewport>\n  ",
            styles: ["\n    .cdk-virtual-scroll-content-wrapper {\n      display: flex;\n      flex-direction: column;\n    }\n\n    .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n      flex-direction: row;\n    }\n  "],
            encapsulation: core_1.ViewEncapsulation.None,
        })
    ], AutoSizeVirtualScroll);
    return AutoSizeVirtualScroll;
}());
//# sourceMappingURL=virtual-scroll-viewport.spec.js.map