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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var moment_date_adapter_1 = require("./moment-date-adapter");
var moment_date_formats_1 = require("./moment-date-formats");
__export(require("./moment-date-adapter"));
__export(require("./moment-date-formats"));
var MomentDateModule = /** @class */ (function () {
    function MomentDateModule() {
    }
    MomentDateModule = __decorate([
        core_1.NgModule({
            providers: [
                {
                    provide: core_2.DateAdapter,
                    useClass: moment_date_adapter_1.MomentDateAdapter,
                    deps: [core_2.MAT_DATE_LOCALE, moment_date_adapter_1.MAT_MOMENT_DATE_ADAPTER_OPTIONS]
                }
            ],
        })
    ], MomentDateModule);
    return MomentDateModule;
}());
exports.MomentDateModule = MomentDateModule;
var ɵ0 = moment_date_formats_1.MAT_MOMENT_DATE_FORMATS;
exports.ɵ0 = ɵ0;
var MatMomentDateModule = /** @class */ (function () {
    function MatMomentDateModule() {
    }
    MatMomentDateModule = __decorate([
        core_1.NgModule({
            imports: [MomentDateModule],
            providers: [{ provide: core_2.MAT_DATE_FORMATS, useValue: ɵ0 }],
        })
    ], MatMomentDateModule);
    return MatMomentDateModule;
}());
exports.MatMomentDateModule = MatMomentDateModule;
//# sourceMappingURL=index.js.map