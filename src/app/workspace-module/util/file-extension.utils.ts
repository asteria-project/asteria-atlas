import { HeliosFileStats } from 'asteria-eos';

/**
 * The <code>FileExtensionUtils</code> class provide convenient methods for working with helios files extentions.
 */
export class FileExtensionUtils {

    /**
     * Return the file name for the specified file.
     * 
     * @param {HeliosFileStats} file the file for which to get the file name.
     * 
     * @returns {string} the file name for the specified file.
     */
    public static getFileName(file: HeliosFileStats): string {
        return file.isFile ? `${file.name}.${file.extention}` : file.name;
    }
        
    /**
     * Return the full path for the specified file.
     * 
     * @param {HeliosFileStats} file the file for which to get the full path.
     * 
     * @returns {string} the full path for the specified file.
     */
    public static  getFilePath(file: HeliosFileStats): string {
        return `${file.path}${file.name}.${file.extention}`;
    }

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