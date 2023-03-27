import React, {useEffect, useState} from "react";
import "../css/profile.css";
import axios from "axios";
import {Table} from "react-bootstrap";

const Profile = () => {
    const [id, setId] = useState("");
    const [userName, setUsername] = useState("");
    const [roles, setRoles] = useState([]);
    const [orders, setOrders] = useState([]);

    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/profile",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setId(response.data.user.id)
                setUsername(response.data.user.username)
                setRoles(response.data.user.roles.map(role => (role.name)))
                setOrders(response.data.orders.map(order => [order.carInfo, order.status]))
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return(
        <div className="section">
            <div className="row">
                <div className="container">
                    <div className="col-xs-6 marg2">
                        <h4 className="under1">Данные аккаунта</h4>
                        <Table className="marg2">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Логин</th>
                                <th>Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>{id}</td>
                            <td>{userName}</td>
                            <td>{roles.join(' ')}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-xs-6 marg2">
                        <h4 className="under1">Ваши активные заказы</h4>
                        <Table className="marg2">
                            <thead>
                            <tr>
                                <th>Автомобиль</th>
                                <th>Статус заказа</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={null}>
                                <td>{order[0]}</td>
                                <td>{order[1]}</td>
                                </tr>
                                )
                            )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;