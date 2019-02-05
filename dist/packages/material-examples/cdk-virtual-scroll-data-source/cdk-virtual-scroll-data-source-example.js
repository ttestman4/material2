"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/** @title Virtual scroll with a custom data source */
var CdkVirtualScrollDataSourceExample = /** @class */ (function () {
    function CdkVirtualScrollDataSourceExample() {
        this.ds = new MyDataSource();
    }
    CdkVirtualScrollDataSourceExample = __decorate([
        core_1.Component({
            selector: 'cdk-virtual-scroll-data-source-example',
            styles: [".example-viewport { height: 200px; width: 200px; border: 1px solid black; } .example-item { height: 50px; } "],
            template: "<cdk-virtual-scroll-viewport itemSize=\"50\" class=\"example-viewport\"><div *cdkVirtualFor=\"let item of ds\" class=\"example-item\">{{item || 'Loading...'}}</div></cdk-virtual-scroll-viewport>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], CdkVirtualScrollDataSourceExample);
    return CdkVirtualScrollDataSourceExample;
}());
exports.CdkVirtualScrollDataSourceExample = CdkVirtualScrollDataSourceExample;
var MyDataSource = /** @class */ (function (_super) {
    __extends(MyDataSource, _super);
    function MyDataSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.length = 100000;
        _this.pageSize = 100;
        _this.cachedData = Array.from({ length: _this.length });
        _this.fetchedPages = new Set();
        _this.dataStream = new rxjs_1.BehaviorSubject(_this.cachedData);
        _this.subscription = new rxjs_1.Subscription();
        return _this;
    }
    MyDataSource.prototype.connect = function (collectionViewer) {
        var _this = this;
        this.subscription.add(collectionViewer.viewChange.subscribe(function (range) {
            var startPage = _this.getPageForIndex(range.start);
            var endPage = _this.getPageForIndex(range.end - 1);
            for (var i = startPage; i <= endPage; i++) {
                _this.fetchPage(i);
            }
        }));
        return this.dataStream;
    };
    MyDataSource.prototype.disconnect = function () {
        this.subscription.unsubscribe();
    };
    MyDataSource.prototype.getPageForIndex = function (index) {
        return Math.floor(index / this.pageSize);
    };
    MyDataSource.prototype.fetchPage = function (page) {
        var _this = this;
        if (this.fetchedPages.has(page)) {
            return;
        }
        this.fetchedPages.add(page);
        // Use `setTimeout` to simulate fetching data from server.
        setTimeout(function () {
            var _a;
            (_a = _this.cachedData).splice.apply(_a, [page * _this.pageSize, _this.pageSize].concat(Array.from({ length: _this.pageSize })
                .map(function (_, i) { return "Item #" + (page * _this.pageSize + i); })));
            _this.dataStream.next(_this.cachedData);
        }, Math.random() * 1000 + 200);
    };
    return MyDataSource;
}(collections_1.DataSource));
exports.MyDataSource = MyDataSource;
//# sourceMappingURL=cdk-virtual-scroll-data-source-example.js.map