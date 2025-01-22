import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { TbMailPlus,TbMailUp } from "react-icons/tb";
import { adminComment, deleteComment } from '../redux/slices/commentSlice';

const DashApproval = () => {
    const { approvalComment } = useSelector((state) => state.comment);
    const { postTitle } = useSelector((state) => state.post);
    const [showPlus, setShowPlus] = useState(null);
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const handleChance = (e) => {
        setText(e.target.value);
    }

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
        dispatch(adminComment({ commentId, adminComment: text }));
        console.log("yolladı");
    }

    const handlePlus = (comment) => {
        setShowPlus(comment._id);
        setText(comment.adminComment || "");
    }

    return (
        <div className='approvalComment'>
            <div>
                {approvalComment?.map((comment, index) =>
                    <div key={index} className='comment'>
                        <div className='commentHeader'>
                            <p>{formatDate(comment.createdAt)}</p>
                            {postTitle?.find((post) => post._id === comment.postId)?.title}
                        </div>
                        <div className='commentBody'>
                            <p>{comment.comment}</p>
                        </div>
                        <div className='commentIcon'>
                            {comment.adminComment ?<TbMailUp className='plus' onClick={() => handlePlus(comment)} />:<TbMailPlus className='plus' onClick={() => handlePlus(comment)} />}
                            <FaTimes className='deleteIcon' onClick={() => handleDelete(comment._id)} />
                        </div>
                        <div className='adminComment' hidden={showPlus !== comment._id}>
                            <textarea id='adminComment' value={text} type="text" onChange={handleChance} />
                            <button onClick={() => handleAdminCommet(comment._id)}>send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashApproval;