//! Error Boundaries, Portals, Code Splitting

import { lazy, Suspense, Component } from "react";
import { createPortal } from "react-dom";

//! Error Boundary — только class (или react-error-boundary)
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong</h1>;
    return this.props.children;
  }
}

//! Portal — render в другой DOM node (modal)
function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-overlay">{children}</div>,
    document.getElementById("modal-root")
  );
}

//! Code splitting
const LazyDashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyDashboard />
      </Suspense>
    </ErrorBoundary>
  );
}

export { ErrorBoundary, Modal, App };
