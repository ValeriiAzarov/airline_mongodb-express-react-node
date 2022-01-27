import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import axios from "axios";

const PlanesAPI = (token) => {
    const [isAdmin] = authAPI(token).isAdmin;
    const [planes, setPlanes] = useState([]);
    const [allPlanes, setAllPlanes] = useState([]);
    const [callback, setCallback] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countPages, setCountPages] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isAdmin) {
            if (token) {
                const getAllPlanes = async () => {
                    const result = await axios.get(`http://localhost:5000/api/planes/all_info?page=${page}&limit=${limit}&name[regex]=${search}`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    setPlanes(result.data.planes);
                    setAllPlanes(result.data.allPlanes);
                    setCountPages(result.data.countPages);
                };
                getAllPlanes();
            }
        }
    }, [token, isAdmin, callback, search, page, limit, countPages]);

    return {
        planes: [planes, setPlanes],
        allPlanes: [allPlanes, setAllPlanes],
        callback: [callback, setCallback],
        page: [page, setPage],
        limit: [limit, setLimit],
        countPages: [countPages, setCountPages], 
        search: [search, setSearch]
    };
}

export default PlanesAPI;