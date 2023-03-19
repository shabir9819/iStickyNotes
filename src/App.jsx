import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login_Registration from "./components/Login_&_Registration/Login_&_Registration";
import NoteState from "./context/Notes/NoteState";
import Notes from "./components/Notes/Notes";
import UserState from "./context/Users/UserState";
import Contact from "./components/Contact/Contact";
import Service from "./components/Service/Service";

import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastState from "./context/Toast/ToastState";

function App() {
  // const a = JSON.stringify(import.meta.env.VITE_DATABASE_URL);
  // console.log(a);

  return (
    <>
      <ToastState
      >
        <UserState>
          <NoteState>
            <Navbar />
            <ToastContainer />
            <Routes>
              <Route exact path="/" element={<Login_Registration />} />
              <Route exact path="/login" element={<Login_Registration />} />
              <Route exact path="/notes" element={<Notes />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/benefits" element={<Service />} />
            </Routes>
          </NoteState>
        </UserState>
      </ToastState>
    </>
  );
}

export default App;
