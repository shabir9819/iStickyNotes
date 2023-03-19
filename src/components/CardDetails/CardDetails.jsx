import React, { useContext } from "react";
import NoteContext from "../../context/Notes/NoteContext";
import "./cardDetails.css";
import pinImg from "../../assets/images/pin-png-39483.png"

export default function CardDetails({ title, description, tag,id,showAddEvent }) {
  const context = useContext(NoteContext);
  const {deleteNote} = context; 


 
  const deleteNoteEvent = async()=>{
    deleteNote(id);
  }
  return (
    <>
      <div className="card">
        <span className="delete"  onClick={()=>deleteNoteEvent(id)}>
          <i className="fa-solid fa-trash"></i>
        </span>
        <span className="pin" >
          <img src={pinImg} alt="" />
        </span>
        <h2 className="title">{title}</h2>
        <p className="desc">
          {description && (description.length < 150) ? description : `${description.slice(0, 250)} ...`}
      
         
        </p>
        <p className="tag">{tag}</p>
        <span className="edit" onClick={()=>showAddEvent("Edit", {title,description, tag,id})} >
          <i className="fa-regular fa-pen-to-square" ></i>
        </span>
      </div>
    </>
  );
}
