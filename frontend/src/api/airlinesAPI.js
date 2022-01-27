import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import axios from "axios";

const AirlinesAPI = (token) => {
    const [isAdmin] = authAPI(token).isAdmin;
    const [airlines, setAirlines] = useState([]);
    const [allAirlines, setAllAirlines] = useState([]);
    const [callback, setCallback] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countPages, setCountPages] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isAdmin) {
            if (token) {
                const getAllAirlines = async () => {
                    const result = await axios.get(`http://localhost:5000/api/airlines/all_info?page=${page}&limit=${limit}&name[regex]=${search}`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    setAirlines(result.data.airlines);
                    setAllAirlines(result.data.allAirlines);
                    setCountPages(result.data.countPages);
                };
                getAllAirlines();
            }
        }
    }, [token, isAdmin, callback, search, page, limit, countPages]);

    return {
        airlines: [airlines, setAirlines],
        allAirlines: [allAirlines, setAllAirlines],
        callback: [callback, setCallback],
        page: [page, setPage],
        limit: [limit, setLimit],
        countPages: [countPages, setCountPages], 
        search: [search, setSearch]
    };
}

export default AirlinesAPI;