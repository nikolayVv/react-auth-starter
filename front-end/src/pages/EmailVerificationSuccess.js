import { useHistory } from "react-router";

export const EmailVerificationSuccess = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email. Now you can use all the app's features.
            </p>
            <button onClick={() => history.push('/')}>Go to home page</button>
        </div>
    )
}