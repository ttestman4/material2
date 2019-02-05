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
var bidi_1 = require("@angular/cdk/bidi");
var keycodes_1 = require("@angular/cdk/keycodes");
var testing_1 = require("@angular/cdk/testing");
var core_1 = require("@angular/core");
var testing_2 = require("@angular/core/testing");
var core_2 = require("@angular/material/core");
var testing_3 = require("@angular/material/testing");
var platform_browser_1 = require("@angular/platform-browser");
var calendar_body_1 = require("./calendar-body");
var multi_year_view_1 = require("./multi-year-view");
describe('MatMultiYearView', function () {
    var dir;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [
                core_2.MatNativeDateModule,
            ],
            declarations: [
                calendar_body_1.MatCalendarBody,
                multi_year_view_1.MatMultiYearView,
                // Test components.
                StandardMultiYearView,
                MultiYearViewWithDateFilter,
            ],
            providers: [
                { provide: bidi_1.Directionality, useFactory: function () { return dir = { value: 'ltr' }; } }
            ]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('standard multi-year view', function () {
        var fixture;
        var testComponent;
        var multiYearViewNativeElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(StandardMultiYearView);
            fixture.detectChanges();
            var multiYearViewDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(multi_year_view_1.MatMultiYearView));
            multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });
        it('has correct number of years', function () {
            var cellEls = multiYearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cellEls.length).toBe(multi_year_view_1.yearsPerPage);
        });
        it('shows selected year if in same range', function () {
            var selectedEl = multiYearViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl.innerHTML.trim()).toBe('2020');
        });
        it('does not show selected year if in different range', function () {
            testComponent.selected = new Date(2040, testing_3.JAN, 10);
            fixture.detectChanges();
            var selectedEl = multiYearViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });
        it('fires selected change event on cell clicked', function () {
            var cellEls = multiYearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            cellEls[cellEls.length - 1].click();
            fixture.detectChanges();
            var selectedEl = multiYearViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl.innerHTML.trim()).toBe('2039');
        });
        it('should emit the selected year on cell clicked', function () {
            var cellEls = multiYearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            cellEls[1].click();
            fixture.detectChanges();
            var normalizedYear = fixture.componentInstance.selectedYear;
            expect(normalizedYear.getFullYear()).toEqual(2017);
        });
        it('should mark active date', function () {
            var cellEls = multiYearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cellEls[1].innerText.trim()).toBe('2017');
            expect(cellEls[1].classList).toContain('mat-calendar-body-active');
        });
        describe('a11y', function () {
            describe('calendar body', function () {
                var calendarBodyEl;
                var calendarInstance;
                beforeEach(function () {
                    calendarInstance = fixture.componentInstance;
                    calendarBodyEl =
                        fixture.debugElement.nativeElement.querySelector('.mat-calendar-body');
                    expect(calendarBodyEl).not.toBeNull();
                    dir.value = 'ltr';
                    fixture.componentInstance.date = new Date(2017, testing_3.JAN, 1);
                    testing_1.dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });
                it('should decrement year on left arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2015, testing_3.JAN, 1));
                });
                it('should increment year on right arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2018, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2019, testing_3.JAN, 1));
                });
                it('should go up a row on up arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 - multi_year_view_1.yearsPerRow, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 - multi_year_view_1.yearsPerRow * 2, testing_3.JAN, 1));
                });
                it('should go down a row on down arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 + multi_year_view_1.yearsPerRow, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 + multi_year_view_1.yearsPerRow * 2, testing_3.JAN, 1));
                });
                it('should go to first year in current range on home press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.HOME);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.HOME);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.JAN, 1));
                });
                it('should go to last year in current range on end press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.END);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2039, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.END);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2039, testing_3.JAN, 1));
                });
                it('should go to same index in previous year range page up press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_UP);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 - multi_year_view_1.yearsPerPage, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_UP);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 - multi_year_view_1.yearsPerPage * 2, testing_3.JAN, 1));
                });
                it('should go to same index in next year range on page down press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_DOWN);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 + multi_year_view_1.yearsPerPage, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_DOWN);
                    fixture.detectChanges();
                    expect(calendarInstance.date)
                        .toEqual(new Date(2017 + multi_year_view_1.yearsPerPage * 2, testing_3.JAN, 1));
                });
            });
        });
    });
    describe('multi year view with date filter', function () {
        var fixture;
        var multiYearViewNativeElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(MultiYearViewWithDateFilter);
            fixture.detectChanges();
            var multiYearViewDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(multi_year_view_1.MatMultiYearView));
            multiYearViewNativeElement = multiYearViewDebugElement.nativeElement;
        });
        it('should disablex years with no enabled days', function () {
            var cells = multiYearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cells[0].classList).not.toContain('mat-calendar-body-disabled');
            expect(cells[1].classList).toContain('mat-calendar-body-disabled');
        });
    });
});
var StandardMultiYearView = /** @class */ (function () {
    function StandardMultiYearView() {
        this.date = new Date(2017, testing_3.JAN, 1);
        this.selected = new Date(2020, testing_3.JAN, 1);
    }
    __decorate([
        core_1.ViewChild(multi_year_view_1.MatMultiYearView),
        __metadata("design:type", multi_year_view_1.MatMultiYearView)
    ], StandardMultiYearView.prototype, "multiYearView", void 0);
    StandardMultiYearView = __decorate([
        core_1.Component({
            template: "\n    <mat-multi-year-view [(activeDate)]=\"date\" [(selected)]=\"selected\"\n                         (yearSelected)=\"selectedYear=$event\"></mat-multi-year-view>"
        })
    ], StandardMultiYearView);
    return StandardMultiYearView;
}());
var MultiYearViewWithDateFilter = /** @class */ (function () {
    function MultiYearViewWithDateFilter() {
        this.activeDate = new Date(2017, testing_3.JAN, 1);
    }
    MultiYearViewWithDateFilter.prototype.dateFilter = function (date) {
        return date.getFullYear() !== 2017;
    };
    MultiYearViewWithDateFilter = __decorate([
        core_1.Component({
            template: "\n    <mat-multi-year-view [activeDate]=\"activeDate\" [dateFilter]=\"dateFilter\"></mat-multi-year-view>\n    "
        })
    ], MultiYearViewWithDateFilter);
    return MultiYearViewWithDateFilter;
}());
//# sourceMappingURL=multi-year-view.spec.js.map