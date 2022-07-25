import "./topbar.css"
import {Link} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Context";
export default function TopBar() {
  const {user, dispatch} =  useContext(Context);
   const pf = "http://localhost:5000/images/"
   const handleLogout = ()=>{
       dispatch({type : "LOGOUT"})
   }
  return (
    <div className = "top">
    <div className = "topLeft">
      <i className="topIcon fab fa-facebook-square"></i>
      <i className="topIcon fab fa-twitter-square"></i>
      <i className="topIcon fab fa-instagram-square"></i>
      <i className="topIcon fab fa-pinterest-square"></i>
    </div>
    <div className="topCenter">
   <ul className="topList">
     <li className="topListitem">
       <Link to="/" style  = {{ textDecoration : "none",
         color:"inherit"}}>Home</Link>
     </li>
     <li className="topListitem">  <Link to="post/:postid" style  = {{ textDecoration : "none",
         color:"inherit"}}>Post</Link></li>
     <li className="topListitem">  <Link to="setting/"style  = {{ textDecoration : "none",
         color:"inherit"}}>Setting</Link></li>
  <li className="topListitem">  <Link to="write/"style  = {{ textDecoration : "none",
         color:"inherit"}}>Write</Link></li>
     <li className="topListitem"  onClick ={handleLogout}>  
        {user && "LOGOUT"}
     </li>
   </ul>
 </div>
 <div className = "topRight">
   {
     user ? (
       <Link to="/setting">
         <img
         className="topImg"
         src= {pf + user.porfilePicture}
         alt=""
       />
       </Link>
     ): (
      <ul className="topList">
        <li className="topListItem">
       <Link className = "link" to="register">Register</Link>
        </li>
        <li className = "topListItem">
       <Link className = "link" to = "login">Login</Link>
       </li>
      </ul>
     )
  
     }
 
 </div>
    </div>
  );
}
