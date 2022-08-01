// Импорт моделей базы данных
const { Rating } = require('../models/models')

// Импортирование обработчика ошибок
const ApiError = require('../error/ApiError')

class RatingController {
    /* Получает запрос на создание через POST */
    async create(req, res) {
        /* ВВОДИМЫЕ ДАННЫЕ ДОЛЖНЫ БЫТЬ ОБЕЗВРЕЖЕНЫ
        ДОЛЖНА ПРОИСХОДИТЬ ПРОВЕРКА НА НАЛИЧИЕ deviceId
        НА ПОЛЬЗОВАТЕЛЯ В СИСТЕМЕ, НА НАЛИЧИЕ УЖЕ ПОСТАВЛЕННОГО РЕЙТИНГА, 
        ЕСЛИ РЕЙТИНГ ПОСТАВЛЕН ПОВТОРНОЕ ОБРАЩЕНИЕ УДАЛИТ ЕГО */
        const { rate, userId, deviceId } = req.body
        /* создание в БД записи */
        const rating = await Rating.create({ rate, userId, deviceId })
        return res.json(rating.toJSON())
        // return res.json({
        //     'Оценочка': rating.rate,
        //     'Пользователь': rating.userId,
        //     'Девайс': rating.deviceId
        // })
    }

    async getAll(req, res) {

        /* Запрос с предопределёнными паразметрами
        девайса или оценки */
        let { deviceId, rate, limit, page } = req.query
        limit = limit || 9 // Устанавливает дефолтное значение кол. экземпляров на страницу
        page = page || 1 // Дефолтное значение страницы
        let offset = page * limit - limit // Устанавливает отступ вывода экземпляров на страницу
        let ratings

        if (!deviceId && !rate) {
            ratings = await Rating.findAndCountAll({ limit, offset })
        }

        if (deviceId && !rate) {
            ratings = await Rating.findAndCountAll({ where: { deviceId }, limit, offset })
        }
        if (!deviceId && rate) {
            ratings = await Rating.findAndCountAll({ where: { rate }, limit, offset })
        }
        if (deviceId && rate) {
            ratings = await Rating.findAndCountAll({ where: { deviceId, rate }, limit, offset })
        }
        return res.json(ratings)
    }
}
// Создаётся новый объект контроллера
module.exports = new RatingController()