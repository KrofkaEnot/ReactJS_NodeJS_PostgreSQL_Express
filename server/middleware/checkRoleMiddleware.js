/*
Middleware - промежуточное ПО для обработки
ролей пользователя
*/
const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        /* Если медод OPTIONS он пропускается */
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            /*  В заголовке запроса приходит строка типа:
                authorization:Bearer header.payload.signature
                Которая делится методом split(' ')[1] и берётся второе значение по индексу  
            */
            const token = req.headers.authorization.split(' ')[1] // Bearer - предъявитель 
            if (!token) {// В случае отсутствия токена 
                return res.status(401).json({ message: 'Не авторизован' })
            }
            /*
                Верификация токена с помощью секретного ключа
            */
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            /*
                Происходит проверка роли пользователя
            */
            if (decoded.role !== role) { // если принятая в функцию роль не совпадает  
                return res.status(403).json({ message: "Нет доступа" })
            }
            req.user = decoded
            next()
        } catch (e) { // В случае возникновения других ошибок
            res.status(401).json({ message: 'Не авторизован ErrRole' })
        }
    }
}