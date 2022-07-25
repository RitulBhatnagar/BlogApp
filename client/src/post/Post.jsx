import React from 'react'
import './post.css'
import {Link} from "react-router-dom"
// import Posts from '../Posts/Posts'
export default function Post({post}) {
  const pf = 'http://localhost:5000/images/'
  return (
     <div className="post">
       {post.photo && <img className = "postImg" src = {pf+post.photo} alt = " "/>}
        <div className="postInfo">
          <div className="postCats">
            {
              post.categories.map((c) => (
                <span className="postCat">{c.name}</span>
              ))
            }
          </div>
          <Link to = {`/post/${post._id}`} className = "link">
          <span className="postTitle">
              {post.title}
          </span>
          </Link>
    
          <hr/>
          <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
          <div className="postDesc">
              {post.desc};
          </div>
        </div>
     </div>
  )
}
