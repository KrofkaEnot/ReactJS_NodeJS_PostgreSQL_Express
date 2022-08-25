/**
 * Девайсы
 */
import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png';

import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
/**
 * md={3} указывает на три столбца, в строке должно помещаться
 * четыре устройства.
 * DeviceItem - принимает {device} сам девайс
 */

const DeviceItem = ({ device }) => {
    /**
     * Для использования пагинации
     */
    const navigate = useNavigate()
    /**
     * onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)
     * слушатель для события нажатия
     * передаёт константу пути, device - айди девайса через хук
     * 
     * Card - карточка продукта со стилями
     */
    return (
        <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{ width: 150, cursor: 'pointer' }} border={'black'}>

                <Image width={150} height={150} src={device.img} />

                <div className='d-flex justify-content-between align-items-center'>

                    <div>Samsung...</div>

                    <div className='mt-1 d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star} width={15} height={15} />
                    </div>

                </div>

                <div>{device.name}</div>

            </Card>
        </Col>
    );
};

export default DeviceItem;