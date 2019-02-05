"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var portal_1 = require("@angular/cdk/portal");
var platform_1 = require("@angular/cdk/platform");
var scrolling_1 = require("@angular/cdk/scrolling");
var index_1 = require("../index");
describe('BlockScrollStrategy', function () {
    var platform;
    var viewport;
    var documentElement;
    var overlayRef;
    var componentPortal;
    var forceScrollElement;
    beforeEach(testing_1.async(function () {
        documentElement = document.documentElement;
        // Ensure a clean state for every test.
        documentElement.classList.remove('cdk-global-scrollblock');
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule, OverlayTestModule]
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([index_1.Overlay, scrolling_1.ViewportRuler, platform_1.Platform], function (overlay, viewportRuler, _platform) {
        var overlayConfig = new index_1.OverlayConfig({ scrollStrategy: overlay.scrollStrategies.block() });
        overlayRef = overlay.create(overlayConfig);
        componentPortal = new portal_1.ComponentPortal(FocacciaMsg);
        viewport = viewportRuler;
        forceScrollElement = document.createElement('div');
        document.body.appendChild(forceScrollElement);
        forceScrollElement.style.width = '100px';
        forceScrollElement.style.height = '3000px';
        forceScrollElement.style.background = 'rebeccapurple';
        platform = _platform;
    }));
    afterEach(testing_1.inject([index_1.OverlayContainer], function (container) {
        overlayRef.dispose();
        document.body.removeChild(forceScrollElement);
        window.scroll(0, 0);
        container.getContainerElement().parentNode.removeChild(container.getContainerElement());
    }));
    it('should toggle scroll blocking along the y axis', skipIOS(function () {
        window.scroll(0, 100);
        expect(viewport.getViewportScrollPosition().top)
            .toBe(100, 'Expected viewport to be scrollable initially.');
        overlayRef.attach(componentPortal);
        expect(documentElement.style.top)
            .toBe('-100px', 'Expected <html> element to be offset by the previous scroll amount.');
        window.scroll(0, 300);
        expect(viewport.getViewportScrollPosition().top)
            .toBe(100, 'Expected the viewport not to scroll.');
        overlayRef.detach();
        expect(viewport.getViewportScrollPosition().top)
            .toBe(100, 'Expected old scroll position to have bee restored after disabling.');
        window.scroll(0, 300);
        expect(viewport.getViewportScrollPosition().top)
            .toBe(300, 'Expected user to be able to scroll after disabling.');
    }));
    it('should toggle scroll blocking along the x axis', skipIOS(function () {
        forceScrollElement.style.height = '100px';
        forceScrollElement.style.width = '3000px';
        window.scroll(100, 0);
        expect(viewport.getViewportScrollPosition().left)
            .toBe(100, 'Expected viewport to be scrollable initially.');
        overlayRef.attach(componentPortal);
        expect(documentElement.style.left)
            .toBe('-100px', 'Expected <html> element to be offset by the previous scroll amount.');
        window.scroll(300, 0);
        expect(viewport.getViewportScrollPosition().left)
            .toBe(100, 'Expected the viewport not to scroll.');
        overlayRef.detach();
        expect(viewport.getViewportScrollPosition().left)
            .toBe(100, 'Expected old scroll position to have bee restored after disabling.');
        window.scroll(300, 0);
        expect(viewport.getViewportScrollPosition().left)
            .toBe(300, 'Expected user to be able to scroll after disabling.');
    }));
    it('should toggle the `cdk-global-scrollblock` class', skipIOS(function () {
        expect(documentElement.classList).not.toContain('cdk-global-scrollblock');
        overlayRef.attach(componentPortal);
        expect(documentElement.classList).toContain('cdk-global-scrollblock');
        overlayRef.detach();
        expect(documentElement.classList).not.toContain('cdk-global-scrollblock');
    }));
    it('should restore any previously-set inline styles', skipIOS(function () {
        var root = documentElement;
        root.style.top = '13px';
        root.style.left = '37px';
        overlayRef.attach(componentPortal);
        expect(root.style.top).not.toBe('13px');
        expect(root.style.left).not.toBe('37px');
        overlayRef.detach();
        expect(root.style.top).toBe('13px');
        expect(root.style.left).toBe('37px');
        root.style.top = '';
        root.style.left = '';
    }));
    it("should't do anything if the page isn't scrollable", skipIOS(function () {
        forceScrollElement.style.display = 'none';
        overlayRef.attach(componentPortal);
        expect(documentElement.classList).not.toContain('cdk-global-scrollblock');
    }));
    it('should keep the content width', function () {
        forceScrollElement.style.width = '100px';
        var previousContentWidth = documentElement.getBoundingClientRect().width;
        overlayRef.attach(componentPortal);
        expect(documentElement.getBoundingClientRect().width).toBe(previousContentWidth);
    });
    it('should not clobber user-defined scroll-behavior', skipIOS(function () {
        var root = documentElement;
        var body = document.body;
        var rootStyle = root.style;
        var bodyStyle = body.style;
        rootStyle.scrollBehavior = bodyStyle.scrollBehavior = 'smooth';
        // Get the value via the style declaration in order to
        // handle browsers that don't support the property yet.
        var initialRootValue = rootStyle.scrollBehavior;
        var initialBodyValue = rootStyle.scrollBehavior;
        overlayRef.attach(componentPortal);
        overlayRef.detach();
        expect(rootStyle.scrollBehavior).toBe(initialRootValue);
        expect(bodyStyle.scrollBehavior).toBe(initialBodyValue);
        // Avoid bleeding styles into other tests.
        rootStyle.scrollBehavior = bodyStyle.scrollBehavior = '';
    }));
    /**
     * Skips the specified test, if it is being executed on iOS. This is necessary, because
     * programmatic scrolling inside the Karma iframe doesn't work on iOS, which renders these
     * tests unusable. For example, something as basic as the following won't work:
     * ```
     * window.scroll(0, 100);
     * expect(viewport.getViewportScrollPosition().top).toBe(100);
     * ```
     * @param spec Test to be executed or skipped.
     */
    function skipIOS(spec) {
        return function () {
            if (!platform.IOS) {
                spec();
            }
        };
    }
});
/** Simple component that we can attach to the overlay. */
var FocacciaMsg = /** @class */ (function () {
    function FocacciaMsg() {
    }
    FocacciaMsg = __decorate([
        core_1.Component({ template: '<p>Focaccia</p>' })
    ], FocacciaMsg);
    return FocacciaMsg;
}());
/** Test module to hold the component. */
var OverlayTestModule = /** @class */ (function () {
    function OverlayTestModule() {
    }
    OverlayTestModule = __decorate([
        core_1.NgModule({
            imports: [index_1.OverlayModule, portal_1.PortalModule],
            declarations: [FocacciaMsg],
            entryComponents: [FocacciaMsg],
        })
    ], OverlayTestModule);
    return OverlayTestModule;
}());
//# sourceMappingURL=block-scroll-strategy.spec.js.map