// Импорт моделей базы данных
const { Type } = require('../models/models')
// Импортирование обработчика ошибок
const ApiError = require('../error/ApiError')

class TypeController {
    // Создание типа
    async create(req, res) {
        // Получает запрос на создание через POST
        const { name } = req.body
        // создание в БД записи
        const type = await Type.create({ name })
        return res.json(type)
    }
    // Получение всех
    async getAll(req, res) {
        const types = await Type.findAll() // функция запроса из БД
        // return types
        return res.json(types)
    }

}

// Создаётся новый объект контроллера
module.exports = new TypeController()