"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
/**
 * An extension of GestureConfig that exposes the underlying HammerManager instances.
 * Tests can use these instances to emit fake gesture events.
 */
var TestGestureConfig = /** @class */ (function (_super) {
    __extends(TestGestureConfig, _super);
    function TestGestureConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * A map of Hammer instances to element.
         * Used to emit events over instances for an element.
         */
        _this.hammerInstances = new Map();
        return _this;
    }
    /**
     * Create a mapping of Hammer instances to element so that events can be emitted during testing.
     */
    TestGestureConfig.prototype.buildHammer = function (element) {
        var mc = _super.prototype.buildHammer.call(this, element);
        var instance = this.hammerInstances.get(element);
        if (instance) {
            instance.push(mc);
        }
        else {
            this.hammerInstances.set(element, [mc]);
        }
        return mc;
    };
    /**
     * The Angular event plugin for Hammer creates a new HammerManager instance for each listener,
     * so we need to apply our event on all instances to hit the correct listener.
     */
    TestGestureConfig.prototype.emitEventForElement = function (eventType, element, eventData) {
        if (eventData === void 0) { eventData = {}; }
        var instances = this.hammerInstances.get(element);
        if (instances) {
            instances.forEach(function (instance) { return instance.emit(eventType, eventData); });
        }
    };
    TestGestureConfig = __decorate([
        core_1.Injectable()
    ], TestGestureConfig);
    return TestGestureConfig;
}(core_2.GestureConfig));
exports.TestGestureConfig = TestGestureConfig;
//# sourceMappingURL=test-gesture-config.js.map