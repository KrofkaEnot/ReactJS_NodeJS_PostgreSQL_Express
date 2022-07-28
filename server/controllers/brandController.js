// Импорт моделей базы данных
const { Brand } = require('../models/models')
// Импортирование обработчика ошибок
const ApiError = require('../error/ApiError')

class BrandController {
    // Создание 
    async create(req, res) {
        // Получает запрос на создание через POST
        const { name } = req.body
        // создание в БД записи
        const brand = await Brand.create({ name })
        return res.json(brand)
    }
    // Получение всех
    async getAll(req, res) {
        const brands = await Brand.findAll() // функция запроса из БД
        return res.json(brands)
    }

}

// Создаётся новый объект контроллера
module.exports = new BrandController()