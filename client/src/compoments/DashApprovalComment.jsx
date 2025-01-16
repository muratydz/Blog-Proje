import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComment } from '../redux/slices/commentSlice';
import { FaCheckCircle, FaPlusSquare, FaTimes } from "react-icons/fa";

const DashApprovalComment = ({ situation }) => {
    const { comments } = useSelector((state) => state.comment)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllComment());
    }, [])

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
                {situation === "approval" ?
                    comments.approvalComment.map((comment) =>
                        <div className='comment'>
                            <h3>
                                {comment.comment}
                            </h3>
                            <p>
                                {formatDate(comment.createdAt)}
                            </p>
                            <div className='commentIcon'>
                                <FaCheckCircle className='check' />
                                <FaPlusSquare className='plus' />
                                <FaTimes className='deleteIcon' />
                            </div>
                        </div>
                    ) :
                    comments.unApprovalComment.map((comment) =>
                        <div className='comment'>
                            <h3>
                                {comment.comment}
                            </h3>
                            <p>
                                {formatDate(comment.createdAt)}
                            </p>
                            <div className='commentIcon'>
                                <FaCheckCircle className='check' />
                                <FaPlusSquare className='plus' />
                                <FaTimes className='deleteIcon' />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default DashApprovalComment
