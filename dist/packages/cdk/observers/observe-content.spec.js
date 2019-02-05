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
var observe_content_1 = require("./observe-content");
describe('Observe content directive', function () {
    describe('basic usage', function () {
        beforeEach(testing_1.async(function () {
            testing_1.TestBed.configureTestingModule({
                imports: [observe_content_1.ObserversModule],
                declarations: [ComponentWithTextContent, ComponentWithChildTextContent]
            });
            testing_1.TestBed.compileComponents();
        }));
        it('should trigger the callback when the content of the element changes', function (done) {
            var fixture = testing_1.TestBed.createComponent(ComponentWithTextContent);
            fixture.detectChanges();
            // If the hint label is empty, expect no label.
            var spy = spyOn(fixture.componentInstance, 'doSomething').and.callFake(function () {
                expect(spy).toHaveBeenCalled();
                done();
            });
            expect(spy).not.toHaveBeenCalled();
            fixture.componentInstance.text = 'text';
            fixture.detectChanges();
        });
        it('should trigger the callback when the content of the children changes', function (done) {
            var fixture = testing_1.TestBed.createComponent(ComponentWithChildTextContent);
            fixture.detectChanges();
            // If the hint label is empty, expect no label.
            var spy = spyOn(fixture.componentInstance, 'doSomething').and.callFake(function () {
                expect(spy).toHaveBeenCalled();
                done();
            });
            expect(spy).not.toHaveBeenCalled();
            fixture.componentInstance.text = 'text';
            fixture.detectChanges();
        });
        it('should disconnect the MutationObserver when the directive is disabled', function () {
            var observeSpy = jasmine.createSpy('observe spy');
            var disconnectSpy = jasmine.createSpy('disconnect spy');
            // Note: since we can't know exactly when the native MutationObserver will emit, we can't
            // test this scenario reliably without risking flaky tests, which is why we supply a mock
            // MutationObserver and check that the methods are called at the right time.
            testing_1.TestBed.overrideProvider(observe_content_1.MutationObserverFactory, {
                deps: [],
                useFactory: function () { return ({
                    create: function () { return ({ observe: observeSpy, disconnect: disconnectSpy }); }
                }); }
            });
            var fixture = testing_1.TestBed.createComponent(ComponentWithTextContent);
            fixture.detectChanges();
            expect(observeSpy).toHaveBeenCalledTimes(1);
            expect(disconnectSpy).not.toHaveBeenCalled();
            fixture.componentInstance.disabled = true;
            fixture.detectChanges();
            expect(observeSpy).toHaveBeenCalledTimes(1);
            expect(disconnectSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe('debounced', function () {
        var fixture;
        var callbacks;
        var invokeCallbacks = function (args) { return callbacks.forEach(function (callback) { return callback(args); }); };
        beforeEach(testing_1.async(function () {
            callbacks = [];
            testing_1.TestBed.configureTestingModule({
                imports: [observe_content_1.ObserversModule],
                declarations: [ComponentWithDebouncedListener],
                providers: [{
                        provide: observe_content_1.MutationObserverFactory,
                        useValue: {
                            create: function (callback) {
                                callbacks.push(callback);
                                return {
                                    observe: function () { },
                                    disconnect: function () { }
                                };
                            }
                        }
                    }]
            });
            testing_1.TestBed.compileComponents();
            fixture = testing_1.TestBed.createComponent(ComponentWithDebouncedListener);
            fixture.detectChanges();
        }));
        it('should debounce the content changes', testing_1.fakeAsync(function () {
            invokeCallbacks();
            invokeCallbacks();
            invokeCallbacks();
            testing_1.tick(500);
            expect(fixture.componentInstance.spy).toHaveBeenCalledTimes(1);
        }));
    });
});
describe('ContentObserver injectable', function () {
    describe('basic usage', function () {
        var callbacks;
        var invokeCallbacks = function (args) { return callbacks.forEach(function (callback) { return callback(args); }); };
        var contentObserver;
        beforeEach(testing_1.fakeAsync(function () {
            callbacks = [];
            testing_1.TestBed.configureTestingModule({
                imports: [observe_content_1.ObserversModule],
                declarations: [UnobservedComponentWithTextContent],
                providers: [{
                        provide: observe_content_1.MutationObserverFactory,
                        useValue: {
                            create: function (callback) {
                                callbacks.push(callback);
                                return {
                                    observe: function () { },
                                    disconnect: function () { }
                                };
                            }
                        }
                    }]
            });
            testing_1.TestBed.compileComponents();
        }));
        beforeEach(testing_1.inject([observe_content_1.ContentObserver], function (co) {
            contentObserver = co;
        }));
        it('should trigger the callback when the content of the element changes', testing_1.fakeAsync(function () {
            var spy = jasmine.createSpy('content observer');
            var fixture = testing_1.TestBed.createComponent(UnobservedComponentWithTextContent);
            fixture.detectChanges();
            contentObserver.observe(fixture.componentInstance.contentEl)
                .subscribe(function () { return spy(); });
            expect(spy).not.toHaveBeenCalled();
            fixture.componentInstance.text = 'text';
            invokeCallbacks();
            expect(spy).toHaveBeenCalled();
        }));
        it('should only create one MutationObserver when observing the same element twice', testing_1.fakeAsync(testing_1.inject([observe_content_1.MutationObserverFactory], function (mof) {
            var spy = jasmine.createSpy('content observer');
            spyOn(mof, 'create').and.callThrough();
            var fixture = testing_1.TestBed.createComponent(UnobservedComponentWithTextContent);
            fixture.detectChanges();
            var sub1 = contentObserver.observe(fixture.componentInstance.contentEl)
                .subscribe(function () { return spy(); });
            contentObserver.observe(fixture.componentInstance.contentEl)
                .subscribe(function () { return spy(); });
            expect(mof.create).toHaveBeenCalledTimes(1);
            fixture.componentInstance.text = 'text';
            invokeCallbacks();
            expect(spy).toHaveBeenCalledTimes(2);
            spy.calls.reset();
            sub1.unsubscribe();
            fixture.componentInstance.text = 'text text';
            invokeCallbacks();
            expect(spy).toHaveBeenCalledTimes(1);
        })));
    });
});
var ComponentWithTextContent = /** @class */ (function () {
    function ComponentWithTextContent() {
        this.text = '';
        this.disabled = false;
    }
    ComponentWithTextContent.prototype.doSomething = function () { };
    ComponentWithTextContent = __decorate([
        core_1.Component({
            template: "\n    <div\n      (cdkObserveContent)=\"doSomething()\"\n      [cdkObserveContentDisabled]=\"disabled\">{{text}}</div>\n  "
        })
    ], ComponentWithTextContent);
    return ComponentWithTextContent;
}());
var ComponentWithChildTextContent = /** @class */ (function () {
    function ComponentWithChildTextContent() {
        this.text = '';
    }
    ComponentWithChildTextContent.prototype.doSomething = function () { };
    ComponentWithChildTextContent = __decorate([
        core_1.Component({ template: "<div (cdkObserveContent)=\"doSomething()\"><div>{{text}}</div></div>" })
    ], ComponentWithChildTextContent);
    return ComponentWithChildTextContent;
}());
var ComponentWithDebouncedListener = /** @class */ (function () {
    function ComponentWithDebouncedListener() {
        this.debounce = 500;
        this.spy = jasmine.createSpy('MutationObserver callback');
    }
    ComponentWithDebouncedListener = __decorate([
        core_1.Component({
            template: "<div (cdkObserveContent)=\"spy($event)\" [debounce]=\"debounce\">{{text}}</div>"
        })
    ], ComponentWithDebouncedListener);
    return ComponentWithDebouncedListener;
}());
var UnobservedComponentWithTextContent = /** @class */ (function () {
    function UnobservedComponentWithTextContent() {
        this.text = '';
    }
    __decorate([
        core_1.ViewChild('contentEl'),
        __metadata("design:type", core_1.ElementRef)
    ], UnobservedComponentWithTextContent.prototype, "contentEl", void 0);
    UnobservedComponentWithTextContent = __decorate([
        core_1.Component({
            template: "<div #contentEl>{{text}}</div>"
        })
    ], UnobservedComponentWithTextContent);
    return UnobservedComponentWithTextContent;
}());
//# sourceMappingURL=observe-content.spec.js.map