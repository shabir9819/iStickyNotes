import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../../context/Notes/NoteContext";
import "./addNote.css";

export default function AddNote({ showAddEvent, modal }) {

  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const changeEventHandler = (e) => {
    return setNoteData((preVal) => {
      return { ...preVal, [e.target.name]: e.target.value };
    });
  };

  const context = useContext(NoteContext);
  const { addNote, editNote } = context;

  useEffect(() => {
    //Setting previous data to the input section for editing
    if (modal.type === "Edit") {
      setNoteData({
        title: modal.data.title,
        description: modal.data.description,
        tag: modal.data.tag,
      });
    }
  }, []);

  const submitNote = (e) => {
    e.preventDefault();
    if (modal.type === "Add") {
      addNote(noteData);
    } else if (modal.type === "Edit") {
     
      editNote(noteData, modal.data.id);
    } else {
    }
    setNoteData({ title: "", description: "", tag: "" });
    showAddEvent("", "");
  };
  return (
    <div className="wrapper_2" id = "wrapper_2">
      <div className="add_note_box ">
        <span className="close_btn" onClick={() => showAddEvent("", "")}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <h2>{`${modal.type} your note`}</h2>
        <form action="#" autoComplete="off">
          <div className="title input_box">
            <span className="icon">
              <i className="fa-solid fa-heading"></i>
            </span>
            <input
              type="text"
              id="Title"
              name="title"
              value={noteData.title}
              onChange={changeEventHandler}
              required
            />
            <label htmlFor="Title">Title</label>
          </div>
          <div className="description input_box">
            <span className="icon">
              <i className="fa-solid fa-audio-description"></i>
            </span>
            <input
              type="text"
              id="Description"
              name="description"
              value={noteData.description}
              onChange={changeEventHandler}
              required
            />
            <label htmlFor="Description">Description</label>
          </div>
          <div className="tag input_box">
            <span className="icon">
              <i className="fa-solid fa-tag"></i>
            </span>
            <input
              type="text"
              id="Tag"
              name="tag"
              value={noteData.tag}
              onChange={changeEventHandler}
              required
            />
            <label htmlFor="Tag">Tag</label>
          </div>
          <button className="btn" onClick={submitNote}>
            {`${modal.type} Note`}
          </button>
        </form>
      </div>
    </div>
  );
}
