import React from "react";
/**
 * После исправления react-router-dom перестали использовать
 * Switch заменив на Routes
 * Component изменён на Element
 * Русскоязычная информация 
 * https://habr.com/ru/company/kts/blog/598835/
 * Англоязычная информация 
 * https://www.moreonfew.com/attempted-import-error-switch-is-not-exported-from-react-router-dom/
 */
import { Routes, Route } from 'react-router-dom';
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
        /**
         * Component изменён на Element
         */
        <Routes>
            {isAuth && authRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} exact />
            )}

            {publicRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} exact />
            )}
        </Routes>
    );
};
export default AppRouter;