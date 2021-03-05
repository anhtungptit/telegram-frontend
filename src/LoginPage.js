import React from 'react'
import "./LoginPage.css"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';


function LoginPage({setName, setToken}) {
    let history = useHistory();
    const initialFormData = {username: "", password: ""};
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    

    const signin = (e) => {
        e.preventDefault();
        const url = "http://localhost:9000/users/login";
        axios.post(url, formData)
            .then(res => {
                console.log(res.data);
                if(res.data.message === "Auth successful"){
                    history.push('/chat');
                    localStorage.setItem('user', res.data.username);
                }
            })
            .catch(err => console.log(err));
        setName(formData.username);
    }


    const signup = (e) => {
        e.preventDefault();
        history.push('/signup');
    }
    return (
        <div className="loginPage">
            <div className="loginPage__container">
                <h2>LOGIN NOW</h2>
                <form class="loginPage__input">
                    <p>Username</p>
                    <TextField name='username' id="standard-basic" onChange={handleChange}/>
                    <p>Password</p>
                    <TextField
                        id="standard-password-input"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    /> 
                    <Button onClick={signin} type="submit" variant="contained" color="primary">
                        Sign in
                    </Button>
                    <Button onClick={signup} type="button" variant="contained" color="primary">
                        Sign up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage