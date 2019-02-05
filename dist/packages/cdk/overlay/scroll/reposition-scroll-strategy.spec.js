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
var index_1 = require("../index");
describe('RepositionScrollStrategy', function () {
    var overlayRef;
    var overlay;
    var componentPortal;
    var scrolledSubject = new rxjs_1.Subject();
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule, OverlayTestModule],
            providers: [
                { provide: index_1.ScrollDispatcher, useFactory: function () { return ({
                        scrolled: function () { return scrolledSubject.asObservable(); }
                    }); } }
            ]
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.Overlay], function (o) {
        overlay = o;
        componentPortal = new portal_1.ComponentPortal(PastaMsg);
    }));
    afterEach(testing_1.inject([index_1.OverlayContainer], function (container) {
        overlayRef.dispose();
        container.getContainerElement().parentNode.removeChild(container.getContainerElement());
    }));
    it('should update the overlay position when the page is scrolled', function () {
        var overlayConfig = new index_1.OverlayConfig({
            scrollStrategy: overlay.scrollStrategies.reposition()
        });
        overlayRef = overlay.create(overlayConfig);
        overlayRef.attach(componentPortal);
        spyOn(overlayRef, 'updatePosition');
        scrolledSubject.next();
        expect(overlayRef.updatePosition).toHaveBeenCalledTimes(1);
        scrolledSubject.next();
        expect(overlayRef.updatePosition).toHaveBeenCalledTimes(2);
    });
    it('should not be updating the position after the overlay is detached', function () {
        var overlayConfig = new index_1.OverlayConfig({
            scrollStrategy: overlay.scrollStrategies.reposition()
        });
        overlayRef = overlay.create(overlayConfig);
        overlayRef.attach(componentPortal);
        spyOn(overlayRef, 'updatePosition');
        overlayRef.detach();
        scrolledSubject.next();
        expect(overlayRef.updatePosition).not.toHaveBeenCalled();
    });
    it('should not be updating the position after the overlay is destroyed', function () {
        var overlayConfig = new index_1.OverlayConfig({
            scrollStrategy: overlay.scrollStrategies.reposition()
        });
        overlayRef = overlay.create(overlayConfig);
        overlayRef.attach(componentPortal);
        spyOn(overlayRef, 'updatePosition');
        overlayRef.dispose();
        scrolledSubject.next();
        expect(overlayRef.updatePosition).not.toHaveBeenCalled();
    });
    it('should be able to close the overlay once it is out of view', function () {
        var overlayConfig = new index_1.OverlayConfig({
            scrollStrategy: overlay.scrollStrategies.reposition({
                autoClose: true
            })
        });
        overlayRef = overlay.create(overlayConfig);
        overlayRef.attach(componentPortal);
        spyOn(overlayRef, 'updatePosition');
        spyOn(overlayRef, 'detach');
        spyOn(overlayRef.overlayElement, 'getBoundingClientRect').and.returnValue({
            top: -1000,
            bottom: -900,
            left: 0,
            right: 100,
            width: 100,
            height: 100
        });
        scrolledSubject.next();
        expect(overlayRef.detach).toHaveBeenCalledTimes(1);
    });
});
/** Simple component that we can attach to the overlay. */
var PastaMsg = /** @class */ (function () {
    function PastaMsg() {
    }
    PastaMsg = __decorate([
        core_1.Component({ template: '<p>Pasta</p>' })
    ], PastaMsg);
    return PastaMsg;
}());
/** Test module to hold the component. */
var OverlayTestModule = /** @class */ (function () {
    function OverlayTestModule() {
    }
    OverlayTestModule = __decorate([
        core_1.NgModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule],
            declarations: [PastaMsg],
            entryComponents: [PastaMsg],
        })
    ], OverlayTestModule);
    return OverlayTestModule;
}());
//# sourceMappingURL=reposition-scroll-strategy.spec.js.map