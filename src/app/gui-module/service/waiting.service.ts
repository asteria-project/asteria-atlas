import { Injectable, EventEmitter, Output } from '@angular/core';
import { SpinnerState } from '../model/spinner-state.model';

/**
 * The <code>WaitingService</code> service is responsible for managing the blocking modal component.
 */
@Injectable({
    providedIn: 'root'
})
export class WaitingService {

    /**
     * Dispatch notifications that indicates state of the blocking modal component.
     */
    @Output() public readonly stateChange: EventEmitter<SpinnerState> = new EventEmitter<SpinnerState>();

    /**
     * Create a new <code>WaitingService</code> instance.
     */
    constructor() { }

    /**
     * Set the blocking modal component state to freezed.
     */
    public show(message: string = ''): void {
        const state: SpinnerState = {
            isFreezed: true,
            message: message
        };
        this.stateChange.emit(state);
    }
    
    /**
     * Set the blocking modal component state to unfreezed.
     */
    public hide(): void {
        const state: SpinnerState = {
            isFreezed: false,
            message: ''
        };
        this.stateChange.emit(state);
    }
}