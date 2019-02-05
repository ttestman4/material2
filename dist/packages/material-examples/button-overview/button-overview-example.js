"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * @title Basic buttons
 */
var ButtonOverviewExample = /** @class */ (function () {
    function ButtonOverviewExample() {
    }
    ButtonOverviewExample = __decorate([
        core_1.Component({
            selector: 'button-overview-example',
            template: "<button mat-button>Click me!</button>",
            styles: ["/** No CSS for this example */ "],
        })
    ], ButtonOverviewExample);
    return ButtonOverviewExample;
}());
exports.ButtonOverviewExample = ButtonOverviewExample;
//# sourceMappingURL=button-overview-example.js.map