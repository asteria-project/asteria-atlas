import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert bytes into largest possible unit. Takes a precision argument that defaults to 2.
 * 
 * @see https://gist.github.com/JonCatmull/ecdf9441aaa37336d9ae2c7f9cb7289a
 */
@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {

  /**
   * The list of possible units for bytes conversion.
   */
  private static readonly UNITS: Array<string> = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  /**
   * Apply transformation bytes to file size over the specified data.
   * 
   * @param {number} bytes the size to transform, in bytes.
   * @param {number} precision the precision of transformation.
   * 
   * @returns {string}
   */
  transform(bytes: number = 0, precision: number = 2) : string {
    let result: string = '';
    if (isNaN(parseFloat(String(bytes))) || ! isFinite(bytes)) {
        result = '?';
    } else {
        let unit: number = 0;
        while ( bytes >= 1024 ) {
            bytes /= 1024;
            unit ++;
        }
        result = bytes.toFixed(+precision) + ' ' + FileSizePipe.UNITS[ unit ];
    }
    return result;
  }
}