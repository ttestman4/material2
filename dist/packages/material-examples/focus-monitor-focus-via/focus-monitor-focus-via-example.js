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
/** @title Focusing with a specific FocusOrigin */
var FocusMonitorFocusViaExample = /** @class */ (function () {
    function FocusMonitorFocusViaExample(focusMonitor, cdr, ngZone) {
        this.focusMonitor = focusMonitor;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.origin = this.formatOrigin(null);
    }
    FocusMonitorFocusViaExample.prototype.ngOnInit = function () {
        var _this = this;
        this.focusMonitor.monitor(this.monitoredEl)
            .subscribe(function (origin) { return _this.ngZone.run(function () {
            _this.origin = _this.formatOrigin(origin);
            _this.cdr.markForCheck();
        }); });
    };
    FocusMonitorFocusViaExample.prototype.ngOnDestroy = function () {
        this.focusMonitor.stopMonitoring(this.monitoredEl);
    };
    FocusMonitorFocusViaExample.prototype.formatOrigin = function (origin) {
        return origin ? origin + ' focused' : 'blurred';
    };
    __decorate([
        core_1.ViewChild('monitored'),
        __metadata("design:type", core_1.ElementRef)
    ], FocusMonitorFocusViaExample.prototype, "monitoredEl", void 0);
    FocusMonitorFocusViaExample = __decorate([
        core_1.Component({
            selector: 'focus-monitor-focus-via-example',
            template: "<div class=\"example-focus-monitor\"><button #monitored>1. Focus Monitored Element ({{origin}})</button> <button #unmonitored>2. Not Monitored</button></div><mat-form-field><mat-label>Simulated focus origin</mat-label><mat-select #simulatedOrigin value=\"mouse\"><mat-option value=\"mouse\">Mouse</mat-option><mat-option value=\"keyboard\">Keyboard</mat-option><mat-option value=\"touch\">Touch</mat-option><mat-option value=\"program\">Programmatic</mat-option></mat-select></mat-form-field><button (click)=\"focusMonitor.focusVia(monitored, simulatedOrigin.value)\">Focus button #1</button> <button (click)=\"focusMonitor.focusVia(unmonitored, simulatedOrigin.value)\">Focus button #2</button>",
            styles: [".example-focus-monitor { padding: 20px; } .example-focus-monitor .cdk-mouse-focused { background: rgba(255, 0, 0, 0.5); } .example-focus-monitor .cdk-keyboard-focused { background: rgba(0, 255, 0, 0.5); } .example-focus-monitor .cdk-touch-focused { background: rgba(0, 0, 255, 0.5); } .example-focus-monitor .cdk-program-focused { background: rgba(255, 0, 255, 0.5); } .example-focus-monitor button:focus { box-shadow: 0 0 30px cyan; } "]
        }),
        __metadata("design:paramtypes", [a11y_1.FocusMonitor,
            core_1.ChangeDetectorRef,
            core_1.NgZone])
    ], FocusMonitorFocusViaExample);
    return FocusMonitorFocusViaExample;
}());
exports.FocusMonitorFocusViaExample = FocusMonitorFocusViaExample;
//# sourceMappingURL=focus-monitor-focus-via-example.js.map