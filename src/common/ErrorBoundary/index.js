import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    if (errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details className>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
