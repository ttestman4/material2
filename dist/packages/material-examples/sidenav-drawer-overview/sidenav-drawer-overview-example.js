"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/** @title Basic drawer */
var SidenavDrawerOverviewExample = /** @class */ (function () {
    function SidenavDrawerOverviewExample() {
    }
    SidenavDrawerOverviewExample = __decorate([
        core_1.Component({
            selector: 'sidenav-drawer-overview-example',
            template: "<mat-drawer-container class=\"example-container\"><mat-drawer mode=\"side\" opened>Drawer content</mat-drawer><mat-drawer-content>Main content</mat-drawer-content></mat-drawer-container>",
            styles: [".example-container { width: 400px; height: 200px; margin: 10px; border: 1px solid #555; } "],
        })
    ], SidenavDrawerOverviewExample);
    return SidenavDrawerOverviewExample;
}());
exports.SidenavDrawerOverviewExample = SidenavDrawerOverviewExample;
//# sourceMappingURL=sidenav-drawer-overview-example.js.map