"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var layout_1 = require("@angular/cdk/layout");
var overlay_1 = require("@angular/cdk/overlay");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var material_examples_1 = require("@angular/material-examples");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var autocomplete_demo_1 = require("./autocomplete/autocomplete-demo");
var badge_demo_1 = require("./badge/badge-demo");
var baseline_demo_1 = require("./baseline/baseline-demo");
var bottom_sheet_demo_1 = require("./bottom-sheet/bottom-sheet-demo");
var button_toggle_demo_1 = require("./button-toggle/button-toggle-demo");
var button_demo_1 = require("./button/button-demo");
var card_demo_1 = require("./card/card-demo");
var checkbox_demo_1 = require("./checkbox/checkbox-demo");
var chips_demo_1 = require("./chips/chips-demo");
var connected_overlay_demo_1 = require("./connected-overlay/connected-overlay-demo");
var datepicker_demo_1 = require("./datepicker/datepicker-demo");
var dev_app_1 = require("./dev-app");
var dialog_demo_1 = require("./dialog/dialog-demo");
var drag_drop_demo_1 = require("./drag-drop/drag-drop-demo");
var drawer_demo_1 = require("./drawer/drawer-demo");
var example_module_1 = require("./example/example-module");
var examples_page_1 = require("./examples-page/examples-page");
var expansion_demo_1 = require("./expansion/expansion-demo");
var focus_origin_demo_1 = require("./focus-origin/focus-origin-demo");
var gestures_demo_1 = require("./gestures/gestures-demo");
var grid_list_demo_1 = require("./grid-list/grid-list-demo");
var icon_demo_1 = require("./icon/icon-demo");
var input_demo_1 = require("./input/input-demo");
var list_demo_1 = require("./list/list-demo");
var live_announcer_demo_1 = require("./live-announcer/live-announcer-demo");
var material_module_1 = require("./material-module");
var menu_demo_1 = require("./menu/menu-demo");
var paginator_demo_1 = require("./paginator/paginator-demo");
var platform_demo_1 = require("./platform/platform-demo");
var portal_demo_1 = require("./portal/portal-demo");
var progress_bar_demo_1 = require("./progress-bar/progress-bar-demo");
var progress_spinner_demo_1 = require("./progress-spinner/progress-spinner-demo");
var radio_demo_1 = require("./radio/radio-demo");
var ripple_demo_1 = require("./ripple/ripple-demo");
var ripple_options_1 = require("./ripple/ripple-options");
var routes_1 = require("./routes");
var screen_type_demo_1 = require("./screen-type/screen-type-demo");
var select_demo_1 = require("./select/select-demo");
var sidenav_demo_1 = require("./sidenav/sidenav-demo");
var slide_toggle_demo_1 = require("./slide-toggle/slide-toggle-demo");
var slider_demo_1 = require("./slider/slider-demo");
var snack_bar_demo_1 = require("./snack-bar/snack-bar-demo");
var stepper_demo_1 = require("./stepper/stepper-demo");
var table_demo_module_1 = require("./table/table-demo-module");
var tabs_demo_1 = require("./tabs/tabs-demo");
var toolbar_demo_1 = require("./toolbar/toolbar-demo");
var tooltip_demo_1 = require("./tooltip/tooltip-demo");
var tree_demo_module_1 = require("./tree/tree-demo-module");
var typography_demo_1 = require("./typography/typography-demo");
var virtual_scroll_demo_1 = require("./virtual-scroll/virtual-scroll-demo");
var DevAppModule = /** @class */ (function () {
    function DevAppModule() {
    }
    DevAppModule = __decorate([
        core_1.NgModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                material_module_1.DevAppMaterialModule,
                material_examples_1.ExampleModule,
                example_module_1.ExamplePageModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                layout_1.LayoutModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(routes_1.DEV_APP_ROUTES),
                table_demo_module_1.TableDemoModule,
                tree_demo_module_1.TreeDemoModule,
            ],
            declarations: [
                autocomplete_demo_1.AutocompleteDemo,
                badge_demo_1.BadgeDemo,
                baseline_demo_1.BaselineDemo,
                bottom_sheet_demo_1.BottomSheetDemo,
                button_demo_1.ButtonDemo,
                button_toggle_demo_1.ButtonToggleDemo,
                card_demo_1.CardDemo,
                checkbox_demo_1.CheckboxDemo,
                chips_demo_1.ChipsDemo,
                connected_overlay_demo_1.ConnectedOverlayDemo,
                dialog_demo_1.ContentElementDialog,
                datepicker_demo_1.CustomHeader,
                datepicker_demo_1.CustomHeaderNgContent,
                datepicker_demo_1.DatepickerDemo,
                dev_app_1.DevAppComponent,
                dev_app_1.DevAppHome,
                dev_app_1.DevApp404,
                dialog_demo_1.DialogDemo,
                drag_drop_demo_1.DragAndDropDemo,
                drawer_demo_1.DrawerDemo,
                bottom_sheet_demo_1.ExampleBottomSheet,
                examples_page_1.ExamplesPage,
                expansion_demo_1.ExpansionDemo,
                focus_origin_demo_1.FocusOriginDemo,
                gestures_demo_1.GesturesDemo,
                grid_list_demo_1.GridListDemo,
                icon_demo_1.IconDemo,
                dialog_demo_1.IFrameDialog,
                input_demo_1.InputDemo,
                dialog_demo_1.JazzDialog,
                list_demo_1.ListDemo,
                live_announcer_demo_1.LiveAnnouncerDemo,
                checkbox_demo_1.MatCheckboxDemoNestedChecklist,
                menu_demo_1.MenuDemo,
                paginator_demo_1.PaginatorDemo,
                platform_demo_1.PlatformDemo,
                portal_demo_1.PortalDemo,
                progress_bar_demo_1.ProgressBarDemo,
                progress_spinner_demo_1.ProgressSpinnerDemo,
                radio_demo_1.RadioDemo,
                ripple_demo_1.RippleDemo,
                portal_demo_1.ScienceJoke,
                screen_type_demo_1.ScreenTypeDemo,
                select_demo_1.SelectDemo,
                sidenav_demo_1.SidenavDemo,
                slider_demo_1.SliderDemo,
                slide_toggle_demo_1.SlideToggleDemo,
                snack_bar_demo_1.SnackBarDemo,
                stepper_demo_1.StepperDemo,
                tabs_demo_1.TabsDemo,
                toolbar_demo_1.ToolbarDemo,
                tooltip_demo_1.TooltipDemo,
                typography_demo_1.TypographyDemo,
                virtual_scroll_demo_1.VirtualScrollDemo,
            ],
            providers: [
                { provide: overlay_1.OverlayContainer, useClass: overlay_1.FullscreenOverlayContainer },
                { provide: material_1.MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: ripple_options_1.DevAppRippleOptions },
            ],
            entryComponents: [
                dialog_demo_1.ContentElementDialog,
                datepicker_demo_1.CustomHeader,
                datepicker_demo_1.CustomHeaderNgContent,
                bottom_sheet_demo_1.ExampleBottomSheet,
                dialog_demo_1.IFrameDialog,
                dialog_demo_1.JazzDialog,
                portal_demo_1.ScienceJoke,
            ],
            bootstrap: [dev_app_1.DevAppComponent],
        })
    ], DevAppModule);
    return DevAppModule;
}());
exports.DevAppModule = DevAppModule;
//# sourceMappingURL=dev-app-module.js.map