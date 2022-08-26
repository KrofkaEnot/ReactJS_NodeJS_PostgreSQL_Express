import { observer } from "mobx-react-lite";
import React, { useContext } from "react"
import { Card, Row } from "react-bootstrap";
import { Context } from "..";
const BrandBar = observer(() => {
    const { device } = useContext(Context)
    /**
     * device.brands.map(brand => происходит перемещение по девайсам.
     * 
     * Назначается слушатель события onClick() для установки выделения
     * на карточку.
     */
    return (
        // <Row className="d-flex">
        //     {device.brands.map(brand =>
        //         <Card
        //             style={{ cursor: "pointer" }}
        //             key={brand.id}
        //             className="p-3 "
        //             onClick={() => device.setSelectedBrand(brand)}
        //             border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
        //         >
        //             {brand.name}
        //         </Card>
        //     )}
        // </Row >
        
        //  <Row className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3"></Row> 
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Card
                    style={{ cursor: "pointer", width: '18rem'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'black'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});
export default BrandBar;