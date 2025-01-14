import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../redux/slices/postSlice';
import { app } from '../firebase';

const DashCreatePost = () => {
  const [formData, setFormData] = useState({
    content: "",
    title: "",
    images: [],
    category: "uncategorized"
  });
  const [files, setFiles] = useState([]);
  const { error } = useSelector((state) => state.post)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(formData);

  const handleChance = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
    console.log(formData);
  }

  const handleImageSubmit = async () => {
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(storeImage(files[i]));
    }
    Promise.all(promises).then((urls) => {
      setFormData({ ...formData, images: formData.images.concat(urls) })
    }).catch((err) => {
      console.log(err);
    });

    console.log(files);
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTesk = uploadBytesResumable(storageRef, file);
      uploadTesk.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTesk.snapshot.ref).then((downloadURL) => resolve(downloadURL))
        },
      )
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createPost(formData));
    if (createPost.fulfilled.match(res)) {
      navigate("/admin-panel?tab=all-post");
    }
  }

  return (
    <div className='createPost'>
      <form onSubmit={handleSubmit}>
        <div>
          <div className='imgSubmit'>
            <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple />
            <button type='button' onClick={handleImageSubmit}>upload</button>
          </div>
          {formData.images.length > 0 && formData.images.map((img) => (
            <img src={img} className='postImg' />
          )
          )}
        </div>
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