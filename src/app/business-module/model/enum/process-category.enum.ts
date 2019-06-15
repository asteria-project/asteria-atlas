/**
 * The <code>ProcessCategory</code> enum contains a list of constants that represent the default process categories
 * provided by the Hyperion framework.
 */
export enum ProcessCategory {

  /**
   * Specifies the category for processes that manipulate files.
   */
  FILE = 'file',

  /**
   * Specifies the category for processes that manipulate data.
   */
  DATA = 'data',
  
  /**
   * Specifies the category for processes that persist data.
   */
  PERSISTENCE = 'persistence',

  /**
   * Specifies the category for processes that manipulate mathematical concepts.
   */
  MATH = 'math',
  
  /**
   * Specifies the category for processes that manipulate images.
   */
  IMAGE = 'image'
}