const Router = require('express');
const router = new Router();

// Подключение контроллера
const ratingController = require('../controllers/ratingController')

// Подключение middleware для проверки ролей пользователя
// const checkRole = require('../middleware/checkRoleMiddleware')

/* 
    Подключение метода обработки запроса POST на создание
    Подключение и вызов checkRole('ADMIN') с передачей роли
*/
// router.post('/', checkRole('ADMIN'), ratingController.create);
router.post('/', ratingController.create);

/* Метод обработки запроса get на получение */
router.get('/', ratingController.getAll);

// Для доступности роутеров из вне //
module.exports = router; 