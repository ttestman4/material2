/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional, SkipSelf, } from '@angular/core';
import { addAriaReferencedId, getAriaReferenceIds, removeAriaReferencedId } from './aria-reference';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Interface used to register message elements and keep a count of how many registrations have
 * the same message and the reference to the message element used for the `aria-describedby`.
 * @record
 */
export function RegisteredMessage() { }
if (false) {
    /**
     * The element containing the message.
     * @type {?}
     */
    RegisteredMessage.prototype.messageElement;
    /**
     * The number of elements that reference this message element via `aria-describedby`.
     * @type {?}
     */
    RegisteredMessage.prototype.referenceCount;
}
/**
 * ID used for the body container where all messages are appended.
 * @type {?}
 */
export var MESSAGES_CONTAINER_ID = 'cdk-describedby-message-container';
/**
 * ID prefix used for each created message element.
 * @type {?}
 */
export var CDK_DESCRIBEDBY_ID_PREFIX = 'cdk-describedby-message';
/**
 * Attribute given to each host element that is described by a message element.
 * @type {?}
 */
export var CDK_DESCRIBEDBY_HOST_ATTRIBUTE = 'cdk-describedby-host';
/**
 * Global incremental identifier for each registered message element.
 * @type {?}
 */
var nextId = 0;
/**
 * Global map of all registered message elements that have been placed into the document.
 * @type {?}
 */
var messageRegistry = new Map();
/**
 * Container for all registered messages.
 * @type {?}
 */
var messagesContainer = null;
/**
 * Utility that creates visually hidden elements with a message content. Useful for elements that
 * want to use aria-describedby to further describe themselves without adding additional visual
 * content.
 * \@docs-private
 */
