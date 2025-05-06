import { Bounce } from "react-toastify";


// user notification handling
export const toastConfig = {
    position: "top-left" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark" as const,
    transition: Bounce,
}