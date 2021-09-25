import { useHistory } from "react-router";

export const EmailVerificationFail = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while tryin to verify your email
            </p>
            <button onClick={() => history.push('/signup')}>Back to sign up page</button>
        </div>
    )
}