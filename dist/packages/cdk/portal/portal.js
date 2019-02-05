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
import { throwNullPortalOutletError, throwPortalAlreadyAttachedError, throwNoPortalAttachedError, throwNullPortalError, throwPortalOutletAlreadyDisposedError, throwUnknownPortalTypeError } from './portal-errors';
/**
 * Interface that can be used to generically type a class.
 * @record
 * @template T
 */
export function ComponentType() { }
/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalOutlet`.
 * @abstract
 * @template T
 */
export class Portal {
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @return {?}
     */
    attach(host) {
        if (host == null) {
            throwNullPortalOutletError();
        }
        if (host.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        this._attachedHost = host;
        return (/** @type {?} */ (host.attach(this)));
    }
    /**
     * Detach this portal from its host
     * @return {?}
     */
    detach() {
        /** @type {?} */
        let host = this._attachedHost;
        if (host == null) {
            throwNoPortalAttachedError();
        }
        else {
            this._attachedHost = null;
            host.detach();
        }
    }
    /**
     * Whether this portal is attached to a host.
     * @return {?}
     */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalOutlet reference without performing `attach()`. This is used directly by
     * the PortalOutlet when it is performing an `attach()` or `detach()`.
     * @param {?} host
     * @return {?}
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    Portal.prototype._attachedHost;
}
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
export class ComponentPortal extends Portal {
    /**
     * @param {?} component
     * @param {?=} viewContainerRef
     * @param {?=} injector
     * @param {?=} componentFactoryResolver
     */
    constructor(component, viewContainerRef, injector, componentFactoryResolver) {
        super();
        this.component = component;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.componentFactoryResolver = componentFactoryResolver;
    }
}
if (false) {
    /**
     * The type of the component that will be instantiated for attachment.
     * @type {?}
     */
    ComponentPortal.prototype.component;
    /**
     * [Optional] Where the attached component should live in Angular's *logical* component tree.
     * This is different from where the component *renders*, which is determined by the PortalOutlet.
     * The origin is necessary when the host is outside of the Angular application context.
     * @type {?}
     */
    ComponentPortal.prototype.viewContainerRef;
    /**
     * [Optional] Injector used for the instantiation of the component.
     * @type {?}
     */
    ComponentPortal.prototype.injector;
    /**
     * Alternate `ComponentFactoryResolver` to use when resolving the associated component.
     * Defaults to using the resolver from the outlet that the portal is attached to.
     * @type {?}
     */
    ComponentPortal.prototype.componentFactoryResolver;
}
/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 * @template C
 */
export class TemplatePortal extends Portal {
    /**
     * @param {?} template
     * @param {?} viewContainerRef
     * @param {?=} context
     */
    constructor(template, viewContainerRef, context) {
        super();
        this.templateRef = template;
        this.viewContainerRef = viewContainerRef;
        this.context = context;
    }
    /**
     * @return {?}
     */
    get origin() {
        return this.templateRef.elementRef;
    }
    /**
     * Attach the portal to the provided `PortalOutlet`.
     * When a context is provided it will override the `context` property of the `TemplatePortal`
     * instance.
     * @param {?} host
     * @param {?=} context
     * @return {?}
     */
    attach(host, context = this.context) {
        this.context = context;
        return super.attach(host);
    }
    /**
     * @return {?}
     */
    detach() {
        this.context = undefined;
        return super.detach();
    }
}
if (false) {
    /**
     * The embedded template that will be used to instantiate an embedded View in the host.
     * @type {?}
     */
    TemplatePortal.prototype.templateRef;
    /**
     * Reference to the ViewContainer into which the template will be stamped out.
     * @type {?}
     */
    TemplatePortal.prototype.viewContainerRef;
    /**
     * Contextual data to be passed in to the embedded view.
     * @type {?}
     */
    TemplatePortal.prototype.context;
}
/**
 * A `PortalOutlet` is an space that can contain a single `Portal`.
 * @record
 */
export function PortalOutlet() { }
if (false) {
    /**
     * Attaches a portal to this outlet.
     * @param {?} portal
     * @return {?}
     */
    PortalOutlet.prototype.attach = function (portal) { };
    /**
     * Detaches the currently attached portal from this outlet.
     * @return {?}
     */
    PortalOutlet.prototype.detach = function () { };
    /**
     * Performs cleanup before the outlet is destroyed.
     * @return {?}
     */
    PortalOutlet.prototype.dispose = function () { };
    /**
     * Whether there is currently a portal attached to this outlet.
     * @return {?}
     */
    PortalOutlet.prototype.hasAttached = function () { };
}
/**
 * Partial implementation of PortalOutlet that handles attaching
 * ComponentPortal and TemplatePortal.
 * @abstract
 */
export class BasePortalOutlet {
    constructor() {
        /**
         * Whether this host has already been permanently disposed.
         */
        this._isDisposed = false;
    }
    /**
     * Whether this host has an attached portal.
     * @return {?}
     */
    hasAttached() {
        return !!this._attachedPortal;
    }
    /**
     * Attaches a portal.
     * @param {?} portal
     * @return {?}
     */
    attach(portal) {
        if (!portal) {
            throwNullPortalError();
        }
        if (this.hasAttached()) {
            throwPortalAlreadyAttachedError();
        }
        if (this._isDisposed) {
            throwPortalOutletAlreadyDisposedError();
        }
        if (portal instanceof ComponentPortal) {
            this._attachedPortal = portal;
            return this.attachComponentPortal(portal);
        }
        else if (portal instanceof TemplatePortal) {
            this._attachedPortal = portal;
            return this.attachTemplatePortal(portal);
        }
        throwUnknownPortalTypeError();
    }
    /**
     * Detaches a previously attached portal.
     * @return {?}
     */
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost(null);
            this._attachedPortal = null;
        }
        this._invokeDisposeFn();
    }
    /**
     * Permanently dispose of this portal host.
     * @return {?}
     */
    dispose() {
        if (this.hasAttached()) {
            this.detach();
        }
        this._invokeDisposeFn();
        this._isDisposed = true;
    }
    /**
     * \@docs-private
     * @param {?} fn
     * @return {?}
     */
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
    /**
     * @private
     * @return {?}
     */
    _invokeDisposeFn() {
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = null;
        }
    }
}
if (false) {
    /**
     * The portal currently attached to the host.
     * @type {?}
     * @protected
     */
    BasePortalOutlet.prototype._attachedPortal;
    /**
     * A function that will permanently dispose this host.
     * @type {?}
     * @private
     */
    BasePortalOutlet.prototype._disposeFn;
    /**
     * Whether this host has already been permanently disposed.
     * @type {?}
     * @private
     */
    BasePortalOutlet.prototype._isDisposed;
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @return {?}
     */
    BasePortalOutlet.prototype.attachComponentPortal = function (portal) { };
    /**
     * @abstract
     * @template C
     * @param {?} portal
     * @return {?}
     */
    BasePortalOutlet.prototype.attachTemplatePortal = function (portal) { };
}
//# sourceMappingURL=portal.js.map