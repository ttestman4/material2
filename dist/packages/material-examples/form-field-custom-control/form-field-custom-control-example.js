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
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
/** @title Form field with custom telephone number input control. */
var FormFieldCustomControlExample = /** @class */ (function () {
    function FormFieldCustomControlExample() {
    }
    FormFieldCustomControlExample = __decorate([
        core_1.Component({
            selector: 'form-field-custom-control-example',
            template: "<mat-form-field><example-tel-input placeholder=\"Phone number\" required></example-tel-input><mat-icon matSuffix>phone</mat-icon><mat-hint>Include area code</mat-hint></mat-form-field>",
            styles: ["/** No CSS for this example */ "],
        })
    ], FormFieldCustomControlExample);
    return FormFieldCustomControlExample;
}());
exports.FormFieldCustomControlExample = FormFieldCustomControlExample;
/** Data structure for holding telephone number. */
var MyTel = /** @class */ (function () {
    function MyTel(area, exchange, subscriber) {
        this.area = area;
        this.exchange = exchange;
        this.subscriber = subscriber;
    }
    return MyTel;
}());
exports.MyTel = MyTel;
/** Custom `MatFormFieldControl` for telephone number input. */
var MyTelInput = /** @class */ (function () {
    function MyTelInput(fb, fm, elRef) {
        var _this = this;
        this.fm = fm;
        this.elRef = elRef;
        this.stateChanges = new rxjs_1.Subject();
        this.focused = false;
        this.ngControl = null;
        this.errorState = false;
        this.controlType = 'example-tel-input';
        this.id = "example-tel-input-" + MyTelInput_1.nextId++;
        this.describedBy = '';
        this._required = false;
        this._disabled = false;
        this.parts = fb.group({
            area: '',
            exchange: '',
            subscriber: '',
        });
        fm.monitor(elRef, true).subscribe(function (origin) {
            _this.focused = !!origin;
            _this.stateChanges.next();
        });
    }
    MyTelInput_1 = MyTelInput;
    Object.defineProperty(MyTelInput.prototype, "empty", {
        get: function () {
            var _a = this.parts.value, area = _a.area, exchange = _a.exchange, subscriber = _a.subscriber;
            return !area && !exchange && !subscriber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyTelInput.prototype, "shouldLabelFloat", {
        get: function () { return this.focused || !this.empty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyTelInput.prototype, "placeholder", {
        get: function () { return this._placeholder; },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyTelInput.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) {
            this._required = coercion_1.coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyTelInput.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) {
            this._disabled = coercion_1.coerceBooleanProperty(value);
            this._disabled ? this.parts.disable() : this.parts.enable();
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyTelInput.prototype, "value", {
        get: function () {
            var _a = this.parts.value, area = _a.area, exchange = _a.exchange, subscriber = _a.subscriber;
            if (area.length === 3 && exchange.length === 3 && subscriber.length === 4) {
                return new MyTel(area, exchange, subscriber);
            }
            return null;
        },
        set: function (tel) {
            var _a = tel || new MyTel('', '', ''), area = _a.area, exchange = _a.exchange, subscriber = _a.subscriber;
            this.parts.setValue({ area: area, exchange: exchange, subscriber: subscriber });
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    MyTelInput.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    };
    MyTelInput.prototype.setDescribedByIds = function (ids) {
        this.describedBy = ids.join(' ');
    };
    MyTelInput.prototype.onContainerClick = function (event) {
        if (event.target.tagName.toLowerCase() != 'input') {
            this.elRef.nativeElement.querySelector('input').focus();
        }
    };
    var MyTelInput_1;
    MyTelInput.nextId = 0;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], MyTelInput.prototype, "placeholder", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MyTelInput.prototype, "required", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], MyTelInput.prototype, "disabled", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], MyTelInput.prototype, "value", null);
    MyTelInput = MyTelInput_1 = __decorate([
        core_1.Component({
            selector: 'example-tel-input',
            template: "<div [formGroup]=\"parts\" class=\"example-tel-input-container\"><input class=\"example-tel-input-element\" formControlName=\"area\" size=\"3\"> <span class=\"example-tel-input-spacer\">&ndash;</span> <input class=\"example-tel-input-element\" formControlName=\"exchange\" size=\"3\"> <span class=\"example-tel-input-spacer\">&ndash;</span> <input class=\"example-tel-input-element\" formControlName=\"subscriber\" size=\"4\"></div>",
            styles: [".example-tel-input-container { display: flex; } .example-tel-input-element { border: none; background: none; padding: 0; outline: none; font: inherit; text-align: center; } .example-tel-input-spacer { opacity: 0; transition: opacity 200ms; } :host.example-floating .example-tel-input-spacer { opacity: 1; } "],
            providers: [{ provide: material_1.MatFormFieldControl, useExisting: MyTelInput_1 }],
            host: {
                '[class.example-floating]': 'shouldLabelFloat',
                '[id]': 'id',
                '[attr.aria-describedby]': 'describedBy',
            }
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, a11y_1.FocusMonitor, core_1.ElementRef])
    ], MyTelInput);
    return MyTelInput;
}());
exports.MyTelInput = MyTelInput;
//# sourceMappingURL=form-field-custom-control-example.js.map