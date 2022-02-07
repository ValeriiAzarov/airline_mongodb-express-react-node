import { toast } from "react-toastify";

const ValidateSearch = (data) => {
    if (data.from && data.to && data.date) {
        if (data.from === data.to) {
            toast.error("Destination cannot be same.", { 
                position: "top-right",
                autoClose: 15000,
                draggable: true
            });
            return false;
        } 
        else {
            if (Date.parse(data.date) < Date.now()) {
                toast.error("Past date is not allowed.", { 
                    position: "top-right",
                    autoClose: 15000,
                    draggable: true
                });
                return false;
            } 
            else {
                return true;
            }
        }
    } 
    else {
        toast.error("All fields are required.", { 
            position: "top-right",
            autoClose: 15000,
            draggable: true
        });
        return false;
    }
}

export default ValidateSearch;