import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';
export const Context = createContext(null);

/**
 * console.log("ENV=> ", process.env.REACT_APP_API_URL)
 * позволяет получать константы из окружения 
 */
 

const root = ReactDOM.createRoot(document.getElementById('root'));
/**
    С помощью контекст провайдера прокидывается контекст приложения
    глобальные переменные.
 */


root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
  }}>
    <App />
  </Context.Provider>
);

