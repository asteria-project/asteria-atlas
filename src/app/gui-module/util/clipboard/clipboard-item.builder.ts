import { ClipboardItem } from '../../model/clipboard-item.model';

/**
 * The builder that creates <code>ClipboardItem</code> objects.
 */
export class ClipboardItemBuilder {

    /**
     * Build and return a new <code>ClipboardItem</code> object.
     * 
     * @param {string} name the item name.
     * @param {any} content the content to store in the clipboard.
     * 
     * @return {ClipboardItem} a new <code>ClipboardItem</code> object.
     */
    public static build(name: string, content: any): ClipboardItem {
        const item: ClipboardItem = {
            name: name,
            content: content.toString()
        };
        return item;
    }
}
