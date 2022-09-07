
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
/**
 * <CreateType show={true} /> - такое значение передаст булевую переменную
 *  и зделает окно добавления типа отображаемым.
 */
const Admin = () => {
    /**
     * <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
     * Константы которые будут управлять видимостью модальных окон
     * Передаются как пропсы show
     * onHide - функция устанавливающая состояние видимости окна
     * onClick={() => setTypeVisible(true) - слушатель события, меняет булевое значение
     *      отображает или прячет окно
     */
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    return (
        <Container className='d-flex flex-column'>
            <Button
                variant={'outline-dark'}
                className='mt-2'
                onClick={() => setTypeVisible(true)}>Добавить тип</Button>
            <Button
                variant={'outline-dark'}
                className='mt-2'
                onClick={() => setBrandVisible(true)}>Добавить бренд</Button>
            <Button
                variant={'outline-dark'}
                className='mt-2'
                onClick={() => setDeviceVisible(true)}>Добавить устроиство</Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;

