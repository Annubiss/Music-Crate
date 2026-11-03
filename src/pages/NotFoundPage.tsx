import { Link } from "react-router";

function NotFoundPage() {
    return (
        <div>
            <title>Page not found - Crate</title>
            <p>404</p>
            <h1>Page doesn't exist</h1>
            <p>Link is wrong or the page has been moved</p>
            <Link to="/">Back to search</Link>
        </div>
    )
}

export default NotFoundPage;