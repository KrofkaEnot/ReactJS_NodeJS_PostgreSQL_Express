import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DeviceStore from './store/DeviceStore';
// import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
/**
    С помощью контекст провайдера прокидывается контекст приложения
    глобальные переменные 
 */
root.render(
  // <React.StrictMode>
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
  }}>
    <App />
  </Context.Provider>
  //  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
