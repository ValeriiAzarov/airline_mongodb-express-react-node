import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../globalState.js";

const Home = () =>  {
    const state = useContext(GlobalState);
    const [isLogged] = state.authAPI.isLogged;
    const [isAdmin] = state.authAPI.isAdmin;
    const [token] = state.token;

    const [accessToken, setAccessToken] = useState(false);
    
    useEffect(() => {
        setAccessToken(token);
    }, [token]);
    
    return (
        <div>
            <h4>Tests:</h4>
            <p>isLogged: {isLogged === true ? "true" : "false"}</p>
            <p>isAdmin: {isAdmin === true ? "true" : "false"}</p>
            <p>token: {accessToken === false ? "no token" : accessToken}</p>
        </div>
    );
};

export default Home;