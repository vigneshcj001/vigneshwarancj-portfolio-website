import React from "react";
import { Link } from "react-router";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex flex-col items-center justify-center flex-1 pt-32 pb-20 px-4 text-center">
        <p className="text-6xl font-black text-gray-200 dark:text-gray-800 select-none mb-4">!</p>
        <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-1">Something went wrong</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-sm">
          An unexpected error occurred. Try refreshing the page.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Reload page
          </button>
          <Link
            to="/"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
