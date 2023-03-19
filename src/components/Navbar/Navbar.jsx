import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import "./navbar.css";
import NoteContext from "../../context/Notes/NoteContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ToastContext from "../../context/Toast/ToastContext";

const Navbar = () => {

  //importing toastClickEvent function from Toastcontext
  const toastContext = useContext(ToastContext);
  const {toastClickEvent} = toastContext;


  const location = useLocation();
  const navigate = useNavigate();
  let navbar2 = useRef();

  useLayoutEffect(() => {
    const scrollEvent = (e) => {
      if (e.currentTarget.scrollY > 10) {
        navbar2.current.style.cssText = " backdrop-filter: blur(5px);";
      } else if (e.currentTarget.scrollY === 0) {
        navbar2.current.style.cssText = "background-color:transparent";
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  const logOutEvent = () => {
    localStorage.removeItem("token");
    if(!localStorage.getItem("token")){
      navigate("/");
      toastClickEvent({type:"success", msg:"Log Out Successful."});
    }else{
      toastClickEvent({type:"error", msg:"Internal server error."});
      
    }
  };

  //Toggle for mobile hamburger
  const [hamToggle, setHamToggle] = useState({ mode: false, icon: "bars" });

  const hamToggleEvent = () => {
    setHamToggle((preVal) => {
      return {
        ...preVal,
        mode: !preVal.mode,
        icon: preVal.icon === "bars" ? "close" : "bars",
      };
    });
    if (!hamToggle.mode) {
      navbar2.current.style.cssText = " backdrop-filter: blur(5px);";
    } else {
      navbar2.current.style.cssText = "background-color:transparent";
    }
  };

  return (
    <header id="navbar" ref={navbar2}>
      <nav className="navbar" id="navbar">
        <h1 className="logo">iSTICKYNOTES</h1>
        <div className="menu">
          {(location.pathname === "/notes" ||
          location.pathname === "/contact" ||
          location.pathname === "/benefits") && (
            <ul className="menu_list">
              <li className="list_items">
                <Link to="/notes"> Notes</Link>
              </li>
              <li className="list_items">
                <Link to="/benefits"> Benefits</Link>
              </li>
              <li className="list_items">
                <Link to="/contact"> contact </Link>{" "}
              </li>

              <span className="logout" onClick={logOutEvent}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
            </ul>
          )}
        </div>
        {(location.pathname === "/notes" ||
          location.pathname === "/contact" ||
          location.pathname === "/benefits") && <span className="hamburger" onClick={hamToggleEvent}>
          <i className={`fa-solid fa-${hamToggle.icon}`}></i>
        </span>}
      </nav>
      {hamToggle.mode &&
        (location.pathname === "/notes" ||
        location.pathname === "/contact" ||
        location.pathname === "/benefits") && (
          <ul className="menu_list2">
            <li className="list_items2" onClick={hamToggleEvent}>
              <Link to="/notes"> Notes</Link>
            </li>
            <li className="list_items2" onClick={hamToggleEvent}>
              <Link to="/benefits"> Benefits</Link>
            </li>
            <li className="list_items2" onClick={hamToggleEvent}>
              <Link to="/contact"> contact </Link>{" "}
            </li>

            <span
              className="logout"
              onClick={() => {
                logOutEvent();
                hamToggleEvent();
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </span>
          </ul>
        )}
    </header>
  );
};

export default Navbar;
