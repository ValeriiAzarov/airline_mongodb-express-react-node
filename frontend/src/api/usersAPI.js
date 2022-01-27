import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import axios from "axios";

const UsersAPI = (token) => {
    const [isAdmin] = authAPI(token).isAdmin;
    const [users, setUsers] = useState([]);
    const [callback, setCallback] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countPages, setCountPages] = useState(0);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        if (isAdmin) {
            if (token) {
                const getAllUsers = async () => {
                    const result = await axios.get(`http://localhost:5000/api/users/all_info_users?page=${page}&limit=${limit}&surname[regex]=${search}`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    setUsers(result.data.users);
                    setCountPages(result.data.countPages);
                };
                getAllUsers();
            }
        }
    }, [token, isAdmin, callback, search, page, limit, countPages]);

    return {
        users: [users, setUsers],
        callback: [callback, setCallback],
        page: [page, setPage],
        limit: [limit, setLimit],
        countPages: [countPages, setCountPages], 
        search: [search, setSearch]
    };
}

export default UsersAPI;