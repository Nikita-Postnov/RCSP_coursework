import axios from "axios";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../css/adminProducts.css"
import {Button, Table} from "react-bootstrap";

const Orders =() => {
    let navigate = useNavigate();
    const [allOrders, setAllOrders] = useState([]);
    const [filterOrders, setFilterOrders] = useState([]);
    const [orderIdFilter, setOrderIdFilter] = useState(null);

    const getOrders = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/orders",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setAllOrders(response.data)
                setFilterOrders(response.data)
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteOrder = async (id) =>{
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.delete("http://localhost:8080/api/admin/orders/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                getOrders()
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    function findOrder(id){
        id = Number(id)
        if (id !== 0){
            setFilterOrders(allOrders.filter(order=>order.id === id))
        }
        else{
            setFilterOrders(allOrders)
        }
    }

    useEffect(()=>{
        getOrders();
    }, []);

    return(
        <div>
            <div className="container marg6 bborder">
                <div className="col-xs-12">
                    <h4 className="text-center ttext">Таблица заказов</h4>
                    <form className="marg4" onSubmit={findOrder}>
                        <div className="col-xs-12">
                            <label>
                                <input
                                    type="number"
                                    className="form-control marg4"
                                    value={orderIdFilter}
                                    placeholder="ID заказа"
                                    required
                                    onChange={e => {
                                        setOrderIdFilter(e.target.value)
                                        findOrder(e.target.value)
                                    }}
                                />
                            </label>
                        </div>
                    </form>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID пользователя</th>
                            <th>ID автомобиля</th>
                            <th>Автомобиль</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th colSpan="2">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filterOrders.map(order => (
                            <tr key={null}>
                                <td>{order.id}</td>
                                <td>{order.userId}</td>
                                <td>{order.product_id}</td>
                                <td>{order.carInfo}</td>
                                <td>{order.status}</td>
                                <td>{order.creation_date}</td>
                                <td>
                                    <Button className="btn btn-success" onClick={() => navigate("/admin/orders/"+order.id,{order})}>Подробнее</Button>
                                </td>
                                <td>
                                    <Button className="btn btn-danger" onClick={() =>deleteOrder(order.id)}>Удалить</Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Orders;