var AriaDescriber = /** @class */ (function () {
    function AriaDescriber(_document) {
        this._document = _document;
    }
    /**
     * Adds to the host element an aria-describedby reference to a hidden element that contains
     * the message. If the same message has already been registered, then it will reuse the created
     * message element.
     */
    /**
     * Adds to the host element an aria-describedby reference to a hidden element that contains
     * the message. If the same message has already been registered, then it will reuse the created
     * message element.
     * @param {?} hostElement
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype.describe = /**
     * Adds to the host element an aria-describedby reference to a hidden element that contains
     * the message. If the same message has already been registered, then it will reuse the created
     * message element.
     * @param {?} hostElement
     * @param {?} message
     * @return {?}
     */
    function (hostElement, message) {
        if (!this._canBeDescribed(hostElement, message)) {
            return;
        }
        if (!messageRegistry.has(message)) {
            this._createMessageElement(message);
        }
        if (!this._isElementDescribedByMessage(hostElement, message)) {
            this._addMessageReference(hostElement, message);
        }
    };
    /** Removes the host element's aria-describedby reference to the message element. */
    /**
     * Removes the host element's aria-describedby reference to the message element.
     * @param {?} hostElement
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype.removeDescription = /**
     * Removes the host element's aria-describedby reference to the message element.
     * @param {?} hostElement
     * @param {?} message
     * @return {?}
     */
    function (hostElement, message) {
        if (!this._canBeDescribed(hostElement, message)) {
            return;
        }
        if (this._isElementDescribedByMessage(hostElement, message)) {
            this._removeMessageReference(hostElement, message);
        }
        /** @type {?} */
        var registeredMessage = messageRegistry.get(message);
        if (registeredMessage && registeredMessage.referenceCount === 0) {
            this._deleteMessageElement(message);
        }
        if (messagesContainer && messagesContainer.childNodes.length === 0) {
            this._deleteMessagesContainer();
        }
    };
    /** Unregisters all created message elements and removes the message container. */
    /**
     * Unregisters all created message elements and removes the message container.
     * @return {?}
     */
    AriaDescriber.prototype.ngOnDestroy = /**
     * Unregisters all created message elements and removes the message container.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var describedElements = this._document.querySelectorAll("[" + CDK_DESCRIBEDBY_HOST_ATTRIBUTE + "]");
        for (var i = 0; i < describedElements.length; i++) {
            this._removeCdkDescribedByReferenceIds(describedElements[i]);
            describedElements[i].removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
        }
        if (messagesContainer) {
            this._deleteMessagesContainer();
        }
        messageRegistry.clear();
    };
    /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     */
    /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     * @private
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype._createMessageElement = /**
     * Creates a new element in the visually hidden message container element with the message
     * as its content and adds it to the message registry.
     * @private
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var messageElement = this._document.createElement('div');
        messageElement.setAttribute('id', CDK_DESCRIBEDBY_ID_PREFIX + "-" + nextId++);
        messageElement.appendChild((/** @type {?} */ (this._document.createTextNode(message))));
        this._createMessagesContainer();
        (/** @type {?} */ (messagesContainer)).appendChild(messageElement);
        messageRegistry.set(message, { messageElement: messageElement, referenceCount: 0 });
    };
    /** Deletes the message element from the global messages container. */
    /**
     * Deletes the message element from the global messages container.
     * @private
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype._deleteMessageElement = /**
     * Deletes the message element from the global messages container.
     * @private
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var registeredMessage = messageRegistry.get(message);
        /** @type {?} */
        var messageElement = registeredMessage && registeredMessage.messageElement;
        if (messagesContainer && messageElement) {
            messagesContainer.removeChild(messageElement);
        }
        messageRegistry.delete(message);
    };
    /** Creates the global container for all aria-describedby messages. */
    /**
     * Creates the global container for all aria-describedby messages.
     * @private
     * @return {?}
     */
    AriaDescriber.prototype._createMessagesContainer = /**
     * Creates the global container for all aria-describedby messages.
     * @private
     * @return {?}
     */
    function () {
        if (!messagesContainer) {
            /** @type {?} */
            var preExistingContainer = this._document.getElementById(MESSAGES_CONTAINER_ID);
            // When going from the server to the client, we may end up in a situation where there's
            // already a container on the page, but we don't have a reference to it. Clear the
            // old container so we don't get duplicates. Doing this, instead of emptying the previous
            // container, should be slightly faster.
            if (preExistingContainer) {
                (/** @type {?} */ (preExistingContainer.parentNode)).removeChild(preExistingContainer);
            }
            messagesContainer = this._document.createElement('div');
            messagesContainer.id = MESSAGES_CONTAINER_ID;
            messagesContainer.setAttribute('aria-hidden', 'true');
            messagesContainer.style.display = 'none';
            this._document.body.appendChild(messagesContainer);
        }
    };
    /** Deletes the global messages container. */
    /**
     * Deletes the global messages container.
     * @private
     * @return {?}
     */
    AriaDescriber.prototype._deleteMessagesContainer = /**
     * Deletes the global messages container.
     * @private
     * @return {?}
     */
    function () {
        if (messagesContainer && messagesContainer.parentNode) {
            messagesContainer.parentNode.removeChild(messagesContainer);
            messagesContainer = null;
        }
    };
    /** Removes all cdk-describedby messages that are hosted through the element. */
    /**
     * Removes all cdk-describedby messages that are hosted through the element.
     * @private
     * @param {?} element
     * @return {?}
     */
    AriaDescriber.prototype._removeCdkDescribedByReferenceIds = /**
     * Removes all cdk-describedby messages that are hosted through the element.
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        // Remove all aria-describedby reference IDs that are prefixed by CDK_DESCRIBEDBY_ID_PREFIX
        /** @type {?} */
        var originalReferenceIds = getAriaReferenceIds(element, 'aria-describedby')
            .filter(function (id) { return id.indexOf(CDK_DESCRIBEDBY_ID_PREFIX) != 0; });
        element.setAttribute('aria-describedby', originalReferenceIds.join(' '));
    };
    /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     */
    /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype._addMessageReference = /**
     * Adds a message reference to the element using aria-describedby and increments the registered
     * message's reference count.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    function (element, message) {
        /** @type {?} */
        var registeredMessage = (/** @type {?} */ (messageRegistry.get(message)));
        // Add the aria-describedby reference and set the
        // describedby_host attribute to mark the element.
        addAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.setAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE, '');
        registeredMessage.referenceCount++;
    };
    /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     */
    /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype._removeMessageReference = /**
     * Removes a message reference from the element using aria-describedby
     * and decrements the registered message's reference count.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    function (element, message) {
        /** @type {?} */
        var registeredMessage = (/** @type {?} */ (messageRegistry.get(message)));
        registeredMessage.referenceCount--;
        removeAriaReferencedId(element, 'aria-describedby', registeredMessage.messageElement.id);
        element.removeAttribute(CDK_DESCRIBEDBY_HOST_ATTRIBUTE);
    };
    /** Returns true if the element has been described by the provided message ID. */
    /**
     * Returns true if the element has been described by the provided message ID.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype._isElementDescribedByMessage = /**
     * Returns true if the element has been described by the provided message ID.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    function (element, message) {
        /** @type {?} */
        var referenceIds = getAriaReferenceIds(element, 'aria-describedby');
        /** @type {?} */
        var registeredMessage = messageRegistry.get(message);
        /** @type {?} */
        var messageId = registeredMessage && registeredMessage.messageElement.id;
        return !!messageId && referenceIds.indexOf(messageId) != -1;
    };
    /** Determines whether a message can be described on a particular element. */
    /**
     * Determines whether a message can be described on a particular element.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    AriaDescriber.prototype._canBeDescribed = /**
     * Determines whether a message can be described on a particular element.
     * @private
     * @param {?} element
     * @param {?} message
     * @return {?}
     */
    function (element, message) {
        return element.nodeType === this._document.ELEMENT_NODE && message != null &&
            !!("" + message).trim();
    };
    AriaDescriber.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    AriaDescriber.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ AriaDescriber.ngInjectableDef = i0.defineInjectable({ factory: function AriaDescriber_Factory() { return new AriaDescriber(i0.inject(i1.DOCUMENT)); }, token: AriaDescriber, providedIn: "root" });
    return AriaDescriber;
}());
export { AriaDescriber };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AriaDescriber.prototype._document;
}
/**
 * \@docs-private \@deprecated \@breaking-change 8.0.0
 * @param {?} parentDispatcher
 * @param {?} _document
 * @return {?}
 */
export function ARIA_DESCRIBER_PROVIDER_FACTORY(parentDispatcher, _document) {
    return parentDispatcher || new AriaDescriber(_document);
}
/**
 * \@docs-private \@deprecated \@breaking-change 8.0.0
 * @type {?}
 */
export var ARIA_DESCRIBER_PROVIDER = {
    // If there is already an AriaDescriber available, use that. Otherwise, provide a new one.
    provide: AriaDescriber,
    deps: [
        [new Optional(), new SkipSelf(), AriaDescriber],
        (/** @type {?} */ (DOCUMENT))
    ],
    useFactory: ARIA_DESCRIBER_PROVIDER_FACTORY
};
//# sourceMappingURL=aria-describer.js.map