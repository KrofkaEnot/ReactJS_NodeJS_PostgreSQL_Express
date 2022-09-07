/**
 * Страница выбранного товара
 */
import React from 'react';
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap';
/**
 * В стилях есть возможность указывать картинку или фон как ссылку :
 * style={{ background: `url( ${star} ) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
 * импортированную import star from '../assets/star.png';
 */
import star from '../assets/star.png';
const DevicePage = () => {
    const device = { id: 1, name: "iphone 12pro", price: 120000, rating: 4, img: 'https://img2.akspic.ru/previews/9/0/9/8/6/168909/168909-ballonchik-graffiti-ulichnoe_iskusstvo-svet-purpur-x750.jpg' }
    const description = [
        { id: 1, title: 'Оперативная память', description: '5 гб' },
        { id: 2, title: 'Камера', description: '22 МП' },
        { id: 3, title: 'Процессор', description: 'Kirin 830' },
        { id: 4, title: 'Количество ядер', description: '4' },
        { id: 5, title: 'АКБ', description: '4800 мЧ' }
    ]
    return (
        <Container>
            <Row className='p-3'>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex align-items-center justify-content-center'>
                        <h2 className='d-flex align-items-center justify-content-center'>
                            {device.name}
                        </h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{ background: `url( ${star} ) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3>{device.price} руб.</h3>
                        <Button variant='outline-dark'>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>

            <Row className='d-flex flex-column m-3'>
                {description.map((info, index) =>
                    <Row
                        key={info.id}
                        style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}
                    >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>

        </Container>
    );
};

export default DevicePage;