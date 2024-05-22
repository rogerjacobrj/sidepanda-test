/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles.scss";

const ErrorFallback = (props: any) => {

    const { error } = props;

    return (
        <div className="error-fallback">
            <p>Something went wrong</p> <br />
            <pre>{error.message}</pre>
        </div>
    )
};

export default ErrorFallback;
