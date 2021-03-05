import React from 'react'
import './HomePage.css'
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom"


function HomePage() {
    let history = useHistory();
    const buttonHandler = (e) => {
        history.push('/login');
    }
    return (
        <div className="homePage">
            <div className="homePage__header">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1DX7frf8-ndEBE5AFSaLMt3eZfL-fagD4Lg&usqp=CAUf4-893b-357bc964d945/telegram.png" alt="z" />
                
            </div>
            <div className="homePage__body">
                <h2>Telegram Desktop</h2>
                <p>Welcome to the official Telegram Desktop app.</p>
                <p>It's fast and secure</p>
                <Button onClick={buttonHandler} variant="contained" color="primary">
                    START MESSAGING
                </Button>
            </div>
        </div>
    )
}

export default HomePage
