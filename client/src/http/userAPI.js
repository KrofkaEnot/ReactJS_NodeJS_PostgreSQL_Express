/**Проверка регистрации, авторизации 
 * и проверка токена на валидность функцией check 
 * Используется в client/src/pages/Auth.js функция click*/
import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";


/** Регистрация пользователя */
export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' })
    return jwt_decode(data)
}
/** Авторизация пользователя */
export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    return jwt_decode(data.token)
}
/** Проверка пользоватля */
export const check = async () => {
    const response = await $host.post('api/auth/registration',)
    return response
}