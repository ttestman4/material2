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
var portal_1 = require("@angular/cdk/portal");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
describe('FullscreenOverlayContainer', function () {
    var overlay;
    var overlayContainer;
    var fullscreenListeners;
    var fakeDocument;
    beforeEach(testing_1.async(function () {
        fullscreenListeners = new Set();
        testing_1.TestBed.configureTestingModule({
            imports: [OverlayTestModule],
            providers: [{
                    provide: platform_browser_1.DOCUMENT,
                    useFactory: function () {
                        // Provide a (very limited) stub for the document. This is the most practical solution for
                        // now since we only hit a handful of Document APIs. If we end up having to add more
                        // stubs here, we should reconsider whether to use a Proxy instead. Avoiding a proxy for
                        // now since it isn't supported on IE. See:
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
                        fakeDocument = {
                            body: document.body,
                            fullscreenElement: document.createElement('div'),
                            fullscreenEnabled: true,
                            addEventListener: function (eventName, listener) {
                                if (eventName === 'fullscreenchange') {
                                    fullscreenListeners.add(listener);
                                }
                                else {
                                    document.addEventListener.apply(document, arguments);
                                }
                            },
                            removeEventListener: function (eventName, listener) {
                                if (eventName === 'fullscreenchange') {
                                    fullscreenListeners.delete(listener);
                                }
                                else {
                                    document.addEventListener.apply(document, arguments);
                                }
                            },
                            querySelectorAll: function () {
                                return document.querySelectorAll.apply(document, arguments);
                            },
                            createElement: function () {
                                return document.createElement.apply(document, arguments);
                            },
                        };
                        return fakeDocument;
                    }
                }]
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.Overlay, index_1.OverlayContainer], function (o, oc) {
        overlay = o;
        overlayContainer = oc;
    }));
    afterEach(function () {
        overlayContainer.ngOnDestroy();
        fakeDocument = null;
    });
    it('should open an overlay inside a fullscreen element and move it to the body', function () {
        var fixture = testing_1.TestBed.createComponent(TestComponentWithTemplatePortals);
        var overlayRef = overlay.create();
        var fullscreenElement = fakeDocument.fullscreenElement;
        overlayRef.attach(fixture.componentInstance.templatePortal);
        fixture.detectChanges();
        expect(fullscreenElement.contains(overlayRef.overlayElement)).toBe(true);
        fakeDocument.fullscreenElement = null;
        fullscreenListeners.forEach(function (listener) { return listener(); });
        fixture.detectChanges();
        expect(fullscreenElement.contains(overlayRef.overlayElement)).toBe(false);
        expect(document.body.contains(overlayRef.overlayElement)).toBe(true);
    });
    it('should open an overlay inside the body and move it to a fullscreen element', function () {
        var fullscreenElement = fakeDocument.fullscreenElement;
        fakeDocument.fullscreenElement = null;
        var fixture = testing_1.TestBed.createComponent(TestComponentWithTemplatePortals);
        var overlayRef = overlay.create();
        overlayRef.attach(fixture.componentInstance.templatePortal);
        fixture.detectChanges();
        expect(fullscreenElement.contains(overlayRef.overlayElement)).toBe(false);
        expect(document.body.contains(overlayRef.overlayElement)).toBe(true);
        fakeDocument.fullscreenElement = fullscreenElement;
        fullscreenListeners.forEach(function (listener) { return listener(); });
        fixture.detectChanges();
        expect(fullscreenElement.contains(overlayRef.overlayElement)).toBe(true);
    });
});
/** Test-bed component that contains a TempatePortal and an ElementRef. */
var TestComponentWithTemplatePortals = /** @class */ (function () {
    function TestComponentWithTemplatePortals(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    __decorate([
        core_1.ViewChild(portal_1.CdkPortal),
        __metadata("design:type", portal_1.CdkPortal)
    ], TestComponentWithTemplatePortals.prototype, "templatePortal", void 0);
    TestComponentWithTemplatePortals = __decorate([
        core_1.Component({
            template: "<ng-template cdk-portal>Cake</ng-template>",
            providers: [index_1.Overlay],
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], TestComponentWithTemplatePortals);
    return TestComponentWithTemplatePortals;
}());
var OverlayTestModule = /** @class */ (function () {
    function OverlayTestModule() {
    }
    OverlayTestModule = __decorate([
        core_1.NgModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule],
            declarations: [TestComponentWithTemplatePortals],
            providers: [{
                    provide: index_1.OverlayContainer,
                    useClass: index_1.FullscreenOverlayContainer
                }]
        })
    ], OverlayTestModule);
    return OverlayTestModule;
}());
//# sourceMappingURL=fullscreen-overlay-container.spec.js.map