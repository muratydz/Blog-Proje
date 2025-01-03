import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import DashSidebar from '../compoments/DashSidebar.jsx';
import DashPost from '../compoments/DashPost.jsx';
import DashUser from '../compoments/DashUser.jsx';
import DashUpdateUser from '../compoments/DashUpdateUser.jsx';
import "../css/admin-panel.css";

const AdminPanel = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    const userIdFromUrl = urlParams.get("userId");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
    if(userIdFromUrl){
      setUserId(userIdFromUrl);
    }
  }, [location.search]);


  return (
    <div className="dashboard">
      <div>
        <DashSidebar />
      </div>
      <div className="dashCompoment">
        {tab === "all-post" && <DashPost />}
        {tab === "user-management" && <DashUser />}
        {tab === "update-user" && <DashUpdateUser userId={userId} />}
      </div>
    </div>
  );
};

export default AdminPanel;
