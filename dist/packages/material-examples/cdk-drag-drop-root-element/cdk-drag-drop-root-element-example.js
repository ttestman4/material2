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
var overlay_1 = require("@angular/cdk/overlay");
var portal_1 = require("@angular/cdk/portal");
/**
 * @title Drag&Drop with alternate root element
 */
var CdkDragDropRootElementExample = /** @class */ (function () {
    function CdkDragDropRootElementExample(_overlay, _viewContainerRef) {
        this._overlay = _overlay;
        this._viewContainerRef = _viewContainerRef;
    }
    CdkDragDropRootElementExample.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._portal = new portal_1.TemplatePortal(this._dialogTemplate, this._viewContainerRef);
        this._overlayRef = this._overlay.create({
            positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
            hasBackdrop: true
        });
        this._overlayRef.backdropClick().subscribe(function () { return _this._overlayRef.detach(); });
    };
    CdkDragDropRootElementExample.prototype.ngOnDestroy = function () {
        this._overlayRef.dispose();
    };
    CdkDragDropRootElementExample.prototype.openDialog = function () {
        this._overlayRef.attach(this._portal);
    };
    __decorate([
        core_1.ViewChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], CdkDragDropRootElementExample.prototype, "_dialogTemplate", void 0);
    CdkDragDropRootElementExample = __decorate([
        core_1.Component({
            selector: 'cdk-drag-drop-root-element-example',
            template: "<button (click)=\"openDialog()\">Open a draggable dialog</button><ng-template><div class=\"example-dialog-content\" cdkDrag cdkDragRootElement=\".cdk-overlay-pane\">Drag the dialog around!</div></ng-template>",
            styles: [".example-dialog-content { width: 200px; height: 200px; border: solid 1px #ccc; color: rgba(0, 0, 0, 0.87); cursor: move; display: flex; justify-content: center; align-items: center; background: #fff; border-radius: 4px; transition: box-shadow 200ms cubic-bezier(0, 0, 0.2, 1); box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12); } .example-dialog-content:active { box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); } "],
        }),
        __metadata("design:paramtypes", [overlay_1.Overlay, core_1.ViewContainerRef])
    ], CdkDragDropRootElementExample);
    return CdkDragDropRootElementExample;
}());
exports.CdkDragDropRootElementExample = CdkDragDropRootElementExample;
//# sourceMappingURL=cdk-drag-drop-root-element-example.js.map