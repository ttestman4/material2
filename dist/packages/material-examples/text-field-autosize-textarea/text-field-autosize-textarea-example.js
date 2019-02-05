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
var text_field_1 = require("@angular/cdk/text-field");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
/** @title Auto-resizing textarea */
var TextFieldAutosizeTextareaExample = /** @class */ (function () {
    function TextFieldAutosizeTextareaExample(ngZone) {
        this.ngZone = ngZone;
    }
    TextFieldAutosizeTextareaExample.prototype.triggerResize = function () {
        var _this = this;
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(operators_1.take(1))
            .subscribe(function () { return _this.autosize.resizeToFitContent(true); });
    };
    __decorate([
        core_1.ViewChild('autosize'),
        __metadata("design:type", text_field_1.CdkTextareaAutosize)
    ], TextFieldAutosizeTextareaExample.prototype, "autosize", void 0);
    TextFieldAutosizeTextareaExample = __decorate([
        core_1.Component({
            selector: 'text-field-autosize-textarea-example',
            template: "<mat-form-field><mat-label>Font size</mat-label><mat-select #fontSize value=\"16px\" (selectionChange)=\"triggerResize()\"><mat-option value=\"10px\">10px</mat-option><mat-option value=\"12px\">12px</mat-option><mat-option value=\"14px\">14px</mat-option><mat-option value=\"16px\">16px</mat-option><mat-option value=\"18px\">18px</mat-option><mat-option value=\"20px\">20px</mat-option></mat-select></mat-form-field><mat-form-field [style.fontSize]=\"fontSize.value\"><mat-label>Autosize textarea</mat-label><textarea matInput cdkTextareaAutosize #autosize=\"cdkTextareaAutosize\" cdkAutosizeMinRows=\"2\" cdkAutosizeMaxRows=\"5\"></textarea></mat-form-field>",
            styles: ["/** No CSS for this example */ "],
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], TextFieldAutosizeTextareaExample);
    return TextFieldAutosizeTextareaExample;
}());
exports.TextFieldAutosizeTextareaExample = TextFieldAutosizeTextareaExample;
//# sourceMappingURL=text-field-autosize-textarea-example.js.map