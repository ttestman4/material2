"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var layout_module_1 = require("./layout-module");
var breakpoints_observer_1 = require("./breakpoints-observer");
var media_matcher_1 = require("./media-matcher");
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
describe('BreakpointObserver', function () {
    var breakpointManager;
    var mediaMatcher;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [layout_module_1.LayoutModule],
            providers: [{ provide: media_matcher_1.MediaMatcher, useClass: FakeMediaMatcher }]
        });
    }));
    beforeEach(testing_1.inject([breakpoints_observer_1.BreakpointObserver, media_matcher_1.MediaMatcher], function (bm, mm) {
        breakpointManager = bm;
        mediaMatcher = mm;
    }));
    afterEach(function () {
        mediaMatcher.clear();
    });
    it('retrieves the whether a query is currently matched', testing_1.fakeAsync(function () {
        var query = 'everything starts as true in the FakeMediaMatcher';
        expect(breakpointManager.isMatched(query)).toBeTruthy();
    }));
    it('reuses the same MediaQueryList for matching queries', testing_1.fakeAsync(function () {
        expect(mediaMatcher.queryCount).toBe(0);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(1);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(1);
        breakpointManager.observe('query2');
        expect(mediaMatcher.queryCount).toBe(2);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(2);
    }));
    it('splits combined query strings into individual matchMedia listeners', testing_1.fakeAsync(function () {
        expect(mediaMatcher.queryCount).toBe(0);
        breakpointManager.observe('query1, query2');
        expect(mediaMatcher.queryCount).toBe(2);
        breakpointManager.observe('query1');
        expect(mediaMatcher.queryCount).toBe(2);
        breakpointManager.observe('query2, query3');
        expect(mediaMatcher.queryCount).toBe(3);
    }));
    it('accepts an array of queries', testing_1.fakeAsync(function () {
        var queries = ['1 query', '2 query', 'red query', 'blue query'];
        breakpointManager.observe(queries);
        expect(mediaMatcher.queryCount).toBe(queries.length);
    }));
    it('completes all events when the breakpoint manager is destroyed', testing_1.fakeAsync(function () {
        var firstTest = jasmine.createSpy('test1');
        breakpointManager.observe('test1').subscribe(undefined, undefined, firstTest);
        var secondTest = jasmine.createSpy('test2');
        breakpointManager.observe('test2').subscribe(undefined, undefined, secondTest);
        testing_1.flush();
        expect(firstTest).not.toHaveBeenCalled();
        expect(secondTest).not.toHaveBeenCalled();
        breakpointManager.ngOnDestroy();
        testing_1.flush();
        expect(firstTest).toHaveBeenCalled();
        expect(secondTest).toHaveBeenCalled();
    }));
    it('emits an event on the observable when values change', testing_1.fakeAsync(function () {
        var query = '(width: 999px)';
        var queryMatchState = false;
        breakpointManager.observe(query).subscribe(function (state) {
            queryMatchState = state.matches;
        });
        testing_1.flush();
        expect(queryMatchState).toBeTruthy();
        mediaMatcher.setMatchesQuery(query, false);
        testing_1.flush();
        expect(queryMatchState).toBeFalsy();
    }));
    it('emits an event on the observable with the matching state of all queries provided', testing_1.fakeAsync(function () {
        var _a, _b;
        var queryOne = '(width: 999px)';
        var queryTwo = '(width: 700px)';
        var state = { matches: false, breakpoints: {} };
        breakpointManager.observe([queryOne, queryTwo]).subscribe(function (breakpoint) {
            state = breakpoint;
        });
        mediaMatcher.setMatchesQuery(queryOne, false);
        mediaMatcher.setMatchesQuery(queryTwo, false);
        testing_1.flush();
        expect(state.breakpoints).toEqual((_a = {}, _a[queryOne] = false, _a[queryTwo] = false, _a));
        mediaMatcher.setMatchesQuery(queryOne, true);
        mediaMatcher.setMatchesQuery(queryTwo, false);
        testing_1.flush();
        expect(state.breakpoints).toEqual((_b = {}, _b[queryOne] = true, _b[queryTwo] = false, _b));
    }));
    it('emits a true matches state when the query is matched', testing_1.fakeAsync(function () {
        var query = '(width: 999px)';
        breakpointManager.observe(query).subscribe();
        mediaMatcher.setMatchesQuery(query, true);
        expect(breakpointManager.isMatched(query)).toBeTruthy();
    }));
    it('emits a false matches state when the query is not matched', testing_1.fakeAsync(function () {
        var query = '(width: 999px)';
        breakpointManager.observe(query).subscribe();
        mediaMatcher.setMatchesQuery(query, false);
        expect(breakpointManager.isMatched(query)).toBeFalsy();
    }));
});
var FakeMediaQueryList = /** @class */ (function () {
    function FakeMediaQueryList(matches, media) {
        this.matches = matches;
        this.media = media;
    }
    /** Toggles the matches state and "emits" a change event. */
    FakeMediaQueryList.prototype.setMatches = function (matches) {
        this.matches = matches;
        this.addListenerCallback(this);
    };
    /** Registers the callback method for change events. */
    FakeMediaQueryList.prototype.addListener = function (callback) {
        this.addListenerCallback = callback;
    };
    // Noop removal method for testing.
    FakeMediaQueryList.prototype.removeListener = function () { };
    return FakeMediaQueryList;
}());
exports.FakeMediaQueryList = FakeMediaQueryList;
var FakeMediaMatcher = /** @class */ (function () {
    function FakeMediaMatcher() {
        /** A map of match media queries. */
        this.queries = new Map();
    }
    Object.defineProperty(FakeMediaMatcher.prototype, "queryCount", {
        /** The number of distinct queries created in the media matcher during a test. */
        get: function () {
            return this.queries.size;
        },
        enumerable: true,
        configurable: true
    });
    /** Fakes the match media response to be controlled in tests. */
    FakeMediaMatcher.prototype.matchMedia = function (query) {
        var mql = new FakeMediaQueryList(true, query);
        this.queries.set(query, mql);
        return mql;
    };
    /** Clears all queries from the map of queries. */
    FakeMediaMatcher.prototype.clear = function () {
        this.queries.clear();
    };
    /** Toggles the matching state of the provided query. */
    FakeMediaMatcher.prototype.setMatchesQuery = function (query, matches) {
        if (this.queries.has(query)) {
            this.queries.get(query).setMatches(matches);
        }
        else {
            throw Error('This query is not being observed.');
        }
    };
    FakeMediaMatcher = __decorate([
        core_1.Injectable()
    ], FakeMediaMatcher);
    return FakeMediaMatcher;
}());
exports.FakeMediaMatcher = FakeMediaMatcher;
//# sourceMappingURL=breakpoints-observer.spec.js.map