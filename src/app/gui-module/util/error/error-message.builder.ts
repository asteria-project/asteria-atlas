import { HttpErrorResponse } from '@angular/common/http';

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
        let result: string = '';
        switch (error.status) {
            case 409:
                result = `Resource Conflict: The specified resource does not exist.`;
                break;
            case 404:
                result = `Resource Not Found: The specified resource does not exist.`;
                break;
            case 0:
            default :
                result = `Cannot Get Resource: The connection to the server failed.`;
        }
        return result;
    }
}