import React, { createRef , useEffect} from "react";
import { useLocation } from "react-router-dom";
import "./service.css";

export default function Service() {
  const serviceRef = createRef();
  const location = useLocation();

  useEffect(() => {
    
    setTimeout(() => {
      serviceRef.current.classList.toggle("active")

      let list = document.getElementsByClassName("benefits_listitems");
      for(let i = 0 ; i < list.length ; i++){

        list[i].style.cssText = `transform:translateX(0px);transition: all .${4+i}s;`

      }
      return()=>{
        clearTimeout();
      }

    }, 200);
  
  }, [])
  


  return (
    <div className ="service " ref = {serviceRef}>
     <ul className="benefits_lists">

      <li className="benefits_listitems">iStickyNotes keeps your notes more secure. </li>
      <li className="benefits_listitems">See Your Notes from anywhere and anytime.</li>
      <li className="benefits_listitems">i StickyNotes help us capture new information quickly.</li>
      <li className="benefits_listitems">No need more walls use i StickyNotes to note your thoughts.</li>
      <li className="benefits_listitems">If you have a long list of tasks to complete or things to study, i StickyNotes can be a useful way to organise your to-do list. You can write down a task on each i StickyNotes, and then shift them up and down in the list according to your priorities and deadlines.</li>
    
     </ul>
    </div>
  );
}
