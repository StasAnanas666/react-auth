const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

//дополнительные компоненты для express-приложения
app.use(bodyParser.json());//удобный парсер json
app.use(cors());//обход кросдоменных блокировок

//создание бд в папке сервера
const db = new sqlite3.Database("./exampleDB.db");

//создание таблиц ролей и пользователей, запись в таблицу ролей админа и юзера
db.serialize(() => {
    db.run("create table if not exists roles(id integer primary key autoincrement, role text)");

    db.run("create table if not exists users(id integer primary key autoincrement, username text, password text, roleid integer, foreign key(roleid) references roles(id))");

    db.run("insert into roles(role) values('admin'), ('user')");
})


//регистрация пользователя
app.post("/register", async(req, res) => {
    const {username, password, role} = req.body;//получаем данные пользователя из тела запроса
    const hashedPassword = await bcrypt.hash(password, 10);//хэшируем пароль

    //записываем пользователя в бд, передавая в запрос данные из формы + хэшированный пароль
    db.run(
        "insert into users(username, password, roleid) values(?,?,?)", [username, hashedPassword, role], (err) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            res.status(201).json({id: this.lastID});//возвращаем id нового юзера в случае успешного выполнения запроса
        }
    )
})


//логин пользователя
app.post("/login", (req, res) => {
    const {username, password} = req.body;

    //извлекаем из бд информацию о пользователе по имени, переданному запросом
    db.get(
        "select users.id, users.password, roles.role from users join roles on users.roleid=roles.id where username=?", [username], async(err, user) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            if(!user) {
                return res.status(400).json({error: "Пользователь не найден"});
            }
            //сравнение хэшей пароля из запроса и из бд
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) {
                return res.status(400).json({error: "Неверный пароль"});
            }
            //генерируем jwt-токен пользователя сроком жизни 1 час с секретным кодом "secret", отправляем пользователю
            const token = jwt.sign({id: user.id, role: user.role}, "secret", {
                expiresIn: "1h",
            });
            res.json({token});
        }
    )
})

//получение доступа на защищенную страницу
app.get("/protected", (req, res) => {
    //получаем токен из заголовка запроса под ключом "authorization"
    const token = req.headers["authorization"];
    if(!token) {
        return res.status(400).json({error: "Токен не обнаружен"});
    }
    //верификация токена секретным ключом
    jwt.verify(token, "secret", (err, decoded) => {
        if(err) {
            return res.status(400).json({error: "Невалидный токен"});
        }
        res.json({message: "Вы зашли на защищенную страницу", user: decoded});
    })
})

//запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен по адресу http://localhost:${port}`);
})