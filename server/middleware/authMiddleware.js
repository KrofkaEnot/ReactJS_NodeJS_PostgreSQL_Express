/*
Middleware - промежуточное ПО для обработки
*/
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
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
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) { // В случае возникновения других ошибок
        res.status(401).json({ message: 'Не авторизован Err' })
    }
}