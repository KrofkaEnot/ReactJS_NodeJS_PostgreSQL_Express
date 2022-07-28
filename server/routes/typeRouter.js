const Router = require('express');
const router = new Router();
// Подключение контроллера
const typeController = require('../controllers/typeController')
// Подключение middleware для проверки ролей пользователя
const checkRole = require('../middleware/checkRoleMiddleware')
/* 
    Подключение метода обработки запроса POST на создание
    Подключение и вызов checkRole('ADMIN') с передачей роли
*/
router.post('/', checkRole('ADMIN'), typeController.create);
// Метод обработки запроса get на получение
router.get('/', typeController.getAll);
// Для доступности роутеров из вне //
module.exports = router; 