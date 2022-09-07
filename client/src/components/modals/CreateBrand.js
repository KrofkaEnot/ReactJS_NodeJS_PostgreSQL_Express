import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
/**
 * Модальное окно создания бренда
 *  В модальное окно прокидываются следующие переменные:
 * show - хранит статус видимости окна 
 * onHide - скрыть или показать окно
 */
const CreateBrand = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый брэнд!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={'Ввести название брэнда'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;