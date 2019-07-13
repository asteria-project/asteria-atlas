/**
 * A utility class for working with HTTP method calls.
 */
export class HttpUtils {

  /**
   * The options used for an HTTP call that handles text-like response.
   */
  public static readonly TEXT_RESPONSE_OPTIONS: any = {
    responseType:'text'
  };

  /**
   * The options used for an HTTP call that handles blob-like response.
   */
  public static readonly BLOB_RESPONSE_OPTIONS: any = {
    responseType:'blob'
  };

  /**
   * The options used to access the response on an HTTP call.
   */
  public static readonly OBSERVE_HTTP_RESPONSE_OPTIONS: any = {
    observe:'response'
  };
}