/* Модуль роутинга пользователей */
const Router = require('express');
const router = new Router();
/* Импортирование контроллеров для роутера */
const userController = require('../controllers/userController')
/*
Импортирование middleware для функции check - проверки валидности токена 
(промежуточное ПО)
*/
const authMiddleware = require('../middleware/authMiddleware')

/* 
    Через импортированный контроллер 
    путь для регистрации пользователя 
*/
router.post('/registration', userController.registration);
/*
 Путь для авторизации пользователя 
*/
router.post('/login', userController.login);
/*
 Проверка статуса авторизации пользователя 
 функция check - вызывается через путь /auth
 Добавление authMiddleware (промежуточное ПО) middleware/authMiddleware.js
 для извлечения токена из заголовка req.headers.authorization
*/
router.get('/auth', authMiddleware, userController.check)

// router.get('/auth', (req, res) => {
//     res.json({ message: 'РАБОТАЕТ' })
// });

/* Для доступности роутеров из вне */
module.exports = router;