"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_1 = require("./element");
describe('coerceElement', function () {
    it('should coerce an ElementRef into an element', function () {
        var ref = new core_1.ElementRef(document.body);
        expect(element_1.coerceElement(ref)).toBe(document.body);
    });
    it('should return the element, if a native element is passed in', function () {
        expect(element_1.coerceElement(document.body)).toBe(document.body);
    });
});
//# sourceMappingURL=element.spec.js.map