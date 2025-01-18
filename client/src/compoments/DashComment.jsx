import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCountComments } from '../redux/slices/commentSlice';

const DashComment = () => {
    const { countComment } = useSelector((state) => state.comment)
    const dispatch = useDispatch();
    console.log(countComment)

    useEffect(() => {
        dispatch(getCountComments());
    }, [])

    return (
        <div className='dashComment'>
            <h1>-Comment-</h1>
            <div className='commentArea'>
                <Link 
                to={"?tab=approval-comment"}
                className='verified commentBox'>
                    <div>
                        {countComment.countApprovalComment}
                    </div>
                    verified comments
                </Link>
                <Link 
                to={"?tab=unapproval-comment"}
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
