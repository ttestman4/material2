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
var core_1 = require("@angular/core");
var platform_1 = require("@angular/cdk/platform");
/**
 * @title Platform overview
 */
var CdkPlatformOverviewExample = /** @class */ (function () {
    function CdkPlatformOverviewExample(platform) {
        this.platform = platform;
        this.supportedInputTypes = Array.from(platform_1.getSupportedInputTypes()).join(', ');
        this.supportsPassiveEventListeners = platform_1.supportsPassiveEventListeners();
        this.supportsScrollBehavior = platform_1.supportsScrollBehavior();
    }
    CdkPlatformOverviewExample = __decorate([
        core_1.Component({
            selector: 'cdk-platform-overview-example',
            template: "<h3>Platform information:</h3><p>Is Android: {{platform.ANDROID}}</p><p>Is iOS: {{platform.IOS}}</p><p>Is Firefox: {{platform.FIREFOX}}</p><p>Is Blink: {{platform.BLINK}}</p><p>Is Webkit: {{platform.WEBKIT}}</p><p>Is Trident: {{platform.TRIDENT}}</p><p>Is Edge: {{platform.EDGE}}</p><p>Supported input types: {{supportedInputTypes}}</p><p>Supports passive event listeners: {{supportsPassiveEventListeners}}</p><p>Supports scroll behavior: {{supportsScrollBehavior}}</p>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [platform_1.Platform])
    ], CdkPlatformOverviewExample);
    return CdkPlatformOverviewExample;
}());
exports.CdkPlatformOverviewExample = CdkPlatformOverviewExample;
//# sourceMappingURL=cdk-platform-overview-example.js.map