const Router = require('express');
const router = new Router();
// Подключение контроллера
const brandController = require('../controllers/brandController')
// Подключение middleware для проверки ролей пользователя
const checkRole = require('../middleware/checkRoleMiddleware')
/* 
    Подключение метода обработки запроса POST на создание
    Подключение и вызов checkRole('ADMIN') с передачей роли
*/
router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
module.exports = router;