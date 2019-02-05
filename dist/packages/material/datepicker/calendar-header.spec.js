"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var core_2 = require("@angular/material/core");
var testing_2 = require("@angular/material/testing");
var platform_browser_1 = require("@angular/platform-browser");
var calendar_1 = require("./calendar");
var datepicker_intl_1 = require("./datepicker-intl");
var datepicker_module_1 = require("./datepicker-module");
var multi_year_view_1 = require("./multi-year-view");
describe('MatCalendarHeader', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                core_2.MatNativeDateModule,
                datepicker_module_1.MatDatepickerModule,
            ],
            declarations: [
                // Test components.
                StandardCalendar,
            ],
            providers: [
                datepicker_intl_1.MatDatepickerIntl,
                { provide: bidi_1.Directionality, useFactory: function () { return ({ value: 'ltr' }); } },
            ],
        });
        testing_1.TestBed.compileComponents();
    }));
    describe('standard calendar', function () {
        var fixture;
        var testComponent;
        var calendarElement;
        var periodButton;
        var prevButton;
        var nextButton;
        var calendarInstance;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(StandardCalendar);
            fixture.detectChanges();
            var calendarDebugElement = fixture.debugElement.query(platform_browser_1.By.directive(calendar_1.MatCalendar));
            calendarElement = calendarDebugElement.nativeElement;
            periodButton = calendarElement.querySelector('.mat-calendar-period-button');
            prevButton = calendarElement.querySelector('.mat-calendar-previous-button');
            nextButton = calendarElement.querySelector('.mat-calendar-next-button');
            calendarInstance = calendarDebugElement.componentInstance;
            testComponent = fixture.componentInstance;
        });
        it('should be in month view with specified month active', function () {
            expect(calendarInstance.currentView).toBe('month');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 31));
        });
        it('should toggle view when period clicked', function () {
            expect(calendarInstance.currentView).toBe('month');
            periodButton.click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('multi-year');
            periodButton.click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('month');
        });
        it('should go to next and previous month', function () {
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 31));
            nextButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.FEB, 28));
            prevButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 28));
        });
        it('should go to previous and next year', function () {
            periodButton.click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 31));
            calendarElement.querySelector('.mat-calendar-body-active').click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('year');
            nextButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2018, testing_2.JAN, 31));
            prevButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 31));
        });
        it('should go to previous and next multi-year range', function () {
            periodButton.click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 31));
            nextButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2017 + multi_year_view_1.yearsPerPage, testing_2.JAN, 31));
            prevButton.click();
            fixture.detectChanges();
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 31));
        });
        it('should go back to month view after selecting year and month', function () {
            periodButton.click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('multi-year');
            expect(calendarInstance.activeDate).toEqual(new Date(2017, testing_2.JAN, 31));
            var yearCells = calendarElement.querySelectorAll('.mat-calendar-body-cell');
            yearCells[0].click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('year');
            expect(calendarInstance.activeDate).toEqual(new Date(2016, testing_2.JAN, 31));
            var monthCells = calendarElement.querySelectorAll('.mat-calendar-body-cell');
            monthCells[monthCells.length - 1].click();
            fixture.detectChanges();
            expect(calendarInstance.currentView).toBe('month');
            expect(calendarInstance.activeDate).toEqual(new Date(2016, testing_2.DEC, 31));
            expect(testComponent.selected).toBeFalsy('no date should be selected yet');
        });
    });
});
var StandardCalendar = /** @class */ (function () {
    function StandardCalendar() {
        this.startDate = new Date(2017, testing_2.JAN, 31);
    }
    StandardCalendar = __decorate([
        core_1.Component({
            template: "\n    <mat-calendar\n        [startAt]=\"startDate\"\n        [(selected)]=\"selected\"\n        (yearSelected)=\"selectedYear=$event\"\n        (monthSelected)=\"selectedMonth=$event\">\n    </mat-calendar>"
        })
    ], StandardCalendar);
    return StandardCalendar;
}());
//# sourceMappingURL=calendar-header.spec.js.map