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
var collections_1 = require("@angular/cdk/collections");
var scrolling_1 = require("@angular/cdk/scrolling");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var rxjs_1 = require("rxjs");
describe('CdkVirtualScrollViewport', function () {
    describe('with FixedSizeVirtualScrollStrategy', function () {
        var fixture;
        var testComponent;
        var viewport;
        beforeEach(testing_2.async(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [scrolling_1.ScrollingModule],
                declarations: [FixedSizeVirtualScroll],
            }).compileComponents();
        }));
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(FixedSizeVirtualScroll);
            testComponent = fixture.componentInstance;
            viewport = testComponent.viewport;
        });
        it('should render initial state', testing_2.fakeAsync(function () {
            finishInit(fixture);
            var contentWrapper = viewport.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-content-wrapper');
            expect(contentWrapper.children.length)
                .toBe(4, 'should render 4 50px items to fill 200px space');
        }));
        it('should get the data length', testing_2.fakeAsync(function () {
            finishInit(fixture);
            expect(viewport.getDataLength()).toBe(testComponent.items.length);
        }));
        it('should get the viewport size', testing_2.fakeAsync(function () {
            finishInit(fixture);
            expect(viewport.getViewportSize()).toBe(testComponent.viewportSize);
        }));
        it('should update viewport size', testing_2.fakeAsync(function () {
            testComponent.viewportSize = 300;
            fixture.detectChanges();
            testing_2.flush();
            viewport.checkViewportSize();
            expect(viewport.getViewportSize()).toBe(300);
            testComponent.viewportSize = 500;
            fixture.detectChanges();
            testing_2.flush();
            viewport.checkViewportSize();
            expect(viewport.getViewportSize()).toBe(500);
        }));
        it('should get the rendered range', testing_2.fakeAsync(function () {
            finishInit(fixture);
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 4 }, 'should render the first 4 50px items to fill 200px space');
        }));
        it('should get the rendered content offset', testing_2.fakeAsync(function () {
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize + 5);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getOffsetToRenderedContentStart()).toBe(testComponent.itemSize, 'should have 50px offset since first 50px item is not rendered');
        }));
        it('should get the scroll offset', testing_2.fakeAsync(function () {
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize + 5);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.measureScrollOffset()).toBe(testComponent.itemSize + 5);
        }));
        it('should get the rendered content size', testing_2.fakeAsync(function () {
            finishInit(fixture);
            expect(viewport.measureRenderedContentSize())
                .toBe(testComponent.viewportSize, 'should render 4 50px items with combined size of 200px to fill 200px space');
        }));
        it('should measure range size', testing_2.fakeAsync(function () {
            finishInit(fixture);
            expect(viewport.measureRangeSize({ start: 1, end: 3 }))
                .toBe(testComponent.itemSize * 2, 'combined size of 2 50px items should be 100px');
        }));
        it('should set total content size', testing_2.fakeAsync(function () {
            finishInit(fixture);
            viewport.setTotalContentSize(10000);
            testing_2.flush();
            fixture.detectChanges();
            expect(viewport.elementRef.nativeElement.scrollHeight).toBe(10000);
        }));
        it('should set total content size in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            viewport.setTotalContentSize(10000);
            testing_2.flush();
            fixture.detectChanges();
            expect(viewport.elementRef.nativeElement.scrollWidth).toBe(10000);
        }));
        it('should set a class based on the orientation', testing_2.fakeAsync(function () {
            finishInit(fixture);
            var viewportElement = fixture.nativeElement.querySelector('.cdk-virtual-scroll-viewport');
            expect(viewportElement.classList).toContain('cdk-virtual-scroll-orientation-vertical');
            testComponent.orientation = 'horizontal';
            fixture.detectChanges();
            expect(viewportElement.classList).toContain('cdk-virtual-scroll-orientation-horizontal');
        }));
        it('should set the vertical class if an invalid orientation is set', testing_2.fakeAsync(function () {
            testComponent.orientation = 'diagonal';
            finishInit(fixture);
            var viewportElement = fixture.nativeElement.querySelector('.cdk-virtual-scroll-viewport');
            expect(viewportElement.classList).toContain('cdk-virtual-scroll-orientation-vertical');
        }));
        it('should set rendered range', testing_2.fakeAsync(function () {
            finishInit(fixture);
            viewport.setRenderedRange({ start: 2, end: 3 });
            fixture.detectChanges();
            testing_2.flush();
            var items = fixture.elementRef.nativeElement.querySelectorAll('.item');
            expect(items.length).toBe(1, 'Expected 1 item to be rendered');
            expect(items[0].innerText.trim()).toBe('2 - 2', 'Expected item with index 2 to be rendered');
        }));
        it('should set content offset to top of content', testing_2.fakeAsync(function () {
            finishInit(fixture);
            viewport.setRenderedContentOffset(10, 'to-start');
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getOffsetToRenderedContentStart()).toBe(10);
        }));
        it('should set content offset to bottom of content', testing_2.fakeAsync(function () {
            finishInit(fixture);
            var contentSize = viewport.measureRenderedContentSize();
            expect(contentSize).toBeGreaterThan(0);
            viewport.setRenderedContentOffset(contentSize + 10, 'to-end');
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getOffsetToRenderedContentStart()).toBe(10);
        }));
        it('should scroll to offset', testing_2.fakeAsync(function () {
            finishInit(fixture);
            viewport.scrollToOffset(testComponent.itemSize * 2);
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.measureScrollOffset()).toBe(testComponent.itemSize * 2);
            expect(viewport.getRenderedRange()).toEqual({ start: 2, end: 6 });
        }));
        it('should scroll to index', testing_2.fakeAsync(function () {
            finishInit(fixture);
            viewport.scrollToIndex(2);
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.measureScrollOffset()).toBe(testComponent.itemSize * 2);
            expect(viewport.getRenderedRange()).toEqual({ start: 2, end: 6 });
        }));
        it('should scroll to offset in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            viewport.scrollToOffset(testComponent.itemSize * 2);
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.measureScrollOffset()).toBe(testComponent.itemSize * 2);
            expect(viewport.getRenderedRange()).toEqual({ start: 2, end: 6 });
        }));
        it('should scroll to index in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            viewport.scrollToIndex(2);
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.measureScrollOffset()).toBe(testComponent.itemSize * 2);
            expect(viewport.getRenderedRange()).toEqual({ start: 2, end: 6 });
        }));
        it('should output scrolled index', testing_2.fakeAsync(function () {
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize * 2 - 1);
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.scrolledToIndex).toBe(1);
            triggerScroll(viewport, testComponent.itemSize * 2);
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.scrolledToIndex).toBe(2);
        }));
        it('should update viewport as user scrolls down', testing_2.fakeAsync(function () {
            finishInit(fixture);
            var maxOffset = testComponent.itemSize * testComponent.items.length - testComponent.viewportSize;
            for (var offset = 1; offset <= maxOffset; offset += 10) {
                triggerScroll(viewport, offset);
                fixture.detectChanges();
                testing_2.flush();
                var expectedRange = {
                    start: Math.floor(offset / testComponent.itemSize),
                    end: Math.ceil((offset + testComponent.viewportSize) / testComponent.itemSize)
                };
                expect(viewport.getRenderedRange())
                    .toEqual(expectedRange, "rendered range should match expected value at scroll offset " + offset);
                expect(viewport.getOffsetToRenderedContentStart())
                    .toBe(expectedRange.start * testComponent.itemSize, "rendered content offset should match expected value at scroll offset " + offset);
                expect(viewport.measureRenderedContentSize())
                    .toBe((expectedRange.end - expectedRange.start) * testComponent.itemSize, "rendered content size should match expected value at offset " + offset);
            }
        }));
        it('should update viewport as user scrolls up', testing_2.fakeAsync(function () {
            finishInit(fixture);
            var maxOffset = testComponent.itemSize * testComponent.items.length - testComponent.viewportSize;
            for (var offset = maxOffset - 1; offset >= 0; offset -= 10) {
                triggerScroll(viewport, offset);
                fixture.detectChanges();
                testing_2.flush();
                var expectedRange = {
                    start: Math.floor(offset / testComponent.itemSize),
                    end: Math.ceil((offset + testComponent.viewportSize) / testComponent.itemSize)
                };
                expect(viewport.getRenderedRange())
                    .toEqual(expectedRange, "rendered range should match expected value at scroll offset " + offset);
                expect(viewport.getOffsetToRenderedContentStart())
                    .toBe(expectedRange.start * testComponent.itemSize, "rendered content offset should match expected value at scroll offset " + offset);
                expect(viewport.measureRenderedContentSize())
                    .toBe((expectedRange.end - expectedRange.start) * testComponent.itemSize, "rendered content size should match expected value at offset " + offset);
            }
        }));
        it('should render buffer element at the end when scrolled to the top', testing_2.fakeAsync(function () {
            testComponent.minBufferPx = testComponent.itemSize;
            testComponent.maxBufferPx = testComponent.itemSize;
            finishInit(fixture);
            expect(viewport.getRenderedRange()).toEqual({ start: 0, end: 5 }, 'should render the first 5 50px items to fill 200px space, plus one buffer element at' +
                ' the end');
        }));
        it('should render buffer element at the start and end when scrolled to the middle', testing_2.fakeAsync(function () {
            testComponent.minBufferPx = testComponent.itemSize;
            testComponent.maxBufferPx = testComponent.itemSize;
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize * 2);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange()).toEqual({ start: 1, end: 7 }, 'should render 6 50px items to fill 200px space, plus one buffer element at the' +
                ' start and end');
        }));
        it('should render buffer element at the start when scrolled to the bottom', testing_2.fakeAsync(function () {
            testComponent.minBufferPx = testComponent.itemSize;
            testComponent.maxBufferPx = testComponent.itemSize;
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize * 6);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange()).toEqual({ start: 5, end: 10 }, 'should render the last 5 50px items to fill 200px space, plus one buffer element at' +
                ' the start');
        }));
        it('should handle dynamic item size', testing_2.fakeAsync(function () {
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize * 2);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 2, end: 6 }, 'should render 4 50px items to fill 200px space');
            testComponent.itemSize *= 2;
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 1, end: 3 }, 'should render 2 100px items to fill 200px space');
        }));
        it('should handle dynamic buffer size', testing_2.fakeAsync(function () {
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize * 2);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 2, end: 6 }, 'should render 4 50px items to fill 200px space');
            testComponent.minBufferPx = testComponent.itemSize;
            testComponent.maxBufferPx = testComponent.itemSize;
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 1, end: 7 }, 'should expand to 1 buffer element on each side');
        }));
        it('should handle dynamic item array', testing_2.fakeAsync(function () {
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize * 6);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getOffsetToRenderedContentStart())
                .toBe(testComponent.itemSize * 6, 'should be scrolled to bottom of 10 item list');
            testComponent.items = Array(5).fill(0);
            fixture.detectChanges();
            testing_2.flush();
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getOffsetToRenderedContentStart())
                .toBe(testComponent.itemSize, 'should be scrolled to bottom of 5 item list');
        }));
        it('should update viewport as user scrolls right in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            var maxOffset = testComponent.itemSize * testComponent.items.length - testComponent.viewportSize;
            for (var offset = 1; offset <= maxOffset; offset += 10) {
                triggerScroll(viewport, offset);
                fixture.detectChanges();
                testing_2.flush();
                var expectedRange = {
                    start: Math.floor(offset / testComponent.itemSize),
                    end: Math.ceil((offset + testComponent.viewportSize) / testComponent.itemSize)
                };
                expect(viewport.getRenderedRange())
                    .toEqual(expectedRange, "rendered range should match expected value at scroll offset " + offset);
                expect(viewport.getOffsetToRenderedContentStart())
                    .toBe(expectedRange.start * testComponent.itemSize, "rendered content offset should match expected value at scroll offset " + offset);
                expect(viewport.measureRenderedContentSize())
                    .toBe((expectedRange.end - expectedRange.start) * testComponent.itemSize, "rendered content size should match expected value at offset " + offset);
            }
        }));
        it('should update viewport as user scrolls left in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            var maxOffset = testComponent.itemSize * testComponent.items.length - testComponent.viewportSize;
            for (var offset = maxOffset - 1; offset >= 0; offset -= 10) {
                triggerScroll(viewport, offset);
                fixture.detectChanges();
                testing_2.flush();
                var expectedRange = {
                    start: Math.floor(offset / testComponent.itemSize),
                    end: Math.ceil((offset + testComponent.viewportSize) / testComponent.itemSize)
                };
                expect(viewport.getRenderedRange())
                    .toEqual(expectedRange, "rendered range should match expected value at scroll offset " + offset);
                expect(viewport.getOffsetToRenderedContentStart())
                    .toBe(expectedRange.start * testComponent.itemSize, "rendered content offset should match expected value at scroll offset " + offset);
                expect(viewport.measureRenderedContentSize())
                    .toBe((expectedRange.end - expectedRange.start) * testComponent.itemSize, "rendered content size should match expected value at offset " + offset);
            }
        }));
        it('should work with an Observable', testing_2.fakeAsync(function () {
            var data = new rxjs_1.Subject();
            testComponent.items = data;
            finishInit(fixture);
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 0 }, 'no items should be rendered');
            data.next([1, 2, 3]);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 3 }, 'newly emitted items should be rendered');
        }));
        it('should work with a DataSource', testing_2.fakeAsync(function () {
            var data = new rxjs_1.Subject();
            testComponent.items = new collections_1.ArrayDataSource(data);
            finishInit(fixture);
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 0 }, 'no items should be rendered');
            data.next([1, 2, 3]);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 3 }, 'newly emitted items should be rendered');
        }));
        it('should trackBy value by default', testing_2.fakeAsync(function () {
            testComponent.items = [];
            spyOn(testComponent.virtualForViewContainer, 'detach').and.callThrough();
            finishInit(fixture);
            testComponent.items = [0];
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.virtualForViewContainer.detach).not.toHaveBeenCalled();
            testComponent.items = [1];
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.virtualForViewContainer.detach).toHaveBeenCalled();
        }));
        it('should trackBy index when specified', testing_2.fakeAsync(function () {
            testComponent.trackBy = function (i) { return i; };
            testComponent.items = [];
            spyOn(testComponent.virtualForViewContainer, 'detach').and.callThrough();
            finishInit(fixture);
            testComponent.items = [0];
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.virtualForViewContainer.detach).not.toHaveBeenCalled();
            testComponent.items = [1];
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.virtualForViewContainer.detach).not.toHaveBeenCalled();
        }));
        it('should recycle views when template cache is large enough to accommodate', testing_2.fakeAsync(function () {
            testComponent.trackBy = function (i) { return i; };
            var spy = spyOn(testComponent.virtualForViewContainer, 'createEmbeddedView').and.callThrough();
            finishInit(fixture);
            // Should create views for the initial rendered items.
            expect(testComponent.virtualForViewContainer.createEmbeddedView).toHaveBeenCalledTimes(4);
            spy.calls.reset();
            triggerScroll(viewport, 10);
            fixture.detectChanges();
            testing_2.flush();
            // As we first start to scroll we need to create one more item. This is because the first item
            // is still partially on screen and therefore can't be removed yet. At the same time a new
            // item is now partially on the screen at the bottom and so a new view is needed.
            expect(testComponent.virtualForViewContainer.createEmbeddedView).toHaveBeenCalledTimes(1);
            spy.calls.reset();
            var maxOffset = testComponent.itemSize * testComponent.items.length - testComponent.viewportSize;
            for (var offset = 10; offset <= maxOffset; offset += 10) {
                triggerScroll(viewport, offset);
                fixture.detectChanges();
                testing_2.flush();
            }
            // As we scroll through the rest of the items, no new views should be created, our existing 5
            // can just be recycled as appropriate.
            expect(testComponent.virtualForViewContainer.createEmbeddedView).not.toHaveBeenCalled();
        }));
        it('should not recycle views when template cache is full', testing_2.fakeAsync(function () {
            testComponent.trackBy = function (i) { return i; };
            testComponent.templateCacheSize = 0;
            var spy = spyOn(testComponent.virtualForViewContainer, 'createEmbeddedView').and.callThrough();
            finishInit(fixture);
            // Should create views for the initial rendered items.
            expect(testComponent.virtualForViewContainer.createEmbeddedView).toHaveBeenCalledTimes(4);
            spy.calls.reset();
            triggerScroll(viewport, 10);
            fixture.detectChanges();
            testing_2.flush();
            // As we first start to scroll we need to create one more item. This is because the first item
            // is still partially on screen and therefore can't be removed yet. At the same time a new
            // item is now partially on the screen at the bottom and so a new view is needed.
            expect(testComponent.virtualForViewContainer.createEmbeddedView).toHaveBeenCalledTimes(1);
            spy.calls.reset();
            var maxOffset = testComponent.itemSize * testComponent.items.length - testComponent.viewportSize;
            for (var offset = 10; offset <= maxOffset; offset += 10) {
                triggerScroll(viewport, offset);
                fixture.detectChanges();
                testing_2.flush();
            }
            // Since our template cache size is 0, as we scroll through the rest of the items, we need to
            // create a new view for each one.
            expect(testComponent.virtualForViewContainer.createEmbeddedView).toHaveBeenCalledTimes(5);
        }));
        it('should render up to maxBufferPx when buffer dips below minBufferPx', testing_2.fakeAsync(function () {
            testComponent.minBufferPx = testComponent.itemSize;
            testComponent.maxBufferPx = testComponent.itemSize * 2;
            finishInit(fixture);
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 6 }, 'should have 2 buffer items initially');
            triggerScroll(viewport, 50);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 6 }, 'should not render additional buffer yet');
            triggerScroll(viewport, 51);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.getRenderedRange())
                .toEqual({ start: 0, end: 8 }, 'should render 2 more buffer items');
        }));
        it('should throw if maxBufferPx is less than minBufferPx', testing_2.fakeAsync(function () {
            testComponent.minBufferPx = 100;
            testComponent.maxBufferPx = 99;
            expect(function () { return finishInit(fixture); }).toThrow();
        }));
        it('should register and degregister with ScrollDispatcher', testing_2.fakeAsync(testing_2.inject([scrolling_1.ScrollDispatcher], function (dispatcher) {
            spyOn(dispatcher, 'register').and.callThrough();
            spyOn(dispatcher, 'deregister').and.callThrough();
            finishInit(fixture);
            expect(dispatcher.register).toHaveBeenCalledWith(testComponent.viewport);
            fixture.destroy();
            expect(dispatcher.deregister).toHaveBeenCalledWith(testComponent.viewport);
        })));
        it('should emit on viewChange inside the Angular zone', testing_2.fakeAsync(function () {
            var zoneTest = jasmine.createSpy('zone test');
            testComponent.virtualForOf.viewChange.subscribe(function () { return zoneTest(core_1.NgZone.isInAngularZone()); });
            finishInit(fixture);
            expect(zoneTest).toHaveBeenCalledWith(true);
        }));
        it('should not throw when disposing of a view that will not fit in the cache', testing_2.fakeAsync(function () {
            finishInit(fixture);
            testComponent.items = new Array(200).fill(0);
            testComponent.templateCacheSize = 1; // Reduce the cache size to something we can easily hit.
            fixture.detectChanges();
            testing_2.flush();
            expect(function () {
                for (var i = 0; i < 50; i++) {
                    viewport.scrollToIndex(i);
                    triggerScroll(viewport);
                    fixture.detectChanges();
                    testing_2.flush();
                }
            }).not.toThrow();
        }));
    });
    describe('with RTL direction', function () {
        var fixture;
        var testComponent;
        var viewport;
        var viewportEl;
        var contentWrapperEl;
        beforeEach(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [scrolling_1.ScrollingModule],
                declarations: [FixedSizeVirtualScrollWithRtlDirection],
            }).compileComponents();
            fixture = testing_2.TestBed.createComponent(FixedSizeVirtualScrollWithRtlDirection);
            testComponent = fixture.componentInstance;
            viewport = testComponent.viewport;
            viewportEl = viewport.elementRef.nativeElement;
            contentWrapperEl =
                viewportEl.querySelector('.cdk-virtual-scroll-content-wrapper');
        });
        it('should initially be scrolled all the way right and showing the first item in horizontal' +
            ' mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            expect(viewport.measureScrollOffset('right')).toBe(0);
            expect(contentWrapperEl.style.transform).toMatch(/translateX\(0(px)?\)/);
            expect(contentWrapperEl.children[0].innerText.trim()).toBe('0 - 0');
        }));
        it('should scroll through items as user scrolls to the left in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            triggerScroll(viewport, testComponent.itemSize * testComponent.items.length);
            fixture.detectChanges();
            testing_2.flush();
            expect(contentWrapperEl.style.transform).toBe('translateX(-300px)');
            expect(contentWrapperEl.children[0].innerText.trim()).toBe('6 - 6');
        }));
        it('should interpret scrollToOffset amount as an offset from the right in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            viewport.scrollToOffset(100);
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(viewport.measureScrollOffset('right')).toBe(100);
        }));
        it('should scroll to the correct index in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            viewport.scrollToIndex(2);
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(contentWrapperEl.children[0].innerText.trim()).toBe('2 - 2');
        }));
        it('should emit the scrolled to index in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            expect(testComponent.scrolledToIndex).toBe(0);
            viewport.scrollToIndex(2);
            triggerScroll(viewport);
            fixture.detectChanges();
            testing_2.flush();
            expect(testComponent.scrolledToIndex).toBe(2);
        }));
        it('should set total content size', testing_2.fakeAsync(function () {
            finishInit(fixture);
            viewport.setTotalContentSize(10000);
            testing_2.flush();
            fixture.detectChanges();
            expect(viewport.elementRef.nativeElement.scrollHeight).toBe(10000);
        }));
        it('should set total content size in horizontal mode', testing_2.fakeAsync(function () {
            testComponent.orientation = 'horizontal';
            finishInit(fixture);
            viewport.setTotalContentSize(10000);
            testing_2.flush();
            fixture.detectChanges();
            expect(viewport.elementRef.nativeElement.scrollWidth).toBe(10000);
        }));
    });
    describe('with no VirtualScrollStrategy', function () {
        beforeEach(function () {
            testing_2.TestBed.configureTestingModule({
                imports: [scrolling_1.ScrollingModule],
                declarations: [VirtualScrollWithNoStrategy],
            }).compileComponents();
        });
        it('should fail on construction', testing_2.fakeAsync(function () {
            expect(function () { return testing_2.TestBed.createComponent(VirtualScrollWithNoStrategy); }).toThrowError('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
        }));
    });
});
/** Finish initializing the virtual scroll component at the beginning of a test. */
function finishInit(fixture) {
    // On the first cycle we render and measure the viewport.
    fixture.detectChanges();
    testing_2.flush();
    // On the second cycle we render the items.
    fixture.detectChanges();
    testing_2.flush();
    // Flush the initial fake scroll event.
    rxjs_1.animationFrameScheduler.flush();
    testing_2.flush();
    fixture.detectChanges();
}
/** Trigger a scroll event on the viewport (optionally setting a new scroll offset). */
function triggerScroll(viewport, offset) {
    if (offset !== undefined) {
        viewport.scrollToOffset(offset);
    }
    testing_1.dispatchFakeEvent(viewport.elementRef.nativeElement, 'scroll');
    rxjs_1.animationFrameScheduler.flush();
}
var FixedSizeVirtualScroll = /** @class */ (function () {
    function FixedSizeVirtualScroll() {
        this.orientation = 'vertical';
        this.viewportSize = 200;
        this.viewportCrossSize = 100;
        this.itemSize = 50;
        this.minBufferPx = 0;
        this.maxBufferPx = 0;
        this.items = Array(10).fill(0).map(function (_, i) { return i; });
        this.templateCacheSize = 20;
        this.scrolledToIndex = 0;
    }
    Object.defineProperty(FixedSizeVirtualScroll.prototype, "viewportWidth", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportSize : this.viewportCrossSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FixedSizeVirtualScroll.prototype, "viewportHeight", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportCrossSize : this.viewportSize;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(scrolling_1.CdkVirtualScrollViewport),
        __metadata("design:type", scrolling_1.CdkVirtualScrollViewport)
    ], FixedSizeVirtualScroll.prototype, "viewport", void 0);
    __decorate([
        core_1.ViewChild(scrolling_1.CdkVirtualForOf),
        __metadata("design:type", scrolling_1.CdkVirtualForOf)
    ], FixedSizeVirtualScroll.prototype, "virtualForOf", void 0);
    __decorate([
        core_1.ViewChild(scrolling_1.CdkVirtualForOf, { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], FixedSizeVirtualScroll.prototype, "virtualForViewContainer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "viewportSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "viewportCrossSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "itemSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "minBufferPx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "maxBufferPx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], FixedSizeVirtualScroll.prototype, "trackBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScroll.prototype, "templateCacheSize", void 0);
    FixedSizeVirtualScroll = __decorate([
        core_1.Component({
            template: "\n    <cdk-virtual-scroll-viewport\n        [itemSize]=\"itemSize\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\"\n        [orientation]=\"orientation\" [style.height.px]=\"viewportHeight\"\n        [style.width.px]=\"viewportWidth\" (scrolledIndexChange)=\"scrolledToIndex = $event\">\n      <div class=\"item\"\n           *cdkVirtualFor=\"let item of items; let i = index; trackBy: trackBy;                            templateCacheSize: templateCacheSize\"\n           [style.height.px]=\"itemSize\" [style.width.px]=\"itemSize\">\n        {{i}} - {{item}}\n      </div>\n    </cdk-virtual-scroll-viewport>\n  ",
            styles: ["\n    .cdk-virtual-scroll-content-wrapper {\n      display: flex;\n      flex-direction: column;\n    }\n\n    .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n      flex-direction: row;\n    }\n  "],
            encapsulation: core_1.ViewEncapsulation.None,
        })
    ], FixedSizeVirtualScroll);
    return FixedSizeVirtualScroll;
}());
var FixedSizeVirtualScrollWithRtlDirection = /** @class */ (function () {
    function FixedSizeVirtualScrollWithRtlDirection() {
        this.orientation = 'vertical';
        this.viewportSize = 200;
        this.viewportCrossSize = 100;
        this.itemSize = 50;
        this.minBufferPx = 0;
        this.maxBufferPx = 0;
        this.items = Array(10).fill(0).map(function (_, i) { return i; });
        this.templateCacheSize = 20;
        this.scrolledToIndex = 0;
    }
    Object.defineProperty(FixedSizeVirtualScrollWithRtlDirection.prototype, "viewportWidth", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportSize : this.viewportCrossSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FixedSizeVirtualScrollWithRtlDirection.prototype, "viewportHeight", {
        get: function () {
            return this.orientation == 'horizontal' ? this.viewportCrossSize : this.viewportSize;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(scrolling_1.CdkVirtualScrollViewport),
        __metadata("design:type", scrolling_1.CdkVirtualScrollViewport)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "viewport", void 0);
    __decorate([
        core_1.ViewChild(scrolling_1.CdkVirtualForOf, { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "virtualForViewContainer", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "viewportSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "viewportCrossSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "itemSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "minBufferPx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "maxBufferPx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "trackBy", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FixedSizeVirtualScrollWithRtlDirection.prototype, "templateCacheSize", void 0);
    FixedSizeVirtualScrollWithRtlDirection = __decorate([
        core_1.Component({
            template: "\n    <cdk-virtual-scroll-viewport dir=\"rtl\"\n        [itemSize]=\"itemSize\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\"\n        [orientation]=\"orientation\" [style.height.px]=\"viewportHeight\"\n        [style.width.px]=\"viewportWidth\" (scrolledIndexChange)=\"scrolledToIndex = $event\">\n      <div class=\"item\"\n           *cdkVirtualFor=\"let item of items; let i = index; trackBy: trackBy;                            templateCacheSize: templateCacheSize\"\n           [style.height.px]=\"itemSize\" [style.width.px]=\"itemSize\">\n        {{i}} - {{item}}\n      </div>\n    </cdk-virtual-scroll-viewport>\n  ",
            styles: ["\n    .cdk-virtual-scroll-content-wrapper {\n      display: flex;\n      flex-direction: column;\n    }\n\n    .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n      flex-direction: row;\n    }\n  "],
            encapsulation: core_1.ViewEncapsulation.None,
        })
    ], FixedSizeVirtualScrollWithRtlDirection);
    return FixedSizeVirtualScrollWithRtlDirection;
}());
var VirtualScrollWithNoStrategy = /** @class */ (function () {
    function VirtualScrollWithNoStrategy() {
        this.items = [];
    }
    VirtualScrollWithNoStrategy = __decorate([
        core_1.Component({
            template: "\n    <cdk-virtual-scroll-viewport>\n      <div *cdkVirtualFor=\"let item of items\">{{item}}</div>\n    </cdk-virtual-scroll-viewport>\n  "
        })
    ], VirtualScrollWithNoStrategy);
    return VirtualScrollWithNoStrategy;
}());
//# sourceMappingURL=virtual-scroll-viewport.spec.js.map