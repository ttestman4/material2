"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var drag_drop_module_1 = require("../drag-drop-module");
var testing_2 = require("@angular/cdk/testing");
var bidi_1 = require("@angular/cdk/bidi");
var rxjs_1 = require("rxjs");
var drag_1 = require("./drag");
var drag_utils_1 = require("../drag-utils");
var drop_list_1 = require("./drop-list");
var drag_handle_1 = require("./drag-handle");
var drop_list_group_1 = require("./drop-list-group");
var drag_styling_1 = require("../drag-styling");
var ITEM_HEIGHT = 25;
var ITEM_WIDTH = 75;
describe('CdkDrag', function () {
    function createComponent(componentType, providers, dragDistance) {
        if (providers === void 0) { providers = []; }
        if (dragDistance === void 0) { dragDistance = 0; }
        testing_1.TestBed.configureTestingModule({
            imports: [drag_drop_module_1.DragDropModule],
            declarations: [componentType, PassthroughComponent],
            providers: [
                {
                    provide: drag_1.CDK_DRAG_CONFIG,
                    useValue: {
                        // We default the `dragDistance` to zero, because the majority of the tests
                        // don't care about it and drags are a lot easier to simulate when we don't
                        // have to deal with thresholds.
                        dragStartThreshold: dragDistance,
                        pointerDirectionChangeThreshold: 5
                    }
                }
            ].concat(providers),
        }).compileComponents();
        return testing_1.TestBed.createComponent(componentType);
    }
    describe('standalone draggable', function () {
        describe('mouse dragging', function () {
            it('should drag an element freely to a particular position', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            }));
            it('should drag an SVG element freely to a particular position', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggableSvg);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.getAttribute('transform')).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.getAttribute('transform')).toBe('translate(50 100)');
            }));
            it('should drag an element freely to a particular position when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var cleanup = makePageScrollable();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                cleanup();
            }));
            it('should continue dragging the element from where it was left off', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaMouse(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
            }));
            it('should continue dragging from where it was left off when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                var cleanup = makePageScrollable();
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaMouse(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
                cleanup();
            }));
            it('should not drag an element with the right mouse button', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                var event = testing_2.createMouseEvent('mousedown', 50, 100, 2);
                expect(dragElement.style.transform).toBeFalsy();
                testing_2.dispatchEvent(dragElement, event);
                fixture.detectChanges();
                testing_2.dispatchMouseEvent(document, 'mousemove', 50, 100);
                fixture.detectChanges();
                testing_2.dispatchMouseEvent(document, 'mouseup');
                fixture.detectChanges();
                expect(dragElement.style.transform).toBeFalsy();
            }));
            it('should not drag the element if it was not moved more than the minimum distance', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable, [], 5);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaMouse(fixture, dragElement, 2, 2);
                expect(dragElement.style.transform).toBeFalsy();
            }));
            it('should be able to stop dragging after a double click', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable, [], 5);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                testing_2.dispatchMouseEvent(dragElement, 'mousedown');
                fixture.detectChanges();
                testing_2.dispatchMouseEvent(document, 'mouseup');
                fixture.detectChanges();
                testing_2.dispatchMouseEvent(dragElement, 'mousedown');
                fixture.detectChanges();
                testing_2.dispatchMouseEvent(document, 'mouseup');
                fixture.detectChanges();
                dragElementViaMouse(fixture, dragElement, 50, 50);
                testing_2.dispatchMouseEvent(document, 'mousemove', 100, 100);
                fixture.detectChanges();
                expect(dragElement.style.transform).toBeFalsy();
            }));
            it('should preserve the previous `transform` value', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                dragElement.style.transform = 'translateX(-50%)';
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px) translateX(-50%)');
            }));
            it('should not generate multiple own `translate3d` values', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                dragElement.style.transform = 'translateY(-50%)';
                dragElementViaMouse(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px) translateY(-50%)');
                dragElementViaMouse(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px) translateY(-50%)');
            }));
            it('should prevent the `mousedown` action for native draggable elements', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                dragElement.draggable = true;
                var mousedownEvent = testing_2.createMouseEvent('mousedown', 50, 50);
                Object.defineProperty(mousedownEvent, 'target', { get: function () { return dragElement; } });
                spyOn(mousedownEvent, 'preventDefault').and.callThrough();
                testing_2.dispatchEvent(dragElement, mousedownEvent);
                fixture.detectChanges();
                testing_2.dispatchMouseEvent(document, 'mousemove', 50, 50);
                fixture.detectChanges();
                expect(mousedownEvent.preventDefault).toHaveBeenCalled();
            }));
        });
        describe('touch dragging', function () {
            it('should drag an element freely to a particular position', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            }));
            it('should drag an element freely to a particular position when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                var cleanup = makePageScrollable();
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                cleanup();
            }));
            it('should continue dragging the element from where it was left off', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaTouch(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
            }));
            it('should continue dragging from where it was left off when the page is scrolled', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                var cleanup = makePageScrollable();
                scrollTo(0, 500);
                expect(dragElement.style.transform).toBeFalsy();
                dragElementViaTouch(fixture, dragElement, 50, 100);
                expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
                dragElementViaTouch(fixture, dragElement, 100, 200);
                expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
                cleanup();
            }));
            it('should prevent the default `touchmove` action on the page while dragging', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                testing_2.dispatchTouchEvent(fixture.componentInstance.dragElement.nativeElement, 'touchstart');
                fixture.detectChanges();
                expect(testing_2.dispatchTouchEvent(document, 'touchmove').defaultPrevented).toBe(true);
                testing_2.dispatchTouchEvent(document, 'touchend');
                fixture.detectChanges();
            }));
            it('should not prevent `touchstart` action for native draggable elements', testing_1.fakeAsync(function () {
                var fixture = createComponent(StandaloneDraggable);
                fixture.detectChanges();
                var dragElement = fixture.componentInstance.dragElement.nativeElement;
                dragElement.draggable = true;
                var touchstartEvent = testing_2.createTouchEvent('touchstart', 50, 50);
                Object.defineProperty(touchstartEvent, 'target', { get: function () { return dragElement; } });
                spyOn(touchstartEvent, 'preventDefault').and.callThrough();
                testing_2.dispatchEvent(dragElement, touchstartEvent);
                fixture.detectChanges();
                testing_2.dispatchTouchEvent(document, 'touchmove');
                fixture.detectChanges();
                expect(touchstartEvent.preventDefault).not.toHaveBeenCalled();
            }));
        });
        it('should dispatch an event when the user has started dragging', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            startDraggingViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement);
            expect(fixture.componentInstance.startedSpy).toHaveBeenCalled();
            var event = fixture.componentInstance.startedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({ source: fixture.componentInstance.dragInstance });
        }));
        it('should dispatch an event when the user has stopped dragging', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 5, 10);
            expect(fixture.componentInstance.endedSpy).toHaveBeenCalled();
            var event = fixture.componentInstance.endedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({ source: fixture.componentInstance.dragInstance });
        }));
        it('should emit when the user is moving the drag element', function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var spy = jasmine.createSpy('move spy');
            var subscription = fixture.componentInstance.dragInstance.moved.subscribe(spy);
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 5, 10);
            expect(spy).toHaveBeenCalledTimes(1);
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 10, 20);
            expect(spy).toHaveBeenCalledTimes(2);
            subscription.unsubscribe();
        });
        it('should not emit events if it was not moved more than the minimum distance', function () {
            var fixture = createComponent(StandaloneDraggable, [], 5);
            fixture.detectChanges();
            var moveSpy = jasmine.createSpy('move spy');
            var subscription = fixture.componentInstance.dragInstance.moved.subscribe(moveSpy);
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 2, 2);
            expect(fixture.componentInstance.startedSpy).not.toHaveBeenCalled();
            expect(fixture.componentInstance.releasedSpy).not.toHaveBeenCalled();
            expect(fixture.componentInstance.endedSpy).not.toHaveBeenCalled();
            expect(moveSpy).not.toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should emit to `moved` inside the NgZone', function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var spy = jasmine.createSpy('move spy');
            var subscription = fixture.componentInstance.dragInstance.moved
                .subscribe(function () { return spy(core_1.NgZone.isInAngularZone()); });
            dragElementViaMouse(fixture, fixture.componentInstance.dragElement.nativeElement, 10, 20);
            expect(spy).toHaveBeenCalledWith(true);
            subscription.unsubscribe();
        });
        it('should complete the `moved` stream on destroy', function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var spy = jasmine.createSpy('move spy');
            var subscription = fixture.componentInstance.dragInstance.moved
                .subscribe(undefined, undefined, spy);
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should be able to lock dragging along the x axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            fixture.componentInstance.dragInstance.lockAxis = 'x';
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 0px, 0px)');
            dragElementViaMouse(fixture, dragElement, 100, 200);
            expect(dragElement.style.transform).toBe('translate3d(150px, 0px, 0px)');
        }));
        it('should be able to lock dragging along the y axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            fixture.componentInstance.dragInstance.lockAxis = 'y';
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(0px, 100px, 0px)');
            dragElementViaMouse(fixture, dragElement, 100, 200);
            expect(dragElement.style.transform).toBe('translate3d(0px, 300px, 0px)');
        }));
        it('should add a class while an element is being dragged', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var element = fixture.componentInstance.dragElement.nativeElement;
            expect(element.classList).not.toContain('cdk-drag-dragging');
            startDraggingViaMouse(fixture, element);
            expect(element.classList).toContain('cdk-drag-dragging');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(element.classList).not.toContain('cdk-drag-dragging');
        }));
        it('should not add a class if item was not dragged more than the threshold', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable, [], 5);
            fixture.detectChanges();
            var element = fixture.componentInstance.dragElement.nativeElement;
            expect(element.classList).not.toContain('cdk-drag-dragging');
            startDraggingViaMouse(fixture, element);
            expect(element.classList).not.toContain('cdk-drag-dragging');
        }));
        it('should be able to set an alternate drag root element', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableWithAlternateRoot);
            fixture.componentInstance.rootElementSelector = '.alternate-root';
            fixture.detectChanges();
            var dragRoot = fixture.componentInstance.dragRoot.nativeElement;
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragRoot.style.transform).toBeFalsy();
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragRoot, 50, 100);
            expect(dragRoot.style.transform).toBe('translate3d(50px, 100px, 0px)');
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should preserve the initial transform if the root element changes', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableWithAlternateRoot);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var alternateRoot = fixture.componentInstance.dragRoot.nativeElement;
            dragElement.style.transform = 'translateX(-50%)';
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toContain('translateX(-50%)');
            alternateRoot.style.transform = 'scale(2)';
            fixture.componentInstance.rootElementSelector = '.alternate-root';
            fixture.detectChanges();
            dragElementViaMouse(fixture, alternateRoot, 50, 100);
            expect(alternateRoot.style.transform).not.toContain('translateX(-50%)');
            expect(alternateRoot.style.transform).toContain('scale(2)');
        }));
        it('should handle the root element selector changing after init', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableWithAlternateRoot);
            fixture.detectChanges();
            testing_1.tick();
            fixture.componentInstance.rootElementSelector = '.alternate-root';
            fixture.detectChanges();
            var dragRoot = fixture.componentInstance.dragRoot.nativeElement;
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragRoot.style.transform).toBeFalsy();
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragRoot, 50, 100);
            expect(dragRoot.style.transform).toBe('translate3d(50px, 100px, 0px)');
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should not be able to drag the element if dragging is disabled', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            fixture.componentInstance.dragInstance.disabled = true;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should enable native drag interactions if dragging is disabled', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var styles = dragElement.style;
            expect(styles.touchAction || styles.webkitUserDrag).toBe('none');
            fixture.componentInstance.dragInstance.disabled = true;
            fixture.detectChanges();
            expect(styles.touchAction || styles.webkitUserDrag).toBeFalsy();
        }));
        it('should stop propagation for the drag sequence start event', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var event = testing_2.createMouseEvent('mousedown');
            spyOn(event, 'stopPropagation').and.callThrough();
            testing_2.dispatchEvent(dragElement, event);
            fixture.detectChanges();
            expect(event.stopPropagation).toHaveBeenCalled();
        }));
        it('should not throw if destroyed before the first change detection run', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            expect(function () {
                fixture.destroy();
            }).not.toThrow();
        }));
        it('should enable native drag interactions when there is a drag handle', function () {
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.touchAction).not.toBe('none');
        });
        it('should be able to reset a freely-dragged item to its initial position', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            fixture.componentInstance.dragInstance.reset();
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should preserve initial transform after resetting', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            dragElement.style.transform = 'scale(2)';
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px) scale(2)');
            fixture.componentInstance.dragInstance.reset();
            expect(dragElement.style.transform).toBe('scale(2)');
        }));
        it('should start dragging an item from its initial position after a reset', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            fixture.componentInstance.dragInstance.reset();
            dragElementViaMouse(fixture, dragElement, 25, 50);
            expect(dragElement.style.transform).toBe('translate3d(25px, 50px, 0px)');
        }));
        it('should not dispatch multiple events for a mouse event right after a touch event', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            // Dispatch a touch sequence.
            testing_2.dispatchTouchEvent(dragElement, 'touchstart');
            fixture.detectChanges();
            testing_2.dispatchTouchEvent(dragElement, 'touchend');
            fixture.detectChanges();
            testing_1.tick();
            // Immediately dispatch a mouse sequence to simulate a fake event.
            startDraggingViaMouse(fixture, dragElement);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(dragElement, 'mouseup');
            fixture.detectChanges();
            testing_1.tick();
            expect(fixture.componentInstance.startedSpy).toHaveBeenCalledTimes(1);
            expect(fixture.componentInstance.endedSpy).toHaveBeenCalledTimes(1);
        }));
        it('should round the transform value', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 13.37, 37);
            expect(dragElement.style.transform).toBe('translate3d(13px, 37px, 0px)');
        }));
        it('should allow for dragging to be constrained to an element', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggable);
            fixture.componentInstance.boundarySelector = '.wrapper';
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 300, 300);
            expect(dragElement.style.transform).toBe('translate3d(100px, 100px, 0px)');
        }));
        it('should throw if attached to an ng-container', testing_1.fakeAsync(function () {
            expect(function () {
                createComponent(DraggableOnNgContainer).detectChanges();
                testing_1.flush();
            }).toThrowError(/^cdkDrag must be attached to an element node/);
        }));
    });
    describe('draggable with a handle', function () {
        it('should not be able to drag the entire element if it has a handle', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should be able to drag an element using its handle', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handle, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
        }));
        it('should not be able to drag the element if the handle is disabled', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            fixture.componentInstance.handleInstance.disabled = true;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handle, 50, 100);
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should not be able to drag using the handle if the element is disabled', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            fixture.componentInstance.dragInstance.disabled = true;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handle, 50, 100);
            expect(dragElement.style.transform).toBeFalsy();
        }));
        it('should be able to use a handle that was added after init', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithDelayedHandle);
            fixture.detectChanges();
            fixture.componentInstance.showHandle = true;
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handle, 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
        }));
        it('should be able to use more than one handle to drag the element', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithMultipleHandles);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handles = fixture.componentInstance.handles.map(function (handle) { return handle.element.nativeElement; });
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, handles[1], 50, 100);
            expect(dragElement.style.transform).toBe('translate3d(50px, 100px, 0px)');
            dragElementViaMouse(fixture, handles[0], 100, 200);
            expect(dragElement.style.transform).toBe('translate3d(150px, 300px, 0px)');
        }));
        it('should be able to drag with a handle that is not a direct descendant', testing_1.fakeAsync(function () {
            var fixture = createComponent(StandaloneDraggableWithIndirectHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            expect(dragElement.style.transform).toBeFalsy();
            dragElementViaMouse(fixture, dragElement, 50, 100);
            expect(dragElement.style.transform)
                .toBeFalsy('Expected not to be able to drag the element by itself.');
            dragElementViaMouse(fixture, handle, 50, 100);
            expect(dragElement.style.transform)
                .toBe('translate3d(50px, 100px, 0px)', 'Expected to drag the element by its handle.');
        }));
        it('should disable the tap highlight while dragging via the handle', testing_1.fakeAsync(function () {
            // This test is irrelevant if the browser doesn't support styling the tap highlight color.
            if (!('webkitTapHighlightColor' in document.body.style)) {
                return;
            }
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            expect(dragElement.style.webkitTapHighlightColor).toBeFalsy();
            startDraggingViaMouse(fixture, handle);
            expect(dragElement.style.webkitTapHighlightColor).toBe('transparent');
            testing_2.dispatchMouseEvent(document, 'mousemove', 50, 100);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mouseup', 50, 100);
            fixture.detectChanges();
            expect(dragElement.style.webkitTapHighlightColor).toBeFalsy();
        }));
        it('should preserve any existing `webkitTapHighlightColor`', testing_1.fakeAsync(function () {
            // This test is irrelevant if the browser doesn't support styling the tap highlight color.
            if (!('webkitTapHighlightColor' in document.body.style)) {
                return;
            }
            var fixture = createComponent(StandaloneDraggableWithHandle);
            fixture.detectChanges();
            var dragElement = fixture.componentInstance.dragElement.nativeElement;
            var handle = fixture.componentInstance.handleElement.nativeElement;
            dragElement.style.webkitTapHighlightColor = 'purple';
            startDraggingViaMouse(fixture, handle);
            expect(dragElement.style.webkitTapHighlightColor).toBe('transparent');
            testing_2.dispatchMouseEvent(document, 'mousemove', 50, 100);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mouseup', 50, 100);
            fixture.detectChanges();
            expect(dragElement.style.webkitTapHighlightColor).toBe('purple');
        }));
    });
    describe('in a drop container', function () {
        it('should be able to attach data to the drop container', function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            expect(fixture.componentInstance.dropInstance.data).toBe(fixture.componentInstance.items);
        });
        it('should be able to attach data to a drag item', function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            expect(fixture.componentInstance.dragItems.first.data)
                .toBe(fixture.componentInstance.items[0]);
        });
        it('should be able to overwrite the drop zone id', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.componentInstance.dropZoneId = 'custom-id';
            fixture.detectChanges();
            var drop = fixture.componentInstance.dropInstance;
            expect(drop.id).toBe('custom-id');
            expect(drop.element.nativeElement.getAttribute('id')).toBe('custom-id');
        }));
        it('should toggle a class when the user starts dragging an item', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var dropZone = fixture.componentInstance.dropInstance;
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-list-dragging');
            startDraggingViaMouse(fixture, item);
            expect(dropZone.element.nativeElement.classList).toContain('cdk-drop-list-dragging');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-dragging');
        }));
        it('should toggle the drop dragging classes if there is nothing to trigger change detection', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithoutEvents);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var dropZone = fixture.componentInstance.dropInstance;
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-list-dragging');
            expect(item.classList).not.toContain('cdk-drag-dragging');
            startDraggingViaMouse(fixture, item);
            expect(dropZone.element.nativeElement.classList).toContain('cdk-drop-list-dragging');
            expect(item.classList).toContain('cdk-drag-dragging');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-dragging');
            expect(item.classList).not.toContain('cdk-drag-dragging');
        }));
        it('should toggle a class when the user starts dragging an item with OnPush change detection', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInOnPushDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var dropZone = fixture.componentInstance.dropInstance;
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-list-dragging');
            startDraggingViaMouse(fixture, item);
            expect(dropZone.element.nativeElement.classList).toContain('cdk-drop-list-dragging');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-dragging');
        }));
        it('should not toggle dragging class if the element was not dragged more than the threshold', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone, [], 5);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var dropZone = fixture.componentInstance.dropInstance;
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-dragging');
            startDraggingViaMouse(fixture, item);
            expect(dropZone.element.nativeElement.classList).not.toContain('cdk-drop-dragging');
        }));
        it('should dispatch the `dropped` event when an item has been dropped', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 2,
                item: firstItem,
                container: fixture.componentInstance.dropInstance,
                previousContainer: fixture.componentInstance.dropInstance,
                isPointerOverContainer: true
            });
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['One', 'Two', 'Zero', 'Three']);
        }));
        it('should expose whether an item was dropped over a container', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event.isPointerOverContainer).toBe(true);
        }));
        it('should expose whether an item was dropped outside of a container', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            var firstItem = dragItems.first;
            var containerRect = fixture.componentInstance.dropInstance.element
                .nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, containerRect.right + 10, containerRect.bottom + 10);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event.isPointerOverContainer).toBe(false);
        }));
        it('should dispatch the `sorted` event as an item is being sorted', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (item) { return item.element.nativeElement; });
            var draggedItem = items[0];
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            startDraggingViaMouse(fixture, draggedItem, left, top);
            // Drag over each item one-by-one going downwards.
            for (var i = 1; i < items.length; i++) {
                var elementRect = items[i].getBoundingClientRect();
                testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.left, elementRect.top + 5);
                fixture.detectChanges();
                expect(fixture.componentInstance.sortedSpy.calls.mostRecent().args[0]).toEqual({
                    previousIndex: i - 1,
                    currentIndex: i,
                    item: fixture.componentInstance.dragItems.first,
                    container: fixture.componentInstance.dropInstance
                });
            }
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should not move items in a vertical list if the pointer is too far away', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            // Move the cursor all the way to the right so it doesn't intersect along the x axis.
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.right + 1000, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 0,
                item: firstItem,
                container: fixture.componentInstance.dropInstance,
                previousContainer: fixture.componentInstance.dropInstance,
                isPointerOverContainer: false
            });
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
        }));
        it('should not move the original element from its initial DOM position', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var root = fixture.nativeElement;
            var dragElements = Array.from(root.querySelectorAll('.cdk-drag'));
            expect(dragElements.map(function (el) { return el.textContent; })).toEqual(['Zero', 'One', 'Two', 'Three']);
            // Stub out the original call so the list doesn't get re-rendered.
            // We're testing the DOM order explicitly.
            fixture.componentInstance.droppedSpy.and.callFake(function () { });
            var thirdItemRect = dragElements[2].getBoundingClientRect();
            dragElementViaMouse(fixture, fixture.componentInstance.dragItems.first.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            dragElements = Array.from(root.querySelectorAll('.cdk-drag'));
            expect(dragElements.map(function (el) { return el.textContent; })).toEqual(['Zero', 'One', 'Two', 'Three']);
        }));
        it('should dispatch the `dropped` event in a horizontal drop zone', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 2,
                item: firstItem,
                container: fixture.componentInstance.dropInstance,
                previousContainer: fixture.componentInstance.dropInstance,
                isPointerOverContainer: true
            });
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['One', 'Two', 'Zero', 'Three']);
        }));
        it('should dispatch the correct `dropped` event in RTL horizontal drop zone', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone, [{
                    provide: bidi_1.Directionality,
                    useValue: ({ value: 'rtl', change: rxjs_1.of() })
                }]);
            fixture.nativeElement.setAttribute('dir', 'rtl');
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.right - 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 2,
                item: firstItem,
                container: fixture.componentInstance.dropInstance,
                previousContainer: fixture.componentInstance.dropInstance,
                isPointerOverContainer: true
            });
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['One', 'Two', 'Zero', 'Three']);
        }));
        it('should not move items in a horizontal list if pointer is too far away', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            // Move the cursor all the way to the bottom so it doesn't intersect along the y axis.
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.left + 1, thirdItemRect.bottom + 1000);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            // Assert the event like this, rather than `toHaveBeenCalledWith`, because Jasmine will
            // go into an infinite loop trying to stringify the event, if the test fails.
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 0,
                item: firstItem,
                container: fixture.componentInstance.dropInstance,
                previousContainer: fixture.componentInstance.dropInstance,
                isPointerOverContainer: false
            });
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
        }));
        it('should create a preview element while the item is dragged', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var itemRect = item.getBoundingClientRect();
            var initialParent = item.parentNode;
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            var previewRect = preview.getBoundingClientRect();
            expect(item.parentNode).toBe(document.body, 'Expected element to be moved out into the body');
            expect(item.style.display).toBe('none', 'Expected element to be hidden');
            expect(preview).toBeTruthy('Expected preview to be in the DOM');
            expect(preview.textContent.trim())
                .toContain('One', 'Expected preview content to match element');
            expect(preview.getAttribute('dir'))
                .toBe('ltr', 'Expected preview element to inherit the directionality.');
            expect(previewRect.width).toBe(itemRect.width, 'Expected preview width to match element');
            expect(previewRect.height).toBe(itemRect.height, 'Expected preview height to match element');
            expect(preview.style.pointerEvents)
                .toBe('none', 'Expected pointer events to be disabled on the preview');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            expect(item.parentNode)
                .toBe(initialParent, 'Expected element to be moved back into its old parent');
            expect(item.style.display).toBeFalsy('Expected element to be visible');
            expect(preview.parentNode).toBeFalsy('Expected preview to be removed from the DOM');
        }));
        it('should be able to constrain the preview position', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.componentInstance.boundarySelector = '.cdk-drop-list';
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var listRect = fixture.componentInstance.dropInstance.element.nativeElement.getBoundingClientRect();
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            startDraggingViaMouse(fixture, item, listRect.right + 50, listRect.bottom + 50);
            testing_1.flush();
            testing_2.dispatchMouseEvent(document, 'mousemove', listRect.right + 50, listRect.bottom + 50);
            fixture.detectChanges();
            var previewRect = preview.getBoundingClientRect();
            expect(Math.floor(previewRect.bottom)).toBe(Math.floor(listRect.bottom));
            expect(Math.floor(previewRect.right)).toBe(Math.floor(listRect.right));
        }));
        it('should clear the id from the preview', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            item.id = 'custom-id';
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.getAttribute('id')).toBeFalsy();
        }));
        it('should not create a preview if the element was not dragged far enough', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone, [], 5);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            expect(document.querySelector('.cdk-drag-preview')).toBeFalsy();
        }));
        it('should pass the proper direction to the preview in rtl', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone, [{
                    provide: bidi_1.Directionality,
                    useValue: ({ value: 'rtl', change: rxjs_1.of() })
                }]);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            expect(document.querySelector('.cdk-drag-preview').getAttribute('dir'))
                .toBe('rtl', 'Expected preview element to inherit the directionality.');
        }));
        it('should remove the preview if its `transitionend` event timed out', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            // Add a duration since the tests won't include one.
            preview.style.transitionDuration = '500ms';
            // Move somewhere so the draggable doesn't exit immediately.
            testing_2.dispatchMouseEvent(document, 'mousemove', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.tick(250);
            expect(preview.parentNode)
                .toBeTruthy('Expected preview to be in the DOM mid-way through the transition');
            testing_1.tick(500);
            expect(preview.parentNode)
                .toBeFalsy('Expected preview to be removed from the DOM if the transition timed out');
        }));
        it('should emit the released event as soon as the item is released', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1];
            var endedSpy = jasmine.createSpy('ended spy');
            var releasedSpy = jasmine.createSpy('released spy');
            var endedSubscription = item.ended.subscribe(endedSpy);
            var releasedSubscription = item.released.subscribe(releasedSpy);
            startDraggingViaMouse(fixture, item.element.nativeElement);
            var preview = document.querySelector('.cdk-drag-preview');
            // Add a duration since the tests won't include one.
            preview.style.transitionDuration = '500ms';
            // Move somewhere so the draggable doesn't exit immediately.
            testing_2.dispatchMouseEvent(document, 'mousemove', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            // Expected the released event to fire immediately upon release.
            expect(releasedSpy).toHaveBeenCalled();
            testing_1.tick(1000);
            // Expected the ended event to fire once the entire sequence is done.
            expect(endedSpy).toHaveBeenCalled();
            endedSubscription.unsubscribe();
            releasedSubscription.unsubscribe();
        }));
        it('should reset immediately when failed drag happens after a successful one', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var itemInstance = fixture.componentInstance.dragItems.toArray()[1];
            var item = itemInstance.element.nativeElement;
            var spy = jasmine.createSpy('dropped spy');
            var subscription = itemInstance.dropped.asObservable().subscribe(spy);
            // Do an initial drag and drop sequence.
            dragElementViaMouse(fixture, item, 50, 50);
            testing_1.tick(0); // Important to tick with 0 since we don't want to flush any pending timeouts.
            expect(spy).toHaveBeenCalledTimes(1);
            // Start another drag.
            startDraggingViaMouse(fixture, item);
            // Add a duration since the tests won't include one.
            var preview = document.querySelector('.cdk-drag-preview');
            preview.style.transitionDuration = '500ms';
            // Dispatch the mouseup immediately to simulate the user not moving the element.
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.tick(0); // Important to tick with 0 since we don't want to flush any pending timeouts.
            expect(spy).toHaveBeenCalledTimes(2);
            subscription.unsubscribe();
        }));
        it('should not wait for transition that are not on the `transform` property', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            preview.style.transition = 'opacity 500ms ease';
            testing_2.dispatchMouseEvent(document, 'mousemove', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.tick(0);
            expect(preview.parentNode)
                .toBeFalsy('Expected preview to be removed from the DOM immediately');
        }));
        it('should pick out the `transform` duration if multiple properties are being transitioned', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            preview.style.transition = 'opacity 500ms ease, transform 1000ms ease';
            testing_2.dispatchMouseEvent(document, 'mousemove', 50, 50);
            fixture.detectChanges();
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.tick(500);
            expect(preview.parentNode)
                .toBeTruthy('Expected preview to be in the DOM at the end of the opacity transition');
            testing_1.tick(1000);
            expect(preview.parentNode).toBeFalsy('Expected preview to be removed from the DOM at the end of the transform transition');
        }));
        it('should create a placeholder element while the item is dragged', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var initialParent = item.parentNode;
            startDraggingViaMouse(fixture, item);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy('Expected placeholder to be in the DOM');
            expect(placeholder.parentNode)
                .toBe(initialParent, 'Expected placeholder to be inserted into the same parent');
            expect(placeholder.textContent.trim())
                .toContain('One', 'Expected placeholder content to match element');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            expect(placeholder.parentNode).toBeFalsy('Expected placeholder to be removed from the DOM');
        }));
        it('should remove the id from the placeholder', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            item.id = 'custom-id';
            startDraggingViaMouse(fixture, item);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(placeholder.getAttribute('id')).toBeFalsy();
        }));
        it('should not create placeholder if the element was not dragged far enough', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone, [], 5);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            expect(document.querySelector('.cdk-drag-placeholder')).toBeFalsy();
        }));
        it('should move the placeholder as an item is being sorted down', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            assertDownwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
        }));
        it('should move the placeholder as an item is being sorted down on a scrolled page', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var cleanup = makePageScrollable();
            scrollTo(0, 500);
            assertDownwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
            cleanup();
        }));
        it('should move the placeholder as an item is being sorted up', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            assertUpwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
        }));
        it('should move the placeholder as an item is being sorted up on a scrolled page', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var cleanup = makePageScrollable();
            scrollTo(0, 500);
            assertUpwardSorting(fixture, fixture.componentInstance.dragItems.map(function (item) {
                return item.element.nativeElement;
            }));
            cleanup();
        }));
        it('should move the placeholder as an item is being sorted to the right', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.toArray();
            var draggedItem = items[0].element.nativeElement;
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            startDraggingViaMouse(fixture, draggedItem, left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            // Drag over each item one-by-one going to the right.
            for (var i = 0; i < items.length; i++) {
                var elementRect = items[i].element.nativeElement.getBoundingClientRect();
                // Add a few pixels to the left offset so we get some overlap.
                testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.left + 5, elementRect.top);
                fixture.detectChanges();
                expect(getElementIndexByPosition(placeholder, 'left')).toBe(i);
            }
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should move the placeholder as an item is being sorted to the left', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.toArray();
            var draggedItem = items[items.length - 1].element.nativeElement;
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            startDraggingViaMouse(fixture, draggedItem, left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            // Drag over each item one-by-one going to the left.
            for (var i = items.length - 1; i > -1; i--) {
                var elementRect = items[i].element.nativeElement.getBoundingClientRect();
                // Remove a few pixels from the right offset so we get some overlap.
                testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.right - 5, elementRect.top);
                fixture.detectChanges();
                expect(getElementIndexByPosition(placeholder, 'left')).toBe(i);
            }
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out the elements correctly, if an element skips multiple positions when ' +
            'sorting vertically', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var draggedItem = items[0];
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            startDraggingViaMouse(fixture, draggedItem, left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var targetRect = items[items.length - 1].getBoundingClientRect();
            // Add a few pixels to the top offset so we get some overlap.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, targetRect.top + 5);
            fixture.detectChanges();
            expect(getElementSibligsByPosition(placeholder, 'top').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['One', 'Two', 'Three', 'Zero']);
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out the elements correctly, when swapping down with a taller element', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var _a = items[0].getBoundingClientRect(), top = _a.top, left = _a.left;
            fixture.componentInstance.items[0].height = ITEM_HEIGHT * 2;
            fixture.detectChanges();
            startDraggingViaMouse(fixture, items[0], left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var target = items[1];
            var targetRect = target.getBoundingClientRect();
            // Add a few pixels to the top offset so we get some overlap.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, targetRect.top + 5);
            fixture.detectChanges();
            expect(placeholder.style.transform).toBe("translate3d(0px, " + ITEM_HEIGHT + "px, 0px)");
            expect(target.style.transform).toBe("translate3d(0px, " + -ITEM_HEIGHT * 2 + "px, 0px)");
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out the elements correctly, when swapping up with a taller element', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var _a = items[1].getBoundingClientRect(), top = _a.top, left = _a.left;
            fixture.componentInstance.items[1].height = ITEM_HEIGHT * 2;
            fixture.detectChanges();
            startDraggingViaMouse(fixture, items[1], left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var target = items[0];
            var targetRect = target.getBoundingClientRect();
            // Add a few pixels to the top offset so we get some overlap.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, targetRect.bottom - 5);
            fixture.detectChanges();
            expect(placeholder.style.transform).toBe("translate3d(0px, " + -ITEM_HEIGHT + "px, 0px)");
            expect(target.style.transform).toBe("translate3d(0px, " + ITEM_HEIGHT * 2 + "px, 0px)");
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out elements correctly, when swapping an item with margin', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var _a = items[0].getBoundingClientRect(), top = _a.top, left = _a.left;
            fixture.componentInstance.items[0].margin = 12;
            fixture.detectChanges();
            startDraggingViaMouse(fixture, items[0], left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var target = items[1];
            var targetRect = target.getBoundingClientRect();
            // Add a few pixels to the top offset so we get some overlap.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, targetRect.top + 5);
            fixture.detectChanges();
            expect(placeholder.style.transform).toBe("translate3d(0px, " + (ITEM_HEIGHT + 12) + "px, 0px)");
            expect(target.style.transform).toBe("translate3d(0px, " + (-ITEM_HEIGHT - 12) + "px, 0px)");
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out the elements correctly, if an element skips multiple positions when ' +
            'sorting horizontally', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var draggedItem = items[0];
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            startDraggingViaMouse(fixture, draggedItem, left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var targetRect = items[items.length - 1].getBoundingClientRect();
            // Add a few pixels to the left offset so we get some overlap.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.right - 5, targetRect.top);
            fixture.detectChanges();
            expect(getElementSibligsByPosition(placeholder, 'left').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['One', 'Two', 'Three', 'Zero']);
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out the elements correctly, when swapping to the right with a wider element', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            fixture.componentInstance.items[0].width = ITEM_WIDTH * 2;
            fixture.detectChanges();
            var _a = items[0].getBoundingClientRect(), top = _a.top, left = _a.left;
            startDraggingViaMouse(fixture, items[0], left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var target = items[1];
            var targetRect = target.getBoundingClientRect();
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.right - 5, targetRect.top);
            fixture.detectChanges();
            expect(placeholder.style.transform).toBe("translate3d(" + ITEM_WIDTH + "px, 0px, 0px)");
            expect(target.style.transform).toBe("translate3d(" + -ITEM_WIDTH * 2 + "px, 0px, 0px)");
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out the elements correctly, when swapping left with a wider element', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var _a = items[1].getBoundingClientRect(), top = _a.top, left = _a.left;
            fixture.componentInstance.items[1].width = ITEM_WIDTH * 2;
            fixture.detectChanges();
            startDraggingViaMouse(fixture, items[1], left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var target = items[0];
            var targetRect = target.getBoundingClientRect();
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.right - 5, targetRect.top);
            fixture.detectChanges();
            expect(placeholder.style.transform).toBe("translate3d(" + -ITEM_WIDTH + "px, 0px, 0px)");
            expect(target.style.transform).toBe("translate3d(" + ITEM_WIDTH * 2 + "px, 0px, 0px)");
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should lay out elements correctly, when horizontally swapping an item with margin', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInHorizontalDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var _a = items[0].getBoundingClientRect(), top = _a.top, left = _a.left;
            fixture.componentInstance.items[0].margin = 12;
            fixture.detectChanges();
            startDraggingViaMouse(fixture, items[0], left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            var target = items[1];
            var targetRect = target.getBoundingClientRect();
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.right - 5, targetRect.top);
            fixture.detectChanges();
            expect(placeholder.style.transform).toBe("translate3d(" + (ITEM_WIDTH + 12) + "px, 0px, 0px)");
            expect(target.style.transform).toBe("translate3d(" + (-ITEM_WIDTH - 12) + "px, 0px, 0px)");
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should not swap position for tiny pointer movements', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var draggedItem = items[0];
            var target = items[1];
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            // Bump the height so the pointer doesn't leave after swapping.
            target.style.height = ITEM_HEIGHT * 3 + "px";
            startDraggingViaMouse(fixture, draggedItem, left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(getElementSibligsByPosition(placeholder, 'top').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var targetRect = target.getBoundingClientRect();
            var pointerTop = targetRect.top + 20;
            // Move over the target so there's a 20px overlap.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, pointerTop);
            fixture.detectChanges();
            expect(getElementSibligsByPosition(placeholder, 'top').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['One', 'Zero', 'Two', 'Three'], 'Expected position to swap.');
            // Move down a further 1px.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, pointerTop + 1);
            fixture.detectChanges();
            expect(getElementSibligsByPosition(placeholder, 'top').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['One', 'Zero', 'Two', 'Three'], 'Expected positions not to swap.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should swap position for pointer movements in the opposite direction', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.map(function (i) { return i.element.nativeElement; });
            var draggedItem = items[0];
            var target = items[1];
            var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
            // Bump the height so the pointer doesn't leave after swapping.
            target.style.height = ITEM_HEIGHT * 3 + "px";
            startDraggingViaMouse(fixture, draggedItem, left, top);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(getElementSibligsByPosition(placeholder, 'top').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var targetRect = target.getBoundingClientRect();
            var pointerTop = targetRect.top + 20;
            // Move over the target so there's a 20px overlap.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, pointerTop);
            fixture.detectChanges();
            expect(getElementSibligsByPosition(placeholder, 'top').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['One', 'Zero', 'Two', 'Three'], 'Expected position to swap.');
            // Move up 10px.
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left, pointerTop - 10);
            fixture.detectChanges();
            expect(getElementSibligsByPosition(placeholder, 'top').map(function (e) { return e.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three'], 'Expected positions to swap again.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
        }));
        it('should clean up the preview element if the item is destroyed mid-drag', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.parentNode).toBeTruthy('Expected preview to be in the DOM');
            expect(item.parentNode).toBeTruthy('Expected drag item to be in the DOM');
            fixture.destroy();
            expect(preview.parentNode).toBeFalsy('Expected preview to be removed from the DOM');
            expect(item.parentNode).toBeFalsy('Expected drag item to be removed from the DOM');
        }));
        it('should be able to customize the preview element', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview).toBeTruthy();
            expect(preview.classList).toContain('custom-preview');
            expect(preview.textContent.trim()).toContain('Custom preview');
        }));
        it('should handle the custom preview being removed', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            testing_1.flush();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            fixture.componentInstance.renderCustomPreview = false;
            fixture.detectChanges();
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview).toBeTruthy();
            expect(preview.classList).not.toContain('custom-preview');
            expect(preview.textContent.trim()).not.toContain('Custom preview');
        }));
        it('should be able to constrain the position of a custom preview', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.componentInstance.boundarySelector = '.cdk-drop-list';
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            var listRect = fixture.componentInstance.dropInstance.element.nativeElement.getBoundingClientRect();
            startDraggingViaMouse(fixture, item);
            var preview = document.querySelector('.cdk-drag-preview');
            startDraggingViaMouse(fixture, item, listRect.right + 50, listRect.bottom + 50);
            testing_1.flush();
            testing_2.dispatchMouseEvent(document, 'mousemove', listRect.right + 50, listRect.bottom + 50);
            fixture.detectChanges();
            var previewRect = preview.getBoundingClientRect();
            expect(Math.floor(previewRect.bottom)).toBe(Math.floor(listRect.bottom));
            expect(Math.floor(previewRect.right)).toBe(Math.floor(listRect.right));
        }));
        it('should revert the element back to its parent after dragging with a custom ' +
            'preview has stopped', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var dragContainer = fixture.componentInstance.dropInstance.element.nativeElement;
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            expect(dragContainer.contains(item)).toBe(true, 'Expected item to be in container.');
            // The coordinates don't matter.
            dragElementViaMouse(fixture, item, 10, 10);
            testing_1.flush();
            fixture.detectChanges();
            expect(dragContainer.contains(item))
                .toBe(true, 'Expected item to be returned to container.');
        }));
        it('should position custom previews next to the pointer', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item, 50, 50);
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(50px, 50px, 0px)');
        }));
        it('should lock position inside a drop container along the x axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1];
            var element = item.element.nativeElement;
            item.lockAxis = 'x';
            startDraggingViaMouse(fixture, element, 50, 50);
            testing_2.dispatchMouseEvent(element, 'mousemove', 100, 100);
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(100px, 50px, 0px)');
        }));
        it('should lock position inside a drop container along the y axis', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1];
            var element = item.element.nativeElement;
            item.lockAxis = 'y';
            startDraggingViaMouse(fixture, element, 50, 50);
            testing_2.dispatchMouseEvent(element, 'mousemove', 100, 100);
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(50px, 100px, 0px)');
        }));
        it('should inherit the position locking from the drop container', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPreview);
            fixture.detectChanges();
            var element = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            fixture.componentInstance.dropInstance.lockAxis = 'x';
            startDraggingViaMouse(fixture, element, 50, 50);
            testing_2.dispatchMouseEvent(element, 'mousemove', 100, 100);
            fixture.detectChanges();
            var preview = document.querySelector('.cdk-drag-preview');
            expect(preview.style.transform).toBe('translate3d(100px, 50px, 0px)');
        }));
        it('should be able to customize the placeholder', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPlaceholder);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            startDraggingViaMouse(fixture, item);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(placeholder.classList).toContain('custom-placeholder');
            expect(placeholder.textContent.trim()).toContain('Custom placeholder');
        }));
        it('should handle the custom placeholder being removed', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZoneWithCustomPlaceholder);
            fixture.detectChanges();
            testing_1.flush();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            fixture.componentInstance.renderPlaceholder = false;
            fixture.detectChanges();
            startDraggingViaMouse(fixture, item);
            var placeholder = document.querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(placeholder.classList).not.toContain('custom-placeholder');
            expect(placeholder.textContent.trim()).not.toContain('Custom placeholder');
        }));
        it('should clear the `transform` value from siblings when item is dropped`', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            var firstItem = dragItems.first;
            var thirdItem = dragItems.toArray()[2].element.nativeElement;
            var thirdItemRect = thirdItem.getBoundingClientRect();
            startDraggingViaMouse(fixture, firstItem.element.nativeElement);
            testing_2.dispatchMouseEvent(document, 'mousemove', thirdItemRect.left + 1, thirdItemRect.top + 1);
            fixture.detectChanges();
            expect(thirdItem.style.transform).toBeTruthy();
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            expect(thirdItem.style.transform).toBeFalsy();
        }));
        it('should not move the item if the list is disabled', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.dragItems;
            fixture.componentInstance.dropInstance.disabled = true;
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems.first;
            var thirdItemRect = dragItems.toArray()[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.right + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
        }));
        it('should not throw if the `touches` array is empty', testing_1.fakeAsync(function () {
            var fixture = createComponent(DraggableInDropZone);
            fixture.detectChanges();
            var item = fixture.componentInstance.dragItems.toArray()[1].element.nativeElement;
            testing_2.dispatchTouchEvent(item, 'touchstart');
            fixture.detectChanges();
            testing_2.dispatchTouchEvent(document, 'touchmove');
            fixture.detectChanges();
            testing_2.dispatchTouchEvent(document, 'touchmove', 50, 50);
            fixture.detectChanges();
            expect(function () {
                var endEvent = testing_2.createTouchEvent('touchend', 50, 50);
                Object.defineProperty(endEvent, 'touches', { get: function () { return []; } });
                testing_2.dispatchEvent(document, endEvent);
                fixture.detectChanges();
            }).not.toThrow();
        }));
        it('should not move the item if the group is disabled', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZonesViaGroupDirective);
            fixture.detectChanges();
            var dragItems = fixture.componentInstance.groupedDragItems[0];
            fixture.componentInstance.groupDisabled = true;
            fixture.detectChanges();
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
            var firstItem = dragItems[0];
            var thirdItemRect = dragItems[2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, firstItem.element.nativeElement, thirdItemRect.right + 1, thirdItemRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
            expect(dragItems.map(function (drag) { return drag.element.nativeElement.textContent.trim(); }))
                .toEqual(['Zero', 'One', 'Two', 'Three']);
        }));
    });
    describe('in a connected drop container', function () {
        it('should dispatch the `dropped` event when an item has been dropped into a new container', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var item = groups[0][1];
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, item.element.nativeElement, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: item,
                container: fixture.componentInstance.dropInstances.toArray()[1],
                previousContainer: fixture.componentInstance.dropInstances.first,
                isPointerOverContainer: true
            });
        }));
        it('should be able to move the element over a new container and return it', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropZones = fixture.componentInstance.dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][1];
            var initialRect = item.element.nativeElement.getBoundingClientRect();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            startDraggingViaMouse(fixture, item.element.nativeElement);
            var placeholder = dropZones[0].querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside the first container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left + 1, targetRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[1].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside second container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', initialRect.left + 1, initialRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be back inside first container.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
        }));
        it('should be able to move the element over a new container and return it to the initial ' +
            'one, even if it no longer matches the enterPredicate', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropZones = fixture.componentInstance.dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][1];
            var initialRect = item.element.nativeElement.getBoundingClientRect();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            fixture.componentInstance.dropInstances.first.enterPredicate = function () { return false; };
            fixture.detectChanges();
            startDraggingViaMouse(fixture, item.element.nativeElement);
            var placeholder = dropZones[0].querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside the first container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left + 1, targetRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[1].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside second container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', initialRect.left + 1, initialRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be back inside first container.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
        }));
        it('should transfer the DOM element from one drop zone to another', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var element = groups[0][1].element.nativeElement;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: groups[0][1],
                container: dropInstances[1],
                previousContainer: dropInstances[0],
                isPointerOverContainer: true
            });
        }));
        it('should not be able to transfer an item into a container that is not in `connectedTo`', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            fixture.componentInstance.dropInstances.forEach(function (d) { return d.connectedTo = []; });
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var element = groups[0][1].element.nativeElement;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 1,
                item: groups[0][1],
                container: dropInstances[0],
                previousContainer: dropInstances[0],
                isPointerOverContainer: false
            });
        }));
        it('should not be able to transfer an item that does not match the `enterPredicate`', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            fixture.componentInstance.dropInstances.forEach(function (d) { return d.enterPredicate = function () { return false; }; });
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var element = groups[0][1].element.nativeElement;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 1,
                item: groups[0][1],
                container: dropInstances[0],
                previousContainer: dropInstances[0],
                isPointerOverContainer: false
            });
        }));
        it('should call the `enterPredicate` with the item and the container it is entering', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var spy = jasmine.createSpy('enterPredicate spy').and.returnValue(true);
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var dragItem = groups[0][1];
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dropInstances[1].enterPredicate = spy;
            fixture.detectChanges();
            dragElementViaMouse(fixture, dragItem.element.nativeElement, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledWith(dragItem, dropInstances[1]);
        }));
        it('should be able to start dragging after an item has been transferred', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var element = groups[0][1].element.nativeElement;
            var dropZone = fixture.componentInstance.dropInstances.toArray()[1].element.nativeElement;
            var targetRect = dropZone.getBoundingClientRect();
            // Drag the element into the drop zone and move it to the top.
            [1, -1].forEach(function (offset) {
                dragElementViaMouse(fixture, element, targetRect.left + offset, targetRect.top + offset);
                testing_1.flush();
                fixture.detectChanges();
            });
            assertDownwardSorting(fixture, Array.from(dropZone.querySelectorAll('.cdk-drag')));
        }));
        it('should be able to return the last item inside its initial container', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            // Make sure there's only one item in the first list.
            fixture.componentInstance.todo = ['things'];
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropZones = fixture.componentInstance.dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][0];
            var initialRect = item.element.nativeElement.getBoundingClientRect();
            var targetRect = groups[1][0].element.nativeElement.getBoundingClientRect();
            startDraggingViaMouse(fixture, item.element.nativeElement);
            var placeholder = dropZones[0].querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside the first container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left + 1, targetRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[1].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside second container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', initialRect.left + 1, initialRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be back inside first container.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
        }));
        it('should assign a default id on each drop zone', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            expect(fixture.componentInstance.dropInstances.toArray().every(function (dropZone) {
                return !!dropZone.id && !!dropZone.element.nativeElement.getAttribute('id');
            })).toBe(true);
        }));
        it('should be able to connect two drop zones by id', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            dropInstances[0].id = 'todo';
            dropInstances[1].id = 'done';
            dropInstances[0].connectedTo = ['done'];
            dropInstances[1].connectedTo = ['todo'];
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var element = groups[0][1].element.nativeElement;
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: groups[0][1],
                container: dropInstances[1],
                previousContainer: dropInstances[0],
                isPointerOverContainer: true
            });
        }));
        it('should be able to connect two drop zones using the drop list group', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZonesViaGroupDirective);
            fixture.detectChanges();
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var groups = fixture.componentInstance.groupedDragItems;
            var element = groups[0][1].element.nativeElement;
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: groups[0][1],
                container: dropInstances[1],
                previousContainer: dropInstances[0],
                isPointerOverContainer: true
            });
        }));
        it('should be able to pass a single id to `connectedTo`', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            dropInstances[1].id = 'done';
            dropInstances[0].connectedTo = ['done'];
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var element = groups[0][1].element.nativeElement;
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 3,
                item: groups[0][1],
                container: dropInstances[1],
                previousContainer: dropInstances[0],
                isPointerOverContainer: true
            });
        }));
        it('should return DOM element to its initial container after it is dropped, in a container ' +
            'with one draggable item', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZonesWithSingleItems);
            fixture.detectChanges();
            var items = fixture.componentInstance.dragItems.toArray();
            var item = items[0];
            var targetRect = items[1].element.nativeElement.getBoundingClientRect();
            var dropContainers = fixture.componentInstance.dropInstances
                .map(function (drop) { return drop.element.nativeElement; });
            expect(dropContainers[0].contains(item.element.nativeElement)).toBe(true, 'Expected DOM element to be in first container');
            expect(item.dropContainer).toBe(fixture.componentInstance.dropInstances.first, 'Expected CdkDrag to be in first container in memory');
            dragElementViaMouse(fixture, item.element.nativeElement, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).toHaveBeenCalledTimes(1);
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toEqual({
                previousIndex: 0,
                currentIndex: 0,
                item: item,
                container: fixture.componentInstance.dropInstances.toArray()[1],
                previousContainer: fixture.componentInstance.dropInstances.first,
                isPointerOverContainer: true
            });
            expect(dropContainers[0].contains(item.element.nativeElement)).toBe(true, 'Expected DOM element to be returned to first container');
            expect(item.dropContainer).toBe(fixture.componentInstance.dropInstances.first, 'Expected CdkDrag to be returned to first container in memory');
        }));
        it('should be able to return an element to its initial container in the same sequence, ' +
            'even if it is not connected to the current container', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var dropZones = dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][1];
            var initialRect = item.element.nativeElement.getBoundingClientRect();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            // Change the `connectedTo` so the containers are only connected one-way.
            dropInstances[0].connectedTo = dropInstances[1];
            dropInstances[1].connectedTo = [];
            startDraggingViaMouse(fixture, item.element.nativeElement);
            fixture.detectChanges();
            var placeholder = dropZones[0].querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside the first container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left + 1, targetRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[1].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside second container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', initialRect.left + 1, initialRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be back inside first container.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            expect(fixture.componentInstance.droppedSpy).not.toHaveBeenCalled();
        }));
        it('should not add child drop lists to the same group as their parents', testing_1.fakeAsync(function () {
            var fixture = createComponent(NestedDropListGroups);
            var component = fixture.componentInstance;
            fixture.detectChanges();
            expect(Array.from(component.group._items)).toEqual([component.listOne, component.listTwo]);
        }));
        it('should not be able to drop an element into a container that is under another element', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems.slice();
            var element = groups[0][1].element.nativeElement;
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            var coverElement = document.createElement('div');
            var targetGroupRect = dropInstances[1].element.nativeElement.getBoundingClientRect();
            // Add an extra element that covers the target container.
            fixture.nativeElement.appendChild(coverElement);
            drag_styling_1.extendStyles(coverElement.style, {
                position: 'fixed',
                top: targetGroupRect.top + 'px',
                left: targetGroupRect.left + 'px',
                bottom: targetGroupRect.bottom + 'px',
                right: targetGroupRect.right + 'px',
                background: 'orange'
            });
            dragElementViaMouse(fixture, element, targetRect.left + 1, targetRect.top + 1);
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual({
                previousIndex: 1,
                currentIndex: 1,
                item: groups[0][1],
                container: dropInstances[0],
                previousContainer: dropInstances[0],
                isPointerOverContainer: false
            });
        }));
        it('should set a class when a container can receive an item', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var dropZones = fixture.componentInstance.dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = fixture.componentInstance.groupedDragItems[0][1];
            expect(dropZones.every(function (c) { return !c.classList.contains('cdk-drop-list-receiving'); }))
                .toBe(true, 'Expected neither of the containers to have the class.');
            startDraggingViaMouse(fixture, item.element.nativeElement);
            fixture.detectChanges();
            expect(dropZones[0].classList).not.toContain('cdk-drop-list-receiving', 'Expected source container not to have the receiving class.');
            expect(dropZones[1].classList).toContain('cdk-drop-list-receiving', 'Expected target container to have the receiving class.');
        }));
        it('should toggle the `receiving` class when the item enters a new list', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropZones = fixture.componentInstance.dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][1];
            var targetRect = groups[1][2].element.nativeElement.getBoundingClientRect();
            expect(dropZones.every(function (c) { return !c.classList.contains('cdk-drop-list-receiving'); }))
                .toBe(true, 'Expected neither of the containers to have the class.');
            startDraggingViaMouse(fixture, item.element.nativeElement);
            expect(dropZones[0].classList).not.toContain('cdk-drop-list-receiving', 'Expected source container not to have the receiving class.');
            expect(dropZones[1].classList).toContain('cdk-drop-list-receiving', 'Expected target container to have the receiving class.');
            testing_2.dispatchMouseEvent(document, 'mousemove', targetRect.left + 1, targetRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[0].classList).toContain('cdk-drop-list-receiving', 'Expected old container not to have the receiving class after exiting.');
            expect(dropZones[1].classList).not.toContain('cdk-drop-list-receiving', 'Expected new container not to have the receiving class after entering.');
        }));
        it('should be able to move the item over an intermediate container before ' +
            'dropping it into the final one', testing_1.fakeAsync(function () {
            var fixture = createComponent(ConnectedDropZones);
            fixture.detectChanges();
            var dropInstances = fixture.componentInstance.dropInstances.toArray();
            dropInstances[0].connectedTo = [dropInstances[1], dropInstances[2]];
            dropInstances[1].connectedTo = [];
            dropInstances[2].connectedTo = [];
            fixture.detectChanges();
            var groups = fixture.componentInstance.groupedDragItems;
            var dropZones = dropInstances.map(function (d) { return d.element.nativeElement; });
            var item = groups[0][1];
            var intermediateRect = dropZones[1].getBoundingClientRect();
            var finalRect = dropZones[2].getBoundingClientRect();
            startDraggingViaMouse(fixture, item.element.nativeElement);
            var placeholder = dropZones[0].querySelector('.cdk-drag-placeholder');
            expect(placeholder).toBeTruthy();
            expect(dropZones[0].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside the first container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', intermediateRect.left + 1, intermediateRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[1].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside second container.');
            testing_2.dispatchMouseEvent(document, 'mousemove', finalRect.left + 1, finalRect.top + 1);
            fixture.detectChanges();
            expect(dropZones[2].contains(placeholder))
                .toBe(true, 'Expected placeholder to be inside third container.');
            testing_2.dispatchMouseEvent(document, 'mouseup');
            fixture.detectChanges();
            testing_1.flush();
            fixture.detectChanges();
            var event = fixture.componentInstance.droppedSpy.calls.mostRecent().args[0];
            expect(event).toBeTruthy();
            expect(event).toEqual(jasmine.objectContaining({
                previousIndex: 1,
                currentIndex: 0,
                item: groups[0][1],
                container: dropInstances[2],
                previousContainer: dropInstances[0],
                isPointerOverContainer: false
            }));
        }));
    });
});
var StandaloneDraggable = /** @class */ (function () {
    function StandaloneDraggable() {
        this.startedSpy = jasmine.createSpy('started spy');
        this.endedSpy = jasmine.createSpy('ended spy');
        this.releasedSpy = jasmine.createSpy('released spy');
    }
    __decorate([
        core_1.ViewChild('dragElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggable.prototype, "dragElement", void 0);
    __decorate([
        core_1.ViewChild(drag_1.CdkDrag),
        __metadata("design:type", drag_1.CdkDrag)
    ], StandaloneDraggable.prototype, "dragInstance", void 0);
    StandaloneDraggable = __decorate([
        core_1.Component({
            template: "\n    <div class=\"wrapper\" style=\"width: 200px; height: 200px; background: green;\">\n      <div\n        cdkDrag\n        [cdkDragBoundary]=\"boundarySelector\"\n        (cdkDragStarted)=\"startedSpy($event)\"\n        (cdkDragReleased)=\"releasedSpy($event)\"\n        (cdkDragEnded)=\"endedSpy($event)\"\n        #dragElement\n        style=\"width: 100px; height: 100px; background: red;\"></div>\n    </div>\n  "
        })
    ], StandaloneDraggable);
    return StandaloneDraggable;
}());
var StandaloneDraggableSvg = /** @class */ (function () {
    function StandaloneDraggableSvg() {
    }
    __decorate([
        core_1.ViewChild('dragElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableSvg.prototype, "dragElement", void 0);
    StandaloneDraggableSvg = __decorate([
        core_1.Component({
            template: "\n    <svg><g\n      cdkDrag\n      #dragElement>\n      <circle fill=\"red\" r=\"50\" cx=\"50\" cy=\"50\"/>\n    </g></svg>\n  "
        })
    ], StandaloneDraggableSvg);
    return StandaloneDraggableSvg;
}());
var StandaloneDraggableWithHandle = /** @class */ (function () {
    function StandaloneDraggableWithHandle() {
    }
    __decorate([
        core_1.ViewChild('dragElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableWithHandle.prototype, "dragElement", void 0);
    __decorate([
        core_1.ViewChild('handleElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableWithHandle.prototype, "handleElement", void 0);
    __decorate([
        core_1.ViewChild(drag_1.CdkDrag),
        __metadata("design:type", drag_1.CdkDrag)
    ], StandaloneDraggableWithHandle.prototype, "dragInstance", void 0);
    __decorate([
        core_1.ViewChild(drag_handle_1.CdkDragHandle),
        __metadata("design:type", drag_handle_1.CdkDragHandle)
    ], StandaloneDraggableWithHandle.prototype, "handleInstance", void 0);
    StandaloneDraggableWithHandle = __decorate([
        core_1.Component({
            template: "\n    <div #dragElement cdkDrag\n      style=\"width: 100px; height: 100px; background: red; position: relative\">\n      <div #handleElement cdkDragHandle style=\"width: 10px; height: 10px; background: green;\"></div>\n    </div>\n  "
        })
    ], StandaloneDraggableWithHandle);
    return StandaloneDraggableWithHandle;
}());
var StandaloneDraggableWithDelayedHandle = /** @class */ (function () {
    function StandaloneDraggableWithDelayedHandle() {
        this.showHandle = false;
    }
    __decorate([
        core_1.ViewChild('dragElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableWithDelayedHandle.prototype, "dragElement", void 0);
    __decorate([
        core_1.ViewChild('handleElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableWithDelayedHandle.prototype, "handleElement", void 0);
    StandaloneDraggableWithDelayedHandle = __decorate([
        core_1.Component({
            template: "\n    <div #dragElement cdkDrag\n      style=\"width: 100px; height: 100px; background: red; position: relative\">\n      <div\n        #handleElement\n        *ngIf=\"showHandle\"\n        cdkDragHandle style=\"width: 10px; height: 10px; background: green;\"></div>\n    </div>\n  "
        })
    ], StandaloneDraggableWithDelayedHandle);
    return StandaloneDraggableWithDelayedHandle;
}());
var StandaloneDraggableWithIndirectHandle = /** @class */ (function () {
    function StandaloneDraggableWithIndirectHandle() {
    }
    __decorate([
        core_1.ViewChild('dragElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableWithIndirectHandle.prototype, "dragElement", void 0);
    __decorate([
        core_1.ViewChild('handleElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableWithIndirectHandle.prototype, "handleElement", void 0);
    StandaloneDraggableWithIndirectHandle = __decorate([
        core_1.Component({
            template: "\n    <div #dragElement cdkDrag\n      style=\"width: 100px; height: 100px; background: red; position: relative\">\n\n      <passthrough-component>\n        <div\n          #handleElement\n          cdkDragHandle\n          style=\"width: 10px; height: 10px; background: green;\"></div>\n      </passthrough-component>\n    </div>\n  "
        })
    ], StandaloneDraggableWithIndirectHandle);
    return StandaloneDraggableWithIndirectHandle;
}());
var StandaloneDraggableWithMultipleHandles = /** @class */ (function () {
    function StandaloneDraggableWithMultipleHandles() {
    }
    __decorate([
        core_1.ViewChild('dragElement'),
        __metadata("design:type", core_1.ElementRef)
    ], StandaloneDraggableWithMultipleHandles.prototype, "dragElement", void 0);
    __decorate([
        core_1.ViewChildren(drag_handle_1.CdkDragHandle),
        __metadata("design:type", core_1.QueryList)
    ], StandaloneDraggableWithMultipleHandles.prototype, "handles", void 0);
    StandaloneDraggableWithMultipleHandles = __decorate([
        core_1.Component({
            encapsulation: core_1.ViewEncapsulation.None,
            styles: ["\n    .cdk-drag-handle {\n      position: absolute;\n      top: 0;\n      background: green;\n      width: 10px;\n      height: 10px;\n    }\n  "],
            template: "\n    <div #dragElement cdkDrag\n      style=\"width: 100px; height: 100px; background: red; position: relative\">\n      <div cdkDragHandle style=\"left: 0;\"></div>\n      <div cdkDragHandle style=\"right: 0;\"></div>\n    </div>\n  "
        })
    ], StandaloneDraggableWithMultipleHandles);
    return StandaloneDraggableWithMultipleHandles;
}());
var DROP_ZONE_FIXTURE_TEMPLATE = "\n  <div\n    cdkDropList\n    style=\"width: 100px; background: pink;\"\n    [id]=\"dropZoneId\"\n    [cdkDropListData]=\"items\"\n    (cdkDropListSorted)=\"sortedSpy($event)\"\n    (cdkDropListDropped)=\"droppedSpy($event)\">\n    <div\n      *ngFor=\"let item of items\"\n      cdkDrag\n      [cdkDragData]=\"item\"\n      [cdkDragBoundary]=\"boundarySelector\"\n      [style.height.px]=\"item.height\"\n      [style.margin-bottom.px]=\"item.margin\"\n      style=\"width: 100%; background: red;\">{{item.value}}</div>\n  </div>\n";
var DraggableInDropZone = /** @class */ (function () {
    function DraggableInDropZone() {
        var _this = this;
        this.items = [
            { value: 'Zero', height: ITEM_HEIGHT, margin: 0 },
            { value: 'One', height: ITEM_HEIGHT, margin: 0 },
            { value: 'Two', height: ITEM_HEIGHT, margin: 0 },
            { value: 'Three', height: ITEM_HEIGHT, margin: 0 }
        ];
        this.dropZoneId = 'items';
        this.sortedSpy = jasmine.createSpy('sorted spy');
        this.droppedSpy = jasmine.createSpy('dropped spy').and.callFake(function (event) {
            drag_utils_1.moveItemInArray(_this.items, event.previousIndex, event.currentIndex);
        });
    }
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], DraggableInDropZone.prototype, "dragItems", void 0);
    __decorate([
        core_1.ViewChild(drop_list_1.CdkDropList),
        __metadata("design:type", drop_list_1.CdkDropList)
    ], DraggableInDropZone.prototype, "dropInstance", void 0);
    DraggableInDropZone = __decorate([
        core_1.Component({ template: DROP_ZONE_FIXTURE_TEMPLATE })
    ], DraggableInDropZone);
    return DraggableInDropZone;
}());
var DraggableInOnPushDropZone = /** @class */ (function (_super) {
    __extends(DraggableInOnPushDropZone, _super);
    function DraggableInOnPushDropZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraggableInOnPushDropZone = __decorate([
        core_1.Component({
            template: DROP_ZONE_FIXTURE_TEMPLATE,
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], DraggableInOnPushDropZone);
    return DraggableInOnPushDropZone;
}(DraggableInDropZone));
var DraggableInHorizontalDropZone = /** @class */ (function () {
    function DraggableInHorizontalDropZone() {
        var _this = this;
        this.items = [
            { value: 'Zero', width: ITEM_WIDTH, margin: 0 },
            { value: 'One', width: ITEM_WIDTH, margin: 0 },
            { value: 'Two', width: ITEM_WIDTH, margin: 0 },
            { value: 'Three', width: ITEM_WIDTH, margin: 0 }
        ];
        this.droppedSpy = jasmine.createSpy('dropped spy').and.callFake(function (event) {
            drag_utils_1.moveItemInArray(_this.items, event.previousIndex, event.currentIndex);
        });
    }
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], DraggableInHorizontalDropZone.prototype, "dragItems", void 0);
    __decorate([
        core_1.ViewChild(drop_list_1.CdkDropList),
        __metadata("design:type", drop_list_1.CdkDropList)
    ], DraggableInHorizontalDropZone.prototype, "dropInstance", void 0);
    DraggableInHorizontalDropZone = __decorate([
        core_1.Component({
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [
                // Use inline blocks here to avoid flexbox issues and not to have to flip floats in rtl.
                "\n    .cdk-drop-list {\n      display: block;\n      width: 500px;\n      background: pink;\n      font-size: 0;\n    }\n\n    .cdk-drag {\n      height: " + ITEM_HEIGHT + "px;\n      background: red;\n      display: inline-block;\n    }\n  "
            ],
            template: "\n    <div\n      cdkDropList\n      cdkDropListOrientation=\"horizontal\"\n      [cdkDropListData]=\"items\"\n      (cdkDropListDropped)=\"droppedSpy($event)\">\n      <div\n        *ngFor=\"let item of items\"\n        [style.width.px]=\"item.width\"\n        [style.margin-right.px]=\"item.margin\"\n        cdkDrag>{{item.value}}</div>\n    </div>\n  "
        })
    ], DraggableInHorizontalDropZone);
    return DraggableInHorizontalDropZone;
}());
var DraggableInDropZoneWithCustomPreview = /** @class */ (function () {
    function DraggableInDropZoneWithCustomPreview() {
        this.items = ['Zero', 'One', 'Two', 'Three'];
        this.renderCustomPreview = true;
    }
    __decorate([
        core_1.ViewChild(drop_list_1.CdkDropList),
        __metadata("design:type", drop_list_1.CdkDropList)
    ], DraggableInDropZoneWithCustomPreview.prototype, "dropInstance", void 0);
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], DraggableInDropZoneWithCustomPreview.prototype, "dragItems", void 0);
    DraggableInDropZoneWithCustomPreview = __decorate([
        core_1.Component({
            template: "\n    <div cdkDropList style=\"width: 100px; background: pink;\">\n      <div\n        *ngFor=\"let item of items\"\n        cdkDrag\n        [cdkDragBoundary]=\"boundarySelector\"\n        style=\"width: 100%; height: " + ITEM_HEIGHT + "px; background: red;\">\n          {{item}}\n\n          <ng-container *ngIf=\"renderCustomPreview\">\n            <div\n              class=\"custom-preview\"\n              style=\"width: 50px; height: 50px; background: purple;\"\n              *cdkDragPreview>Custom preview</div>\n          </ng-container>\n      </div>\n    </div>\n  "
        })
    ], DraggableInDropZoneWithCustomPreview);
    return DraggableInDropZoneWithCustomPreview;
}());
var DraggableInDropZoneWithCustomPlaceholder = /** @class */ (function () {
    function DraggableInDropZoneWithCustomPlaceholder() {
        this.items = ['Zero', 'One', 'Two', 'Three'];
        this.renderPlaceholder = true;
    }
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], DraggableInDropZoneWithCustomPlaceholder.prototype, "dragItems", void 0);
    DraggableInDropZoneWithCustomPlaceholder = __decorate([
        core_1.Component({
            template: "\n    <div cdkDropList style=\"width: 100px; background: pink;\">\n      <div *ngFor=\"let item of items\" cdkDrag\n        style=\"width: 100%; height: " + ITEM_HEIGHT + "px; background: red;\">\n          {{item}}\n          <ng-container *ngIf=\"renderPlaceholder\">\n            <div class=\"custom-placeholder\" *cdkDragPlaceholder>Custom placeholder</div>\n          </ng-container>\n      </div>\n    </div>\n  "
        })
    ], DraggableInDropZoneWithCustomPlaceholder);
    return DraggableInDropZoneWithCustomPlaceholder;
}());
var ConnectedDropZones = /** @class */ (function () {
    function ConnectedDropZones() {
        this.groupedDragItems = [];
        this.todo = ['Zero', 'One', 'Two', 'Three'];
        this.done = ['Four', 'Five', 'Six'];
        this.extra = [];
        this.droppedSpy = jasmine.createSpy('dropped spy');
    }
    ConnectedDropZones.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dropInstances.forEach(function (dropZone, index) {
            var _a;
            if (!_this.groupedDragItems[index]) {
                _this.groupedDragItems.push([]);
            }
            (_a = _this.groupedDragItems[index]).push.apply(_a, dropZone._draggables.toArray());
        });
    };
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], ConnectedDropZones.prototype, "rawDragItems", void 0);
    __decorate([
        core_1.ViewChildren(drop_list_1.CdkDropList),
        __metadata("design:type", core_1.QueryList)
    ], ConnectedDropZones.prototype, "dropInstances", void 0);
    ConnectedDropZones = __decorate([
        core_1.Component({
            encapsulation: core_1.ViewEncapsulation.None,
            styles: ["\n    .cdk-drop-list {\n      display: block;\n      width: 100px;\n      min-height: " + ITEM_HEIGHT + "px;\n      background: hotpink;\n    }\n\n    .cdk-drag {\n      display: block;\n      height: " + ITEM_HEIGHT + "px;\n      background: red;\n    }\n  "],
            template: "\n    <div\n      cdkDropList\n      #todoZone=\"cdkDropList\"\n      [cdkDropListData]=\"todo\"\n      [cdkDropListConnectedTo]=\"[doneZone]\"\n      (cdkDropListDropped)=\"droppedSpy($event)\">\n      <div [cdkDragData]=\"item\" *ngFor=\"let item of todo\" cdkDrag>{{item}}</div>\n    </div>\n\n    <div\n      cdkDropList\n      #doneZone=\"cdkDropList\"\n      [cdkDropListData]=\"done\"\n      [cdkDropListConnectedTo]=\"[todoZone]\"\n      (cdkDropListDropped)=\"droppedSpy($event)\">\n      <div [cdkDragData]=\"item\" *ngFor=\"let item of done\" cdkDrag>{{item}}</div>\n    </div>\n\n    <div\n      cdkDropList\n      #extraZone=\"cdkDropList\"\n      [cdkDropListData]=\"extra\"\n      (cdkDropListDropped)=\"droppedSpy($event)\">\n      <div [cdkDragData]=\"item\" *ngFor=\"let item of extra\" cdkDrag>{{item}}</div>\n    </div>\n  "
        })
    ], ConnectedDropZones);
    return ConnectedDropZones;
}());
var ConnectedDropZonesViaGroupDirective = /** @class */ (function (_super) {
    __extends(ConnectedDropZonesViaGroupDirective, _super);
    function ConnectedDropZonesViaGroupDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupDisabled = false;
        return _this;
    }
    ConnectedDropZonesViaGroupDirective = __decorate([
        core_1.Component({
            encapsulation: core_1.ViewEncapsulation.None,
            styles: ["\n    .cdk-drop-list {\n      display: block;\n      width: 100px;\n      min-height: " + ITEM_HEIGHT + "px;\n      background: hotpink;\n    }\n\n    .cdk-drag {\n      display: block;\n      height: " + ITEM_HEIGHT + "px;\n      background: red;\n    }\n  "],
            template: "\n    <div cdkDropListGroup [cdkDropListGroupDisabled]=\"groupDisabled\">\n      <div\n        cdkDropList\n        [cdkDropListData]=\"todo\"\n        (cdkDropListDropped)=\"droppedSpy($event)\">\n        <div [cdkDragData]=\"item\" *ngFor=\"let item of todo\" cdkDrag>{{item}}</div>\n      </div>\n\n      <div\n        cdkDropList\n        [cdkDropListData]=\"done\"\n        (cdkDropListDropped)=\"droppedSpy($event)\">\n        <div [cdkDragData]=\"item\" *ngFor=\"let item of done\" cdkDrag>{{item}}</div>\n      </div>\n    </div>\n  "
        })
    ], ConnectedDropZonesViaGroupDirective);
    return ConnectedDropZonesViaGroupDirective;
}(ConnectedDropZones));
var DraggableWithAlternateRoot = /** @class */ (function () {
    function DraggableWithAlternateRoot() {
    }
    __decorate([
        core_1.ViewChild('dragElement'),
        __metadata("design:type", core_1.ElementRef)
    ], DraggableWithAlternateRoot.prototype, "dragElement", void 0);
    __decorate([
        core_1.ViewChild('dragRoot'),
        __metadata("design:type", core_1.ElementRef)
    ], DraggableWithAlternateRoot.prototype, "dragRoot", void 0);
    __decorate([
        core_1.ViewChild(drag_1.CdkDrag),
        __metadata("design:type", drag_1.CdkDrag)
    ], DraggableWithAlternateRoot.prototype, "dragInstance", void 0);
    DraggableWithAlternateRoot = __decorate([
        core_1.Component({
            template: "\n    <div #dragRoot class=\"alternate-root\" style=\"width: 200px; height: 200px; background: hotpink\">\n      <div\n        cdkDrag\n        [cdkDragRootElement]=\"rootElementSelector\"\n        #dragElement\n        style=\"width: 100px; height: 100px; background: red;\"></div>\n    </div>\n  "
        })
    ], DraggableWithAlternateRoot);
    return DraggableWithAlternateRoot;
}());
var ConnectedDropZonesWithSingleItems = /** @class */ (function () {
    function ConnectedDropZonesWithSingleItems() {
        this.droppedSpy = jasmine.createSpy('dropped spy');
    }
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], ConnectedDropZonesWithSingleItems.prototype, "dragItems", void 0);
    __decorate([
        core_1.ViewChildren(drop_list_1.CdkDropList),
        __metadata("design:type", core_1.QueryList)
    ], ConnectedDropZonesWithSingleItems.prototype, "dropInstances", void 0);
    ConnectedDropZonesWithSingleItems = __decorate([
        core_1.Component({
            encapsulation: core_1.ViewEncapsulation.None,
            styles: ["\n    .cdk-drop-list {\n      display: block;\n      width: 100px;\n      min-height: " + ITEM_HEIGHT + "px;\n      background: hotpink;\n    }\n\n    .cdk-drag {\n      display: block;\n      height: " + ITEM_HEIGHT + "px;\n      background: red;\n    }\n  "],
            template: "\n    <div\n      cdkDropList\n      #todoZone=\"cdkDropList\"\n      [cdkDropListConnectedTo]=\"[doneZone]\"\n      (cdkDropListDropped)=\"droppedSpy($event)\">\n      <div cdkDrag>One</div>\n    </div>\n\n    <div\n      cdkDropList\n      #doneZone=\"cdkDropList\"\n      [cdkDropListConnectedTo]=\"[todoZone]\"\n      (cdkDropListDropped)=\"droppedSpy($event)\">\n      <div cdkDrag>Two</div>\n    </div>\n  "
        })
    ], ConnectedDropZonesWithSingleItems);
    return ConnectedDropZonesWithSingleItems;
}());
var NestedDropListGroups = /** @class */ (function () {
    function NestedDropListGroups() {
    }
    __decorate([
        core_1.ViewChild('group'),
        __metadata("design:type", drop_list_group_1.CdkDropListGroup)
    ], NestedDropListGroups.prototype, "group", void 0);
    __decorate([
        core_1.ViewChild('listOne'),
        __metadata("design:type", drop_list_1.CdkDropList)
    ], NestedDropListGroups.prototype, "listOne", void 0);
    __decorate([
        core_1.ViewChild('listTwo'),
        __metadata("design:type", drop_list_1.CdkDropList)
    ], NestedDropListGroups.prototype, "listTwo", void 0);
    NestedDropListGroups = __decorate([
        core_1.Component({
            template: "\n    <div cdkDropListGroup #group=\"cdkDropListGroup\">\n      <div cdkDropList #listOne=\"cdkDropList\">\n        <div cdkDropList #listThree=\"cdkDropList\"></div>\n        <div cdkDropList #listFour=\"cdkDropList\"></div>\n      </div>\n\n      <div cdkDropList #listTwo=\"cdkDropList\"></div>\n    </div>\n  "
        })
    ], NestedDropListGroups);
    return NestedDropListGroups;
}());
var DraggableOnNgContainer = /** @class */ (function () {
    function DraggableOnNgContainer() {
    }
    DraggableOnNgContainer = __decorate([
        core_1.Component({
            template: "\n    <ng-container cdkDrag></ng-container>\n  "
        })
    ], DraggableOnNgContainer);
    return DraggableOnNgContainer;
}());
var DraggableInDropZoneWithoutEvents = /** @class */ (function () {
    function DraggableInDropZoneWithoutEvents() {
        this.items = [
            { value: 'Zero', height: ITEM_HEIGHT },
            { value: 'One', height: ITEM_HEIGHT },
            { value: 'Two', height: ITEM_HEIGHT },
            { value: 'Three', height: ITEM_HEIGHT }
        ];
    }
    __decorate([
        core_1.ViewChildren(drag_1.CdkDrag),
        __metadata("design:type", core_1.QueryList)
    ], DraggableInDropZoneWithoutEvents.prototype, "dragItems", void 0);
    __decorate([
        core_1.ViewChild(drop_list_1.CdkDropList),
        __metadata("design:type", drop_list_1.CdkDropList)
    ], DraggableInDropZoneWithoutEvents.prototype, "dropInstance", void 0);
    DraggableInDropZoneWithoutEvents = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div cdkDropList style=\"width: 100px; background: pink;\">\n      <div *ngFor=\"let item of items\"\n        cdkDrag\n        [style.height.px]=\"item.height\"\n        style=\"width: 100%; background: red;\">{{item.value}}</div>\n    </div>\n  "
        })
    ], DraggableInDropZoneWithoutEvents);
    return DraggableInDropZoneWithoutEvents;
}());
/**
 * Component that passes through whatever content is projected into it.
 * Used to test having drag elements being projected into a component.
 */
var PassthroughComponent = /** @class */ (function () {
    function PassthroughComponent() {
    }
    PassthroughComponent = __decorate([
        core_1.Component({
            selector: 'passthrough-component',
            template: '<ng-content></ng-content>'
        })
    ], PassthroughComponent);
    return PassthroughComponent;
}());
/**
 * Drags an element to a position on the page using the mouse.
 * @param fixture Fixture on which to run change detection.
 * @param element Element which is being dragged.
 * @param x Position along the x axis to which to drag the element.
 * @param y Position along the y axis to which to drag the element.
 */
function dragElementViaMouse(fixture, element, x, y) {
    startDraggingViaMouse(fixture, element);
    testing_2.dispatchMouseEvent(document, 'mousemove', x, y);
    fixture.detectChanges();
    testing_2.dispatchMouseEvent(document, 'mouseup', x, y);
    fixture.detectChanges();
}
/**
 * Dispatches the events for starting a drag sequence.
 * @param fixture Fixture on which to run change detection.
 * @param element Element on which to dispatch the events.
 * @param x Position along the x axis to which to drag the element.
 * @param y Position along the y axis to which to drag the element.
 */
function startDraggingViaMouse(fixture, element, x, y) {
    testing_2.dispatchMouseEvent(element, 'mousedown', x, y);
    fixture.detectChanges();
    testing_2.dispatchMouseEvent(document, 'mousemove', x, y);
    fixture.detectChanges();
}
/**
 * Drags an element to a position on the page using a touch device.
 * @param fixture Fixture on which to run change detection.
 * @param element Element which is being dragged.
 * @param x Position along the x axis to which to drag the element.
 * @param y Position along the y axis to which to drag the element.
 */
function dragElementViaTouch(fixture, element, x, y) {
    testing_2.dispatchTouchEvent(element, 'touchstart');
    fixture.detectChanges();
    testing_2.dispatchTouchEvent(document, 'touchmove');
    fixture.detectChanges();
    testing_2.dispatchTouchEvent(document, 'touchmove', x, y);
    fixture.detectChanges();
    testing_2.dispatchTouchEvent(document, 'touchend', x, y);
    fixture.detectChanges();
}
/** Gets the index of an element among its siblings, based on their position on the page. */
function getElementIndexByPosition(element, direction) {
    return getElementSibligsByPosition(element, direction).indexOf(element);
}
/** Gets the siblings of an element, sorted by their position on the page. */
function getElementSibligsByPosition(element, direction) {
    return element.parentElement ? Array.from(element.parentElement.children).sort(function (a, b) {
        return a.getBoundingClientRect()[direction] - b.getBoundingClientRect()[direction];
    }) : [];
}
/**
 * Adds a large element to the page in order to make it scrollable.
 * @returns Function that should be used to clean up after the test is done.
 */
function makePageScrollable() {
    var veryTallElement = document.createElement('div');
    veryTallElement.style.width = '100%';
    veryTallElement.style.height = '2000px';
    document.body.appendChild(veryTallElement);
    return function () {
        scrollTo(0, 0);
        veryTallElement.parentNode.removeChild(veryTallElement);
    };
}
/**
 * Asserts that sorting an element down works correctly.
 * @param fixture Fixture against which to run the assertions.
 * @param items Array of items against which to test sorting.
 */
function assertDownwardSorting(fixture, items) {
    var draggedItem = items[0];
    var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
    startDraggingViaMouse(fixture, draggedItem, left, top);
    var placeholder = document.querySelector('.cdk-drag-placeholder');
    // Drag over each item one-by-one going downwards.
    for (var i = 0; i < items.length; i++) {
        var elementRect = items[i].getBoundingClientRect();
        // Add a few pixels to the top offset so we get some overlap.
        testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.left, elementRect.top + 5);
        fixture.detectChanges();
        expect(getElementIndexByPosition(placeholder, 'top')).toBe(i);
    }
    testing_2.dispatchMouseEvent(document, 'mouseup');
    fixture.detectChanges();
    testing_1.flush();
}
/**
 * Asserts that sorting an element up works correctly.
 * @param fixture Fixture against which to run the assertions.
 * @param items Array of items against which to test sorting.
 */
function assertUpwardSorting(fixture, items) {
    var draggedItem = items[items.length - 1];
    var _a = draggedItem.getBoundingClientRect(), top = _a.top, left = _a.left;
    startDraggingViaMouse(fixture, draggedItem, left, top);
    var placeholder = document.querySelector('.cdk-drag-placeholder');
    // Drag over each item one-by-one going upwards.
    for (var i = items.length - 1; i > -1; i--) {
        var elementRect = items[i].getBoundingClientRect();
        // Remove a few pixels from the bottom offset so we get some overlap.
        testing_2.dispatchMouseEvent(document, 'mousemove', elementRect.left, elementRect.bottom - 5);
        fixture.detectChanges();
        expect(getElementIndexByPosition(placeholder, 'top')).toBe(i);
    }
    testing_2.dispatchMouseEvent(document, 'mouseup');
    fixture.detectChanges();
    testing_1.flush();
}
//# sourceMappingURL=drag.spec.js.map