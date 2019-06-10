import { HeliosFileStats } from 'asteria-eos';
import { CommonChar } from 'asteria-gaia';

/**
 * The <code>FileExtensionUtils</code> class provide convenient methos for workiing with helios files extentions.
 */
export class FileExtensionUtils {

    /**
     * Return the icon reference to be associated with the extention of the specified file.
     * 
     * @param {HeliosFileStats} file the file for which to get the icon.
     * 
     * @returns {string} the icon reference to be associated with the extention of the specified file.
     */
    public static getIcon(file: HeliosFileStats): string {
        let icon: string = CommonChar.EMPTY;
        if (file.isFile) {
            switch (file.extention.toLowerCase()) {
                case 'csv' : icon = 'file-excel'; break;
                default : icon = 'file';
            }
        } else {
            icon = 'folder';
        }
        return icon;
    }
}