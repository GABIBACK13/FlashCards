export class CustomValidationError extends Error {
  public errors: { message: string; path: string; value?: any }[];

  constructor(errors: { message: string; path: string; value?: any }[]) {
    super("Validation failed");
    this.errors = errors;
  }
}

export type ErrorMessege = {
  message:string;
  path:string;
  value?:any;
}