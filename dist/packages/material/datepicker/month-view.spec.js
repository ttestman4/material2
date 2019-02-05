"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var month_view_1 = require("./month-view");
describe('MatMonthView', function () {
    var dir;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [
                core_2.MatNativeDateModule,
            ],
            declarations: [
                calendar_body_1.MatCalendarBody,
                month_view_1.MatMonthView,
                // Test components.
                StandardMonthView,
                MonthViewWithDateFilter,
                MonthViewWithDateClass,
            ],
            providers: [
                { provide: bidi_1.Directionality, useFactory: function () { return dir = { value: 'ltr' }; } }
            ]
        });
        testing_2.TestBed.compileComponents();
    }));
    describe('standard month view', function () {
        var fixture;
        var testComponent;
        var monthViewNativeElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(StandardMonthView);
            fixture.detectChanges();
            var monthViewDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(month_view_1.MatMonthView));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
            testComponent = fixture.componentInstance;
        });
        it('has correct month label', function () {
            var labelEl = monthViewNativeElement.querySelector('.mat-calendar-body-label');
            expect(labelEl.innerHTML.trim()).toBe('JAN');
        });
        it('has 31 days', function () {
            var cellEls = monthViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cellEls.length).toBe(31);
        });
        it('shows selected date if in same month', function () {
            var selectedEl = monthViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl.innerHTML.trim()).toBe('10');
        });
        it('does not show selected date if in different month', function () {
            testComponent.selected = new Date(2017, testing_3.MAR, 10);
            fixture.detectChanges();
            var selectedEl = monthViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl).toBeNull();
        });
        it('fires selected change event on cell clicked', function () {
            var cellEls = monthViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            cellEls[cellEls.length - 1].click();
            fixture.detectChanges();
            var selectedEl = monthViewNativeElement.querySelector('.mat-calendar-body-selected');
            expect(selectedEl.innerHTML.trim()).toBe('31');
        });
        it('should mark active date', function () {
            var cellEls = monthViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cellEls[4].innerText.trim()).toBe('5');
            expect(cellEls[4].classList).toContain('mat-calendar-body-active');
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
                it('should decrement date on left arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 4));
                    calendarInstance.date = new Date(2017, testing_3.JAN, 1);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.DEC, 31));
                });
                it('should increment date on left arrow press in rtl', function () {
                    dir.value = 'rtl';
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 6));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 7));
                });
                it('should increment date on right arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 6));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 7));
                });
                it('should decrement date on right arrow press in rtl', function () {
                    dir.value = 'rtl';
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 4));
                    calendarInstance.date = new Date(2017, testing_3.JAN, 1);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.RIGHT_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.DEC, 31));
                });
                it('should go up a row on up arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.DEC, 29));
                    calendarInstance.date = new Date(2017, testing_3.JAN, 7);
                    fixture.detectChanges();
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.UP_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.DEC, 31));
                });
                it('should go down a row on down arrow press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 12));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.DOWN_ARROW);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 19));
                });
                it('should go to beginning of the month on home press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.HOME);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 1));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.HOME);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 1));
                });
                it('should go to end of the month on end press', function () {
                    calendarInstance.date = new Date(2017, testing_3.JAN, 10);
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.END);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 31));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.END);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.JAN, 31));
                });
                it('should go back one month on page up press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_UP);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.DEC, 5));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_UP);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2016, testing_3.NOV, 5));
                });
                it('should go forward one month on page down press', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_DOWN);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.FEB, 5));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.PAGE_DOWN);
                    fixture.detectChanges();
                    expect(calendarInstance.date).toEqual(new Date(2017, testing_3.MAR, 5));
                });
                it('should select active date on enter', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(testComponent.selected).toEqual(new Date(2017, testing_3.JAN, 10));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.ENTER);
                    fixture.detectChanges();
                    expect(testComponent.selected).toEqual(new Date(2017, testing_3.JAN, 4));
                });
                it('should select active date on space', function () {
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.LEFT_ARROW);
                    fixture.detectChanges();
                    expect(testComponent.selected).toEqual(new Date(2017, testing_3.JAN, 10));
                    testing_1.dispatchKeyboardEvent(calendarBodyEl, 'keydown', keycodes_1.SPACE);
                    fixture.detectChanges();
                    expect(testComponent.selected).toEqual(new Date(2017, testing_3.JAN, 4));
                });
            });
        });
    });
    describe('month view with date filter', function () {
        var fixture;
        var monthViewNativeElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(MonthViewWithDateFilter);
            fixture.detectChanges();
            var monthViewDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(month_view_1.MatMonthView));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
        });
        it('should disable filtered dates', function () {
            var cells = monthViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cells[0].classList).toContain('mat-calendar-body-disabled');
            expect(cells[1].classList).not.toContain('mat-calendar-body-disabled');
        });
    });
    describe('month view with custom date classes', function () {
        var fixture;
        var monthViewNativeElement;
        beforeEach(function () {
            fixture = testing_2.TestBed.createComponent(MonthViewWithDateClass);
            fixture.detectChanges();
            var monthViewDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(month_view_1.MatMonthView));
            monthViewNativeElement = monthViewDebugElement.nativeElement;
        });
        it('should be able to add a custom class to some dates', function () {
            var cells = monthViewNativeElement.querySelectorAll('.mat-calendar-body-cell');
            expect(cells[0].classList).not.toContain('even');
            expect(cells[1].classList).toContain('even');
        });
    });
});
var StandardMonthView = /** @class */ (function () {
    function StandardMonthView() {
        this.date = new Date(2017, testing_3.JAN, 5);
        this.selected = new Date(2017, testing_3.JAN, 10);
    }
    StandardMonthView = __decorate([
        core_1.Component({
            template: "<mat-month-view [(activeDate)]=\"date\" [(selected)]=\"selected\"></mat-month-view>",
        })
    ], StandardMonthView);
    return StandardMonthView;
}());
var MonthViewWithDateFilter = /** @class */ (function () {
    function MonthViewWithDateFilter() {
        this.activeDate = new Date(2017, testing_3.JAN, 1);
    }
    MonthViewWithDateFilter.prototype.dateFilter = function (date) {
        return date.getDate() % 2 == 0;
    };
    MonthViewWithDateFilter = __decorate([
        core_1.Component({
            template: "<mat-month-view [activeDate]=\"activeDate\" [dateFilter]=\"dateFilter\"></mat-month-view>"
        })
    ], MonthViewWithDateFilter);
    return MonthViewWithDateFilter;
}());
var MonthViewWithDateClass = /** @class */ (function () {
    function MonthViewWithDateClass() {
        this.activeDate = new Date(2017, testing_3.JAN, 1);
    }
    MonthViewWithDateClass.prototype.dateClass = function (date) {
        return date.getDate() % 2 == 0 ? 'even' : undefined;
    };
    MonthViewWithDateClass = __decorate([
        core_1.Component({
            template: "<mat-month-view [activeDate]=\"activeDate\" [dateClass]=\"dateClass\"></mat-month-view>"
        })
    ], MonthViewWithDateClass);
    return MonthViewWithDateClass;
}());
//# sourceMappingURL=month-view.spec.js.map