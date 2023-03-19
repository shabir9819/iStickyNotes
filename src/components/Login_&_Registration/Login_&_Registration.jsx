import React, { useState, useContext } from "react";
import UserContext from "../../context/Users/UserContext";
import "./login_&_registration.css";

export default function Login_Registration() {

 
  const [login, setLogin] = useState("login");
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const userContext = useContext(UserContext);
  const { loginUser, signUpUser } = userContext;

  //Switching Login To Register and vice-versa
  const loginToRegis = (value) => {
    setLogin(value);

    setUserInput({
      username: "",
      email: "",
      password: "",
    });
    setShowPassword("password");
  };

  //Changing the instance of the input using onChangeEvent function
  const onChangeEvent = (e) => {
    setUserInput((preVal) => {
      return { ...preVal, [e.target.name]: e.target.value };
    });
  };

  const submitEvent = (e) => {
    if (e === "login") {
      loginUser(userInput, setUserInput);
    } else if (e === "register") {
      signUpUser(userInput);
      loginToRegis("login");
    } else {
    }
  };

  //Show/Hide password function
  const [showPassword, setShowPassword] = useState("password");

  const showHidePassEvent = () => {
    return setShowPassword(() => {
      return showPassword === "password" ? "text" : "password";
    });
  };
  return (
    <div className="wrapper">
      {login === "login" && (
        <div className={`form_box ${login}`}>
          <span className="close_btn">
            <i className="fa-solid fa-xmark"></i>
          </span>
          <h2>Login</h2>
          <form action="" autoComplete="off">
            <div className="email input_box">
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="text"
                id="Email"
                name="email"
                value={userInput.email}
                onChange={onChangeEvent}
                required
              />
              <label htmlFor="Email">Email</label>
            </div>
            <div className="password input_box">
              <span className="icon passwordIcon" onClick={showHidePassEvent}>
                <i
                  className={`fa-solid fa-${
                    showPassword === "password" ? "eye" : "eye-slash"
                  }`}
                ></i>
              </span>
              <input
                type={showPassword}
                id="Password"
                name="password"
                value={userInput.password}
                onChange={onChangeEvent}
                required
              />
              <label htmlFor="Password">Password</label>
            </div>

            <button
              type="submit"
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                submitEvent("login");
              }}
            >
              Login
            </button>
            <div className="login_register">
              <p>
                Dont't have an account ?
                <span
                  className="register_link"
                  onClick={(e) => {
                    e.preventDefault();
                    loginToRegis("registration");
                  }}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      )}
      {login === "registration" && (
        <div className="form_box register">
          <span className="close_btn">
            <i className="fa-solid fa-xmark"></i>
          </span>
          <h2>Registration</h2>
          <form autoComplete="off">
            <div className="email input_box">
              <span className="icon">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                id="Username"
                name="username"
                value={userInput.username}
                onChange={onChangeEvent}
                required
              />
              <label htmlFor="Username">Username</label>
            </div>
            <div className="email input_box">
              <span className="icon">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input
                type="text"
                id="Email"
                name="email"
                value={userInput.email}
                onChange={onChangeEvent}
                required
              />
              <label htmlFor="Email">Email</label>
            </div>
            <div className="password input_box">
              <span className="icon passwordIcon" onClick={showHidePassEvent}>
                <i
                  className={`fa-solid fa-${
                    showPassword === "password" ? "eye" : "eye-slash"
                  }`}
                ></i>
              </span>
              <input
                type={showPassword}
                id="Password"
                name="password"
                value={userInput.password}
                onChange={onChangeEvent}
                required
              />
              <label htmlFor="Password">Password</label>
            </div>
            <div className="phone input_box">
              <span className="icon">
                <i className="fa-solid fa-phone"></i>
              </span>
              <input
                type="text"
                id="Phone"
                name="phone"
                value={userInput.phone || ""}
                onChange={onChangeEvent}
                required
              />
              <label htmlFor="Phone">Phone</label>
            </div>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                submitEvent("register");
              }}
            >
              Register
            </button>
            <div className="login_register">
              <p>
                Already have an account ?
                <span
                  className="register_link"
                  onClick={(e) => {
                    e.preventDefault();
                    loginToRegis("login");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
