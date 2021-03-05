import React from 'react'
import "./SignupPage.css"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignupPage() {
    const history = useHistory();
    const initialState = {username: "", password: ""};
    const [formData, setFormData] = useState(initialState);
    const signup = (e) => {
        const url = "http://localhost:9000/users/signup";
        e.preventDefault();
        axios.post(url, formData)
            .then(res => {
                if(res.data.message === "user created "){
                    history.push('/login');
                }
                console.log(res)
            })
            .catch(err => console.log(err));
        
    }
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div className="signupPage">
            <div className="signupPage__container">
                <h2>Sign Up</h2>
                <form class="signupPage__input">
                    <p>Username</p>
                    <TextField name="username" onChange={handleChange} id="standard-basic" />
                    <p>Password</p>
                    <TextField
                        id="standard-password-input"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        name="password"
                    /> 
                    <p>Phone number</p>
                    <TextField id="standard-basic" />
                    <p>Address</p>
                    <TextField id="standard-basic" />
                    <Button onClick={signup} type="submit" variant="contained" color="primary">
                        Sign up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
