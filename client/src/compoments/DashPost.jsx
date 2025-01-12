import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, loadMorePosts } from '../redux/slices/postSlice';
import { RxUpdate } from 'react-icons/rx';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DashPost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const showMore = useSelector((state) => state.post.showMore);
  const status = useSelector((state) => state.post.status);
  const error = useSelector((state) => state.post.error);
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  const handleShowForward = () => {
    if (showMore) {
      const newIndex = startIndex + 9
      setStartIndex(newIndex);
      dispatch(loadMorePosts(newIndex));
    }
    else {
      console.log("daha fazlası yok");
    }
  }

  const handleShowBack = () => {
    if (startIndex > 0) {
      const newIndex = Math.max(startIndex - 9, 0);
      setStartIndex(newIndex)
      dispatch(loadMorePosts(newIndex));
    }
    else {
      console.log("daha azı yok");
    }
  }

  return (
    <div className='dashPost'>
      <button className='button-55' onClick={() => navigate("/admin-panel?tab=create-post")}>Add Post</button>
      <h1>-All Post-</h1>
      {status === "loading" && "loading..."}
      {status === "succeeded" &&
        posts.map((post) => (
          <div className='postCard' key={post._id}>
            {console.log(post)}
            <div>
              <img src={post.images[0]} alt="img" />
            </div>
            <div>
              {post.title}
            </div>
            <div className='postIcons'>
              <RxUpdate className='updateIcon'/>
              <FaTimes className='deleteIcon' />
            </div>
          </div>
        ))
      }
      <div hidden={status === "loading"} className='postbtn'>
        <button className='button-55' onClick={handleShowBack}>geri</button>
        <button className='button-55' onClick={handleShowForward}>ileri</button>
      </div>
      {status === "failed" && error}
      <div>

      </div>
    </div>
  )
}

export default DashPost
