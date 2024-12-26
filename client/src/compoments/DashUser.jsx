import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../redux/slices/userSlice';
import { FaTimes } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";

const DashUser = () => {

  const users = useSelector((state) => state.user.users)
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  console.log(users);
  console.log(status);
  console.log(error);
  console.log(loading);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className='dashUser'>
      <div className='addUser'>Add user</div>
      <h1>-Users-</h1>
      {loading && "Loading..."}
      {users && users.map((user) => (
        <div className='userCard' key={user._id}>
          <div className='userInformation'>
            {user.username}
            {user.isAdmin ? "admin" : "user"}
          </div>
          <div className='userIcons'>
            <RxUpdate/>
            <FaTimes />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashUser
