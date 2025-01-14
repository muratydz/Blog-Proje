import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updetePost } from '../redux/slices/postSlice';
import { app } from '../firebase';

const DashPostUpdate = ({ postId }) => {
    const [formData, setFormData] = useState({
        content: "",
        title: "",
        images: [],
        category: "uncategorized"
    });
    const [files, setFiles] = useState([]);
    const { error } = useSelector((state) => state.post)
    const posts = useSelector((state) => state.post.posts)
    const post = posts.find((post) => post._id === postId)
    console.log("post: "+ post.title);
    console.log("posts: "+posts.map(post => post._id))
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        if (post) {
            setFormData({
                content: post.content,
                title: post.title,
                images: post.images,
                category: post.category,
            })
        }
    }, [post.title])

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
        const res = await dispatch(updetePost({postId, formData}));
        if (updetePost.fulfilled.match(res)) {
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
                    {formData.images.length > 0 && formData.images.map((img, index) => (
                        <img key={index} src={img} className='postImg' />
                    )
                    )}
                </div>
                <input value={formData.title} id='title' type="text" required placeholder='title' onChange={handleChance} />
                <textarea value={formData.content} id="content" required placeholder='content' onChange={handleChance}></textarea>
                <select value={formData.category} id="category" onChange={handleChance}>
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

export default DashPostUpdate
