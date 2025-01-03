import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from '../redux/slices/userSlice';
import { FaTimes } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const DashUser = () => {

  const users = useSelector((state) => state.user.users)
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(error);
  console.log(users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleUpdate = (userId) => {
    navigate(`/admin-panel?tab=update-user&userId=${userId}`);
  }

  return (
    <div className='dashUser'>
      <div className='addUser' onClick={() => navigate("/admin-panel?tab=add-user")}>Add user</div>
      <h1>-Users-</h1>
      {loading && "Loading..."}
      {users && users.map((user, int) => (
        <div className='userCard' key={int}>
          <div className='userInformation'>
            <div>
              {user.username}
            </div>
            <div>
              {user.isAdmin ? "admin" : "user"}
            </div>

          </div>
          <div className='userIcons'>
            <RxUpdate className='updateIcon' onClick={() => handleUpdate(user._id)}/>
            <FaTimes className='deleteIcon' onClick={() => handleDelete(user._id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashUser