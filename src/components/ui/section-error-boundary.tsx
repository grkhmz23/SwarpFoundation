"use client";

import React from "react";

type SectionErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

type SectionErrorBoundaryState = {
  hasError: boolean;
};

export class SectionErrorBoundary extends React.Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Section rendering failed:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
