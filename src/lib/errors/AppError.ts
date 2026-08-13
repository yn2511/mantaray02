export type AppErrorCode =
  | "NOT_FOUND"
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "RATE_LIMITED"
  | "INTERNAL";

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status: number;
  readonly expose: boolean;
  readonly details?: Record<string, unknown>;

  constructor(
    code: AppErrorCode,
    message: string,
    options?: {
      status?: number;
      expose?: boolean;
      details?: Record<string, unknown>;
      cause?: unknown;
    },
  ) {
    super(message, { cause: options?.cause });
    this.name = "AppError";
    this.code = code;
    this.status = options?.status ?? defaultStatus(code);
    this.expose = options?.expose ?? code !== "INTERNAL";
    this.details = options?.details;
  }
}

function defaultStatus(code: AppErrorCode): number {
  switch (code) {
    case "NOT_FOUND":
      return 404;
    case "VALIDATION":
      return 400;
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "RATE_LIMITED":
      return 429;
    case "INTERNAL":
    default:
      return 500;
  }
}

export function toSafeClientMessage(error: unknown): string {
  if (error instanceof AppError && error.expose) {
    return error.message;
  }
  return "Something went wrong.";
}
