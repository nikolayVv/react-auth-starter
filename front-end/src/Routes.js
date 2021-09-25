import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoute';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyYourEmailPage';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/verify-email/:verificationString">
                    <EmailVerificationLandingPage />
                </Route>
                <Route path="/login">
                    <LogInPage />
                </Route>
                <Route path="/please-verify">
                    <PleaseVerifyEmailPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    );
}