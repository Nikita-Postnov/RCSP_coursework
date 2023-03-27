import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import "../css/productsDetails.css"

const ProductDetails = () => {
    const {id} = useParams();
    let navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [newBrand, setNewBrand] = useState("");
    const [newModel, setNewModel] = useState("");
    const [newRelease_Year, setNewRelease_year] = useState(null);
    const [newBody, setNewBody] = useState("");
    const [newColor, setNewColor] = useState("");
    const [newEngine, setNewEngine] = useState("");
    const [newDrive, setNewDrive] = useState("");
    const [newWheel, setNewWheel] = useState("");
    const [newPrice, setNewPrice] = useState(null);
    const [newPicture, setNewPicture] = useState("");

    const [newNumber_of_owners, setNewNumber_of_owners] = useState(null);
    const [newMileage, setNewMileage] = useState(null);

    const getProduct = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/products/"+id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setProduct(response.data)
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const updateProduct = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.put("http://localhost:8080/api/admin/products/" + id,
                {
                    "brand": newBrand,
                    "category": product.category,
                    "model": newModel,
                    "engine": newEngine,
                    "drive": newDrive,
                    "body": newBody,
                    "wheel": newWheel,
                    "color": newColor,
                    "mileage": newMileage,
                    "number_of_owners": newNumber_of_owners,
                    "release_year": newRelease_Year,
                    "price": newPrice,
                    "picture": newPicture
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((response) => {
                navigate("/admin/products")
            })
        } catch (err) {
            console.error(err.message);
        }
    };

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
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newBrand}
                                            placeholder={product.brand}
                                            required
                                            onChange={e => {
                                                setNewBrand(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Модель</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newModel}
                                            placeholder={product.model}
                                            required
                                            onChange={e => {
                                                setNewModel(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Год выпуска</th>
                                <td>
                                    <label>
                                        <input
                                            type="number"
                                            value={newRelease_Year}
                                            placeholder={product.release_year}
                                            required
                                            onChange={e => {
                                                setNewRelease_year(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Кузов</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newBody}
                                            placeholder={product.body}
                                            required
                                            onChange={e => {
                                                setNewBody(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Цвет</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newColor}
                                            placeholder={product.color}
                                            required
                                            onChange={e => {
                                                setNewColor(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Двигатель</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newEngine}
                                            placeholder={product.engine}
                                            required
                                            onChange={e => {
                                                setNewEngine(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Коробка</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newDrive}
                                            placeholder={product.drive}
                                            required
                                            onChange={e => {
                                                setNewDrive(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Руль</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newWheel}
                                            placeholder={product.wheel}
                                            required
                                            onChange={e => {
                                                setNewWheel(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Цена</th>
                                <td>
                                    <label>
                                        <input
                                            type="number"
                                            value={newPrice}
                                            placeholder={product.price}
                                            required
                                            onChange={e => {
                                                setNewPrice(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Картинка</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newPicture}
                                            placeholder={product.picture}
                                            required
                                            onChange={e => {
                                                setNewPicture(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                        </>
                        }
                        {product.category === "SUP" &&
                        <>
                            <tr>
                                <th scope="col">Бренд</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newBrand}
                                            placeholder={product.brand}
                                            required
                                            onChange={e => {
                                                setNewBrand(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Модель</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newModel}
                                            placeholder={product.model}
                                            required
                                            onChange={e => {
                                                setNewModel(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Пробег</th>
                                <td>
                                    <label>
                                        <input
                                            type="number"
                                            value={newMileage}
                                            placeholder={product.mileage}
                                            required
                                            onChange={e => {
                                                setNewMileage(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Год выпуска</th>
                                <td>
                                    <label>
                                        <input
                                            type="number"
                                            value={newRelease_Year}
                                            placeholder={product.release_year}
                                            required
                                            onChange={e => {
                                                setNewRelease_year(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Кузов</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newBody}
                                            placeholder={product.body}
                                            required
                                            onChange={e => {
                                                setNewBody(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Цвет</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newColor}
                                            placeholder={product.color}
                                            required
                                            onChange={e => {
                                                setNewColor(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Двигатель</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newEngine}
                                            placeholder={product.engine}
                                            required
                                            onChange={e => {
                                                setNewEngine(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Коробка</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newDrive}
                                            placeholder={product.drive}
                                            required
                                            onChange={e => {
                                                setNewDrive(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Руль</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newWheel}
                                            placeholder={product.wheel}
                                            required
                                            onChange={e => {
                                                setNewWheel(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Количество владельцев</th>
                                <td>
                                    <label>
                                        <input
                                            type="number"
                                            value={newNumber_of_owners}
                                            placeholder={product.number_of_owners}
                                            required
                                            onChange={e => {
                                                setNewNumber_of_owners(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Цена</th>
                                <td>
                                    <label>
                                        <input
                                            type="number"
                                            value={newPrice}
                                            placeholder={product.price}
                                            required
                                            onChange={e => {
                                                setNewPrice(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">Картинка</th>
                                <td>
                                    <label>
                                        <input
                                            type="text"
                                            value={newPicture}
                                            placeholder={product.picture}
                                            required
                                            onChange={e => {
                                                setNewPicture(e.target.value)
                                            }}
                                        />
                                    </label>
                                </td>
                            </tr>
                        </>
                        }
                        </tbody>
                    </Table>
                    <Button className="btn btn-success" onClick={updateProduct}>Применить</Button>
                </div>
                <div className="col-xs-8">
                    <img className="imgSt" src={product.picture}/>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;