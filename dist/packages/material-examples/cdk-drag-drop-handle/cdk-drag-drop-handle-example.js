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
 * @title Drag&Drop with a handle
 */
var CdkDragDropHandleExample = /** @class */ (function () {
    function CdkDragDropHandleExample() {
    }
    CdkDragDropHandleExample = __decorate([
        core_1.Component({
            selector: 'cdk-drag-drop-handle-example',
            template: "<div class=\"example-box\" cdkDrag>I can only be dragged using the handle<div class=\"example-handle\" cdkDragHandle><svg width=\"24px\" fill=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z\"></path><path d=\"M0 0h24v24H0z\" fill=\"none\"></path></svg></div></div>",
            styles: [".example-box { width: 200px; height: 200px; padding: 10px; box-sizing: border-box; border: solid 1px #ccc; color: rgba(0, 0, 0, 0.87); display: flex; justify-content: center; align-items: center; text-align: center; background: #fff; border-radius: 4px; position: relative; z-index: 1; transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1); box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); } .example-box:active { box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); } .example-handle { position: absolute; top: 10px; right: 10px; color: #ccc; cursor: move; width: 24px; height: 24px; } "],
        })
    ], CdkDragDropHandleExample);
    return CdkDragDropHandleExample;
}());
exports.CdkDragDropHandleExample = CdkDragDropHandleExample;
//# sourceMappingURL=cdk-drag-drop-handle-example.js.map