"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var core_2 = require("@angular/material/core");
var testing_2 = require("@angular/material/testing");
var index_1 = require("./index");
var moment_date_adapter_1 = require("./moment-date-adapter");
var moment = require("moment");
describe('MomentDateAdapter', function () {
    var adapter;
    var assertValidDate;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MomentDateModule]
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([core_2.DateAdapter], function (dateAdapter) {
        moment.locale('en');
        adapter = dateAdapter;
        adapter.setLocale('en');
        assertValidDate = function (d, valid) {
            expect(adapter.isDateInstance(d)).not.toBeNull("Expected " + d + " to be a date instance");
            expect(adapter.isValid(d)).toBe(valid, "Expected " + d + " to be " + (valid ? 'valid' : 'invalid') + "," +
                (" but was " + (valid ? 'invalid' : 'valid')));
        };
    }));
    it('should get year', function () {
        expect(adapter.getYear(moment([2017, testing_2.JAN, 1]))).toBe(2017);
    });
    it('should get month', function () {
        expect(adapter.getMonth(moment([2017, testing_2.JAN, 1]))).toBe(0);
    });
    it('should get date', function () {
        expect(adapter.getDate(moment([2017, testing_2.JAN, 1]))).toBe(1);
    });
    it('should get day of week', function () {
        expect(adapter.getDayOfWeek(moment([2017, testing_2.JAN, 1]))).toBe(0);
    });
    it('should get same day of week in a locale with a different first day of the week', function () {
        adapter.setLocale('fr');
        expect(adapter.getDayOfWeek(moment([2017, testing_2.JAN, 1]))).toBe(0);
    });
    it('should get long month names', function () {
        expect(adapter.getMonthNames('long')).toEqual([
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ]);
    });
    it('should get short month names', function () {
        expect(adapter.getMonthNames('short')).toEqual([
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]);
    });
    it('should get narrow month names', function () {
        expect(adapter.getMonthNames('narrow')).toEqual([
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]);
    });
    it('should get month names in a different locale', function () {
        adapter.setLocale('ja-JP');
        expect(adapter.getMonthNames('long')).toEqual([
            '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
        ]);
    });
    it('should get date names', function () {
        expect(adapter.getDateNames()).toEqual([
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
            '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
        ]);
    });
    it('should get date names in a different locale', function () {
        adapter.setLocale('ar-AE');
        expect(adapter.getDateNames()).toEqual([
            '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢', '١٣', '١٤', '١٥', '١٦',
            '١٧', '١٨', '١٩', '٢٠', '٢١', '٢٢', '٢٣', '٢٤', '٢٥', '٢٦', '٢٧', '٢٨', '٢٩', '٣٠', '٣١'
        ]);
    });
    it('should get long day of week names', function () {
        expect(adapter.getDayOfWeekNames('long')).toEqual([
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ]);
    });
    it('should get short day of week names', function () {
        expect(adapter.getDayOfWeekNames('short')).toEqual([
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
        ]);
    });
    it('should get narrow day of week names', function () {
        expect(adapter.getDayOfWeekNames('narrow')).toEqual([
            'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'
        ]);
    });
    it('should get day of week names in a different locale', function () {
        adapter.setLocale('ja-JP');
        expect(adapter.getDayOfWeekNames('long')).toEqual([
            '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'
        ]);
    });
    it('should get year name', function () {
        expect(adapter.getYearName(moment([2017, testing_2.JAN, 1]))).toBe('2017');
    });
    it('should get year name in a different locale', function () {
        adapter.setLocale('ar-AE');
        expect(adapter.getYearName(moment([2017, testing_2.JAN, 1]))).toBe('٢٠١٧');
    });
    it('should get first day of week', function () {
        expect(adapter.getFirstDayOfWeek()).toBe(0);
    });
    it('should get first day of week in a different locale', function () {
        adapter.setLocale('fr');
        expect(adapter.getFirstDayOfWeek()).toBe(1);
    });
    it('should create Moment date', function () {
        expect(adapter.createDate(2017, testing_2.JAN, 1).format())
            .toEqual(moment([2017, testing_2.JAN, 1]).format());
    });
    it('should not create Moment date with month over/under-flow', function () {
        expect(function () { return adapter.createDate(2017, testing_2.DEC + 1, 1); }).toThrow();
        expect(function () { return adapter.createDate(2017, testing_2.JAN - 1, 1); }).toThrow();
    });
    it('should not create Moment date with date over/under-flow', function () {
        expect(function () { return adapter.createDate(2017, testing_2.JAN, 32); }).toThrow();
        expect(function () { return adapter.createDate(2017, testing_2.JAN, 0); }).toThrow();
    });
    it('should create Moment date with low year number', function () {
        expect(adapter.createDate(-1, testing_2.JAN, 1).year()).toBe(-1);
        expect(adapter.createDate(0, testing_2.JAN, 1).year()).toBe(0);
        expect(adapter.createDate(50, testing_2.JAN, 1).year()).toBe(50);
        expect(adapter.createDate(99, testing_2.JAN, 1).year()).toBe(99);
        expect(adapter.createDate(100, testing_2.JAN, 1).year()).toBe(100);
    });
    it('should not create Moment date in utc format', function () {
        expect(adapter.createDate(2017, testing_2.JAN, 5).isUTC()).toEqual(false);
    });
    it("should get today's date", function () {
        expect(adapter.sameDate(adapter.today(), moment()))
            .toBe(true, "should be equal to today's date");
    });
    it('should parse string according to given format', function () {
        expect(adapter.parse('1/2/2017', 'MM/DD/YYYY').format())
            .toEqual(moment([2017, testing_2.JAN, 2]).format());
        expect(adapter.parse('1/2/2017', 'DD/MM/YYYY').format())
            .toEqual(moment([2017, testing_2.FEB, 1]).format());
    });
    it('should parse number', function () {
        var timestamp = new Date().getTime();
        expect(adapter.parse(timestamp, 'MM/DD/YYYY').format()).toEqual(moment(timestamp).format());
    });
    it('should parse Date', function () {
        var date = new Date(2017, testing_2.JAN, 1);
        expect(adapter.parse(date, 'MM/DD/YYYY').format()).toEqual(moment(date).format());
    });
    it('should parse Moment date', function () {
        var date = moment([2017, testing_2.JAN, 1]);
        var parsedDate = adapter.parse(date, 'MM/DD/YYYY');
        expect(parsedDate.format()).toEqual(date.format());
        expect(parsedDate).not.toBe(date);
    });
    it('should parse empty string as null', function () {
        expect(adapter.parse('', 'MM/DD/YYYY')).toBeNull();
    });
    it('should parse invalid value as invalid', function () {
        var d = adapter.parse('hello', 'MM/DD/YYYY');
        expect(d).not.toBeNull();
        expect(adapter.isDateInstance(d))
            .toBe(true, 'Expected string to have been fed through Date.parse');
        expect(adapter.isValid(d))
            .toBe(false, 'Expected to parse as "invalid date" object');
    });
    it('should format date according to given format', function () {
        expect(adapter.format(moment([2017, testing_2.JAN, 2]), 'MM/DD/YYYY')).toEqual('01/02/2017');
        expect(adapter.format(moment([2017, testing_2.JAN, 2]), 'DD/MM/YYYY')).toEqual('02/01/2017');
    });
    it('should format with a different locale', function () {
        expect(adapter.format(moment([2017, testing_2.JAN, 2]), 'll')).toEqual('Jan 2, 2017');
        adapter.setLocale('ja-JP');
        expect(adapter.format(moment([2017, testing_2.JAN, 2]), 'll')).toEqual('2017年1月2日');
    });
    it('should throw when attempting to format invalid date', function () {
        expect(function () { return adapter.format(moment(NaN), 'MM/DD/YYYY'); })
            .toThrowError(/MomentDateAdapter: Cannot format invalid date\./);
    });
    it('should add years', function () {
        expect(adapter.addCalendarYears(moment([2017, testing_2.JAN, 1]), 1).format())
            .toEqual(moment([2018, testing_2.JAN, 1]).format());
        expect(adapter.addCalendarYears(moment([2017, testing_2.JAN, 1]), -1).format())
            .toEqual(moment([2016, testing_2.JAN, 1]).format());
    });
    it('should respect leap years when adding years', function () {
        expect(adapter.addCalendarYears(moment([2016, testing_2.FEB, 29]), 1).format())
            .toEqual(moment([2017, testing_2.FEB, 28]).format());
        expect(adapter.addCalendarYears(moment([2016, testing_2.FEB, 29]), -1).format())
            .toEqual(moment([2015, testing_2.FEB, 28]).format());
    });
    it('should add months', function () {
        expect(adapter.addCalendarMonths(moment([2017, testing_2.JAN, 1]), 1).format())
            .toEqual(moment([2017, testing_2.FEB, 1]).format());
        expect(adapter.addCalendarMonths(moment([2017, testing_2.JAN, 1]), -1).format())
            .toEqual(moment([2016, testing_2.DEC, 1]).format());
    });
    it('should respect month length differences when adding months', function () {
        expect(adapter.addCalendarMonths(moment([2017, testing_2.JAN, 31]), 1).format())
            .toEqual(moment([2017, testing_2.FEB, 28]).format());
        expect(adapter.addCalendarMonths(moment([2017, testing_2.MAR, 31]), -1).format())
            .toEqual(moment([2017, testing_2.FEB, 28]).format());
    });
    it('should add days', function () {
        expect(adapter.addCalendarDays(moment([2017, testing_2.JAN, 1]), 1).format())
            .toEqual(moment([2017, testing_2.JAN, 2]).format());
        expect(adapter.addCalendarDays(moment([2017, testing_2.JAN, 1]), -1).format())
            .toEqual(moment([2016, testing_2.DEC, 31]).format());
    });
    it('should clone', function () {
        var date = moment([2017, testing_2.JAN, 1]);
        expect(adapter.clone(date).format()).toEqual(date.format());
        expect(adapter.clone(date)).not.toBe(date);
    });
    it('should compare dates', function () {
        expect(adapter.compareDate(moment([2017, testing_2.JAN, 1]), moment([2017, testing_2.JAN, 2]))).toBeLessThan(0);
        expect(adapter.compareDate(moment([2017, testing_2.JAN, 1]), moment([2017, testing_2.FEB, 1]))).toBeLessThan(0);
        expect(adapter.compareDate(moment([2017, testing_2.JAN, 1]), moment([2018, testing_2.JAN, 1]))).toBeLessThan(0);
        expect(adapter.compareDate(moment([2017, testing_2.JAN, 1]), moment([2017, testing_2.JAN, 1]))).toBe(0);
        expect(adapter.compareDate(moment([2018, testing_2.JAN, 1]), moment([2017, testing_2.JAN, 1]))).toBeGreaterThan(0);
        expect(adapter.compareDate(moment([2017, testing_2.FEB, 1]), moment([2017, testing_2.JAN, 1]))).toBeGreaterThan(0);
        expect(adapter.compareDate(moment([2017, testing_2.JAN, 2]), moment([2017, testing_2.JAN, 1]))).toBeGreaterThan(0);
    });
    it('should clamp date at lower bound', function () {
        expect(adapter.clampDate(moment([2017, testing_2.JAN, 1]), moment([2018, testing_2.JAN, 1]), moment([2019, testing_2.JAN, 1])))
            .toEqual(moment([2018, testing_2.JAN, 1]));
    });
    it('should clamp date at upper bound', function () {
        expect(adapter.clampDate(moment([2020, testing_2.JAN, 1]), moment([2018, testing_2.JAN, 1]), moment([2019, testing_2.JAN, 1])))
            .toEqual(moment([2019, testing_2.JAN, 1]));
    });
    it('should clamp date already within bounds', function () {
        expect(adapter.clampDate(moment([2018, testing_2.FEB, 1]), moment([2018, testing_2.JAN, 1]), moment([2019, testing_2.JAN, 1])))
            .toEqual(moment([2018, testing_2.FEB, 1]));
    });
    it('should count today as a valid date instance', function () {
        var d = moment();
        expect(adapter.isValid(d)).toBe(true);
        expect(adapter.isDateInstance(d)).toBe(true);
    });
    it('should count an invalid date as an invalid date instance', function () {
        var d = moment(NaN);
        expect(adapter.isValid(d)).toBe(false);
        expect(adapter.isDateInstance(d)).toBe(true);
    });
    it('should count a string as not a date instance', function () {
        var d = '1/1/2017';
        expect(adapter.isDateInstance(d)).toBe(false);
    });
    it('should count a Date as not a date instance', function () {
        var d = new Date();
        expect(adapter.isDateInstance(d)).toBe(false);
    });
    it('should create valid dates from valid ISO strings', function () {
        assertValidDate(adapter.deserialize('1985-04-12T23:20:50.52Z'), true);
        assertValidDate(adapter.deserialize('1996-12-19T16:39:57-08:00'), true);
        assertValidDate(adapter.deserialize('1937-01-01T12:00:27.87+00:20'), true);
        assertValidDate(adapter.deserialize('1990-13-31T23:59:00Z'), false);
        assertValidDate(adapter.deserialize('1/1/2017'), false);
        expect(adapter.deserialize('')).toBeNull();
        expect(adapter.deserialize(null)).toBeNull();
        assertValidDate(adapter.deserialize(new Date()), true);
        assertValidDate(adapter.deserialize(new Date(NaN)), false);
        assertValidDate(adapter.deserialize(moment()), true);
        assertValidDate(adapter.deserialize(moment.invalid()), false);
    });
    it('should clone the date when deserializing a Moment date', function () {
        var date = moment([2017, testing_2.JAN, 1]);
        expect(adapter.deserialize(date).format()).toEqual(date.format());
        expect(adapter.deserialize(date)).not.toBe(date);
    });
    it('should deserialize dates with the correct locale', function () {
        adapter.setLocale('ja');
        expect(adapter.deserialize('1985-04-12T23:20:50.52Z').locale()).toBe('ja');
        expect(adapter.deserialize(new Date()).locale()).toBe('ja');
        expect(adapter.deserialize(moment()).locale()).toBe('ja');
    });
    it('setLocale should not modify global moment locale', function () {
        expect(moment.locale()).toBe('en');
        adapter.setLocale('ja-JP');
        expect(moment.locale()).toBe('en');
    });
    it('returned Moments should have correct locale', function () {
        adapter.setLocale('ja-JP');
        expect(adapter.createDate(2017, testing_2.JAN, 1).locale()).toBe('ja');
        expect(adapter.today().locale()).toBe('ja');
        expect(adapter.clone(moment()).locale()).toBe('ja');
        expect(adapter.parse('1/1/2017', 'MM/DD/YYYY').locale()).toBe('ja');
        expect(adapter.addCalendarDays(moment(), 1).locale()).toBe('ja');
        expect(adapter.addCalendarMonths(moment(), 1).locale()).toBe('ja');
        expect(adapter.addCalendarYears(moment(), 1).locale()).toBe('ja');
    });
    it('should not change locale of Moments passed as params', function () {
        var date = moment();
        expect(date.locale()).toBe('en');
        adapter.setLocale('ja-JP');
        adapter.getYear(date);
        adapter.getMonth(date);
        adapter.getDate(date);
        adapter.getDayOfWeek(date);
        adapter.getYearName(date);
        adapter.getNumDaysInMonth(date);
        adapter.clone(date);
        adapter.parse(date, 'MM/DD/YYYY');
        adapter.format(date, 'MM/DD/YYYY');
        adapter.addCalendarDays(date, 1);
        adapter.addCalendarMonths(date, 1);
        adapter.addCalendarYears(date, 1);
        adapter.toIso8601(date);
        adapter.isDateInstance(date);
        adapter.isValid(date);
        expect(date.locale()).toBe('en');
    });
    it('should create invalid date', function () {
        assertValidDate(adapter.invalid(), false);
    });
});
describe('MomentDateAdapter with MAT_DATE_LOCALE override', function () {
    var adapter;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MomentDateModule],
            providers: [{ provide: core_2.MAT_DATE_LOCALE, useValue: 'ja-JP' }]
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([core_2.DateAdapter], function (d) {
        adapter = d;
    }));
    it('should take the default locale id from the MAT_DATE_LOCALE injection token', function () {
        expect(adapter.format(moment([2017, testing_2.JAN, 2]), 'll')).toEqual('2017年1月2日');
    });
});
describe('MomentDateAdapter with LOCALE_ID override', function () {
    var adapter;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MomentDateModule],
            providers: [{ provide: core_1.LOCALE_ID, useValue: 'fr' }]
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([core_2.DateAdapter], function (d) {
        adapter = d;
    }));
    it('should take the default locale id from the LOCALE_ID injection token', function () {
        expect(adapter.format(moment([2017, testing_2.JAN, 2]), 'll')).toEqual('2 janv. 2017');
    });
});
describe('MomentDateAdapter with MAT_MOMENT_DATE_ADAPTER_OPTIONS override', function () {
    var adapter;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [index_1.MomentDateModule],
            providers: [{
                    provide: moment_date_adapter_1.MAT_MOMENT_DATE_ADAPTER_OPTIONS,
                    useValue: { useUtc: true }
                }]
        }).compileComponents();
    }));
    beforeEach(testing_1.inject([core_2.DateAdapter], function (d) {
        adapter = d;
    }));
    describe('use UTC', function () {
        it('should create Moment date in UTC', function () {
            expect(adapter.createDate(2017, testing_2.JAN, 5).isUtc()).toBe(true);
        });
        it('should create today in UTC', function () {
            expect(adapter.today().isUtc()).toBe(true);
        });
        it('should parse dates to UTC', function () {
            expect(adapter.parse('1/2/2017', 'MM/DD/YYYY').isUtc()).toBe(true);
        });
        it('should return UTC date when deserializing', function () {
            expect(adapter.deserialize('1985-04-12T23:20:50.52Z').isUtc()).toBe(true);
        });
    });
});
//# sourceMappingURL=moment-date-adapter.spec.js.map