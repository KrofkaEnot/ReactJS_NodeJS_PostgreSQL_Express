/**
 * Страница выбранного товара
 */
import React from 'react';
import { Container, Col, Image, Row, Card, Button } from 'react-bootstrap';
import star from '../assets/star.png';
const DevicePage = () => {
    // const { device } = useContext(Context)
    const device = { id: 1, name: "iphone 12pro", price: 120000, rating: 4, img: 'https://img2.akspic.ru/previews/9/0/9/8/6/168909/168909-ballonchik-graffiti-ulichnoe_iskusstvo-svet-purpur-x750.jpg' }
    
    return (
        <Container>
            <Row className='p-3'>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
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
                        <h3>От: {device.price} руб.</h3>
                        <Button variant='outline-dark'>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DevicePage;