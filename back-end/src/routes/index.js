import { testRoute } from './testRoute';
import { signUpRoute } from './signUpRoute';
import { logInRoute } from './logInRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';

export const routes = [
    signUpRoute,
    resetPasswordRoute,
    forgotPasswordRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    logInRoute,
    testRoute
];
