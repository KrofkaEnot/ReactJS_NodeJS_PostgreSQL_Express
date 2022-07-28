const Router = require('express');
const router = new Router();

// Подключение контроллера
const deviceController = require('../controllers/deviceController')
// Подключение middleware для проверки ролей пользователя
const checkRole = require('../middleware/checkRoleMiddleware')
/* 
    Подключение метода обработки запроса POST на создание
    Подключение и вызов checkRole('ADMIN') с передачей роли
*/
router.post('/', checkRole('ADMIN'), deviceController.create);

router.get('/', deviceController.getAll);

// получение девайся по id
router.get('/:id', deviceController.getOne);

// Доступность роутов извне //
module.exports = router;