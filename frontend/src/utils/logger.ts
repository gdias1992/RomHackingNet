/**
 * Centralized logging utility for the RomHacking.net Archive Explorer.
 *
 * Provides a consistent interface for logging with automatic
 * forwarding of errors to the backend.
 */

import { apiClient } from "@/api/client";

interface LogPayload {
  level: "info" | "warn" | "error";
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
}

/**
 * Send a log entry to the backend.
 * Fails silently to avoid cascading errors.
 */
async function sendToBackend(payload: LogPayload): Promise<void> {
  try {
    await apiClient.post("/logs", payload);
  } catch {
    // Fail silently - we don't want logging failures to cause more issues
    if (import.meta.env.DEV) {
      console.warn("[Logger] Failed to send log to backend:", payload.message);
    }
  }
}

/**
 * Build the common log payload with context.
 */
function buildPayload(
  level: LogPayload["level"],
  message: string,
  error?: Error
): LogPayload {
  return {
    level,
    message,
    stack: error?.stack,
    url: typeof globalThis.window === "object" ? globalThis.window.location.href : undefined,
    userAgent: typeof globalThis.navigator === "object" ? globalThis.navigator.userAgent : undefined,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format additional data for logging.
 */
function formatData(data?: unknown): string {
  if (data === undefined) return "";
  if (data instanceof Error) return "";
  try {
    return ` | ${JSON.stringify(data)}`;
  } catch {
    return ` | [unserializable data]`;
  }
}

/**
 * Logger utility for consistent logging across the application.
 *
 * - info: Console only (dev mode)
 * - warn: Console only (dev mode)
 * - error: Console + sent to backend
 */
export const logger = {
  /**
   * Log informational messages.
   * Only outputs to console in development mode.
   */
  info(message: string, data?: unknown): void {
    if (import.meta.env.DEV) {
      console.info(`[INFO] ${message}${formatData(data)}`);
    }
  },

  /**
   * Log warning messages.
   * Only outputs to console in development mode.
   */
  warn(message: string, data?: unknown): void {
    if (import.meta.env.DEV) {
      console.warn(`[WARN] ${message}${formatData(data)}`);
    }
  },

  /**
   * Log error messages.
   * Outputs to console and sends to backend.
   */
  error(message: string, error?: unknown): void {
    const err = error instanceof Error ? error : undefined;
    const fullMessage = err ? `${message}: ${err.message}` : message;

    // Always log to console
    console.error(`[ERROR] ${fullMessage}`, error);

    // Send to backend
    const payload = buildPayload("error", fullMessage, err);
    sendToBackend(payload);
  },

  /**
   * Log a caught exception with context.
   * Useful for try/catch blocks.
   */
  exception(context: string, error: unknown): void {
    if (error instanceof Error) {
      this.error(`${context}: ${error.message}`, error);
    } else {
      this.error(`${context}: ${String(error)}`);
    }
  },
};
