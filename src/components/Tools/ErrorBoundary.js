import React from 'react'
import dynamic from "next/dynamic";
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
  
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false, dataError: "" };
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI
  
      return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      this.setState({ dataError: { error } });
    }
    render() {
        const Page500 = dynamic(() => import("./Page500"));
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <Page500 Exception={this.state.dataError.error} />;
      }
  
      // Return children components in case of no error
  
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;