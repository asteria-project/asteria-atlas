/**
 * A static class that builds error message depending on the specified error code.
 */
export class ErrorMessageBuilder {

    /**
     * Return an error message depending on the specified error code.
     * 
     * @param {number} errorCode the error code from which to build the error message.
     * 
     * @returns {string} an error message depending on the specified error code.
     */
    public static build(errorCode: number): string {
        let result: string = '';
        switch (errorCode) {
            case 404:
                result = 'Resource Not Found: The specified resource does not exist.';
                break;
            case 0:
            default :
                result = 'Cannot Get Resource: The connection to the server failed.';
        }
        return result;
    }
}