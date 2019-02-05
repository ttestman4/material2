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
var a11y_1 = require("@angular/cdk/a11y");
var core_1 = require("@angular/core");
/** @title Monitoring focus with FocusMonitor */
var FocusMonitorOverviewExample = /** @class */ (function () {
    function FocusMonitorOverviewExample(focusMonitor, cdr, ngZone) {
        this.focusMonitor = focusMonitor;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.elementOrigin = this.formatOrigin(null);
        this.subtreeOrigin = this.formatOrigin(null);
    }
    FocusMonitorOverviewExample.prototype.ngOnInit = function () {
        var _this = this;
        this.focusMonitor.monitor(this.element)
            .subscribe(function (origin) { return _this.ngZone.run(function () {
            _this.elementOrigin = _this.formatOrigin(origin);
            _this.cdr.markForCheck();
        }); });
        this.focusMonitor.monitor(this.subtree, true)
            .subscribe(function (origin) { return _this.ngZone.run(function () {
            _this.subtreeOrigin = _this.formatOrigin(origin);
            _this.cdr.markForCheck();
        }); });
    };
    FocusMonitorOverviewExample.prototype.ngOnDestroy = function () {
        this.focusMonitor.stopMonitoring(this.element);
        this.focusMonitor.stopMonitoring(this.subtree);
    };
    FocusMonitorOverviewExample.prototype.formatOrigin = function (origin) {
        return origin ? origin + ' focused' : 'blurred';
    };
    __decorate([
        core_1.ViewChild('element'),
        __metadata("design:type", core_1.ElementRef)
    ], FocusMonitorOverviewExample.prototype, "element", void 0);
    __decorate([
        core_1.ViewChild('subtree'),
        __metadata("design:type", core_1.ElementRef)
    ], FocusMonitorOverviewExample.prototype, "subtree", void 0);
    FocusMonitorOverviewExample = __decorate([
        core_1.Component({
            selector: 'focus-monitor-overview-example',
            template: "<div class=\"example-focus-monitor\"><button #element>Focus Monitored Element ({{elementOrigin}})</button></div><div class=\"example-focus-monitor\"><div #subtree><p>Focus Monitored Subtree ({{subtreeOrigin}})</p><button>Child Button 1</button> <button>Child Button 2</button></div></div>",
            styles: [".example-focus-monitor { padding: 20px; } .example-focus-monitor .cdk-mouse-focused { background: rgba(255, 0, 0, 0.5); } .example-focus-monitor .cdk-keyboard-focused { background: rgba(0, 255, 0, 0.5); } .example-focus-monitor .cdk-touch-focused { background: rgba(0, 0, 255, 0.5); } .example-focus-monitor .cdk-program-focused { background: rgba(255, 0, 255, 0.5); } "]
        }),
        __metadata("design:paramtypes", [a11y_1.FocusMonitor,
            core_1.ChangeDetectorRef,
            core_1.NgZone])
    ], FocusMonitorOverviewExample);
    return FocusMonitorOverviewExample;
}());
exports.FocusMonitorOverviewExample = FocusMonitorOverviewExample;
//# sourceMappingURL=focus-monitor-overview-example.js.map