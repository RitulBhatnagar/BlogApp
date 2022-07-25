import React from 'react'
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom"
import { useEffect, useState} from "react";
import {useContext} from "react";
import {Context} from "../context/Context"
import  axios from "axios";
import "./singlePost.css"
export default function SinglePost() {
const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const {user} = useContext(Context);
  const[title, setTitle] = useState(" ");
  const[desc, setDesc] = useState(" ");
  const[update, setUpdate] = useState(false)
  const pf = 'http://localhost:5000/images/'
  console.log(path);
useEffect(()=>{
  const getPost = async ()=>{
    const res = await axios.get("http://localhost:5000/api/posts/" + path);
    setTitle(res.data.title);
    setDesc(res.data.desc)
    console.log(res.data);
    setPost(res.data);
  }
  getPost();
}, [path])
const handleDelete = async() =>{
  try{
    await axios.delete(`http://localhost:5000/api/posts/${post._id}` , {data : {username : user.username}})
    window.location.replace("/")
  }
  catch(err){

  }
  }
  const handleUpdate = async ()=>{
    try{
           await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
           username : user.username, 
            title, 
            desc }
           );
           window.location.reload("/");
    }catch(err){

    }
  }
  return (
    <div className = " singlePost ">
      <div className="wrapper">
     {post.photo && (       <img src = {pf + post.photo} alt = " " className = "singlePostImg"/>
     )}{
       update ? (<input type = "text" value = {title} className = "singlePostTitleInput" onChange = {(e)=>setTitle(e.target.value)}/>) : (
        <h1 className="singlePostTitle">
        {post.title}
        {post.username === user?.username && (
       <div className="editContainer">
      <i className="singlePostIcon fas fa-edit" onClick = {()=>setUpdate(true)} ></i>
      <i className="singlePostIcon fas fa-trash-alt" onClick ={handleDelete}></i>
    </div>
      )}
  </h1>
       )
     }
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author : 
            <Link className = "link" to = {`/?user=${post.username}`}>
            <b>{post.username}   </b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {
          update ? (
              <textarea className = "singlePostDescInput" value = {desc} onChange = {(e)=>setDesc(e.target.value)} />
          ):(
            <p className="singlePostDesc">
            {post.desc}
        </p>
          )
        }
        {
          update &&  <button className="singlePostButton" onClick = {handleUpdate}>update</button>
        }
         
      </div>
    
    </div>
  )
}
