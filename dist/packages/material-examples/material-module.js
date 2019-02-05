"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scrolling_1 = require("@angular/cdk/scrolling");
var a11y_1 = require("@angular/cdk/a11y");
var table_1 = require("@angular/cdk/table");
var tree_1 = require("@angular/cdk/tree");
var drag_drop_1 = require("@angular/cdk/drag-drop");
var stepper_1 = require("@angular/cdk/stepper");
var portal_1 = require("@angular/cdk/portal");
var material_1 = require("@angular/material");
var ExampleMaterialModule = /** @class */ (function () {
    function ExampleMaterialModule() {
    }
    ExampleMaterialModule = __decorate([
        core_1.NgModule({
            imports: [
                a11y_1.A11yModule,
                table_1.CdkTableModule,
                tree_1.CdkTreeModule,
                stepper_1.CdkStepperModule,
                drag_drop_1.DragDropModule,
                material_1.MatAutocompleteModule,
                material_1.MatBadgeModule,
                material_1.MatBottomSheetModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatDividerModule,
                material_1.MatExpansionModule,
                material_1.MatFormFieldModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSlideToggleModule,
                material_1.MatSliderModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatStepperModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                material_1.MatTreeModule,
                scrolling_1.ScrollingModule,
                portal_1.PortalModule,
            ],
            exports: [
                a11y_1.A11yModule,
                table_1.CdkTableModule,
                tree_1.CdkTreeModule,
                stepper_1.CdkStepperModule,
                drag_drop_1.DragDropModule,
                material_1.MatAutocompleteModule,
                material_1.MatBadgeModule,
                material_1.MatBottomSheetModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatDividerModule,
                material_1.MatExpansionModule,
                material_1.MatFormFieldModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSlideToggleModule,
                material_1.MatSliderModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatStepperModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                material_1.MatTreeModule,
                scrolling_1.ScrollingModule,
                portal_1.PortalModule,
            ]
        })
    ], ExampleMaterialModule);
    return ExampleMaterialModule;
}());
exports.ExampleMaterialModule = ExampleMaterialModule;
//# sourceMappingURL=material-module.js.map