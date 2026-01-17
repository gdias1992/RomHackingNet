/**
 * Global Error Boundary for catching React runtime errors.
 *
 * Catches UI crashes, logs them to the backend, and displays
 * a user-friendly fallback UI with recovery options.
 */

import { Component, ReactNode } from "react";
import { logger } from "@/utils/logger";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error with component stack
    const componentStack = errorInfo.componentStack || "";
    const fullMessage = `React Error: ${error.message}\nComponent Stack:${componentStack}`;

    logger.error(fullMessage, error);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = (): void => {
    globalThis.window.location.reload();
  };

  handleGoHome = (): void => {
    globalThis.window.location.href = "/";
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Allow custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
            <div className="text-4xl mb-4">💥</div>
            <h1 className="text-xl font-semibold text-slate-100 mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-400 mb-6">
              An unexpected error occurred. The error has been logged and we'll
              look into it.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-400">
                  Error details (dev only)
                </summary>
                <pre className="mt-2 p-3 bg-slate-950 rounded text-xs text-red-400 overflow-auto max-h-48">
                  {this.state.error.message}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors"
              >
                Go Home
              </button>
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
