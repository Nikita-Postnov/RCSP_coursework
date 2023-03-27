import "../css/carDetails.css"
import {
    Button,
    Table
} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';
import axios from "axios";

const CarDetails = () => {
    let navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const getProduct = async () => {
        try {
            await axios.get("http://localhost:8080/api/products/"+id).then((response) => {
                setProduct(response.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const bookProduct = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.post("http://localhost:8080/api/user/products/" + id,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((response) => {
                navigate("/profile")
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const nullUser = () =>{
        return(
            alert("Для того, чтобы совершить эту операцию, вам необходимо войти в Ваш аккаунт")
        )
    }

    return(
        <div className="container marg4">
            <div className="row text-center">
                <div className="col-xs-4">
                    <Table className="marg4">
                        <thead>
                        <tr>
                            <th>Характеристика</th>
                            <th>Описание</th>
                        </tr>
                        </thead>
                        <tbody>

                        {product.category === "NEW" &&
                        <>
                            <tr>
                                <th scope="col">Бренд</th>
                                <td>{product.brand}</td>
                            </tr>
                            <tr>
                                <th scope="col">Модель</th>
                                <td>{product.model}</td>
                            </tr>
                            <tr>
                                <th scope="col">Год выпуска</th>
                                <td>{product.release_year}</td>
                            </tr>
                            <tr>
                                <th scope="col">Кузов</th>
                                <td>{product.body}</td>
                            </tr>
                            <tr>
                                <th scope="col">Цвет</th>
                                <td>{product.color}</td>
                            </tr>
                            <tr>
                                <th scope="col">Двигатель</th>
                                <td>{product.engine}</td>
                            </tr>
                            <tr>
                                <th scope="col">Коробка</th>
                                <td>{product.drive}</td>
                            </tr>
                            <tr>
                                <th scope="col">Руль</th>
                                <td>{product.wheel}</td>
                            </tr>
                            <tr>
                                <th scope="col">Цена</th>
                                <td>{product.price}₽</td>
                            </tr>
                        </>
                        }
                        {product.category === "SUP" &&
                        <>
                            <tr>
                                <th scope="col">Бренд</th>
                                <td>{product.brand}</td>
                            </tr>
                            <tr>
                                <th scope="col">Бренд</th>
                                <td>{product.brand}</td>
                            </tr>
                            <tr>
                                <th scope="col">Модель</th>
                                <td>{product.model}</td>
                            </tr>
                            <tr>
                                <th scope="col">Пробег</th>
                                <td>{product.mileage}км</td>
                            </tr>
                            <tr>
                                <th scope="col">Год выпуска</th>
                                <td>{product.release_year}</td>
                            </tr>
                            <tr>
                                <th scope="col">Кузов</th>
                                <td>{product.body}</td>
                            </tr>
                            <tr>
                                <th scope="col">Цвет</th>
                                <td>{product.color}</td>
                            </tr>
                            <tr>
                                <th scope="col">Двигатель</th>
                                <td>{product.engine}</td>
                            </tr>
                            <tr>
                                <th scope="col">Коробка</th>
                                <td>{product.drive}</td>
                            </tr>
                            <tr>
                                <th scope="col">Руль</th>
                                <td>{product.wheel}</td>
                            </tr>
                            <tr>
                                <th scope="col">Количество владельцев</th>
                                <td>{product.number_of_owners}</td>
                            </tr>
                            <tr>
                                <th scope="col">Цена</th>
                                <td>{product.price}₽</td>
                            </tr>
                        </>
                        }
                        </tbody>
                    </Table>
                    {localStorage.getItem("user") !== null &&
                    <Button className="btn btn-success" onClick={bookProduct}>Забронировать</Button>
                    }
                    {localStorage.getItem("user") === null &&
                    <Button className="btn btn-success" onClick={nullUser}>Забронировать</Button>
                    }
                </div>
                <div className="col-xs-8">
                    <img className="imgSt1" src={product.picture}/>
                </div>
            </div>
        </div>
    )
}

export default CarDetails;