import React, { useState } from 'react'
import "./setting.css"
import Sidebar from "../../sidebar/Sidebar"
import { useContext } from 'react'
import {Context} from "../../context/Context"
import axios from 'axios'
export default function Setting() {
  const [file, setFile]  = useState(null);
  const[username, setUsername] = useState(" ");
  const[email, setEmail] = useState(" ");
  const[password, setPassword] = useState(" ");
  const [success, setSuccess] = useState(false);
  const {user, dispatch} = useContext(Context);
  const pf = "http://localhost:5000/images/"
  const handleSubmit = async(e)=>{
    e.preventDefault();
    dispatch({type : "UPDATE_START"})
    const updatedUser = {
        userId : user._id,
        username,
        email, 
        password,
    };
    if(file){
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename
      try{
        await axios.post("http://localhost:5000/api/upload", data);

      }catch(err){
        console.log(err);

      }
    }
    try{
      const res = await axios.put("http://localhost:5000/api/users/"+user._id, updatedUser);
      dispatch({type : "UPDATE_SUCCESS", payload:res.data})
      setSuccess(true);
    }catch(err){
      dispatch({type : "UPDATE_FAILURE"})
      console.log(err);
    }
  }

;  return (
    <div className="settings">
    <div className="settingsWrapper">
      <div className="settingsTitle">
        <span className="settingsTitleUpdate">Update Your Account</span>
        <span className="settingsTitleDelete">Delete Account</span>
      </div>
      <form onSubmit = {handleSubmit} className="settingsForm">
        <label>Profile Picture</label>
        {success && <span style = {{textTransform:"capitalize",textAlign : "center",fontSize :"3rem" ,fontFamily:"Pacifico", color:"green"}}>Profile has been updated</span>}
        <div className="settingsPP">
        {file &&
            <img
            src={file ? URL.createObjectURL(file) : pf + user.profilePicture}
            alt=""
          />}
          <label htmlFor="fileInput">
            <i className="settingsPPIcon far fa-user-circle"></i>{" "}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange = {(e)=>setFile(e.target.files[0])}
            className="settingsPPInput"
          />
        </div>
        <label>Username</label>
        <input
         type="text"
          placeholder= {user.username}
           name="name"
           onChange = {(e)=>setUsername(e.target.value)} />
        <label>Email</label>
        <input 
        type="email" 
        placeholder={user.email}
        name="email" 
        onChange = {(e)=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input 
        type="password" 
        placeholder={user.password}
         name="password" 
         onChnage = {(e)=>setPassword(e.target.value)}/>
        <button className="settingsSubmitButton" type="submit">
          Update
        </button>
     
      </form>
    </div>
    <Sidebar />
  </div>
  )
}
