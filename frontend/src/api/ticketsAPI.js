import { useState, useEffect } from "react";
import authAPI from "./authAPI.js";
import { saveAs } from "file-saver"
import axios from "axios";

const TicketsAPI = (token) => {
    const [isAdmin] = authAPI(token).isAdmin;
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});
    const [callback, setCallback] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [countPages, setCountPages] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (isAdmin) {
            if (token) {
                const getAllUsers = async () => {
                    const result = await axios.get(`http://localhost:5000/api/tickets/info_all_tickets?page=${page}&limit=${limit}&ticketId[regex]=${search}`, {
                        headers: {
                            Authorization: token
                        }
                    });
                    setTickets(result.data.tickets);
                    setCountPages(result.data.countPages);
                };
                getAllUsers();
            }
        }
    }, [token, isAdmin, callback, search, page, limit, countPages]);

    const getBookings = async (userDetailId) => {
        if (token) {
            const result = await axios.get(`http://localhost:5000/api/tickets/info_user_detail_ticket/${userDetailId}`, {
                headers: {
                    Authorization: token
                }
            });
            return result.data.tickets;       
        }
    }
    
    const bookFlight = async (userDetailId, flightId) => {
        try {
            if (token) {
                const result = await axios.post("http://localhost:5000/api/tickets/create_ticket", {
                    userDetailId,
                    flightId,
                }, {
                    headers: {
                        Authorization: token
                    }
                });
                setTicket(result.data.ticket);
            }
        } 
        catch (error) {
            console.log(error);
        }
    }

    const sendBooking = async (booking) => {
        try {
            await axios.post("http://localhost:5000/api/tickets/create-pdf", booking).then(() => 
                axios.get("http://localhost:5000/api/tickets/download-pdf", {
                    responseType: "blob",
                })
            ).then((result) => {
                const pdfBlob = new Blob([result.data], { type: "application/pdf" });
                saveAs(pdfBlob, `boarding-pass-${booking.user.surname + "-" + booking.user.name}.pdf`);
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    const cancelBooking = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:5000/api/tickets/delete_ticket/${bookingId}`, {
                headers: {
                    Authorization: token
                }
            }); 
        } 
        catch (error) {
            console.log(error);
        }
    }

    return {
        tickets: [tickets, setTickets],
        ticket: [ticket, setTicket],
        callback: [callback, setCallback],
        page: [page, setPage],
        limit: [limit, setLimit],
        countPages: [countPages, setCountPages], 
        search: [search, setSearch],
        getBookings: getBookings,
        bookFlight: bookFlight,
        sendBooking: sendBooking,
        cancelBooking: cancelBooking
    };
}

export default TicketsAPI;