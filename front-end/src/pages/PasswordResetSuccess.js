import { useHistory } from "react-router";

export const PasswordResetSuccess = () => {
    const history = useHistory();

    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Your password has been reset. Now please login with the new password.
            </p>
            <button onClick={() => history.push('/login')}>Log In</button>
        </div>
    )
}