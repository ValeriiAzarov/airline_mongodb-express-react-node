import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import notification from "../components/utils/notification/Notification.jsx";
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

    const createUser = async (data) => {
        try {
            if (token) {
                const result = await axios.post("http://localhost:5000/api/users/create_user", data, {
                    headers: {
                        Authorization: token
                    }
                });
                notification("success", result.data.message);
            }
        }
        catch (error) {
            if (error.response) {
                notification("error", error.response.data.message);
            }
        }
    }

    const updateUser = async (data) => {
        try {
            if (token) {
                const result = await axios.patch(`http://localhost:5000/api/users/update_user/${data._id}`, {
                    surname: data.surname,
                    name: data.name
                }, {
                    headers: {
                        Authorization: token
                    }
                });
                notification("success", result.data.message);
            }
        }
        catch (error) {
            if (error.response) {
                notification("error", error.response.data.message);
            }
        }
    } 

    const updateRole = async (data, role) => {
        try {
            if (token) {
                const result = await axios.patch(`http://localhost:5000/api/users/update_role/${data._id}`, { role }, {
                    headers: {
                        Authorization: token
                    }
                });
                notification("success", result.data.message);
            }
        }
        catch (error) {
            if (error.response) {
                notification("error", error.response.data.message);
            }
        }
    } 

    const updatePassword = async (password, confPassword) => {
        try {
            if (token) {
                const result = await axios.post("http://localhost:5000/api/users/reset", {
                    password, 
                    confPassword
                }, {
                    headers: {
                        Authorization: token
                    }
                });
                notification("success", result.data.message);
            }
        } 
        catch (error) {
            if (error.response) {
                notification("error", error.response.data.message);
            }
        }
    }

    const deleteUser = async (data) => {
        try {
            if (token) {
                const result = await axios.delete(`http://localhost:5000/api/users/delete_user/${data._id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                notification("success", result.data.message);
            }
        } 
        catch (error) {
            if (error.response) {
                notification("error", error.response.data.message);
            }
        }
    }

    return {
        users: [users, setUsers],
        callback: [callback, setCallback],
        page: [page, setPage],
        limit: [limit, setLimit],
        countPages: [countPages, setCountPages], 
        search: [search, setSearch],
        createUser: createUser,
        updateUser: updateUser,
        updateRole: updateRole,
        updatePassword: updatePassword,
        deleteUser: deleteUser
    };
}

export default UsersAPI;