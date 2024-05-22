import React, { Component } from 'react';

type ErrorBoundaryProps = {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FallbackComponent: React.ComponentType<any>;
};

type ErrorBoundaryState = {
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error: Error) {
        this.setState({ error });
    }

    render() {
        const { FallbackComponent } = this.props;
        const { error } = this.state;

        return error ? (
            <FallbackComponent error={error} />
        ) : (
            this.props.children
        );
    }
}

export default ErrorBoundary;