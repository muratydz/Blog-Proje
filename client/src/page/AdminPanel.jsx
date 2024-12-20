import "../css/admin-panel.css"
import React, { useEffect, useState } from 'react';
import DashSidebar from '../compoments/DashSidebar';
import {useLocation} from "react-router-dom";
import DashPost from '../compoments/DashPost';
import DashUser from "../compoments/DashUser";


const AdminPanel = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  console.log(tab);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if(tabFormUrl){
      setTab(tabFormUrl);
    }
  }, [location.search])

  return (
    <div className='dashboard'>
      <div className='dashSidebar'>
      <DashSidebar/>
      </div>
      <div className='dashCompoment'>
        {tab === "all-post" && <DashPost/> }
        {tab === "user-management" && <DashUser/>}
      </div>
    </div>
  )
}

export default AdminPanel
