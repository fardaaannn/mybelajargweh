/**
 * Error Boundary Component
 * @module components/ErrorBoundary
 * 
 * Catches JavaScript errors in child components and displays
 * a fallback UI instead of crashing the entire application.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * 
 * Implements React's error boundary pattern to catch errors
 * in the component tree and prevent app crashes.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ error, errorInfo });
    
    // Here you could send to analytics service like Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
              {/* Error Icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold mb-2">
                Oops! Terjadi Kesalahan
              </h1>
              <p className="text-muted-foreground mb-6">
                Maaf, aplikasi mengalami masalah. Tim kami telah menerima
                laporan error ini dan akan segera memperbaikinya.
              </p>

              {/* Error Details (only in development) */}
              {import.meta.env.DEV && this.state.error && (
                <div className="mb-6 p-4 bg-muted rounded-lg text-left overflow-auto">
                  <p className="text-sm font-mono text-destructive mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-muted-foreground overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReload}
                  className="ios-button-primary"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Muat Ulang
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="rounded-xl"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ke Beranda
                </Button>
              </div>

              {/* Support Link */}
              <p className="mt-6 text-sm text-muted-foreground">
                Butuh bantuan?{' '}
                <a
                  href="mailto:support@codelearn.id"
                  className="text-[hsl(var(--ios-blue))] hover:underline"
                >
                  Hubungi Support
                </a>
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
