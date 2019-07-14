import { HttpErrorResponse } from '@angular/common/http';
import { HeliosHttpError } from 'asteria-eos';

/**
 * A static class that builds error message depending on the specified error code.
 */
export class ErrorMessageBuilder {

    /**
     * Return an error message depending on the specified error object.
     * 
     * @param {HttpErrorResponse} error the error object from which to build the error message.
     * 
     * @returns {string} an error message depending on the specified error object.
     */
    public static build(error: HttpErrorResponse): string {
        const heliosError: HeliosHttpError = error.error;
        let result: string = '';
        if (heliosError && heliosError.code && heliosError.message) {
            result = heliosError.message;
        } else {
            result = `Cannot Get Resource: The connection to the server failed.`;
        }
        return result;
    }
}