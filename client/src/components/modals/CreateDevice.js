
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dropdown, Form, Row, Col } from 'react-bootstrap';
import React, { useContext, useState } from "react";
import { Context } from "../..";
/**
 * Модальное окно создания бренда
 *  В модальное окно прокидываются следующие переменные:
 * show - хранит статус видимости окна 
 * onHide - скрыть или показать окно
 * <Dropdown> - выпадающее меню
 * <Dropdown.Toggle> - кнопка выпадающего меню 
 * <Dropdown.Menu> - само меню
 * <Form.Control/> - поля ввода для пользователя
 */
const CreateDevice = ({ show, onHide }) => {
    const { device } = useContext(Context)
    const [info, setinfo] = useState([]) /**Массив характеристик для каждого устроиства */
    const addInfo = () => {
        /**Функция добавления нового своиства 
         * Собирает из полей ввода { info.map (i => <Form.Control/> )}
        */
        setinfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        /**Функция удаления своиства
         * Фильтрует и устанавливает значения аналогично addInfo() но исключает 
         * выбранное значение по ключу number
        */
        setinfo(info.filter(i => i.number !== number))
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый девайс!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>Выбрать тип</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle>Выбрать брэнд</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устроиства'
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите стоимость устроиства'
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                    />
                    <Button
                        className='mt-3'
                        variant='outline-dark'
                        onClick={addInfo}>Добавление нового свойства</Button>

                    {info.map(i => <Row className='mt-3' key={i.number}>
                        <Col md={4}><Form.Control placeholder='Ввод названия свойства' /></Col>
                        <Col md={4}><Form.Control placeholder='Ввод описания свойства' /></Col>
                        <Col md={4}><Button
                            variant='outline-danger'
                            onClick={() => removeInfo(i.number)}
                        >Удалить характеристику</Button></Col>
                    </Row>)}
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateDevice;