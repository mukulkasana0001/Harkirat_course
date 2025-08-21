import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // This lifecycle method is called when a child throws an error
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // You can also log the error
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return <h2>⚠️ Something went wrong!</h2>;
    }

    return this.props.children; // render normally if no error
  }
}

export default ErrorBoundary;



// 🔹 How to Create an Error Boundary (Class Component)

// Error Boundaries can only be created using class components 
// (functional components don’t support it directly, but you can wrap them).
