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
 * @title Drag&Drop position locking
 */
var CdkDragDropAxisLockExample = /** @class */ (function () {
    function CdkDragDropAxisLockExample() {
    }
    CdkDragDropAxisLockExample = __decorate([
        core_1.Component({
            selector: 'cdk-drag-drop-axis-lock-example',
            template: "<div class=\"example-box\" cdkDragLockAxis=\"y\" cdkDrag>I can only be dragged up/down</div><div class=\"example-box\" cdkDragLockAxis=\"x\" cdkDrag>I can only be dragged left/right</div>",
            styles: [".example-box { width: 200px; height: 200px; border: solid 1px #ccc; color: rgba(0, 0, 0, 0.87); cursor: move; display: inline-flex; justify-content: center; align-items: center; text-align: center; background: #fff; border-radius: 4px; margin-right: 25px; position: relative; z-index: 1; transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1); box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); } .example-box:active { box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); } "],
        })
    ], CdkDragDropAxisLockExample);
    return CdkDragDropAxisLockExample;
}());
exports.CdkDragDropAxisLockExample = CdkDragDropAxisLockExample;
//# sourceMappingURL=cdk-drag-drop-axis-lock-example.js.map