import React, { createContext, useState, useEffect } from "react";
import AuthAPI from "./api/authAPI.js";
import UsersAPI from "./api/usersAPI.js";
import UserDetailsAPI from "./api/userDetailsAPI.js";
import FlightsAPI from "./api/flightsAPI.js";
import TicketsAPI from "./api/ticketsAPI.js";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            const refreshToken = async () => {
                const result = await axios.get("http://localhost:5000/api/users/refresh_token");
                setToken(result.data.accessToken);
            }
            refreshToken();
        }
    }, []);
    
    const state = {
        token: [token, setToken],
        authAPI: AuthAPI(token),
        usersAPI: UsersAPI(token),
        flightsAPI: FlightsAPI(token),
        userDetailsAPI: UserDetailsAPI(token),
        ticketsAPI: TicketsAPI(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
}