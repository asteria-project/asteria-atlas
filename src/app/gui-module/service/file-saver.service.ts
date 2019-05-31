import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

/**
 * The service responsible for saving files on the client-side.
 */
@Injectable({
    providedIn: 'root'
})
export class FileSaverService {

  /**
   * Save the specified JSON object representation.
   * 
   * @param {any} json the JSON object to save.
   * @param {string} fileName the name of the saved file.
   */
  public saveJson(json: any, fileName: string): void {
    const txt: string = JSON.stringify(json);
    const blob: Blob = new Blob([txt]);
    this.save(blob, fileName + '.json', 'octet/stream');
  }
  
  /**
   * Save the specified <code>Blob</code> object on the client side.
   * 
   * @param {Blob} blob the <code>Blob</code> object to save.
   * @param {string} fileName the name of the saved file.
   * @param {string} type the MIME type of the <code>Blob</code> object to save.
   */
  private save(blob: Blob, fileName: string, type: string): void {
    saveAs(new Blob([blob], { type: type }), decodeURI(fileName));
  }
}