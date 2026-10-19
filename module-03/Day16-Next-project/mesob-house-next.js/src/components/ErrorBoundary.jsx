import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error:', error, info);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-page">
                    <div className="error-boundary-card">
                        <div className="error-boundary-icon">
                            <FaExclamationTriangle />
                        </div>
                        <h1>Something Broke in the Kitchen</h1>
                        <p>
                            Our chefs hit an unexpected snag while plating this page. Don't worry — your cart and account are safe.
                        </p>
                        <div className="error-boundary-actions">
                            <button
                                type="button"
                                className="btn-error-retry"
                                onClick={this.handleReset}
                            >
                                Try Again
                            </button>
                            <Link to="/" className="btn-error-home">
                                Return Home
                            </Link>
                        </div>
                        {this.state.error && (
                            <details className="error-boundary-details">
                                <summary>Technical details</summary>
                                <pre>{this.state.error.toString()}</pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;