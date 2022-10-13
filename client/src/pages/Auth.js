import React, { useContext } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { useState } from "react";
import { observer } from "mobx-react-lite"
import { Context } from "..";
/** 
 * justify-content-center align-items-center - центрует горизонт и вертикаль
 * style={{height: window.innerHeight - 54}}
 * высота всего браузера минус высота nav бара - задаётся высота контейнера
 * Card - карточка обрамлённая рамкой
 * Form - форма заполнения
 * align-self-end - прижимает кнопку к правой стороне 
 * useLocation - хук с помощью которого возможно получить маршрут, передаётся в виде
 * объекта имеет поле pathName в котором содержить путь 
 * Оборачивается в observer(), здесь изменяется \ отслеживается состояние
*/
const Auth = observer(() => {
    /**
     * Локация в поле pathName
     */
    const location = useLocation();
    /**
     * LOGIN_ROUTE - для неавторизированных пользователей
     * const isLogin = location.pathname === LOGIN_ROUTE;
     * 
     * Если локация совпадает со вкладкой авторизации, выводит 
     *  {isLogin ? "Авторизация" : "Регистрация"}
     */
    const isLogin = location.pathname === LOGIN_ROUTE;
    /**Просмотр локации - console.log(location)
     * Путём ввода в инпут (поля) перезаписывается состояние 
     * переменных.
    */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user } = useContext(Context)
    const click = async () => {
        let data;
        /**Из этих запросов возвращается пользователь */
        if (isLogin) {
            data = await login(email, password);
        } else {
            data = await registration(email, password);
        }
        /**После того как прошёл запрос в контекст user устанавливаются
         * значения и статус изменяется на true
         */
        user.setUser(user)
        user.setIsAuth(true)
    }
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">
                    {isLogin ? "Авторизация" : "Регистрация"}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Если нет аккаунта.<NavLink to={REGISTRATION_ROUTE}> Зарегестрироваться! </NavLink>
                            </div>
                            :
                            <div>
                                Если аккаунт есть.<NavLink to={LOGIN_ROUTE}> Войти! </NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-dark"}
                            onClick={click}
                        >{isLogin ? 'Войти' : 'Зарегестрироваться'}</Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})
export default Auth;