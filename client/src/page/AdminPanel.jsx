import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import DashSidebar from '../compoments/DashSidebar.jsx';
import DashPost from '../compoments/DashPost.jsx';
import DashUser from '../compoments/DashUser.jsx';
import DashUpdateUser from '../compoments/DashUpdateUser.jsx';
import "../css/admin-panel.css";
import DashAddUser from '../compoments/DashAddUser.jsx';
import DashCreatePost from '../compoments/DashCreatePost.jsx';
import DashPostUpdate from '../compoments/DashPostUpdate.jsx';

const AdminPanel = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState(""); 

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    const userIdFromUrl = urlParams.get("userId");
    const postIdFromUrl = urlParams.get("postId");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
    }
    if(postIdFromUrl){
      setPostId(postIdFromUrl);
    }
  }, [location.search]);


  return (
    <div className="dashboard">
      <div>
        <DashSidebar />
      </div>
      <div className="dashCompoment">
        {tab === "all-post" && <DashPost />}
        {tab === "create-post" && <DashCreatePost/>}
        {tab === "update-post" && <DashPostUpdate postId={postId}/>}
        {tab === "user-management" && <DashUser />}
        {tab === "update-user" && <DashUpdateUser userId={userId} />}
        {tab === "add-user" && <DashAddUser />}
      </div>
    </div>
  );
};

export default AdminPanel;
