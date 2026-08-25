import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, componentStack: null };
  }
  static getDerivedStateFromError(e) { return { error: e }; }
  componentDidCatch(error, info) {
    this.setState({ componentStack: info?.componentStack || null });
  }
  render() {
    const { error, componentStack } = this.state;
    if (error) return (
      <div style={{ fontFamily: 'monospace', padding: '2rem', color: '#f87171', background: '#0f172a', minHeight: '100vh' }}>
        <h2 style={{ marginBottom: '1rem' }}>⚠️ App Error</h2>
        <pre style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{error.message}</pre>
        {error.stack && (
          <details open style={{ marginBottom: '1rem' }}>
            <summary style={{ cursor: 'pointer', color: '#94a3b8' }}>JS stack trace</summary>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8em', color: '#94a3b8', marginTop: '0.5rem' }}>{error.stack}</pre>
          </details>
        )}
        {componentStack && (
          <details open>
            <summary style={{ cursor: 'pointer', color: '#94a3b8' }}>React component tree</summary>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8em', color: '#94a3b8', marginTop: '0.5rem' }}>{componentStack}</pre>
          </details>
        )}
      </div>
    );
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
