/**
 * Список девайсов
 */
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "..";
import DeviceItem from "./DeviceItem";
/**
 * {device.devices.map(device =>
 *        <DeviceItem key={device.id} device={device} />
 *  )} 
 * происходит перебор девайсов, передаётся ключ и сам девайс.
 */
const DeviceList = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row className="d-flex">
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device} />
            )}
        </Row>
    );
});
export default DeviceList;