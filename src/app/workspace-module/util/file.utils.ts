import { HeliosFileStats } from 'asteria-eos';

/**
 * The <code>FileUtils</code> class provide convenient methods for working with helios files.
 */
export class FileUtils {

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
    public static getFilePath(file: HeliosFileStats): string {
        return FileUtils.joinPath(file.path, `${file.name}.${file.extention}`);
    }

    /**
     * Join the specified paths.
     * 
     * @param {string} path1 the first part of the final path.
     * @param {string} path2 the last part of the final path.
     * 
     * @returns {string} a newx path composed of both paths, <code>path1</code> and <code>path2</code>, joined.
     */
    public static joinPath(path1: string, path2: string): string {
        const sep: string = path1 && path1 !== '' && !path1.endsWith('/') ? '/' : '';
        return `${path1}${sep}${path2}`;
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