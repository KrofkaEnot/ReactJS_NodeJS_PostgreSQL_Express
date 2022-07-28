// Импорт моделей базы данных
const { User, Basket } = require('../models/models') // Использование моделей пользователя и корзины 

// Подключение обработчика ошибок
const ApiError = require('../error/ApiError')

const bcrypt = require('bcrypt') // используется для хеширования паролей
const jwt = require('jsonwebtoken')// Импортирование расширения для создания jwt токена
const generateJWT = (id, email, role) => {
    /*
      Создание jwt токена где функция generateJWT возвращает значение из
      сгенерированного токена, который разделён на три части точками.
      В центральную его часть payload - помещается необходимая информация 
      и не шифруется так как пароль зашифровывается ДО.
      Проверка валидности токена осуществляется с помощью SECRET_KEY
    */
    return jwt.sign(
        { id, email, role }, // payload - центральная часть jwt токена
        process.env.SECRET_KEY, // Секретный ключ для валидации токена
        { expiresIn: '24h' } // Время жизни токена
    )
}

class UserController {

    // Регистрация пользователя
    async registration(req, res, next) {
        const { email, password, role } = req.body // Получение полей из тела запроса
        // return res.json({ email, password, role })
        /*
        Простейшая проверка на наличие значений в переменных
        В случае отсутсвия ввода генерируется ошибка
        */
        if (!email || !password) { return next(ApiError.badRequest('Некорректный email или password')) }
        /*
        Запрос на наличие введённого email в базе данных 
        В случае существования аналогичного почтового ящака генерируется ошибка
        */
        const candidate = await User.findOne({ where: { email } })
        if (candidate) { return next(ApiError.badRequest('Пользователь с таким email уже существует ')) }
        const hashPassword = await bcrypt.hash(password, 10) // Асинхронная функция хеширования пароля
        /*
        В случае прохождения всех проверок создаётся асинхронная функция создающая по модели 
        пользовательской таблицы запись в базе данных.
        Вторым запросом создаётся корзина пользователя привязанная к пользователю по userId
        */
        const user = await User.create({ email, password: hashPassword, role })
        const basket = await Basket.create({ userId: user.id })

        const token = generateJWT(user.id, user.email, user.role) // Генерация готового jwt - token
        return res.json(token)
    }


    // Авторизация
    async login(req, res, next) {
        const { email, password } = req.body
        /*
        После пользовательского ввода происходит запрос в БД
        на поиск учётной записи с таким же email
        */
        const user = await User.findOne({ where: { email } })
        /*
        Проверка на существование записей
        */
        if (!user) {
            return next(ApiError.internal('Пользователь с таким почтовым ящиком отсуствует'))
        }
        /*
        После успешной проверки на существование записи создаётся хэш пароля от пользовательского
        ввода.
        */
        let comparePassword = bcrypt.compareSync(password, user.password) // value true or false
        if (!comparePassword) {
            return next(ApiError.internal('Пароль неверный'))
        }
        /*
        При успешном сравнении хэшей генерируется jwt - токен с НЕконфеденциальными данными
        пользователя и записывается либо в локальное хранилище бразера
        либо ставится в куки браузера
        */
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({ token })
    }


    /* 
        Проверка зарегестрирован ли пользователь, функция выполняется за счёт промежуточного ПО
        middleware/authMiddleware.js которое проверяет введённый токен
        http://localhost:5000/api/user/auth в Headers 
        поле-ключ Authorization поле-значение Bearer token.token.token
        Таким способом токен будет обновляться, срок его действия так-же будет обновлён.
    */
    async check(req, res, next) {
        // res.json({ message: "YES" })
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        res.json({ token })
    }



}



// Создаётся новый объект контроллера
module.exports = new UserController()