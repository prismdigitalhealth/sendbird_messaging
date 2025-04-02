import './App.css';
import { useEffect, useState } from 'react';
import { App as SendbirdApp } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';

function App() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    if (userId.trim() !== '') {
      setIsLoggedIn(true);
    } else {
      alert('Please enter a user ID');
    }
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-container">
          <h1>Sendbird Chat App</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={handleUserIdChange}
              className="user-input"
            />
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      ) : (
        <div className="chat-container">
          <div className="logout-bar">
            <span>Logged in as: <strong>{userId}</strong></span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
          <SendbirdApp
            appId="BFB0CED3-D43A-4C53-9C75-76549E1FFD78"
            userId={userId}
            nickname={userId}
          />
        </div>
      )}
    </div>
  );
}

export default App;
