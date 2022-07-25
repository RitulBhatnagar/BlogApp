// import React from 'react'
import "./sidebar.css"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebartitle">AboutMe</span>
        <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, soluta pariatur consectetur fuga sed unde beatae cumque, iure voluptatem placeat quos, reprehenderit ullam perspiciatis illum vitae laudantium? Repudiandae excepturi, sit ad quidem perferendis mollitia consectetur nisi vitae, veritatis nesciunt omnis debitis rem iste ullam saepe labore non voluptas vel illo?
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebartitle">categories</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Style</li>
          <li className="sidebarListItem">Sport</li>
          <li className="sidebarListItem">Cinema</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebartitle">Follow us</span>
        <div className="sidebarSocial">
        <i className="sidebarIcon fab fa-facebook-square"></i>
      <i className="sidebarIcon fab fa-twitter-square"></i>
      <i className="sidebarIcon fab fa-instagram-square"></i>
      <i className="sidebarIcon fab fa-pinterest-square"></i>
        </div>
      </div>
    </div>
  )
}
