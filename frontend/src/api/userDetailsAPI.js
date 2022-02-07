import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import notification from "../components/utils/notification/Notification.jsx";
import axios from "axios";

const UserDetailsAPI = (token) => {
    const [isLogged] = authAPI(token).isLogged;
    const [userDetails, setUserDetails] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        if (isLogged) {
            if (token) {
                const getUserDetails = async () => {
                    try {
                        const result = await axios.get("http://localhost:5000/api/users/info_all_user_details", {
                            headers: {
                                Authorization: token
                            }
                        });
                        setUserDetails(result.data.user.userDetails);
                    } 
                    catch (error) {
                        console.log(error.response.data.message);
                    }
                }
                getUserDetails();
            }
        }
    }, [token, isLogged, callback]);   
    
    const storeUserDetail = async (id) => {
        try {
            if (token) {
                const result = await axios.get(`http://localhost:5000/api/users/info_user_detail/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                setUserDetail(result.data.user);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const createUserDetail = async (user, data) => {
        try {
            if (token) {
                const result = await axios.post(`http://localhost:5000/api//users/craete_user_detail/${user._id}`, data, {
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

    const updateUserDetail = async (id, data) => {
        try {
            if (token) {
                const result = await axios.patch(`http://localhost:5000/api/users/update_user_detail/${id}`, data, {
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

    const deleteUserDetail = async (id) => {
        try {
            if (token) {
                const result = await axios.delete(`http://localhost:5000/api/users/delete_user_detail/${id}`, {
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
        userDetails: [userDetails, setUserDetails],
        userDetail: [userDetail, setUserDetail],
        callback: [callback, setCallback],
        storeUserDetail: storeUserDetail,
        createUserDetail: createUserDetail,
        updateUserDetail: updateUserDetail,
        deleteUserDetail: deleteUserDetail
    };
}

export default UserDetailsAPI;