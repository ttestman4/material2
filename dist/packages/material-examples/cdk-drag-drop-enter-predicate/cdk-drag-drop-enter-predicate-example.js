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
 * @title Drag&Drop enter predicate
 */
var CdkDragDropEnterPredicateExample = /** @class */ (function () {
    function CdkDragDropEnterPredicateExample() {
        this.all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.even = [10];
    }
    CdkDragDropEnterPredicateExample.prototype.drop = function (event) {
        if (event.previousContainer === event.container) {
            drag_drop_1.moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            drag_drop_1.transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    };
    /** Predicate function that only allows even numbers to be dropped into a list. */
    CdkDragDropEnterPredicateExample.prototype.evenPredicate = function (item) {
        return item.data % 2 === 0;
    };
    /** Predicate function that doesn't allow items to be dropped into a list. */
    CdkDragDropEnterPredicateExample.prototype.noReturnPredicate = function () {
        return false;
    };
    CdkDragDropEnterPredicateExample = __decorate([
        core_1.Component({
            selector: 'cdk-drag-drop-enter-predicate-example',
            template: "<div class=\"example-container\"><h2>Available numbers</h2><div id=\"all\" cdkDropList [cdkDropListData]=\"all\" cdkDropListConnectedTo=\"even\" class=\"example-list\" (cdkDropListDropped)=\"drop($event)\" [cdkDropListEnterPredicate]=\"noReturnPredicate\"><div class=\"example-box\" *ngFor=\"let number of all\" [cdkDragData]=\"number\" cdkDrag>{{number}}</div></div></div><div class=\"example-container\"><h2>Even numbers</h2><div id=\"even\" cdkDropList [cdkDropListData]=\"even\" cdkDropListConnectedTo=\"all\" class=\"example-list\" (cdkDropListDropped)=\"drop($event)\" [cdkDropListEnterPredicate]=\"evenPredicate\"><div class=\"example-box\" *ngFor=\"let number of even\" cdkDrag [cdkDragData]=\"number\">{{number}}</div></div></div>",
            styles: [".example-container { width: 400px; max-width: 100%; margin: 0 25px 25px 0; display: inline-block; vertical-align: top; } .example-list { border: solid 1px #ccc; min-height: 60px; background: white; border-radius: 4px; overflow: hidden; display: block; } .example-box { padding: 20px 10px; border-bottom: solid 1px #ccc; color: rgba(0, 0, 0, 0.87); display: flex; flex-direction: row; align-items: center; justify-content: space-between; box-sizing: border-box; cursor: move; background: white; font-size: 14px; } .cdk-drag-preview { box-sizing: border-box; border-radius: 4px; box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); } .cdk-drag-placeholder { opacity: 0; } .cdk-drag-animating { transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); } .example-box:last-child { border: none; } .example-list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) { transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); } "],
        })
    ], CdkDragDropEnterPredicateExample);
    return CdkDragDropEnterPredicateExample;
}());
exports.CdkDragDropEnterPredicateExample = CdkDragDropEnterPredicateExample;
//# sourceMappingURL=cdk-drag-drop-enter-predicate-example.js.map