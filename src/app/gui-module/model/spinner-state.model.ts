/**
 * The <code>SpinnerState</code> interface defines the state of the Atlas blocking  modal component.
 */
export interface SpinnerState {

    /**
     * Indicates whether the Atlas blocking modal component is displayed (<code>true</code>), or not
     * (<code>false</code>).
     */
    isFreezed: boolean;

    /**
     * The message displayed of the Atlas blocking modal component when <code>isFreezed</code> is <code>true</code>.
     */
    message: string;
}
