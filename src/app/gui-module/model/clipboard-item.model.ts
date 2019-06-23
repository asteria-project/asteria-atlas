/**
 * The <code>ClipboardItem</code> interface defines the API that you must implement to create an element that can be
 * stored in the Atlas clipboard.
 */
export interface ClipboardItem {

    /**
     * The item name.
     */
    name: string;

    /**
     * The item content to store in the clipboard.
     */
    content: any;
}