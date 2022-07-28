/* 
    Middleware - промежуточное ПО
    Возвращает исключение в виде создавшейся ошибки
*/
const ApiError = require('../error/ApiError');

/* 
    middleware - функция, принимает несколько 
    параметров, кроме стандартных
    ошибку и функцию next() - вызвав которую 
    передаётся управление следующему в 
    цепочке middleware
 */
module.exports = function (err, req, res, next) {
    /* 
        Происходит проверка условия при котором 
        если существует ошибка то в статус код клиенту
        в формате json передаётся код ошибки 
    */
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }
    /* 
        В случае если ошибка отсутсвует в ApiError 
        обрабатывается исключительно
    */
    return res.status(500).json({ message: "Ошибка отсутствует в ApiError" })

}