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
var platform_browser_1 = require("@angular/platform-browser");
var index_1 = require("./index");
describe('Directionality', function () {
    var fakeDocument;
    beforeEach(testing_1.async(function () {
        fakeDocument = { body: {}, documentElement: {} };
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.BidiModule],
            declarations: [ElementWithDir, ElementWithPredefinedAutoDir, InjectsDirectionality],
            providers: [{ provide: index_1.DIR_DOCUMENT, useFactory: function () { return fakeDocument; } }],
        }).compileComponents();
    }));
    describe('Service', function () {
        it('should read dir from the html element if not specified on the body', function () {
            fakeDocument.documentElement.dir = 'rtl';
            var fixture = testing_1.TestBed.createComponent(InjectsDirectionality);
            var testComponent = fixture.debugElement.componentInstance;
            expect(testComponent.dir.value).toBe('rtl');
        });
        it('should read dir from the body even it is also specified on the html element', function () {
            fakeDocument.documentElement.dir = 'ltr';
            fakeDocument.body.dir = 'rtl';
            var fixture = testing_1.TestBed.createComponent(InjectsDirectionality);
            var testComponent = fixture.debugElement.componentInstance;
            expect(testComponent.dir.value).toBe('rtl');
        });
        it('should default to ltr if nothing is specified on either body or the html element', function () {
            var fixture = testing_1.TestBed.createComponent(InjectsDirectionality);
            var testComponent = fixture.debugElement.componentInstance;
            expect(testComponent.dir.value).toBe('ltr');
        });
        it('should complete the `change` stream on destroy', function () {
            var fixture = testing_1.TestBed.createComponent(InjectsDirectionality);
            var spy = jasmine.createSpy('complete spy');
            var subscription = fixture.componentInstance.dir.change.subscribe(undefined, undefined, spy);
            fixture.componentInstance.dir.ngOnDestroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        });
        it('should default to ltr if an invalid direction is set on the body', function () {
            fakeDocument.body.dir = 'not-valid';
            var fixture = testing_1.TestBed.createComponent(InjectsDirectionality);
            var testComponent = fixture.debugElement.componentInstance;
            expect(testComponent.dir.value).toBe('ltr');
        });
    });
    describe('Dir directive', function () {
        it('should provide itself as Directionality', function () {
            var fixture = testing_1.TestBed.createComponent(ElementWithDir);
            var injectedDirectionality = fixture.debugElement.query(platform_browser_1.By.directive(InjectsDirectionality)).componentInstance.dir;
            fixture.detectChanges();
            expect(injectedDirectionality.value).toBe('rtl');
        });
        it('should emit a change event when the value changes', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(ElementWithDir);
            var injectedDirectionality = fixture.debugElement.query(platform_browser_1.By.directive(InjectsDirectionality)).componentInstance.dir;
            fixture.detectChanges();
            var direction = injectedDirectionality.value;
            injectedDirectionality.change.subscribe(function (dir) { direction = dir; });
            expect(direction).toBe('rtl');
            expect(injectedDirectionality.value).toBe('rtl');
            expect(fixture.componentInstance.changeCount).toBe(0);
            fixture.componentInstance.direction = 'ltr';
            fixture.detectChanges();
            expect(direction).toBe('ltr');
            expect(injectedDirectionality.value).toBe('ltr');
            expect(fixture.componentInstance.changeCount).toBe(1);
        }));
        it('should complete the change stream on destroy', testing_1.fakeAsync(function () {
            var fixture = testing_1.TestBed.createComponent(ElementWithDir);
            var dir = fixture.debugElement.query(platform_browser_1.By.directive(InjectsDirectionality)).componentInstance.dir;
            var spy = jasmine.createSpy('complete spy');
            var subscription = dir.change.subscribe(undefined, undefined, spy);
            fixture.destroy();
            expect(spy).toHaveBeenCalled();
            subscription.unsubscribe();
        }));
        it('should default to ltr if an invalid value is passed in', function () {
            var fixture = testing_1.TestBed.createComponent(ElementWithDir);
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe('rtl');
            fixture.componentInstance.direction = 'not-valid';
            fixture.detectChanges();
            expect(fixture.componentInstance.dir.value).toBe('ltr');
        });
        it('should preserve the consumer-provided `dir` attribute while ' +
            'normalizing the directive value', function () {
            var fixture = testing_1.TestBed.createComponent(ElementWithPredefinedAutoDir);
            fixture.detectChanges();
            var element = fixture.nativeElement.querySelector('div');
            expect(element.getAttribute('dir')).toBe('auto');
            expect(fixture.componentInstance.dir.value).toBe('ltr');
        });
    });
});
var ElementWithDir = /** @class */ (function () {
    function ElementWithDir() {
        this.direction = 'rtl';
        this.changeCount = 0;
    }
    __decorate([
        core_1.ViewChild(index_1.Dir),
        __metadata("design:type", index_1.Dir)
    ], ElementWithDir.prototype, "dir", void 0);
    ElementWithDir = __decorate([
        core_1.Component({
            template: "\n    <div [dir]=\"direction\" (dirChange)=\"changeCount = changeCount + 1\">\n      <injects-directionality></injects-directionality>\n    </div>\n  "
        })
    ], ElementWithDir);
    return ElementWithDir;
}());
var ElementWithPredefinedAutoDir = /** @class */ (function () {
    function ElementWithPredefinedAutoDir() {
    }
    __decorate([
        core_1.ViewChild(index_1.Dir),
        __metadata("design:type", index_1.Dir)
    ], ElementWithPredefinedAutoDir.prototype, "dir", void 0);
    ElementWithPredefinedAutoDir = __decorate([
        core_1.Component({
            template: '<div dir="auto"></div>'
        })
    ], ElementWithPredefinedAutoDir);
    return ElementWithPredefinedAutoDir;
}());
/** Test component with Dir directive. */
var InjectsDirectionality = /** @class */ (function () {
    function InjectsDirectionality(dir) {
        this.dir = dir;
    }
    InjectsDirectionality = __decorate([
        core_1.Component({
            selector: 'injects-directionality',
            template: "<div></div>"
        }),
        __metadata("design:paramtypes", [index_1.Directionality])
    ], InjectsDirectionality);
    return InjectsDirectionality;
}());
//# sourceMappingURL=directionality.spec.js.map