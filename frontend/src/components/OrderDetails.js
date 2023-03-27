import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import "../css/carDetails.css"
import {Button, Table} from "react-bootstrap";
import Select from "react-select";

const OrderDetails = () =>{
    const data = [
        { value: "Резерв", label: "Резерв"},
        { value: "Оплачено", label: "Оплачено"}
    ]

    let navigate = useNavigate();
    const {id} = useParams();
    const [order, setOrder] = useState([]);
    const [newStatus, setNewStatus] = useState("");

    const getOrder = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/orders/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setOrder(response.data)
            })
        } catch (err) {
            console.error(err.message)
        }
    };

    const updateOrder = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.put("http://localhost:8080/api/admin/orders/" + id,
                {
                    "userId": order.userId,
                    "product_id": order.product_id,
                    "carInfo": order.carInfo,
                    "status": newStatus,
                    "creation_date": order.creation_date
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((response) => {
                navigate("/admin/orders")
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    return(
        <div className="section">
            <div className="row">
                <div className="container">
                    <div className="col-xs-12 marg4">
                        <h4 className="under1">Данные заказа</h4>
                        <Table className="marg4">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID пользователя</th>
                                <th>ID автомобиля</th>
                                <th>Автомобиль</th>
                                <th>Изменение статуса</th>
                                <th>Дата создания</th>
                                <th>Действие</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.userId}</td>
                                <td>{order.product_id}</td>
                                <td>{order.carInfo}</td>
                                <td>
                                    <Select
                                        placeholder = "Статус"
                                        value = {data.find(obj => obj.value === newStatus)}
                                        options = {data}
                                        required
                                        onChange = {e=>
                                            setNewStatus(e.value)
                                        }
                                    />
                                </td>
                                <td>{order.creation_date}</td>
                                <td>
                                    <Button className="btn btn-success" onClick={updateOrder}>Применить</Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;