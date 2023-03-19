import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/Notes/NoteContext";
import CardDetails from "../CardDetails/CardDetails";
import "./notes.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddNote from "../AddNote/AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [addNote, setAddNote] = useState(false);
  const [modal, setModal] = useState({ type: "", data: "" });
  const history = useNavigate();
  const showAddEvent = (type, noteData) => {
  
     setAddNote( (pre) => {
      return !pre;
    });
    setModal({ type, data: noteData });
   
  };
  const context = useContext(NoteContext);
  const { notes, fetchNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      history("/login");
    }
  }, []);

  return (
    <div className="container">
      <h1>Your notes</h1>
      <div className="card_container">
        {notes.length === 0 ? (
          <p className="no_notes">No notes to display..</p>
        ) : (
          notes.map((element, index) => {
            return (
              <CardDetails
                key={index}
                title={element.title}
                description={element.description}
                tag={element.tag}
                id={element._id}
                showAddEvent={showAddEvent}
              />
            );
          })
        )}
        <span onClick={() => showAddEvent("Add", "")} className="add_icon">
          <AddCircleIcon className="add_icon" />
        </span>
      </div>
      {addNote && <AddNote showAddEvent={showAddEvent} modal={modal} />}
    </div>
  );
}
