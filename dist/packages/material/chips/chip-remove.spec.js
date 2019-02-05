"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var testing_1 = require("@angular/core/testing");
var index_1 = require("./index");
describe('Chip Remove', function () {
    var fixture;
    var testChip;
    var chipDebugElement;
    var chipNativeElement;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MatChipsModule],
            declarations: [
                TestChip
            ]
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.async(function () {
        fixture = testing_1.TestBed.createComponent(TestChip);
        testChip = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        chipDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(index_1.MatChip));
        chipNativeElement = chipDebugElement.nativeElement;
    }));
    describe('basic behavior', function () {
        it('should applies the `mat-chip-remove` CSS class', function () {
            var hrefElement = chipNativeElement.querySelector('a');
            expect(hrefElement.classList).toContain('mat-chip-remove');
        });
        it('should emits (removed) on click', function () {
            var hrefElement = chipNativeElement.querySelector('a');
            testChip.removable = true;
            fixture.detectChanges();
            spyOn(testChip, 'didRemove');
            hrefElement.click();
            expect(testChip.didRemove).toHaveBeenCalled();
        });
    });
});
var TestChip = /** @class */ (function () {
    function TestChip() {
    }
    TestChip.prototype.didRemove = function () { };
    TestChip = __decorate([
        core_1.Component({
            template: "\n    <mat-chip [removable]=\"removable\" (removed)=\"didRemove()\"><a matChipRemove></a></mat-chip>\n  "
        })
    ], TestChip);
    return TestChip;
}());
//# sourceMappingURL=chip-remove.spec.js.map