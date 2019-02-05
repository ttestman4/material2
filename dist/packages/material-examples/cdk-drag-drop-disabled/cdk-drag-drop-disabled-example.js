"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var drag_drop_1 = require("@angular/cdk/drag-drop");
/**
 * @title Drag&Drop disabled
 */
var CdkDragDropDisabledExample = /** @class */ (function () {
    function CdkDragDropDisabledExample() {
        this.items = [
            { value: 'I can be dragged', disabled: false },
            { value: 'I cannot be dragged', disabled: true },
            { value: 'I can also be dragged', disabled: false }
        ];
    }
    CdkDragDropDisabledExample.prototype.drop = function (event) {
        drag_drop_1.moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    };
    CdkDragDropDisabledExample = __decorate([
        core_1.Component({
            selector: 'cdk-drag-drop-disabled-example',
            template: "<div cdkDropList class=\"example-list\" (cdkDropListDropped)=\"drop($event)\"><div class=\"example-box\" *ngFor=\"let item of items\" cdkDrag [cdkDragDisabled]=\"item.disabled\">{{item.value}}</div></div>",
            styles: [".example-list { width: 500px; max-width: 100%; border: solid 1px #ccc; min-height: 60px; display: block; background: white; border-radius: 4px; overflow: hidden; } .example-box { padding: 20px 10px; border-bottom: solid 1px #ccc; color: rgba(0, 0, 0, 0.87); display: flex; flex-direction: row; align-items: center; justify-content: space-between; box-sizing: border-box; cursor: move; background: white; font-size: 14px; } .cdk-drag-preview { box-sizing: border-box; border-radius: 4px; box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); } .cdk-drag-placeholder { opacity: 0; } .cdk-drag-animating { transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); } .example-box:last-child { border: none; } .example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) { transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); } "],
        })
    ], CdkDragDropDisabledExample);
    return CdkDragDropDisabledExample;
}());
exports.CdkDragDropDisabledExample = CdkDragDropDisabledExample;
//# sourceMappingURL=cdk-drag-drop-disabled-example.js.map