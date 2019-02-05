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
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var drag_drop_module_1 = require("./drag-drop-module");
var drag_drop_1 = require("./drag-drop");
var drag_ref_1 = require("./drag-ref");
var drop_list_ref_1 = require("./drop-list-ref");
describe('DragDrop', function () {
    var service;
    beforeEach(testing_1.fakeAsync(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [drag_drop_module_1.DragDropModule],
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([drag_drop_1.DragDrop], function (d) {
        service = d;
    }));
    it('should be able to attach a DragRef to a DOM node', function () {
        var fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        var ref = service.createDrag(fixture.componentInstance.elementRef);
        expect(ref instanceof drag_ref_1.DragRef).toBe(true);
    });
    it('should be able to attach a DropListRef to a DOM node', function () {
        var fixture = testing_1.TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        var ref = service.createDropList(fixture.componentInstance.elementRef);
        expect(ref instanceof drop_list_ref_1.DropListRef).toBe(true);
    });
});
var TestComponent = /** @class */ (function () {
    function TestComponent(elementRef) {
        this.elementRef = elementRef;
    }
    TestComponent = __decorate([
        core_1.Component({
            template: '<div></div>'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TestComponent);
    return TestComponent;
}());
//# sourceMappingURL=drag-drop.spec.js.map