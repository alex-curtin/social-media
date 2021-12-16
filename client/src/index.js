import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import UserContextProvider from './context/user.context';
import PostContextProvider from './context/post.context';
import AuthContextProvider from './context/auth.context';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <AuthContextProvider>
          <UserContextProvider>
            <PostContextProvider>
              <App />
            </PostContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
