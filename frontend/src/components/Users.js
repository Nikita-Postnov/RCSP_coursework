import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../css/adminProducts.css"
import {Button, Table} from "react-bootstrap";

const Users = () =>{
    let navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [userUsernameFilter, setUserUsernameFilter] = useState("");
    const [userIdFilter, setUserIdFilter] = useState("");

    const getUsers = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/users",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setAllUsers(response.data)
                setFilterUsers(response.data)
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteUser = async (id) =>{
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.delete("http://localhost:8080/api/admin/users/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                getUsers()
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    function findUser(id, username){
        id = Number(id)

        if (username !== "" && id !== 0){
            setFilterUsers(allUsers.filter(user=>user.id === id && user.username === username))
        }
        if (username ==="" && id !== 0){
            setFilterUsers(allUsers.filter(user=>user.id === id))
        }
        if (username !== "" && id === 0){
            setFilterUsers(allUsers.filter(user=>user.username === username))
        }
        if (username === "" && id === 0){
            setFilterUsers(allUsers)
        }
    }

    useEffect(()=>{
        getUsers();
    }, []);

    return(
        <div>
            <div className="container marg6 bborder">
                <div className="col-xs-12">
                    <h4 className="text-center ttext">Таблица пользователей</h4>
                    <form className="marg4" onSubmit={findUser}>
                        <div className="col-xs-12">
                            <label>
                                <input
                                    type="number"
                                    className="form-control marg4"
                                    value={userIdFilter}
                                    placeholder="ID пользователя"
                                    required
                                    onChange={e => {
                                        setUserIdFilter(e.target.value)
                                        findUser(e.target.value, userUsernameFilter)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg4"
                                    value={userUsernameFilter}
                                    placeholder="Логин пользователя"
                                    required
                                    onChange={e => {
                                        setUserUsernameFilter(e.target.value)
                                        findUser(userIdFilter, e.target.value)
                                    }}
                                />
                            </label>
                        </div>
                    </form>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID пользователя</th>
                            <th>Логин пользователя</th>
                            <th>Роли</th>
                            <th colSpan="2">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filterUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.roles.map(role => role.name).join(' ')}</td>
                                <td>
                                    <Button className="btn btn-success" onClick={() => navigate("/admin/users/"+user.id,{user})}>Подробнее</Button>
                                </td>
                                <td>
                                    <Button className="btn btn-danger" onClick={() =>deleteUser(user.id)}>Удалить</Button>
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

export default Users;