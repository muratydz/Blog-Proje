import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from '../redux/slices/userSlice';
import { FaTimes } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const DashUser = () => {
  const users = useSelector((state) => state.user.users)
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(selectedUserId));
    closeModal();
  };

  const handleUpdate = (userId) => {
    navigate(`/admin-panel?tab=update-user&userId=${userId}`);
  }

  return (
    <div className='dashUser'>
      <div className='addUser' onClick={() => navigate("/admin-panel?tab=add-user")}>Add user</div>
      <h1>-Users-</h1>
      {loading && "Loading..."}
      {users && users.filter((user) => user._id !== currentUser._id).map((user, int) => (
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
            <RxUpdate className='updateIcon' onClick={() => handleUpdate(user._id)} />
            <FaTimes className='deleteIcon' onClick={() => openModal(user._id)} />
          </div>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="modalContent"
        overlayClassName="modalOverlay"
      >
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this user?</p>
        <button onClick={confirmDelete}>Yes, Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default DashUser;
