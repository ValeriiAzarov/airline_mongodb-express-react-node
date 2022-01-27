import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import axios from "axios";

const FlightsAPI = (token) => {
    const [isAdmin] = authAPI(token).isAdmin;
    const [flights, setFlights] = useState([]);
    const [callback, setCallback] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countPages, setCountPages] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isAdmin) {
            if (token) {
                const getAllFlights = async () => {
                    const result = await axios.get(`http://localhost:5000/api/flights/all_info?page=${page}&limit=${limit}&name[regex]=${search}`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    setFlights(result.data.flights);
                    setCountPages(result.data.countPages);
                };
                getAllFlights();
            }
        }
    }, [token, isAdmin, callback, search, page, limit, countPages]);

    return {
        flights: [flights, setFlights],
        callback: [callback, setCallback],
        page: [page, setPage],
        limit: [limit, setLimit],
        countPages: [countPages, setCountPages], 
        search: [search, setSearch]
    };
}

export default FlightsAPI;