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
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GestureConfig, MatCommonModule } from '@angular/material/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatTooltip, TooltipComponent, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, } from './tooltip';
var MatTooltipModule = /** @class */ (function () {
    function MatTooltipModule() {
    }
    MatTooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        A11yModule,
                        CommonModule,
                        OverlayModule,
                        MatCommonModule,
                    ],
                    exports: [MatTooltip, TooltipComponent, MatCommonModule],
                    declarations: [MatTooltip, TooltipComponent],
                    entryComponents: [TooltipComponent],
                    providers: [
                        MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
                        { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
                    ]
                },] },
    ];
    return MatTooltipModule;
}());
export { MatTooltipModule };
//# sourceMappingURL=tooltip-module.js.map