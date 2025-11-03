export class UseCaseError extends Error {
  constructor(
    message?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "UseCaseError";
  }
}
