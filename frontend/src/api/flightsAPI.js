import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import notification from "../components/utils/notification/Notification.jsx";
import axios from "axios";

const FlightsAPI = (token) => {
    const [isAdmin] = authAPI(token).isAdmin;
    const [flights, setFlights] = useState([]);
    const [flight, setFlight] = useState({});
    const [results, setResults] = useState([]);

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

    const searchFlight = async (data) => {
        try {
            const result = await axios.post(`http://localhost:5000/api/flights/search_flights`, data);
            if (result.data.flights.length > 0) {
                setResults(result.data.flights);
            } 
            else {
                notification("error", "Could not get any flights.");
            }
        } 
        catch (error) {
            console.log(error);
        }
    }

    const storeFlight = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5000/api/flights/info_flight/${id}`);
            setFlight(result.data.flight);
        } 
        catch (error) {
            notification("error", "No flight found for given ID.");
        }
    }

    const createFlight = async (data) => {
        try {
            if (token) {
                const result = await axios.post("http://localhost:5000/api/flights/create_flight", data, {
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

    const updateFlight = async (data) => {
        try {
            if (token) {
                const result = await axios.patch(`http://localhost:5000/api/flights/${data._id}`, data, {
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

    const deleteFlight = async (data) => {
        try {
            if (token) {
                const result = await axios.delete(`http://localhost:5000/api/flights/${data._id}`, {
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
        flights: [flights, setFlights],
        flight: [flight, setFlight],
        results: [results, setResults],
        callback: [callback, setCallback],
        page: [page, setPage],
        limit: [limit, setLimit],
        countPages: [countPages, setCountPages], 
        search: [search, setSearch],        
        searchFlight: searchFlight,
        storeFlight: storeFlight,
        createFlight: createFlight,
        updateFlight: updateFlight,
        deleteFlight: deleteFlight
    };
}

export default FlightsAPI;