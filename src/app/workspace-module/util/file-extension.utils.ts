import { HeliosFileStats } from 'asteria-eos';

/**
 * The <code>FileExtensionUtils</code> class provide convenient methods for working with helios files extentions.
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
        let icon: string = '';
        if (file.isFile) {
            switch (file.extention.toLowerCase()) {
                case 'csv' :
                    icon = 'file-excel';
                    break;
                case 'png' :
                case 'jpg' :
                case 'jpeg' : 
                    icon = 'file-image';
                    break;
                case 'mpg' :
                case 'mpeg' :
                case 'avi' :
                case 'mp4' : 
                    icon = 'video-camera';
                    break;
                case 'zip' :
                case 'tar' : 
                    icon = 'file-zip';
                    break;
                case 'txt' : 
                    icon = 'file-text';
                    break;
                default : icon = 'file';
            }
        } else {
            icon = 'folder';
        }
        return icon;
    }
}