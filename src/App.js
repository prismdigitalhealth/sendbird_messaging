import './App.css';
import { useEffect, useState, useCallback } from 'react';
import { App as SendbirdApp } from '@sendbird/uikit-react';
import { TypingIndicatorType } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';

// Function to detect mobile devices using user agent
const detectMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
};

function App() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    return window.innerWidth <= 768 || detectMobileDevice();
  });

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
  
  // Add resize listener to update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768 || detectMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            // The breakpoint is the key property for mobile optimization
            // When it's true or matches screen width, mobile UI is activated
            breakpoint={isMobile}
            // Enable typing indicators in both channel and channel list
            uikitOptions={{
              groupChannel: {
                // Enable typing indicator in the group channel
                enableTypingIndicator: true,
                // Show both bubble and text typing indicators
                typingIndicatorTypes: new Set([TypingIndicatorType.Bubble, TypingIndicatorType.Text]),
              },
              groupChannelList: {
                // Enable typing indicator in the channel list
                enableTypingIndicator: true,
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
