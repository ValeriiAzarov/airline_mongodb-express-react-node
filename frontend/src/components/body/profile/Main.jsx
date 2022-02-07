import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../../../globalState.js";
import Home from "./Home.jsx";
import NotFound from "../../utils/notFound/NotFound.jsx";
import AccessDenied from "../../utils/accessDenied/AccessDenied.jsx";
import Users from "./admin/users/Users.jsx";
import Tickets from "./admin/tickets/Tickets.jsx";
import Flights from "./admin/flights/Flights.jsx";
import About from "./user/about/About.jsx";
import UpdatePassword from "./user/updatePassword/UpdatePassword.jsx";
import Passport from "./user/passport/Passport.jsx";
import MyBooking from "./user/myBooking/MyBooking.jsx";
import CancelBooking from "./user/myBooking/CancelBooking.jsx";

const Main = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.authAPI.isLogged;
  const [isAdmin] = state.authAPI.isAdmin;

  return (
    <>
      <Switch>
        <Route path="/profile" component={Home} exact />
        <Route path="/profile/users" component={isAdmin ? Users : AccessDenied} exact />
        <Route path="/profile/tickets" component={isAdmin ? Tickets : AccessDenied} exact />
        <Route path="/profile/flights" component={isAdmin ? Flights : AccessDenied} exact />
        <Route path="/profile/about" component={isLogged ? About : NotFound} exact />
        <Route path="/profile/my_booking" component={isLogged ? MyBooking : NotFound} exact />
        <Route path="/profile/cancel_booking" component={isLogged ? CancelBooking : NotFound} exact />
        <Route path="/profile/passport" component={isLogged ? Passport : NotFound} exact />
        <Route path="/profile/update_password" component={isLogged ? UpdatePassword : NotFound} exact />
      </Switch>
    </>
  );
}

export default Main;
