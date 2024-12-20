import React, { useState, useEffect } from 'react';
import {useSelector , useDispatch} from "react-redux";
import "../css/signin.css";
import { resetError, signInFailure, signInStart, signInSuccess } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [formData, setFormData] = useState({});
    const {loading, error: errorMesage} = useSelector((state) => state.user)
    const dispacth = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispacth(resetError());
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.email || !formData.password){
            return dispacth(signInFailure("Please fill all the fields"));
        }
        try {
            dispacth(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if(data.success === false) {
                return dispacth(signInFailure(data.message));
            }

            if(res.ok) {
                dispacth(signInSuccess(data));
                navigate("/admin-panel?tab=all-post");
            }

        } catch (error) {
            dispacth(signInFailure(error.message));
        }
    }

    return (
        <div className='center'>
            <div className="card container signin">
                <span className="card__title">signin</span>
                <p className="card__content">
                    This section is for authorized users only. Log in with a registered admin account. Unauthorized attempts will be logged.
                </p>
                <form onSubmit={handleSubmit} className="card__form">
                    <input id='email' required type="email" placeholder="email" onChange={handleChange} />
                    <input id='password' required type="password" placeholder="password" onChange={handleChange}/>
                    <button disabled={loading} className={`card__button ${loading ? "loading" : ""}`}>{loading ? "Loading...": "Sing in"}</button>
                    <p>{errorMesage && errorMesage}</p>
                </form>  
            </div>
        </div>

    )
}

export default SignIn
