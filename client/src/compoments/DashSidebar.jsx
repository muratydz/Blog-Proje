import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/slices/userSlice';

const DashSidebar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isActive = (path) => {
    return location.search.includes(path);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST"
      })
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess())
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div >
      <div hidden={showSidebar} className='menu-bars'>
        <FaBars onClick={() => setShowSidebar(true)} />
      </div>
      <div className={showSidebar ? "dashSidebar active" : "dashSidebar"}>
        <div hidden={!showSidebar} className='sidebarTimes'>
          <FaTimes onClick={() => setShowSidebar(false)} />
        </div>
        <Link
          to={"/admin-panel?tab=all-post"}
          className={`link ${isActive('all-post') ? 'link-active' : ''}`}
          onClick={() => setShowSidebar(false)}
          >
          <MdOutlinePostAdd />Post Management
        </Link>
        <Link
          to={"/admin-panel?tab=user-management"}
          className={`link ${isActive('user-management') ? 'link-active' : ''}`}
          onClick={() => setShowSidebar(false)}
        >
          <FaUser />User Management
        </Link>
        <div className='currentUser sideCard'>
          <img src={currentUser.profilePicture} alt="img" />
          <h2>
            {currentUser.username}
          </h2>
          <span>{currentUser.isAdmin && "Admin"}</span>
        </div>
        <div className='signout sideCard' onClick={handleSignout}>
          <h2>Sign Out</h2>
          <FaSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
