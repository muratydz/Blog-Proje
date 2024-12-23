import React from 'react';
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.search.includes(path);
  };

  return (
    <div className="dashSidebar">
      <Link 
        to={"/admin-panel?tab=all-post"} 
        className={`link ${isActive('all-post') ? 'link-active' : ''}`}
      >
        Post Management
      </Link>
      <Link 
        to={"/admin-panel?tab=user-management"} 
        className={`link ${isActive('user-management') ? 'link-active' : ''}`}
      >
        User Management
      </Link>
    </div>
  );
};

export default DashSidebar;
