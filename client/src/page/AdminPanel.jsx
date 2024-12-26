import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import DashSidebar from '../compoments/DashSidebar.jsx';
import DashPost from '../compoments/DashPost.jsx';
import DashUser from '../compoments/DashUser.jsx';
import "../css/admin-panel.css";

const AdminPanel = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl)  
      {
      setTab(tabFormUrl);
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
      </div>
    </div>
  );
};

export default AdminPanel;
