/* 
    Импорт моделей базы данных
    DeviceInfo - используется в модели Device в поле info
        так как имеется связь поля с таблицей
*/
const { Device, DeviceInfo } = require('../models/models')

// Импортирование обработчика ошибок
const ApiError = require('../error/ApiError')

// Подключение расширения для генерации случайных имён
const uuid = require('uuid')

// Расширение позволяющее работать с путями в системе
const path = require('path')



class DeviceController {
    // Создание 
    async create(req, res, next) {

        try { // В случае возникновния ошибок обработки используется ApiError

            /* 
            Получает запрос на создание через POST
            req.body содержит в теле запроса что-либо. Обычно это используется 
            на PUT и POST запросах.
            Например a POST к sample.com с телом {"foo":"bar"} и заголовком 
            типа application/json, req.body содержал бы {foo: "bar"}
            Поле info реализовывается отдельно
            */
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files //загруженный файл
            let fileName = uuid.v4() + ".jpg" // генерация и присваивание случайного имени 
            /*
            img - загруженый файл перемещается (mv)
            path.resolve()преобразует последовательность 
            путей или сегментов пути в абсолютный путь.
            .. - поднимает на дирректорию выше исключая
            Более подробная информация:
            https://nodejs.org/api/path.html#pathresolvepaths
            */
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            /* 
            Создание в БД записи
            Перечислением полей для заполнения
            img: fileName - указывается принудительно
            */
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })

            /*
            Создаётся условие при котором происходит проверка поля info на наличие данных
            так как данные приходят в виде строки есть необходимость производить парсинг info = JSON.parse(info)
            Далее по распарсенному массиву #info необходимо пройтись циклом, где в модели #DeviceInfo создать 
            соответствующие поля #title #description #deviceId
            */
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    }))
            }
            // return res.json(device)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    // Получение всех
    async getAll(req, res) {
        // const devices = await Device.findAll() // функция запроса из БД
        /* 
            Получает поля с числовыми значениями идентификатора бренда 
            и идентификатора типа.
            limit - содержит количество экземпляров на одной странице
            page - содержит номер страницы
        */
        let { brandId, typeId, limit, page } = req.query // examlpe/url?brandId=4&typeId=2
        limit = limit || 9 // Устанавливает дефолтное значение кол. экземпляров на страницу
        page = page || 1 // Дефолтное значение страницы
        let offset = page * limit - limit // Устанавливает отступ вывода экземпляров на страницу
        let devices; // Содержит запрос из БД
        /*
            В зависимости от поступившего запроса ищет в БД 
            по идентификатору.
            limit - содержит количество экземпляров на одной странице
            page - содержит номер страницы
            findAndCountAll - функция для пагинации, подсчитывает общее колличество элементов в БД
                            не считает выведенные элементы удовлетворяющие фильтру поиска
        */
        if (!brandId && !typeId) { devices = await Device.findAndCountAll({ limit, offset }) }
        if (!brandId && typeId) { devices = await Device.findAndCountAll({ where: { typeId }, limit, offset }) }
        if (brandId && !typeId) { devices = await Device.findAndCountAll({ where: { brandId }, limit, offset }) }
        if (brandId && typeId) { devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset }) }
        return res.json(devices)
    }
    // Получение одного экземпляра
    async getOne(req, res) {
        const { id } = req.params // Принимает параметр url/id в адресной строке после слэша
        const device = await Device.findOne(
            {
                where: { id }, // Осуществядяет поиспо по параметру id 
                /*
                 Показывает связанное поле модели Device с моделью
                 DeviceInfo модель содержит заполненную информацию 
                */
                include: [{ model: DeviceInfo, as: 'info' }]
            },
        )
        return res.json(device)
    }
}

// Создаётся новый объект контроллера
module.exports = new DeviceController()