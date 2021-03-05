import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ChatPage from "./ChatPage";
import { useEffect, useState } from 'react';


function App() {
  
  const [name, setName] = useState();
  const [token, setToken] = useState('');
  return (
    <div className="app">
      <Router>

          <Switch>
            <Route path="/login">
              <LoginPage setToken={setToken} setName={setName}/>
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/chat">
              <ChatPage token={token} name={name} />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
