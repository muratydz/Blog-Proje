import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUnapprovalComment } from '../redux/slices/commentSlice';
import {  FaTimes ,FaCheck} from "react-icons/fa";
import { TbMailPlus } from "react-icons/tb";
import { getPostTitle } from '../redux/slices/postSlice';


const DashUnapproval = () => {
    const { unapprovalComment } = useSelector((state) => state.comment);
    const { postTitle } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    console.log(unapprovalComment);
    console.log(postTitle);
    useEffect(() => {
        dispatch(getUnapprovalComment());
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
                {unapprovalComment?.map((comment) =>
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
                            <FaCheck className='check' />
                            <FaTimes className='deleteIcon' />
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
};


export default DashUnapproval
