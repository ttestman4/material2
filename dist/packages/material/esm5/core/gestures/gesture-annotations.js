/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Stripped-down HammerJS annotations to be used within Material, which are necessary,
 * because HammerJS is an optional dependency. For the full annotations see:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/hammerjs/index.d.ts
 */
/**
 * \@docs-private
 * @record
 */
export function HammerInput() { }
if (false) {
    /** @type {?} */
    HammerInput.prototype.preventDefault;
    /** @type {?} */
    HammerInput.prototype.deltaX;
    /** @type {?} */
    HammerInput.prototype.deltaY;
    /** @type {?} */
    HammerInput.prototype.center;
}
/**
 * \@docs-private
 * @record
 */
export function HammerStatic() { }
if (false) {
    /** @type {?} */
    HammerStatic.prototype.Pan;
    /** @type {?} */
    HammerStatic.prototype.Swipe;
    /** @type {?} */
    HammerStatic.prototype.Press;
    /* Skipping unhandled member: new(element: HTMLElement | SVGElement, options?: any): HammerManager;*/
}
/**
 * \@docs-private
 * @record
 */
export function Recognizer() { }
if (false) {
    /* Skipping unhandled member: new(options?: any): Recognizer;*/
    /**
     * @param {?} otherRecognizer
     * @return {?}
     */
    Recognizer.prototype.recognizeWith = function (otherRecognizer) { };
}
/**
 * \@docs-private
 * @record
 */
export function RecognizerStatic() { }
/**
 * \@docs-private
 * @record
 */
export function HammerInstance() { }
if (false) {
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    HammerInstance.prototype.on = function (eventName, callback) { };
    /**
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */
    HammerInstance.prototype.off = function (eventName, callback) { };
}
/**
 * \@docs-private
 * @record
 */
export function HammerManager() { }
if (false) {
    /**
     * @param {?} recogniser
     * @return {?}
     */
    HammerManager.prototype.add = function (recogniser) { };
    /**
     * @param {?} options
     * @return {?}
     */
    HammerManager.prototype.set = function (options) { };
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    HammerManager.prototype.emit = function (event, data) { };
    /**
     * @param {?} events
     * @param {?=} handler
     * @return {?}
     */
    HammerManager.prototype.off = function (events, handler) { };
    /**
     * @param {?} events
     * @param {?} handler
     * @return {?}
     */
    HammerManager.prototype.on = function (events, handler) { };
}
/**
 * \@docs-private
 * @record
 */
export function HammerOptions() { }
if (false) {
    /** @type {?|undefined} */
    HammerOptions.prototype.cssProps;
    /** @type {?|undefined} */
    HammerOptions.prototype.domEvents;
    /** @type {?|undefined} */
    HammerOptions.prototype.enable;
    /** @type {?|undefined} */
    HammerOptions.prototype.preset;
    /** @type {?|undefined} */
    HammerOptions.prototype.touchAction;
    /** @type {?|undefined} */
    HammerOptions.prototype.recognizers;
    /** @type {?|undefined} */
    HammerOptions.prototype.inputClass;
    /** @type {?|undefined} */
    HammerOptions.prototype.inputTarget;
}
//# sourceMappingURL=gesture-annotations.js.map