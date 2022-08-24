import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import ListGroup from 'react-bootstrap/ListGroup';

/**
 * Оборачивается в observer() для возможности 
 * mobx отслеживать состояние 
 * const {device} = useContext(Context) - производится деструктуризация
 * с помощью хука useContext передаётся контекст содержимое которого 
 * находится в store/DeviceStore
 * 
 * onClick={() => device.setSelectedType()} - слушатель событий нажатия
 * для работы с store/DeviceStore вызывается setSelectType() и передаётся
 * тип - type 
 * Для визуального отличия элемента прокидывается пропс active
 * Условие при коотором id элемента типа итерации совпадает с типом сохраненного
 * элемента в store тогда он будет активным.
 * style={{ cursor: "pointer" }} - меняет вид курсора
 */
const TypeBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{ cursor: "pointer" }}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}>
                    {type.name}
                </ListGroup.Item>)}
        </ListGroup>
    );
});
export default TypeBar;