import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { TbMailPlus } from "react-icons/tb";
import { adminComment, deleteComment } from '../redux/slices/commentSlice';



const DashApproval = () => {
    const { approvalComment } = useSelector((state) => state.comment);
    const { postTitle } = useSelector((state) => state.post);
    const [showPlus, setShowPlus] = useState(null);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    console.log(text);
    console.log(approvalComment);
    console.log(postTitle);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = (commentId) => {
        dispatch(deleteComment(commentId));
    }

    const handleAdminCommet = (commentId) => {
        dispatch(adminComment({commentId, text}))
    }

    return (
        <div className='approvalComment'>
            <div>
                {approvalComment?.map((comment) =>
                    <div key={comment._id} className='comment'>
                        <div className='commentHeader'>
                            <p>{formatDate(comment.createdAt)}</p>
                            {postTitle?.find((post) => post._id === comment.postId)?.title}
                        </div>
                        <div className='commentBody'>
                            <p>{comment.comment}</p>
                        </div>
                        <div className='commentIcon'>
                            <TbMailPlus className='plus' onClick={() => setShowPlus(comment._id)} />
                            <FaTimes className='deleteIcon' onClick={() => handleDelete(comment._id)} />
                        </div>
                        <div className='adminComment' hidden={showPlus !== comment._id}>
                            <textarea type="text" onChange={(e) => setText(e.target.value)} />
                            <button onClick={() => handleAdminCommet(comment._id)}>send</button>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
};


export default DashApproval
