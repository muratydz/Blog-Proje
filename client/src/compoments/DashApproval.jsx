import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from "react-icons/fa";
import { TbMailPlus, TbMailUp } from "react-icons/tb";
import { adminComment, deleteComment, getApprovalComment } from '../redux/slices/commentSlice';

const DashApproval = () => {
    const { approvalComment, status, countComment } = useSelector((state) => state.comment);
    const { postTitle } = useSelector((state) => state.post);
    const [showPlus, setShowPlus] = useState(null);
    const [text, setText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    const totalPages = Math.ceil(countComment.countApprovalComment / 9);
    console.log(countComment.countApprovalComment)
    console.log(totalPages)

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
        const startIndex = (currentPage-1)*9
        dispatch(adminComment({ commentId, adminComment: text }));
        dispatch(getApprovalComment(startIndex))
    }

    const handlePlus = (comment) => {
        setShowPlus(comment._id);
        setText(comment.adminComment || "");
    }

    const handlePageChange = (page) => {
        const startIndex = page*9;
        setCurrentPage(page+1)
        dispatch(getApprovalComment(startIndex));
    }

    return (
        <div className='approvalComment'>
            <div>
            <h1>-Verify Comment-</h1>
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
                            {comment.adminComment ? <TbMailUp className='plus' onClick={() => handlePlus(comment)} /> : <TbMailPlus className='plus' onClick={() => handlePlus(comment)} />}
                            <FaTimes className='deleteIcon' onClick={() => handleDelete(comment._id)} />
                        </div>
                        <div className='adminComment' hidden={showPlus !== comment._id}>
                            <textarea id='adminComment' value={text} type="text" onChange={handleChance} />
                            <button onClick={() => handleAdminCommet(comment._id)}>update</button>
                        </div>
                    </div>
                )}
                <div hidden={status === "loading" || status === "failed"} className='commentbtn'>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`button-55 ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashApproval;