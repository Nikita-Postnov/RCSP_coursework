import {NavLink, useNavigate, useParams} from "react-router-dom";
import '../css/header.css';
import {Nav} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

const Header = () => {
    let navigate = useNavigate();
    let [isAdmin, setIsAdmin] = useState(false);

    const getUser = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/user/profile",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setIsAdmin(response.data.user.roles.map(role => (role.name)).includes('ROLE_ADMIN'))
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const logoutFunc = () => {
        try {
            localStorage.removeItem("user")
            axios.get("http://localhost:8080/logout")
            navigate("/")
            window.location.reload()
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return(
        <div className="section">
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-12">
                        <Nav.Link as={NavLink} className="navLink styleLogo" to="/" id="plate">Автосалон Credo</Nav.Link>
                    </div>
                </div>
            </div>
            <div className="container cont2">
                <div className="row text-center">
                    <div className="col-xs-3 colXs3border">
                        <Nav.Link as={NavLink} className="navLink word" to="/" style={({ isActive }) =>
                            isActive
                                ? {
                                    textDecoration: 'underline'
                                }
                                : { fontSize: 25,
                                    color: 'orangered' }}>Главная страница</Nav.Link>
                    </div>
                    <div className="col-xs-3 colXs3border">
                        <Nav.Link as={NavLink} className="navLink word" to="/products" style={({ isActive }) =>
                            isActive
                                ? {
                                    textDecoration: 'underline'
                                }
                                : { fontSize: 25,
                                    color: 'orangered' }}>Каталог</Nav.Link>
                    </div>
                    {localStorage.getItem("user") !== null &&
                    <div className="col-xs-3 colXs3border">
                        <Nav.Link as={NavLink} className="navLink word" to="/profile" style={({ isActive }) =>
                            isActive
                                ? {
                                    textDecoration: 'underline'
                                }
                                : { fontSize: 25,
                                    color: 'orangered' }}>Личный кабинет</Nav.Link>
                    </div>
                    }
                    {localStorage.getItem("user") === null &&
                    <div className="col-xs-3 colXs3border">
                        <Nav.Link as={NavLink} className="navLink word" to="/login" style={({ isActive }) =>
                            isActive
                                ? {
                                    textDecoration: 'underline'
                                }
                                : { fontSize: 25,
                                    color: 'orangered' }}>Войти</Nav.Link>
                    </div>
                    }
                    {localStorage.getItem("user") === null &&
                    <div className="col-xs-3">
                        <Nav.Link as={NavLink} className="navLink word" to="/registration" style={({ isActive }) =>
                            isActive
                                ? {
                                    textDecoration: 'underline'
                                }
                                : { fontSize: 25,
                                    color: 'orangered' }}>Регистрация</Nav.Link>
                    </div>
                    }
                    {localStorage.getItem("user") !== null &&
                    <div className="col-xs-3">
                        <Nav.Link as={NavLink} className="navLink word" to="/logout" onClick={logoutFunc} style={({ isActive }) =>
                            isActive
                                ? {
                                    textDecoration: 'underline'
                                }
                                : { fontSize: 25,
                                    color: 'orangered' }}>Выйти</Nav.Link>
                    </div>
                    }
                </div>
            </div>
            {isAdmin === true &&
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-6 col-xs-offset-3 cont3">
                        <Nav.Link as={NavLink} className="navLink word" to="/admin" style={({isActive}) =>
                            isActive
                                ? {
                                    textDecoration: 'underline'
                                }
                                : {
                                    fontSize: 25,
                                    color: 'orangered'
                                }}>Окно администратора</Nav.Link>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
export default Header;
