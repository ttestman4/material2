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
var portal_1 = require("@angular/cdk/portal");
/**
 * @title Portal overview
 */
var CdkPortalOverviewExample = /** @class */ (function () {
    function CdkPortalOverviewExample(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    CdkPortalOverviewExample.prototype.ngAfterViewInit = function () {
        this.componentPortal = new portal_1.ComponentPortal(ComponentPortalExample);
        this.templatePortal = new portal_1.TemplatePortal(this.templatePortalContent, this._viewContainerRef);
    };
    __decorate([
        core_1.ViewChild('templatePortalContent'),
        __metadata("design:type", core_1.TemplateRef)
    ], CdkPortalOverviewExample.prototype, "templatePortalContent", void 0);
    CdkPortalOverviewExample = __decorate([
        core_1.Component({
            selector: 'cdk-portal-overview-example',
            template: "<h2>The portal outlet is below:</h2><div class=\"example-portal-outlet\"><ng-template [cdkPortalOutlet]=\"selectedPortal\"></ng-template></div><ng-template #templatePortalContent>Hello, this is a template portal</ng-template><button (click)=\"selectedPortal = componentPortal\">Render component portal</button> <button (click)=\"selectedPortal = templatePortal\">Render template portal</button>",
            styles: [".example-portal-outlet { margin-bottom: 10px; padding: 10px; border: 1px dashed black; width: 250px; height: 250px; } "],
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], CdkPortalOverviewExample);
    return CdkPortalOverviewExample;
}());
exports.CdkPortalOverviewExample = CdkPortalOverviewExample;
var ComponentPortalExample = /** @class */ (function () {
    function ComponentPortalExample() {
    }
    ComponentPortalExample = __decorate([
        core_1.Component({
            selector: 'component-portal-example',
            template: 'Hello, this is a component portal'
        })
    ], ComponentPortalExample);
    return ComponentPortalExample;
}());
exports.ComponentPortalExample = ComponentPortalExample;
//# sourceMappingURL=cdk-portal-overview-example.js.map