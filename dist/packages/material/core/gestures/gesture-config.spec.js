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
var platform_browser_1 = require("@angular/platform-browser");
var gesture_config_1 = require("./gesture-config");
describe('GestureConfig', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [ButtonWithLongpressHander],
            providers: [{ provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: gesture_config_1.GestureConfig }]
        }).compileComponents();
    }));
    it('should instantiate HammerJS', function () {
        spyOn(window, 'Hammer').and.callThrough();
        var fixture = testing_1.TestBed.createComponent(ButtonWithLongpressHander);
        fixture.detectChanges();
        expect(window.Hammer).toHaveBeenCalled();
    });
    it('should be able to pass options to HammerJS', function () {
        testing_1.TestBed
            .resetTestingModule()
            .configureTestingModule({
            declarations: [ButtonWithLongpressHander],
            providers: [
                { provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: gesture_config_1.GestureConfig },
                { provide: gesture_config_1.MAT_HAMMER_OPTIONS, useValue: { cssProps: { touchAction: 'auto' } } }
            ]
        })
            .compileComponents();
        spyOn(window, 'Hammer').and.callThrough();
        var fixture = testing_1.TestBed.createComponent(ButtonWithLongpressHander);
        fixture.detectChanges();
        var button = fixture.debugElement.nativeElement.querySelector('button');
        var firstCallArgs = window.Hammer.calls.first().args;
        expect(firstCallArgs[0]).toBe(button);
        expect(firstCallArgs[1].cssProps.touchAction).toBe('auto');
    });
    it('should not error when HammerJS is not loaded', function () {
        // Remove the Hammer global from the environment, storing it to restore at the end of the test.
        var hammerGlobal = window.Hammer;
        window.Hammer = undefined;
        // Stub out `console.warn` so the warnings don't pollute our logs.
        spyOn(console, 'warn');
        testing_1.TestBed
            .resetTestingModule()
            .configureTestingModule({
            declarations: [ButtonWithLongpressHander],
            providers: [{ provide: platform_browser_1.HAMMER_GESTURE_CONFIG, useClass: gesture_config_1.GestureConfig }],
        }).compileComponents();
        var fixture = testing_1.TestBed.createComponent(ButtonWithLongpressHander);
        fixture.detectChanges();
        // No assertions here; the absense of errors satisfies this test.
        // Restore the global Hammer.
        window.Hammer = hammerGlobal;
    });
    // TODO(jelbourn): add a test for use of HAMMER_LOADER when we can depend on Angular 6.1+.
});
var ButtonWithLongpressHander = /** @class */ (function () {
    function ButtonWithLongpressHander() {
    }
    ButtonWithLongpressHander.prototype.noop = function () { };
    ButtonWithLongpressHander = __decorate([
        core_1.Component({
            template: "<button (longpress)=\"noop()\">Long press me</button>"
        })
    ], ButtonWithLongpressHander);
    return ButtonWithLongpressHander;
}());
//# sourceMappingURL=gesture-config.spec.js.map