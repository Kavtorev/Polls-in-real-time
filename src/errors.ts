export class LimitExceededError extends Error {
  status: number;
  extra: Array<string>;
  constructor(message: string, extra: Array<string>) {
    super(message);
    this.status = 403;
    this.extra = extra;
  }
}
