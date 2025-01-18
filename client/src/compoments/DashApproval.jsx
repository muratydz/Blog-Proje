import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getApprovalComment } from '../redux/slices/commentSlice';
import {  FaTimes } from "react-icons/fa";
import { TbMailPlus } from "react-icons/tb";
import { getPostTitle } from '../redux/slices/postSlice';


const DashApproval = () => {
    const { approvalComment } = useSelector((state) => state.comment);
    const { postTitle } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    console.log(approvalComment);
    console.log(postTitle);
    useEffect(() => {
        dispatch(getApprovalComment());
        dispatch(getPostTitle());
    }, []);

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
                            <TbMailPlus className='plus' />
                            <FaTimes className='deleteIcon' />
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
};


export default DashApproval
