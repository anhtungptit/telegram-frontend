import React from 'react'
import './ChatPage.css';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import PhoneIcon from '@material-ui/icons/Phone';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Pusher from 'pusher-js';

function ChatPage({name}) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [user, setUser] = useState("") 

    useEffect(() => {
        axios.get("http://localhost:9000/messages/all")
        .then(res => setMessages(res.data.messages))
        .then(console.log("get successfull"));
    }, [])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if(loggedInUser){
            console.log(loggedInUser);
            const foundUser = loggedInUser;
            setUser(foundUser);
        }
    }, [])

    useEffect(() => {
        const pusher = new Pusher('2e548fcf78769a2084ed', {
          cluster: 'ap1'
        });
    
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
          setMessages([...messages, data]);
        });
        return () => {
            channel.unbind();
            pusher.unsubscribe();
        }
    }, [messages])

    console.log(user);

    const submitHandler = async(e) => {
        e.preventDefault()
        await axios.post(`http://localhost:9000/messages/send/${user}`, {message: input});
        setInput('');
    }
        
    return (
        <div className="chatPage">
            <div className="chatPage__left">
                <div className="chatPage__leftHeader">
                    <DehazeIcon />
                    <input type="text" placeholder="Search"/>
                </div>
                <div className="chatPage__leftBody">
                    <div className="chatPage__row">
                        <Avatar src="https://www.tuhocielts.vn/wp-content/uploads/2020/08/badmantent.jpg" />
                        <div className="chatPage__rowRight">
                            <h3>Badminton group</h3>
                            <p>Click here to see more .....</p>
                        </div>
                    </div>
                    <div className="chatPage__row">
                        <Avatar src="https://miro.medium.com/max/3960/0*HICLyAdNSIyT0ODU.jpg" />
                        <div className="chatPage__rowRight">
                            <h3>IT group</h3>
                            <p>Click here to see more .....</p>
                        </div>
                    </div>
                    <div className="chatPage__row">
                        <Avatar src="https://global-uploads.webflow.com/5e2b8863ba7fff8df8949888/5eb5f3a9fb1f1eb56eaf6c6c_10_BEST_DANCE_MOVES-04.png" />
                        <div className="chatPage__rowRight">
                            <h3>Dance group</h3>
                            <p>Click here to see more .....</p>
                        </div>
                    </div>
                    <div className="chatPage__row">
                        <Avatar src="https://i.ytimg.com/vi/7ePnD-CH7wY/maxresdefault.jpg"/>
                        <div className="chatPage__rowRight">
                            <h3>Boxing group</h3>
                            <p>Click here to see more .....</p>
                        </div>
                    </div>
                    <div className="chatPage__row">
                        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpyZ5dxeCnWX1lU7ICam9njWlZYdbpPEbzqg&usqp=CAU"/>
                        <div className="chatPage__rowRight">
                            <h3>Football group</h3>
                            <p>Click here to see more .....</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chatPage__right">
                <div className="chatPage__rightHeader">
                    <div className="chatPage__description">
                        <h3>Telegram</h3>
                        <p>service notifications</p>
                    </div>
                    <div className="chatPage__extend">
                        <SearchIcon />
                        <PhoneIcon />
                        <ChromeReaderModeIcon />
                        <MoreVertIcon />
                    </div>
                </div>

                <div className="chatPage__rightBody">
                    <div className="chatPage__bodyUpper">
                        {messages.map(x => (
                            <div key={x._id} className="chatPage__message">
                                <Avatar />
                                <div className="chatPage__messageDetails">
                                    <h3>{x.username}</h3>
                                    <p>{x.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="chatPage__footer">
                        <form>
                            <AttachFileIcon />
                            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write a message" type="text"></input>
                            <button onClick={submitHandler} type="submit"/>
                            <InsertEmoticonIcon />
                            <SendIcon />
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ChatPage
