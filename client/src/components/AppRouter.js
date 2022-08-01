import React from "react";
/**
 * После исправления react-router-dom перестали использовать
 * Switch заменив на Routes
 */
import { Routes ,Route } from 'react-router-dom';
/**
 * Импортирование аутентифицированных и неаутентифицированных
 * роутингов
 */
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = () => {
    /**
     * Флаг для проверки авторизации пользователя
     */
    const isAuth = false;
    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            </Routes>
    );
};
export default AppRouter;