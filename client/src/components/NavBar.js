/**
 * Слушатель события на кнопке
 * <Button variant={"outline-light"} className="ms-3" onClick={() => user.setIsAuth(false)}>Выйти</Button>
 * onClick={() => navigate(LOGIN_ROUTE)} - отправляет к странице pages/Admin.js
 */
import React, { useContext } from "react";
import { Context } from "..";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap"
import { observer } from "mobx-react-lite"
const NavBar = observer(() => {
    /**
     * Глобальный контекст (глобальные переменные)
     * Местоположение store/UserStore.js
     */
    const { user } = useContext(Context)
    /**
     * Для использования пагинации\Навигации
     */
    const navigate = useNavigate()

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>Магазинчик</Navbar.Brand>
                {/* <NavLink to={SHOP_ROUTE}>Name Site</NavLink> */}

                {user.isAuth ?
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} className="ms-3" onClick={() => navigate(ADMIN_ROUTE)}>Управление</Button>
                        <Button variant={"outline-light"} className="ms-3" onClick={() => navigate(LOGIN_ROUTE)}>Выйти</Button>
                    </Nav>
                    : <Nav className="ml-auto">
                        <Button variant={"outline-light"} className="ms-3" onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar >
    )
});
export default NavBar;