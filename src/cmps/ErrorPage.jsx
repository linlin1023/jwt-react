import { useRouteError } from 'react-router-dom'

function ErrorPage() {
    const error = useRouteError();
    return (  
        <div>
            <h1>Unexpected error</h1>
            {error.statusText || error.message}
        </div>
    );
}

export default ErrorPage;