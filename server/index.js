require('dotenv').config();

// Подключение обработчика ошибок
const errorHandler = require('./middleware/ErrorHandlingMiddlewarw.js')

// Подключение расширения для работы с путями системы
const path = require('path')


const express = require('express');
const app = express();

// Регистрация расширения для загрузки файлов
const fileUpload = require('express-fileupload')
// Запуск расширения через функцию 
// {} - для дополнительных параметров
app.use(fileUpload({}))

const PORT = process.env.PORT || 5000;

// Импортирование настроек для подключения к БД //
const sequelize = require('./db');

// подключение моделей
const models = require('./models/models');

// Пакет для предоставления промежуточного // 
// программного обеспечения Connect - Express //
const cors = require('cors');
app.use(cors()) // Добавление в приложение 

// Импортирование основного роутера //
const router = require('./routes/index')

// Добавление приложению возможность создавать json строки //
app.use(express.json())

/* 
    Указывает приложению путь до
    статической папки (папка со статическим содержанием).
    path.resolve() - преобразует последовательность 
    путей или сегментов пути в абсолютный путь.
    Более подробная информация:
    https://nodejs.org/api/path.html#pathresolvepaths 
*/
app.use(express.static(path.resolve(__dirname, 'static')))


app.use('/api', router)

// Сообщение при переходе в корневой каталог //
// app.get('/', (req, res) => { res.status(200).json({ message: 'РАБОТАЕТ!' }) })

//Обработка ошибок - middleware идёт самым последним
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер слушает ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start(); 
