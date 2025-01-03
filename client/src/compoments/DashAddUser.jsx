import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "../css/signin.css";
import { addUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const DashAddUser = () => {
    const [formData, setFormData] = useState({});
    const { loading, error: errorMesage } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(addUser(formData));
        if (addUser.fulfilled.match(res)) {
            navigate("/admin-panel?tab=user-management");
        } else {
            console.log(res.error.message);
        }
    }

    return (
        <div className='center'>
            <div className="card container signin">
                <span className="card__title">Add User</span>
                <form onSubmit={handleSubmit} className="card__form">
                    <input id='username' required placeholder="username" onChange={handleChange} />
                    <input id='email' required type="email" placeholder="email" onChange={handleChange} />
                    <input id='password' required type="password" placeholder="password" onChange={handleChange} />
                    <button disabled={loading} className={`card__button ${loading ? "loading" : ""}`}>{loading ? "Loading..." : "Add User"}</button>
                    <p>{errorMesage && errorMesage}</p>
                </form>
            </div>
        </div>

    )
}

export default DashAddUser
