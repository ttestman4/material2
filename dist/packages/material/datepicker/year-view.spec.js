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
var year_view_1 = require("./year-view");
describe('MatYearView', function () {
    var dir;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [
                core_2.MatNativeDateModule,
            ],
            declarations: [
                calendar_body_1.MatCalendarBody,
                year_view_1.MatYearView,
                // Test components.
                StandardYearView,
                YearViewWithDateFilter,
            ],
            providers: [
                { provide: bidi_1.Directionality, useFactory: function () { return dir = { value: 'ltr' }; } }
            ]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('standard year view', function () {
        var fixture;
        var testComponent;
        var yearViewNativeElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(StandardYearView);
            fixture.detectChanges();
            var yearViewDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(year_view_1.MatYearView));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });
        it('has correct year label', function () {
            var labelEl = yearViewNativeElement.querySelector('.mat-calendar-body-label');
            expect(labelEl.innerHTML.trim()).toBe('2017');
        });
        it('has 12 months', function () {
            var cellEls = yearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cellEls.length).toBe(12);
        });
        it('shows selected month if in same year', function () {
            var selectedEl = yearViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl.innerHTML.trim()).toBe('MAR');
        });
        it('does not show selected month if in different year', function () {
            testComponent.selected = new Date(2016, testing_3.MAR, 10);
            fixture.detectChanges();
            var selectedEl = yearViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });
        it('fires selected change event on cell clicked', function () {
            var cellEls = yearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            cellEls[cellEls.length - 1].click();
            fixture.detectChanges();
            var selectedEl = yearViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl.innerHTML.trim()).toBe('DEC');
        });
        it('should emit the selected month on cell clicked', function () {
            var cellEls = yearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            cellEls[cellEls.length - 1].click();
            fixture.detectChanges();
            var normalizedMonth = fixture.componentInstance.selectedMonth;
            expect(normalizedMonth.getMonth()).toEqual(11);
        });
        it('should mark active date', function () {
            var cellEls = yearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cellEls[0].innerText.trim()).toBe('JAN');
            expect(cellEls[0].classList).toContain('mat-calendar-body-active');
        });
        it('should allow selection of month with less days than current active date', function () {
            testComponent.date = new Date(2017, testing_3.JUL, 31);
            fixture.detectChanges();
            expect(testComponent.yearView._monthSelected(testing_3.JUN));
            fixture.detectChanges();
            expect(testComponent.selected).toEqual(new Date(2017, testing_3.JUN, 30));
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
                    fixture.componentInstance.date = new Date(2017, testing_3.JAN, 5);
                    testing_1.dispatchFakeEvent(calendarBodyEl, 'focus');
                    fixture.detectChanges();
                });
                it('should decrement month on left arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.DEC, 5));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.NOV, 5));
                });
                it('should increment month on left arrow press in rtl', function () {
                    dir.value = 'rtl';
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.FEB, 5));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.MAR, 5));
                });
                it('should increment month on right arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.FEB, 5));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.MAR, 5));
                });
                it('should decrement month on right arrow press in rtl', function () {
                    dir.value = 'rtl';
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.DEC, 5));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.NOV, 5));
                });
                it('should go up a row on up arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.SEP, 5));
                    calendarInstance.date = new Date(2017, testing_3.JUL, 1);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.MAR, 1));
                    calendarInstance.date = new Date(2017, testing_3.DEC, 10);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.AUG, 10));
                });
                it('should go down a row on down arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.MAY, 5));
                    calendarInstance.date = new Date(2017, testing_3.JUN, 1);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.OCT, 1));
                    calendarInstance.date = new Date(2017, testing_3.SEP, 30);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2018, testing_3.JAN, 30));
                });
                it('should go to first month of the year on home press', function () {
                    calendarInstance.date = new Date(2017, testing_3.SEP, 30);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.HOME);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 30));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.HOME);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 30));
                });
                it('should go to last month of the year on end press', function () {
                    calendarInstance.date = new Date(2017, testing_3.OCT, 31);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.END);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.DEC, 31));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.END);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.DEC, 31));
                });
                it('should go back one year on page up press', function () {
                    calendarInstance.date = new Date(2016, testing_3.FEB, 29);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_UP);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2015, testing_3.FEB, 28));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_UP);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2014, testing_3.FEB, 28));
                });
                it('should go forward one year on page down press', function () {
                    calendarInstance.date = new Date(2016, testing_3.FEB, 29);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_DOWN);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.FEB, 28));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_DOWN);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2018, testing_3.FEB, 28));
                });
            });
        });
    });
    describe('year view with date filter', function () {
        var fixture;
        var yearViewNativeElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(YearViewWithDateFilter);
            fixture.detectChanges();
            var yearViewDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(year_view_1.MatYearView));
            yearViewNativeElement = yearViewDebugElement.nativeElement;
        });
        it('should disable months with no enabled days', function () {
            var cells = yearViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cells[0].classList).not.toContain('mat-calendar-body-disabled');
            expect(cells[1].classList).toContain('mat-calendar-body-disabled');
        });
    });
});
var StandardYearView = /** @class */ (function () {
    function StandardYearView() {
        this.date = new Date(2017, testing_3.JAN, 5);
        this.selected = new Date(2017, testing_3.MAR, 10);
    }
    __decorate([
        core_1.ViewChild(year_view_1.MatYearView),
        __metadata("design:type", year_view_1.MatYearView)
    ], StandardYearView.prototype, "yearView", void 0);
    StandardYearView = __decorate([
        core_1.Component({
            template: "\n    <mat-year-view [(activeDate)]=\"date\" [(selected)]=\"selected\"\n                   (monthSelected)=\"selectedMonth=$event\"></mat-year-view>"
        })
    ], StandardYearView);
    return StandardYearView;
}());
var YearViewWithDateFilter = /** @class */ (function () {
    function YearViewWithDateFilter() {
        this.activeDate = new Date(2017, testing_3.JAN, 1);
    }
    YearViewWithDateFilter.prototype.dateFilter = function (date) {
        if (date.getMonth() == testing_3.JAN) {
            return date.getDate() == 10;
        }
        if (date.getMonth() == testing_3.FEB) {
            return false;
        }
        return true;
    };
    YearViewWithDateFilter = __decorate([
        core_1.Component({
            template: "<mat-year-view [activeDate]=\"activeDate\" [dateFilter]=\"dateFilter\"></mat-year-view>"
        })
    ], YearViewWithDateFilter);
    return YearViewWithDateFilter;
}());
//# sourceMappingURL=year-view.spec.js.map