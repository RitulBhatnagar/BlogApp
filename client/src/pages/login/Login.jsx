import { useContext , useState}from 'react'
import {Context} from "../../context/Context"
import axios from "axios"
import "./login.css"
import {Link } from "react-router-dom"
export default function Login() {
   const [username, setUsername] = useState(" ");
   const[password, setPassword] = useState(" ");
  const {user, dispatch, isFetching} = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
   console.log(user);
  console.log(isFetching);
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
       <form action="" className="loginForm" onSubmit = {handleSubmit}>
         <label htmlFor="">username</label>
         <input 
         type="text"
          placeholder="enter your username"
          onChange = {e => setUsername(e.target.value)}/>
         <label htmlFor="">password</label>
         <input type="password" 
         placeholder="enter your password" 
         onChange = {e => setPassword(e.target.value)}/>
         <button type = "submit" disabled ={isFetching} className="loginButton">login</button>
         </form>
         <button className="loginRegisterButton">
         <Link to="../register" style = { { textDecoration : "none", color:"inherit"}}>register</Link>
         </button>
      
    </div>
  )
}
