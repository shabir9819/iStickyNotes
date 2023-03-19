import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/Users/UserContext";
import "./contact.css";

export default function Contact() {
  const context = useContext(UserContext);
  const { getUser } = context;
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const onChangeEvent = (e) => {
    setUserInput((preVal) => {
      return { ...preVal, [e.target.name]: e.target.value };
    });
  };

  const messageEvent = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(userInput),
    };

    const fetchData = await fetch(`${import.meta.env.VITE_API_DATABASE_URL}message`, options);
    const response = await fetchData.json();
    if (response.success === true) {
      setUserInput((preVal) => {
        return { ...preVal, password: "", message: "" };
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser(setUserInput);
    }else{
      navigate("/login")
    }
  }, []);

  return (
    <div className="wrapper_3">
      <div className="form_box register">
        <h2>Contact Us</h2>
        <form action="#" autoComplete="off">
          <div className="email input_box">
            <span className="icon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              id="Email"
              name="email"
              defaultValue={userInput.email || ""}
              autoFocus={true}
              required
            />
            <label htmlFor="Email">Email</label>
          </div>
          <div className="phone input_box">
            <span className="icon">
              <i className="fa-solid fa-phone"></i>
            </span>
            <input
              type="phone"
              id="Phone"
              name="phone"
              defaultValue={userInput.phone || ""}
              autoFocus={true}
              required
            />
            <label htmlFor="Phone">Phone</label>
          </div>
          <div className="message input_box">
            <span className="icon">
              <i className="fa-solid fa-message"></i>
            </span>
            <input
              type="textArea"
              id="Message"
              name="message"
              value={userInput.message || ""}
              onChange={onChangeEvent}
              required
              min={3}
            />
            <label htmlFor="Message">Message</label>
          </div>
          <button className="btn" onClick={messageEvent}>
            Message
          </button>
        </form>
      </div>
    </div>
  );
}
