import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../redux/slices/userSlice';
import "../css/signin.css";
import { useNavigate } from 'react-router-dom';

const DashUpdateUser = ({ userId }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { loading, error: errorMesage } = useSelector((state) => state.user);
    const users = useSelector((state) => state.user.users);
    const user = users.find(user => user._id === userId)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(formData);
    console.log(user);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
            })
        }
        console.log("object")
    }, [user])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.id === "password" ? e.target.value : e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(updateUser({ userId, formData }));
        if(updateUser.fulfilled.match(res)){
            navigate("/admin-panel?tab=user-management");
        }else{
            console.log(res.error.message);
        }
    }

    return (
        <div className='center'>
            <div className="card container signin">
                <span className="card__title">update user</span>
                <p className="card__content">
                </p>
                <form onSubmit={handleSubmit} className="card__form">
                    <input id='username' placeholder="username" onChange={handleChange} value={formData.username} />
                    <input id='email' type="email" placeholder="email" onChange={handleChange} value={formData.email} />
                    <input id='password' type="password" placeholder="password" onChange={handleChange} />
                    <button disabled={loading} className={`card__button ${loading ? "loading" : ""}`}>{loading ? "Loading..." : "Update"}</button>
                    <p>{errorMesage && errorMesage}</p>
                </form>
            </div>
        </div>

    )
}

export default DashUpdateUser
