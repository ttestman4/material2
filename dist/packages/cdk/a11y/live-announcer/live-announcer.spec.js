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
var observers_1 = require("@angular/cdk/observers");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("../index");
var live_announcer_1 = require("./live-announcer");
var live_announcer_token_1 = require("./live-announcer-token");
describe('LiveAnnouncer', function () {
    var announcer;
    var ariaLiveElement;
    var fixture;
    describe('with default element', function () {
        beforeEach(function () { return testing_1.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [TestApp],
        }); });
        beforeEach(testing_1.fakeAsync(testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
            announcer = la;
            ariaLiveElement = getLiveElement();
            fixture = testing_1.TestBed.createComponent(TestApp);
        })));
        afterEach(function () {
            // In our tests we always remove the current live element, in
            // order to avoid having multiple announcer elements in the DOM.
            announcer.ngOnDestroy();
        });
        it('should correctly update the announce text', testing_1.fakeAsync(function () {
            var buttonElement = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
            buttonElement.click();
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Test');
        }));
        it('should correctly update the politeness attribute', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google', 'assertive');
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Hey Google');
            expect(ariaLiveElement.getAttribute('aria-live')).toBe('assertive');
        }));
        it('should apply the aria-live value polite by default', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google');
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Hey Google');
            expect(ariaLiveElement.getAttribute('aria-live')).toBe('polite');
        }));
        it('should be able to clear out the aria-live element manually', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google');
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Hey Google');
            announcer.clear();
            expect(ariaLiveElement.textContent).toBeFalsy();
        }));
        it('should be able to clear out the aria-live element by setting a duration', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google', 2000);
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Hey Google');
            testing_1.tick(2000);
            expect(ariaLiveElement.textContent).toBeFalsy();
        }));
        it('should clear the duration of previous messages when announcing a new one', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google', 2000);
            testing_1.tick(100);
            expect(ariaLiveElement.textContent).toBe('Hey Google');
            announcer.announce('Hello there');
            testing_1.tick(2500);
            expect(ariaLiveElement.textContent).toBe('Hello there');
        }));
        it('should remove the aria-live element from the DOM on destroy', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google');
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            // Call the lifecycle hook manually since Angular won't do it in tests.
            announcer.ngOnDestroy();
            expect(document.body.querySelector('.cdk-live-announcer-element'))
                .toBeFalsy('Expected that the aria-live element was remove from the DOM.');
        }));
        it('should return a promise that resolves after the text has been announced', testing_1.fakeAsync(function () {
            var spy = jasmine.createSpy('announce spy');
            announcer.announce('something').then(spy);
            expect(spy).not.toHaveBeenCalled();
            testing_1.tick(100);
            expect(spy).toHaveBeenCalled();
        }));
        it('should ensure that there is only one live element at a time', testing_1.fakeAsync(function () {
            announcer.ngOnDestroy();
            fixture.destroy();
            testing_1.TestBed.resetTestingModule().configureTestingModule({
                imports: [index_1.A11yModule],
                declarations: [TestApp],
            });
            var extraElement = document.createElement('div');
            extraElement.classList.add('cdk-live-announcer-element');
            document.body.appendChild(extraElement);
            testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
                announcer = la;
                ariaLiveElement = getLiveElement();
                fixture = testing_1.TestBed.createComponent(TestApp);
            })();
            announcer.announce('Hey Google');
            testing_1.tick(100);
            expect(document.body.querySelectorAll('.cdk-live-announcer-element').length)
                .toBe(1, 'Expected only one live announcer element in the DOM.');
        }));
        it('should clear any previous timers when a new one is started', testing_1.fakeAsync(function () {
            expect(ariaLiveElement.textContent).toBeFalsy();
            announcer.announce('One');
            testing_1.tick(50);
            announcer.announce('Two');
            testing_1.tick(75);
            expect(ariaLiveElement.textContent).toBeFalsy();
            testing_1.tick(25);
            expect(ariaLiveElement.textContent).toBe('Two');
        }));
        it('should clear pending timeouts on destroy', testing_1.fakeAsync(function () {
            announcer.announce('Hey Google');
            announcer.ngOnDestroy();
            // Since we're testing whether the timeouts were flushed, we don't need any
            // assertions here. `fakeAsync` will fail the test if a timer was left over.
        }));
    });
    describe('with a custom element', function () {
        var customLiveElement;
        beforeEach(function () {
            customLiveElement = document.createElement('div');
            return testing_1.TestBed.configureTestingModule({
                imports: [index_1.A11yModule],
                declarations: [TestApp],
                providers: [{ provide: live_announcer_token_1.LIVE_ANNOUNCER_ELEMENT_TOKEN, useValue: customLiveElement }],
            });
        });
        beforeEach(testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
            announcer = la;
            ariaLiveElement = getLiveElement();
        }));
        it('should allow to use a custom live element', testing_1.fakeAsync(function () {
            announcer.announce('Custom Element');
            // This flushes our 100ms timeout for the screenreaders.
            testing_1.tick(100);
            expect(customLiveElement.textContent).toBe('Custom Element');
        }));
    });
});
describe('CdkAriaLive', function () {
    var mutationCallbacks = [];
    var announcer;
    var announcerSpy;
    var fixture;
    var invokeMutationCallbacks = function () { return mutationCallbacks.forEach(function (cb) { return cb(); }); };
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.A11yModule],
            declarations: [DivWithCdkAriaLive],
            providers: [{
                    provide: observers_1.MutationObserverFactory,
                    useValue: {
                        create: function (callback) {
                            mutationCallbacks.push(callback);
                            return {
                                observe: function () { },
                                disconnect: function () { }
                            };
                        }
                    }
                }]
        });
    }));
    beforeEach(testing_1.fakeAsync(testing_1.inject([live_announcer_1.LiveAnnouncer], function (la) {
        announcer = la;
        announcerSpy = spyOn(la, 'announce').and.callThrough();
        fixture = testing_1.TestBed.createComponent(DivWithCdkAriaLive);
        fixture.detectChanges();
        testing_1.flush();
    })));
    afterEach(testing_1.fakeAsync(function () {
        // In our tests we always remove the current live element, in
        // order to avoid having multiple announcer elements in the DOM.
        announcer.ngOnDestroy();
    }));
    it('should dynamically update the politeness', testing_1.fakeAsync(function () {
        fixture.componentInstance.content = 'New content';
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).toHaveBeenCalledWith('New content', 'polite');
        announcerSpy.calls.reset();
        fixture.componentInstance.politeness = 'off';
        fixture.componentInstance.content = 'Newer content';
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).not.toHaveBeenCalled();
        announcerSpy.calls.reset();
        fixture.componentInstance.politeness = 'assertive';
        fixture.componentInstance.content = 'Newest content';
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).toHaveBeenCalledWith('Newest content', 'assertive');
    }));
    it('should not announce the same text multiple times', testing_1.fakeAsync(function () {
        fixture.componentInstance.content = 'Content';
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).toHaveBeenCalledTimes(1);
        fixture.detectChanges();
        invokeMutationCallbacks();
        testing_1.flush();
        expect(announcer.announce).toHaveBeenCalledTimes(1);
    }));
});
function getLiveElement() {
    return document.body.querySelector('.cdk-live-announcer-element');
}
var TestApp = /** @class */ (function () {
    function TestApp(live) {
        this.live = live;
    }
    TestApp.prototype.announceText = function (message) {
        this.live.announce(message);
    };
    TestApp = __decorate([
        core_1.Component({ template: "<button (click)=\"announceText('Test')\">Announce</button>" }),
        __metadata("design:paramtypes", [live_announcer_1.LiveAnnouncer])
    ], TestApp);
    return TestApp;
}());
var DivWithCdkAriaLive = /** @class */ (function () {
    function DivWithCdkAriaLive() {
        this.politeness = 'polite';
        this.content = 'Initial content';
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DivWithCdkAriaLive.prototype, "politeness", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DivWithCdkAriaLive.prototype, "content", void 0);
    DivWithCdkAriaLive = __decorate([
        core_1.Component({ template: "<div [cdkAriaLive]=\"politeness\">{{content}}</div>" })
    ], DivWithCdkAriaLive);
    return DivWithCdkAriaLive;
}());
//# sourceMappingURL=live-announcer.spec.js.map