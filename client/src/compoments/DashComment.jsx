import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getApprovalComment, getCountComments, getUnapprovalComment } from '../redux/slices/commentSlice';
import { getPostTitle } from '../redux/slices/postSlice';

const DashComment = () => {
    const { countComment } = useSelector((state) => state.comment)
    const dispatch = useDispatch();
    console.log(countComment)

    useEffect(() => {
        dispatch(getCountComments());
    }, [])

    const handleApproval = () => {
        dispatch(getApprovalComment());
        dispatch(getPostTitle());
    }

    const handleUnapproval = () => {
        dispatch(getUnapprovalComment());
        dispatch(getPostTitle());
    }
  
    return (
        <div className='dashComment'>
            <h1>-Comment-</h1>
            <div className='commentArea'>
                <Link 
                to={"?tab=approval-comment"}
                onClick={handleApproval}
                className='verified commentBox'>
                    <div>
                        {countComment.countApprovalComment}
                    </div>
                    verified comments
                </Link>
                <Link 
                to={"?tab=unapproval-comment"}
                onClick={handleUnapproval}
                className='unverified commentBox'>
                    <div>
                        {countComment.countUnapprovalComment}
                    </div>
                    unverified comments
                </Link>

            </div>
        </div>
    )
}

export default DashComment
