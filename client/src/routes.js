/**
 * Импорт страницы
 */
import Admin from './pages/Admin';
/**
 * Путь к константам путей
 * В React v6 произошли изменения относительно 
 * путей и использовании звёздочки в конце пути
 * Звездочка означает, что данный роут будет 
 * матчиться с урлами вида /students/что-либо
 */
import { ADMIN_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, BASKET_ROUTE, NOT_FOUND } from './utils/consts';
/**
 * Импорт экспортов каждой страницы
 */
import Basket from './pages/Basket';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import DevicePage from './pages/DevicePage';
import NotFound from './pages/NotFound';
/**
 * Для аутентифицированных запросов
 * Аутентификация которых происходит 
 * В AppRoute.js
 */
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Element: Admin
    },
    {
        path: BASKET_ROUTE,
        Element: Basket
    },
]

/**
 * Для неаутентифицированных запросов
 */
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Element: Shop
    },
    {
        path: LOGIN_ROUTE,
        Element: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Element: DevicePage
    },
    {
        path: NOT_FOUND,
        Element: NotFound
    },
]