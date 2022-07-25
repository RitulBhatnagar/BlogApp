import React, { useContext, useState } from 'react'
import "./write.css"
import {Context} from "../../context/Context"
import axios from "axios"
export default function Write() {
  const[title, setTitle] = useState(" ");
const[desc, setDesc] = useState(" ");
  const[file, setFile] = useState(null);
  const {user} = useContext(Context);
  const handleSubmit = async(e) =>{
         e.preventDefault();
         const newPost = {
           username : user.username,
            title,
            desc
         };
         if(file){
           const data  = new FormData();
           const filename = Date.now() + file.name;
           data.append("name", filename);
           data.append("file", file);
           newPost.photo = filename;
           try{
              await axios.post("http://localhost:5000/api/upload", data)
           }catch(err){

           }
         }
         try{
         const res = axios.post("http://localhost:5000/api/posts", newPost);
         window.location.replace("/" )
        }
        catch(err){

        }
  }
  return (
    <div className = "write">
      {file &&
            <img
            className="writeImg"
            src={ URL.createObjectURL(file)}
            alt=""
          />
      }
  
         <form className= " writeForm" onSubmit = {handleSubmit}>
           <div className="writeFormGroup">
             <label htmlFor="fileinput">
               <i className="writeIcon fas fa-plus"></i>
             </label>
             <input type="file" id="fileinput" style = {{display:"none"}} onChange = {(e)=>setFile(e.target.files[0]) }/>
             <input type="text" placeholder =" Title" className="writeInput" autoFocus = {true} onChange = {e=>setTitle(e.target.value)} />
           </div>
           <div className="writeFormGroup">
             <textarea placeholder = "tell your story.." type = "text" 
             onChange = {(e)=>setDesc(e.target.value) }
             className = "writeInput wirteText"></textarea>
           </div>
           <button type = "submit" className="writeSubmit">Publish</button>
           </form>
    </div>
  )
}