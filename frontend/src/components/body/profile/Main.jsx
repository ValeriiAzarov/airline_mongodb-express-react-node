import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../../../globalState.js";
import Home from "./Home.jsx";
import NotFound from "../../utils/notFound/NotFound.jsx";
import AccessDenied from "../../utils/accessDenied/AccessDenied.jsx";
import Users from "./admin/users/Users.jsx";
import Tickets from "./admin/tickets/Tickets.jsx";
import Flights from "./admin/flights/Flights.jsx";
import Airlines from "./admin/airlines/Airlines.jsx";
import Planes from "./admin/planes/Planes.jsx";
import About from "./user/about/About.jsx";
import UpdatePassword from "./user/updatePassword/UpdatePassword.jsx";
import Passport from "./user/passport/Passport.jsx";

const Main = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.authAPI.isLogged;
  const [isAdmin] = state.authAPI.isAdmin;

  return (
    <>
      <Switch>
        <Route path="/profile" component={Home} exact />
        <Route path="/profile/users" component={isLogged && isAdmin ? Users : AccessDenied} exact />
        <Route path="/profile/tickets" component={isLogged && isAdmin ? Tickets : AccessDenied} exact />
        <Route path="/profile/flights" component={isLogged && isAdmin ? Flights : AccessDenied} exact />
        <Route path="/profile/airlines" component={isLogged && isAdmin ? Airlines : AccessDenied} exact />
        <Route path="/profile/planes" component={isLogged && isAdmin ? Planes : AccessDenied} exact />

        <Route path="/profile/about" component={isLogged ? About : NotFound} exact />
        <Route path="/profile/passport" component={isLogged ? Passport : NotFound} exact />
        <Route path="/profile/update_password" component={isLogged ? UpdatePassword : NotFound} exact />
      </Switch>
    </>
  );
};

export default Main;
