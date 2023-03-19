import React, { useState, useContext } from "react";
import NoteContext from "./NoteContext";
import ToastContext from "../Toast/ToastContext";

export default function NoteState(props) {
  const url = `${import.meta.env.VITE_DATABASE_API_URL}notes/`;

   //importing toastClickEvent function from Toastcontext

   const toastContext = useContext(ToastContext);
   const {toastClickEvent} = toastContext;

  const [notes, setNotes] = useState([]);

  //Fetching notes from the database
  const fetchNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const fetchData = await fetch(`${url}fetchAllNotes`, options);
    const response = await fetchData.json();

    if (response.success === true) {
      return setNotes(response.notes);
    }
  };

  //Adding notes to the database
  const addNote = async (noteData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(noteData),
    };
    const fetchData = await fetch(`${url}addNote`, options);
    const response = await fetchData.json();
    if (response.success === true) {
       setNotes((oldNote) => {
        return oldNote.concat(noteData);
      });
      fetchNotes();
      toastClickEvent({type:"success", msg:"Notes added successfully."});
    }
    else if(response.success === false){
      toastClickEvent({type:"error", msg:"Internal server error."});
    }else{
      toastClickEvent({type:"error", msg:"Internal server error."});
    }
  };
  //Updating notes using id to the database
  const editNote = async (noteData, id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(noteData),
    };
    const fetchData = await fetch(`${url}updateNote/${id}`, options);
    const response = await fetchData.json();
    let newNote = JSON.parse(JSON.stringify(notes));
    if (response.success === true) {
      newNote.forEach((note, index) => {
        if (note._id === id) {
          note.title === noteData.title,
            note.description === noteData.description,
            note.tag === noteData.tag;
        }
      });

      setNotes(newNote);
      fetchNotes();
      toastClickEvent({type:"success", msg:"Updated note successfully."});
    }else if(response.success === false){
      toastClickEvent({type:"error", msg:"Internal server error."});
    }else{
      toastClickEvent({type:"error", msg:"Internal server error."});
    }
  
  };

  //Deleting notes from the database
  const deleteNote = async (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };
    const fetchData = await fetch(`${url}deleteNote/${id}`, options);
    const response = await fetchData.json();
    if (response.success === true) {
       setNotes((oldNotes) => {
        return oldNotes.filter((note, index) => {
          return note._id !== id;
        });
      });
      fetchNotes();
      toastClickEvent({type:"success", msg:"Deleted note successfully."});
    }
    else if(response.success === false){
      toastClickEvent({type:"error", msg:"Internal server error."});
    }else{
      toastClickEvent({type:"error", msg:"Internal server error."});
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
