import React, {useEffect, useState} from "react";
import axios from "axios";
import "../css/carDetails.css"
import {useNavigate, useParams} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

const UserDetails = () =>{
    let navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [roles, setRoles] = useState([]);
    let [roleUser, setRoleUser] = useState(false);
    let [roleAdmin, setRoleAdmin] = useState(false);

    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/users/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setUser(response.data)
            })
        } catch (err) {
            console.error(err.message)
        }
    };

    function isUser(e) {
        roleUser = !!e.target.checked;
    }

    function isAdmin(e) {
        roleAdmin = !!e.target.checked;
    }

    const updateUser = async () => {
        if (roleUser && roleAdmin){
            roles.push({"name": "ROLE_USER"})
            roles.push({"name": "ROLE_ADMIN"})
        }
        else if (roleUser){
            roles.push({"name": "ROLE_USER"})
        }
        else if (roleAdmin){
            roles.push({"name": "ROLE_ADMIN"})
        }

        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.put("http://localhost:8080/api/admin/users/" + id,
                {
                    roles
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((response) => {
                navigate("/admin/users")
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
                    <div className="col-xs-12 marg4">
                        <h4 className="under1">Данные пользователя</h4>
                        <Table className="marg4">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Логин</th>
                                <th>Изменение ролей</th>
                                <th>Действие</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>
                                    <label>
                                        <input
                                            type="checkbox"
                                            required
                                            onChange={isUser.bind(this)}
                                        />
                                        ROLE_USER
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            required
                                            onChange={isAdmin.bind(this)}
                                        />
                                        ROLE_ADMIN
                                    </label>
                                </td>
                                <td>
                                    <Button className="btn btn-success" onClick={updateUser}>Применить</Button>
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

export default UserDetails;