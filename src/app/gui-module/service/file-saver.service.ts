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
    const blob: Blob = new Blob([txt], { type: 'octet/stream' });
    this.save(blob, fileName + '.json');
  }

  /**
   * Save the specified <code>Blob</code> object.
   * 
   * @param {any} blob the <code>Blob</code> object to save.
   * @param {string} fileName the name of the saved file.
   */
  public saveBlob(blob: Blob, fileName: string): void {
    this.save(blob, fileName);
  }
  
  /**
   * Save the specified <code>Blob</code> object on the client side.
   * 
   * @param {Blob} blob the <code>Blob</code> object to save.
   * @param {string} fileName the name of the saved file.
   */
  private save(blob: Blob, fileName: string): void {
    saveAs(blob, decodeURI(fileName));
  }
}