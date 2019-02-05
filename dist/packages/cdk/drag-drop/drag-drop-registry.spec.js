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
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/cdk/testing");
var drag_drop_registry_1 = require("./drag-drop-registry");
var drag_drop_module_1 = require("./drag-drop-module");
var drag_1 = require("./directives/drag");
var drop_list_1 = require("./directives/drop-list");
describe('DragDropRegistry', function () {
    var fixture;
    var testComponent;
    var registry;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [drag_drop_module_1.DragDropModule],
            declarations: [SimpleDropZone],
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(SimpleDropZone);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
        testing_1.inject([drag_drop_registry_1.DragDropRegistry], function (c) {
            registry = c;
        })();
    }));
    afterEach(function () {
        registry.ngOnDestroy();
    });
    it('should be able to start dragging an item', function () {
        var firstItem = testComponent.dragItems.first;
        expect(registry.isDragging(firstItem)).toBe(false);
        registry.startDragging(firstItem, testing_2.createMouseEvent('mousedown'));
        expect(registry.isDragging(firstItem)).toBe(true);
    });
    it('should be able to stop dragging an item', function () {
        var firstItem = testComponent.dragItems.first;
        registry.startDragging(firstItem, testing_2.createMouseEvent('mousedown'));
        expect(registry.isDragging(firstItem)).toBe(true);
        registry.stopDragging(firstItem);
        expect(registry.isDragging(firstItem)).toBe(false);
    });
    it('should stop dragging an item if it is removed', function () {
        var firstItem = testComponent.dragItems.first;
        registry.startDragging(firstItem, testing_2.createMouseEvent('mousedown'));
        expect(registry.isDragging(firstItem)).toBe(true);
        registry.removeDragItem(firstItem);
        expect(registry.isDragging(firstItem)).toBe(false);
    });
    it('should dispatch `mousemove` events after starting to drag via the mouse', function () {
        var spy = jasmine.createSpy('pointerMove spy');
        var subscription = registry.pointerMove.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        testing_2.dispatchMouseEvent(document, 'mousemove');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch `touchmove` events after starting to drag via touch', function () {
        var spy = jasmine.createSpy('pointerMove spy');
        var subscription = registry.pointerMove.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createTouchEvent('touchstart'));
        testing_2.dispatchTouchEvent(document, 'touchmove');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch pointer move events if event propagation is stopped', function () {
        var spy = jasmine.createSpy('pointerMove spy');
        var subscription = registry.pointerMove.subscribe(spy);
        fixture.nativeElement.addEventListener('mousemove', function (e) { return e.stopPropagation(); });
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        testing_2.dispatchMouseEvent(fixture.nativeElement.querySelector('div'), 'mousemove');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch `mouseup` events after ending the drag via the mouse', function () {
        var spy = jasmine.createSpy('pointerUp spy');
        var subscription = registry.pointerUp.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        testing_2.dispatchMouseEvent(document, 'mouseup');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch `touchend` events after ending the drag via touch', function () {
        var spy = jasmine.createSpy('pointerUp spy');
        var subscription = registry.pointerUp.subscribe(spy);
        registry.startDragging(testComponent.dragItems.first, testing_2.createTouchEvent('touchstart'));
        testing_2.dispatchTouchEvent(document, 'touchend');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should dispatch pointer up events if event propagation is stopped', function () {
        var spy = jasmine.createSpy('pointerUp spy');
        var subscription = registry.pointerUp.subscribe(spy);
        fixture.nativeElement.addEventListener('mouseup', function (e) { return e.stopPropagation(); });
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        testing_2.dispatchMouseEvent(fixture.nativeElement.querySelector('div'), 'mouseup');
        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
    });
    it('should complete the pointer event streams on destroy', function () {
        var pointerUpSpy = jasmine.createSpy('pointerUp complete spy');
        var pointerMoveSpy = jasmine.createSpy('pointerMove complete spy');
        var pointerUpSubscription = registry.pointerUp.subscribe(undefined, undefined, pointerUpSpy);
        var pointerMoveSubscription = registry.pointerMove.subscribe(undefined, undefined, pointerMoveSpy);
        registry.ngOnDestroy();
        expect(pointerUpSpy).toHaveBeenCalled();
        expect(pointerMoveSpy).toHaveBeenCalled();
        pointerUpSubscription.unsubscribe();
        pointerMoveSubscription.unsubscribe();
    });
    it('should not throw when trying to register the same container again', function () {
        expect(function () { return registry.registerDropContainer(testComponent.dropInstances.first); }).not.toThrow();
    });
    it('should not prevent the default `touchmove` actions when nothing is being dragged', function () {
        expect(testing_2.dispatchTouchEvent(document, 'touchmove').defaultPrevented).toBe(false);
    });
    it('should prevent the default `touchmove` action when an item is being dragged', function () {
        registry.startDragging(testComponent.dragItems.first, testing_2.createTouchEvent('touchstart'));
        expect(testing_2.dispatchTouchEvent(document, 'touchmove').defaultPrevented).toBe(true);
    });
    it('should prevent the default `touchmove` if event propagation is stopped', function () {
        registry.startDragging(testComponent.dragItems.first, testing_2.createTouchEvent('touchstart'));
        fixture.nativeElement.addEventListener('touchmove', function (e) { return e.stopPropagation(); });
        var event = testing_2.dispatchTouchEvent(fixture.nativeElement.querySelector('div'), 'touchmove');
        expect(event.defaultPrevented).toBe(true);
    });
    it('should not prevent the default `wheel` actions when nothing is being dragged', function () {
        expect(testing_2.dispatchFakeEvent(document, 'wheel').defaultPrevented).toBe(false);
    });
    it('should prevent the default `wheel` action when an item is being dragged', function () {
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        expect(testing_2.dispatchFakeEvent(document, 'wheel').defaultPrevented).toBe(true);
    });
    it('should not prevent the default `selectstart` actions when nothing is being dragged', function () {
        expect(testing_2.dispatchFakeEvent(document, 'selectstart').defaultPrevented).toBe(false);
    });
    it('should prevent the default `selectstart` action when an item is being dragged', function () {
        registry.startDragging(testComponent.dragItems.first, testing_2.createMouseEvent('mousedown'));
        expect(testing_2.dispatchFakeEvent(document, 'selectstart').defaultPrevented).toBe(true);
    });
});
var SimpleDropZone = /** @class */ (function () {
    function SimpleDropZone() {
        this.items = ['Zero', 'One', 'Two', 'Three'];
        this.showDuplicateContainer = false;
    }
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], SimpleDropZone.prototype, "dragItems", void 0);
    __decorate([
        core_1.ViewChildren(drop_list_1.CdkDropList),
        __metadata("design:type", core_1.QueryList)
    ], SimpleDropZone.prototype, "dropInstances", void 0);
    SimpleDropZone = __decorate([
        core_1.Component({
            template: "\n    <div cdkDropList id=\"items\" [cdkDropListData]=\"items\">\n      <div *ngFor=\"let item of items\" cdkDrag>{{item}}</div>\n    </div>\n\n    <div cdkDropList id=\"items\" *ngIf=\"showDuplicateContainer\"></div>\n  "
        })
    ], SimpleDropZone);
    return SimpleDropZone;
}());
//# sourceMappingURL=drag-drop-registry.spec.js.map