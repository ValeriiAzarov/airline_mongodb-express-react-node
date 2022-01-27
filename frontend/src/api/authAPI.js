import { useState, useEffect } from "react";
import axios from "axios";

const AuthAPI = (token) => {
    const [user, setUser] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const result = await axios.get("http://localhost:5000/api/users/info_user", {
                        headers: {
                            Authorization: token
                        }
                    });
                    setUser(result.data.user);
                    setIsLogged(true);
                    result.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                } 
                catch (error) {
                    alert(error.response.data.message);
                }
            }
            getUser();
        }
    }, [token]);    

    return {
        user: [user, setUser],
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    };
}

export default AuthAPI;