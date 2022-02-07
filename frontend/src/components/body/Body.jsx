import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Home from "../body/home/Home.jsx";
import NotFound from "../utils/notFound/NotFound.jsx";
import ActivationEmail from "./auth/ActivationEmail.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import Profile from "./profile/Profile.jsx";
import { GlobalState } from "../../globalState.js";
import Booking from "./booking/Booking.jsx";
import Payments from "./booking/Payments.jsx";
import SuccessPage from "./booking/SuccessPage.jsx";

const Body = () => {
    const state = useContext(GlobalState);
    const [isLogged] = state.authAPI.isLogged;

    return (
        <>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />
                <Route path="/activate/:activationToken" component={ActivationEmail} exact />
                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/reset/:token" component={isLogged ? NotFound : ResetPassword} exact />   

                <Route path="/profile" component={isLogged ? Profile : NotFound} />
                <Route path="/booking" component={isLogged ? Booking : NotFound} />
                <Route path="/payments" component={isLogged ? Payments : NotFound} />
                <Route path="/success_page" component={isLogged ? SuccessPage : NotFound} />
            </Switch>
        </>
    );
}

export default Body;