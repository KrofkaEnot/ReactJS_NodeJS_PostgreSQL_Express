import axios from 'axios';

const $host = axios.create({
    /**Запросы не требующие авторизации */
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    /**Авторизированные запросы
     * необходимо каждый раз автоматически подставлять 
     * токен авторизации к каждому запросу для этого 
     * ниже представлена функция authInterceptor (интерцептор)
    */
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    /**Интерцептор - функция принимающая конфиг 
     * в конфиге в поле headers добавляется 
     * токен авторизации который запрашивается из 
     * локального хранилища по ключу token.
     * Добавляется токен в хранилище при авторизации.
    */
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
/**
 * $authHost - добавляется интерцептор для запроса
 * (возможно добавление интерцепторса для отверта)
 * Происходит отработка перед каждым запросом и 
 * подставляется токен в заголовок headers.authorization 
 */
$authHost.interceptors.request.use(authInterceptor)
export { $host, $authHost }