
/* 
 Cтатический метод в классе используется для 
 вызова без создания new объекта класса и 
 позволяет обращаться к нему напрямую.
 Класс ошибки ApiError наследуется от класса Error
 через super()
*/
class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}
module.exports = ApiError