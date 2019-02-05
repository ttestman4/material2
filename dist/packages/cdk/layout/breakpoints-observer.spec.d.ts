/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare class FakeMediaQueryList {
    matches: boolean;
    media: string;
    /** The callback for change events. */
    addListenerCallback?: (mql: MediaQueryListEvent) => void;
    constructor(matches: boolean, media: string);
    /** Toggles the matches state and "emits" a change event. */
    setMatches(matches: boolean): void;
    /** Registers the callback method for change events. */
    addListener(callback: (mql: MediaQueryListEvent) => void): void;
    removeListener(): void;
}
export declare class FakeMediaMatcher {
    /** A map of match media queries. */
    private queries;
    /** The number of distinct queries created in the media matcher during a test. */
    readonly queryCount: number;
    /** Fakes the match media response to be controlled in tests. */
    matchMedia(query: string): FakeMediaQueryList;
    /** Clears all queries from the map of queries. */
    clear(): void;
    /** Toggles the matching state of the provided query. */
    setMatchesQuery(query: string, matches: boolean): void;
}
