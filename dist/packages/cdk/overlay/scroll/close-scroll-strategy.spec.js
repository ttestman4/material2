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
var rxjs_1 = require("rxjs");
var portal_1 = require("@angular/cdk/portal");
var scrolling_1 = require("@angular/cdk/scrolling");
var index_1 = require("../index");
describe('CloseScrollStrategy', function () {
    var overlayRef;
    var componentPortal;
    var scrolledSubject = new rxjs_1.Subject();
    var scrollPosition;
    beforeEach(testing_1.fakeAsync(function () {
        scrollPosition = 0;
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule, OverlayTestModule],
            providers: [
                { provide: scrolling_1.ScrollDispatcher, useFactory: function () { return ({
                        scrolled: function () { return scrolledSubject.asObservable(); }
                    }); } },
                { provide: scrolling_1.ViewportRuler, useFactory: function () { return ({
                        getViewportScrollPosition: function () { return ({ top: scrollPosition }); }
                    }); } }
            ]
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.Overlay], function (overlay) {
        var overlayConfig = new index_1.OverlayConfig({ scrollStrategy: overlay.scrollStrategies.close() });
        overlayRef = overlay.create(overlayConfig);
        componentPortal = new portal_1.ComponentPortal(MozarellaMsg);
    }));
    afterEach(testing_1.inject([index_1.OverlayContainer], function (container) {
        overlayRef.dispose();
        container.getContainerElement().parentNode.removeChild(container.getContainerElement());
    }));
    it('should detach the overlay as soon as the user scrolls', function () {
        overlayRef.attach(componentPortal);
        spyOn(overlayRef, 'detach');
        scrolledSubject.next();
        expect(overlayRef.detach).toHaveBeenCalled();
    });
    it('should not attempt to detach the overlay after it has been detached', function () {
        overlayRef.attach(componentPortal);
        overlayRef.detach();
        spyOn(overlayRef, 'detach');
        scrolledSubject.next();
        expect(overlayRef.detach).not.toHaveBeenCalled();
    });
    it('should detach inside the NgZone', function () {
        var spy = jasmine.createSpy('detachment spy');
        var subscription = overlayRef.detachments().subscribe(function () { return spy(core_1.NgZone.isInAngularZone()); });
        overlayRef.attach(componentPortal);
        scrolledSubject.next();
        expect(spy).toHaveBeenCalledWith(true);
        subscription.unsubscribe();
    });
    it('should be able to reposition the overlay up to a certain threshold before closing', testing_1.inject([index_1.Overlay], function (overlay) {
        overlayRef.dispose();
        overlayRef = overlay.create({
            scrollStrategy: overlay.scrollStrategies.close({ threshold: 50 })
        });
        overlayRef.attach(componentPortal);
        spyOn(overlayRef, 'updatePosition');
        spyOn(overlayRef, 'detach');
        for (var i = 0; i < 50; i++) {
            scrollPosition++;
            scrolledSubject.next();
        }
        expect(overlayRef.updatePosition).toHaveBeenCalledTimes(50);
        expect(overlayRef.detach).not.toHaveBeenCalled();
        scrollPosition++;
        scrolledSubject.next();
        expect(overlayRef.detach).toHaveBeenCalledTimes(1);
    }));
    it('should not close if the user starts scrolling away and comes back', testing_1.inject([index_1.Overlay], function (overlay) {
        overlayRef.dispose();
        scrollPosition = 100;
        overlayRef = overlay.create({
            scrollStrategy: overlay.scrollStrategies.close({ threshold: 50 })
        });
        overlayRef.attach(componentPortal);
        spyOn(overlayRef, 'updatePosition');
        spyOn(overlayRef, 'detach');
        // Scroll down 30px.
        for (var i = 0; i < 30; i++) {
            scrollPosition++;
            scrolledSubject.next();
        }
        // Scroll back up 30px.
        for (var i = 0; i < 30; i++) {
            scrollPosition--;
            scrolledSubject.next();
        }
        expect(overlayRef.updatePosition).toHaveBeenCalledTimes(60);
        expect(overlayRef.detach).not.toHaveBeenCalled();
    }));
});
/** Simple component that we can attach to the overlay. */
var MozarellaMsg = /** @class */ (function () {
    function MozarellaMsg() {
    }
    MozarellaMsg = __decorate([
        core_1.Component({ template: '<p>Mozarella</p>' })
    ], MozarellaMsg);
    return MozarellaMsg;
}());
/** Test module to hold the component. */
var OverlayTestModule = /** @class */ (function () {
    function OverlayTestModule() {
    }
    OverlayTestModule = __decorate([
        core_1.NgModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule],
            declarations: [MozarellaMsg],
            entryComponents: [MozarellaMsg],
        })
    ], OverlayTestModule);
    return OverlayTestModule;
}());
//# sourceMappingURL=close-scroll-strategy.spec.js.map