import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import ToastContext from "../../context/Toast/ToastContext";

export default function UserState(props) {
  //importing toastClickEvent function from Toastcontext

  const toastContext = useContext(ToastContext);
  const { toastClickEvent } = toastContext;

  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_DATABASE_API_URL}auth/`;

  //Getting User detail using authtoken
  const getUser = async (setUserInput) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "auth-token": localStorage.getItem("token"),
      },
    };

    const fetchData = await fetch(`${url}getUser`, options);
    const response = await fetchData.json();
    if (response.success == true) {
      let userData = response.userData;
      setUserInput((preVal) => {
        return { ...preVal, email: userData.email, phone: userData.phone };
      });
    }
  };

  //Login User using email and password
  const loginUser = async (userData, setUserInput) => {
    
    try {
      const { email, password } = userData;
  
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ email, password }),
      };
      const fetchData = await fetch(`${url}login`, options);
      const response = await fetchData.json();
      if (response.success == true) {
        localStorage.setItem("token", response.authToken);
        navigate("/notes");
        toastClickEvent("Logged in successfull.");
        toastClickEvent({ type: "success", msg: "Login Successful." });
      } else if (response.success === false) {
        setUserInput({
          username: "",
          email: "",
          password: "",
        });
        toastClickEvent({
          type: "error",
          msg: "Login failed. Please login with correct credentials.",
        });
      } else {
        setUserInput({ username: "", email: "", password: "" });
        toastClickEvent({
          type: "error",
          msg: "Login failed. Please login with correct credentials.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //SignUp User using username, email, password and phone
  const signUpUser = async (userData) => {
    const { email, password, username, phone } = userData;
    const data = {
      name: username,
      email,
      password,
      phone,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(data),
    };

    const fetchData = await fetch(`${url}createUser`, options);
    const response = await fetchData.json();
    if (response.success === true) {
      localStorage.setItem("token", response.authToken);
      navigate("/login");
      toastClickEvent({
        type: "success",
        msg: "Account created successfully.",
      });
    } else if (response.success === false) {
      toastClickEvent({ type: "error", msg: "Please enter a valid details." });
    } else {
      toastClickEvent({ type: "error", msg: "Please enter a valid details." });
    }
  };

  return (
    <UserContext.Provider value={{ getUser, loginUser, signUpUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
