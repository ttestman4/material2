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
 * @title Basic use of the tab nav bar
 */
var TabNavBarBasicExample = /** @class */ (function () {
    function TabNavBarBasicExample() {
        this.links = ['First', 'Second', 'Third'];
        this.activeLink = this.links[0];
        this.background = '';
    }
    TabNavBarBasicExample.prototype.toggleBackground = function () {
        this.background = this.background ? '' : 'primary';
    };
    TabNavBarBasicExample = __decorate([
        core_1.Component({
            selector: 'tab-nav-bar-basic-example',
            template: "<button mat-raised-button class=\"example-action-button\" (click)=\"toggleBackground()\">Toggle background</button><nav mat-tab-nav-bar [backgroundColor]=\"background\"><a mat-tab-link *ngFor=\"let link of links\" (click)=\"activeLink = link\" [active]=\"activeLink == link\">{{link}} </a><a mat-tab-link disabled=\"disabled\">Disabled Link</a></nav>",
            styles: [".example-action-button { margin-bottom: 8px; } "],
        })
    ], TabNavBarBasicExample);
    return TabNavBarBasicExample;
}());
exports.TabNavBarBasicExample = TabNavBarBasicExample;
//# sourceMappingURL=tab-nav-bar-basic-example.js.map