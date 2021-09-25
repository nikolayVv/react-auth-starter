import { useHistory } from "react-router";

export const PasswordResetFail = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while tryin to reset your password.
            </p>
            <button onClick={() => history.push('/login')}>Back to log in page</button>
        </div>
    )
}