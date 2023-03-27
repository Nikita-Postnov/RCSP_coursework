import React, { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button} from 'react-bootstrap';
import '../css/registration.css';
const Registration = () => {
    let navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");
    const onSubmitLogin = async e => {
        e.preventDefault();
        try {
            const body = {
                password: password,
                username: username
            };
            await axios.post("http://localhost:8080/api/auth/registration", body);
            navigate("/login");
        } catch (err) {
            console.error(err.message);
        }
    };

    const errorPass = () =>{
        return(
            alert("Пароли не совпадают")
        )
    }

    return (
        <div className="section">
            <div className="container">
                <div className="row text-center">
                    <div className="login col-xs-12">
                        <h3 className="text-center under">Регистрация</h3>
                        <form className="marg1" onSubmit={onSubmitLogin}>
                            <div className="col-xs-6 col-xs-offset-3">
                                <input
                                    type="email"
                                    className="form-control marg1"
                                    value={username}
                                    placeholder="Введите вашу почту"
                                    required
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <input
                                    type="password"
                                    className="form-control marg1"
                                    value={password}
                                    placeholder="Введите ваш пароль"
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <input
                                    type="password"
                                    className="form-control marg1"
                                    value={passwordConfirm}
                                    placeholder="Введите ваш пароль повторно"
                                    required
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                />
                            </div>
                            {password === passwordConfirm &&
                                <div className="col-xs-6 col-xs-offset-3">
                                    <Button className="btn btn-success marg1" type="submit">Зарегистрироваться</Button>
                                </div>
                            }
                            {password !== passwordConfirm &&
                            <div className="col-xs-6 col-xs-offset-3">
                                <Button className="btn btn-success marg1" onClick={errorPass}>Зарегистрироваться</Button>
                            </div>
                            }
                        </form>
                        <div className="col-xs-6 col-xs-offset-3">
                            <div className="marg1">
                                <Link to="/login">Авторизоваться</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
