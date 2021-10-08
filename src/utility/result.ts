type ResultArgs<T, U> =
  | { success: T; failure?: undefined }
  | { success?: undefined; failure: U };

/**
 * This is a utility class that I like to use.
 * It allow me to only throw exceptions for unexpected failures
 * This way I can handle expected failures without needing to try catch everything :)
 */
export class Result<TSuccess, TFailure> {
  success?: TSuccess;
  failure?: TFailure;

  constructor({ success, failure }: ResultArgs<TSuccess, TFailure>) {
    if (success !== undefined) {
      this.success = success;
    } else if (failure !== undefined) {
      this.failure = failure;
    }
  }

  get isSuccess(): boolean {
    return this.success !== undefined;
  }
}
