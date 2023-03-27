import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from 'react-bootstrap';
import '../css/login.css';
import axios from "axios";
const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitLogin = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/login", {
                email: email,
                password: password
            }).then(response => {
                if (response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
            })
        } catch (err) {
            console.error(err.message);
        }
        navigate("/profile")
        window.location.reload()
    };
    return (
        <div className="section">
            <div className="container">
                <div className="row text-center">
                    <div className="login col-xs-12">
                        <div className="text-center under marg1">Вход в систему</div>
                        <form className="marg" onSubmit={onSubmitLogin}>
                            <div className="col-xs-6 col-xs-offset-3">
                                <input
                                    type="email"
                                    className="form-control marg"
                                    value={email}
                                    placeholder="Почта"
                                    required
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <input
                                    type="password"
                                    className="form-control marg"
                                    value={password}
                                    placeholder="Пароль"
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-xs-6 col-xs-offset-3">
                                <Button className="btn btn-success marg" type="submit">Войти</Button>
                            </div>
                        </form>
                        <div className="col-xs-6 col-xs-offset-3">
                            <div className="marg">
                                <Link to="/registration">Зарегистрироваться</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
