/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationEvent } from '@angular/animations';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, ComponentPortal, PortalHostDirective, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogConfig } from './dialog-config';
export declare function throwDialogContentAlreadyAttachedError(): void;
/**
 * Internal component that wraps user-provided dialog content.
 * @docs-private
 */
export declare class CdkDialogContainer extends BasePortalOutlet implements OnDestroy {
    private _elementRef;
    private _focusTrapFactory;
    private _changeDetectorRef;
    private _document;
    /** The dialog configuration. */
    _config: DialogConfig;
    /** State of the dialog animation. */
    _state: 'void' | 'enter' | 'exit';
    /** Element that was focused before the dialog was opened. Save this to restore upon close. */
    private _elementFocusedBeforeDialogWasOpened;
    /** The class that traps and manages focus within the dialog. */
    private _focusTrap;
    readonly _ariaLabel: string | null;
    readonly _ariaDescribedBy: string | null | undefined;
    readonly _role: "dialog" | "alertdialog" | undefined;
    readonly _tabindex: number;
    /** The portal host inside of this container into which the dialog content will be loaded. */
    _portalHost: PortalHostDirective;
    /** A subject emitting before the dialog enters the view. */
    _beforeEnter: Subject<void>;
    /** A subject emitting after the dialog enters the view. */
    _afterEnter: Subject<void>;
    /** A subject emitting before the dialog exits the view. */
    _beforeExit: Subject<void>;
    /** A subject emitting after the dialog exits the view. */
    _afterExit: Subject<void>;
    /** Stream of animation `done` events. */
    _animationDone: Subject<AnimationEvent>;
    constructor(_elementRef: ElementRef<HTMLElement>, _focusTrapFactory: FocusTrapFactory, _changeDetectorRef: ChangeDetectorRef, _document: any, 
    /** The dialog configuration. */
    _config: DialogConfig);
    /** Destroy focus trap to place focus back to the element focused before the dialog opened. */
    ngOnDestroy(): void;
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /**
     * Attach a TemplatePortal as content to this dialog container.
     * @param portal Portal to be attached as the dialog content.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    /** Emit lifecycle events based on animation `start` callback. */
    _onAnimationStart(event: AnimationEvent): void;
    /** Starts the dialog exit animation. */
    _startExiting(): void;
    /** Saves a reference to the element that was focused before the dialog was opened. */
    private _savePreviouslyFocusedElement;
    /**
     * Autofocus the first tabbable element inside of the dialog, if there is not a tabbable element,
     * focus the dialog instead.
     */
    private _autoFocusFirstTabbableElement;
    /** Returns the focus to the element focused before the dialog was open. */
    private _returnFocusAfterDialog;
}
