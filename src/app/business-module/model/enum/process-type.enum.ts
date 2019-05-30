/**
 * The <code>ProcessType</code> enum contains a list of constants that represent the default process types
 * provided by the Hyperion framework.
 */
export enum ProcessType {

    /**
     * Specifies the reference to the Hyperion "file reading" process.
     */
    READ_FILE = 'read-file',

    /**
     * Specifies the reference to the Hyperion "file writing" process.
     */
    WRITE_FILE = 'write-file',
    
    /**
     * Specifies the reference to the Hyperion process that turns a CSV file to a list of POJOs.
     */
    CSV_TO_LIST = 'csv-to-list',
    
    /**
     * Specifies the reference to the Hyperion process that turns a string file to a list of POJOs.
     */
    LINES_TO_LIST = 'lines-to-list',

    /**
     * Specifies the reference to the Hyperion process that turns a list of POJOs into a CSV file
     */
    LIST_TO_CSV = 'list-to-csv',
    
    /**
     * Specifies the reference to the Hyperion "filtering" process.
     */
    FILTER = 'filter'
}