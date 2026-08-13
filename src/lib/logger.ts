type LogLevel = "info" | "warn" | "error";

type LogFields = Record<string, unknown>;

const SENSITIVE_KEY =
  /(password|secret|token|authorization|cookie|api[_-]?key|private)/i;

function redactValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redactValue);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        SENSITIVE_KEY.test(key) ? "[REDACTED]" : redactValue(entry),
      ]),
    );
  }
  return value;
}

function redactFields(fields: LogFields): LogFields {
  return redactValue(fields) as LogFields;
}

function write(level: LogLevel, message: string, fields: LogFields = {}) {
  const payload = {
    level,
    message,
    time: new Date().toISOString(),
    ...redactFields(fields),
  };
  const line = JSON.stringify(payload);

  // Structured logger is the intentional console boundary.
  // eslint-disable-next-line no-console -- structured logging sink
  const sink = level === "info" ? console.info : console[level];
  sink(line);
}

export const logger = {
  info: (message: string, fields?: LogFields) => write("info", message, fields),
  warn: (message: string, fields?: LogFields) => write("warn", message, fields),
  error: (message: string, fields?: LogFields) =>
    write("error", message, fields),
};
