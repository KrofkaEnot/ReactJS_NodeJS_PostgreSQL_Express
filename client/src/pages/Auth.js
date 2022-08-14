import React from "react";
import { Card, Container, Form } from "react-bootstrap";
/** 
 * justify-content-center align-items-center - центрует горизонт и вертикаль
 * style={{height: window.innerHeight - 54}}
 * высота всего браузера минус высота nav бара - задаётся высота контейнера
 * Card - карточка обрамлённая рамкой
 * Form - форма заполнения
*/
const Auth = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-2" placeholder="Введите email" />
                    <Form.Control className="mt-2" placeholder="Пароль" />
                </Form>
            </Card>
        </Container>
    )
}
export default Auth;