/**
 * The <code>SeparatorType</code> enum contains a list of constants that represent the possible separators of a CSV
 * file.
 */
export enum CsvSeparatorType {

	/**
	 * Specifies the reference to the "tab" separator.
	 */
	TAB = 0,

	/**
	 * Specifies the reference to the "comma" separator.
	 */
	COMMA = 1,
	
	/**
	 * Specifies the reference to the "semicolon" separator.
	 */
	SEMICOLON = 2,
	
	/**
	 * Specifies the reference to the "space" separator.
	 */
	SPACE = 3,

	/**
	 * Specifies the reference to a user-defined separator.
	 */
	OTHER = 4
}