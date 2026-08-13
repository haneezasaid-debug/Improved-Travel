import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] my-8 p-8 rounded-3xl bg-white border border-[#E8E2D9] shadow-xs text-center flex flex-col items-center justify-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FFF8F6] border border-[#FCD8D0] text-[#C85A32] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#1E232A]">
            Something unexpected occurred
          </h2>
          <p className="text-xs text-[#6B7280] max-w-md">
            An unexpected render issue occurred. You can safely refresh or reset to continue planning your trip.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-5 py-2.5 rounded-full bg-[#1E232A] text-white font-semibold text-xs hover:bg-[#2D333C] transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
