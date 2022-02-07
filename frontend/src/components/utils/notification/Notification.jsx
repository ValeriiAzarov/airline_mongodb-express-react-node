import { toast } from "react-toastify";

const Notification = (type, message) => {
    if (type === "success") {
        return toast.success(message, { 
            position: "top-right",
            autoClose: 15000,
            draggable: true
        });;
    }
    else if (type === "warn") {
        toast.warn(message, { 
            position: "top-right",
            autoClose: 15000,
            draggable: true
        });
    }
    else {
        return toast.error(message, { 
            position: "top-right",
            autoClose: 15000,
            draggable: true
        });;
    }
}

export default Notification;