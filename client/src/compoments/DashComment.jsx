import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllComment } from '../redux/slices/commentSlice';

const DashComment = () => {
    const { comments } = useSelector((state) => state.comment)
    const dispatch = useDispatch();
    console.log(comments)

    useEffect(() => {
        dispatch(getAllComment());
    }, [])

    return (
        <div className='dashComment'>
            <h1>-Comment-</h1>
            <div className='commentArea'>
                <Link className='verified commentBox'>
                    <div>
                        {comments.countApprovalComment}
                    </div>
                    verified comments
                </Link>
                <Link className='unverified commentBox'>
                    <div>
                        {comments.countunApprovalComment}
                    </div>
                    unverified comments
                </Link>

            </div>
        </div>
    )
}

export default DashComment
