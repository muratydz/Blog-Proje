import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/slices/postSlice';

const DashCreatePost = () => {
  const [formData, setFormData] = useState({});
  const { error, status } = useSelector((state) => state.post)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChance = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createPost(formData));
    if (createPost.fulfilled.match(res)) {
      navigate("/admin-panel?tab=all-post");
    } 
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input id='title' type="text" required placeholder='title' onChange={handleChance} />
        <textarea id="content" required placeholder='content' onChange={handleChance}></textarea>
        <select id="category" onChange={handleChance}>
          <option value="uncategorized">uncategorized</option>
          <option value="toys">toys</option>
          <option value="hand">hand</option>
        </select>
        <button>bas</button>
      </form>
      {error && error}
    </div>
  )
}

export default DashCreatePost

// content: {
//       type: String,
//       required: true
//   },
//   title: {
//       type: String,
//       required: true,
//       unique: true
//   },
//   images: {
//       type: Array,
//       default: ['https://www.hostinger.com/tutorials/wp-content/up-loads/sites/2/2021/09/how-to-write-a-blog-post.png',]
//   },
//   category: {
//       type: String,
//       default: "uncategorized",
//   },