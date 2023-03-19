import React from "react";
import { toast } from "react-toastify";
import ToastContext from "./ToastContext";

export default function ToastState(props) {

const toastClickEvent = (action)=>{
    switch (action.type) {
        case "success":
            
            toast.success(`${action.msg}`,{position:"top-center",theme: "colored",closeOnClick: false,
            pauseOnHover: false,autoClose: 2000});
            break;
        case "error":
            
            toast.error(`${action.msg}`,{position:"top-center",theme: "colored",closeOnClick: false,
            pauseOnHover: false,autoClose: 2000});
            break;
    
        default:
            break;
    }
}


  return ( <ToastContext.Provider value = {{toastClickEvent}}>{props.children}</ToastContext.Provider>)
}
