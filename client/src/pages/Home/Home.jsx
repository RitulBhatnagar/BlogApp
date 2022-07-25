
import "./home.css"
import "../../header/Header"
import Header from "../../header/Header"
import Sidebar from "../../sidebar/Sidebar"
import Posts from "../../Posts/Posts";
import axios from "axios";
import {useState} from "react";
  import {useLocation} from "react-router"

import {useEffect} from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  // const { search } = useLocation();
  const {search}  = useLocation()
  // console.log(location);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts" + search);
      setPosts(res.data);
      console.log(res);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}