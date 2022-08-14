import React, { useContext } from "react";
import { Context } from "..";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap"
import { observer } from "mobx-react-lite"
const NavBar = observer(() => {
    /**
     * Глобальный контекст (глобальные переменные)
     * Местоположение store/UserStore.js
     */
    const { user } = useContext(Context)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href={SHOP_ROUTE}>Navbar</Navbar.Brand>
                {/* <NavLink to={SHOP_ROUTE}>Name Site</NavLink> */}

                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} className="ms-3" onClick={() => user.setIsAuth(false)} >Управление</Button>
                        <Button variant={"outline-light"} className="ms-3" onClick={() => user.setIsAuth(false)}>Выйти</Button>
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