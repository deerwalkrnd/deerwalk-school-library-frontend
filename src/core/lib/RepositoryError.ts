export class RepositoryError extends Error {
  constructor(
    message?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "RepositoryError";
  }
}
