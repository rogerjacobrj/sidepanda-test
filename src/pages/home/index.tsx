import Header from '../../components/header';
import Scheduler from '../../components/scheduler';
import './styles.scss';
import ErrorBoundary from '../../components/error-boundary';
import ErrorFallback from '../../components/error-fallback';

const Home = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div>
                <Header />
                <Scheduler />
            </div>
        </ErrorBoundary>
    )
};

export default Home;
