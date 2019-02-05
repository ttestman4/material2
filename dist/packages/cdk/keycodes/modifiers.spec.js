"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/cdk/testing");
var modifiers_1 = require("./modifiers");
describe('keyboard modifiers', function () {
    it('should check whether the alt key is pressed', function () {
        var event = testing_1.createKeyboardEvent('keydown', 0);
        expect(modifiers_1.hasModifierKey(event)).toBe(false);
        Object.defineProperty(event, 'altKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event)).toBe(true);
    });
    it('should check whether the shift key is pressed', function () {
        var event = testing_1.createKeyboardEvent('keydown', 0);
        expect(modifiers_1.hasModifierKey(event)).toBe(false);
        Object.defineProperty(event, 'shiftKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event)).toBe(true);
    });
    it('should check whether the meta key is pressed', function () {
        var event = testing_1.createKeyboardEvent('keydown', 0);
        expect(modifiers_1.hasModifierKey(event)).toBe(false);
        Object.defineProperty(event, 'metaKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event)).toBe(true);
    });
    it('should check whether the ctrl key is pressed', function () {
        var event = testing_1.createKeyboardEvent('keydown', 0);
        expect(modifiers_1.hasModifierKey(event)).toBe(false);
        Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event)).toBe(true);
    });
    it('should check if a particular modifier key is pressed', function () {
        var event = testing_1.createKeyboardEvent('keydown', 0);
        Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event, 'altKey')).toBe(false);
        Object.defineProperty(event, 'altKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event, 'altKey')).toBe(true);
    });
    it('should check if multiple specific modifier keys are pressed', function () {
        var event = testing_1.createKeyboardEvent('keydown', 0);
        Object.defineProperty(event, 'ctrlKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event, 'altKey', 'shiftKey')).toBe(false);
        Object.defineProperty(event, 'altKey', { get: function () { return true; } });
        Object.defineProperty(event, 'shiftKey', { get: function () { return true; } });
        expect(modifiers_1.hasModifierKey(event, 'altKey', 'shiftKey')).toBe(true);
    });
});
//# sourceMappingURL=modifiers.spec.js.map