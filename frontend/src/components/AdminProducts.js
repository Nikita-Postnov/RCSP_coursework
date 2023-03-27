import "../css/adminProducts.css"
import {Button, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Select from 'react-select'
import axios from "axios";

function AdminProducts(){
    let navigate = useNavigate();
    const {id} = useParams();
    const data = [
        { value: 'NEW', label: 'NEW' },
        { value: 'SUP', label: 'SUP' }
    ]
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [release_year, setRelease_Year] = useState(null);
    const [mileage, setMileage] = useState(null);
    const [body, setBody] = useState("");
    const [color, setColor] = useState("");
    const [engine, setEngine] = useState("");
    const [drive, setDrive] = useState("");
    const [wheel, setWheel] = useState("");
    const [number_of_owners, setNumber_of_owners] = useState(null);
    const [price, setPrice] = useState(null);
    const [picture, setPicture] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [modelFilter, setModelFilter] = useState("");
    const [bodyFilter, setBodyFilter] = useState("");
    const [release_yearFilter, setRelease_YearFilter] = useState(null);

    const [allProducts, setAllProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);

    const getProducts = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/admin/products",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                setAllProducts(response.data)
                setFilterProducts(response.data)
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteProduct = async (id) =>{
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.delete("http://localhost:8080/api/admin/products/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then((response) => {
                getProducts()
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getProducts();
    }, []);

    const addProduct = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.post("http://localhost:8080/api/admin/products/",
                {
                    "brand": brand,
                    "model": model,
                    "engine": engine,
                    "drive": drive,
                    "category": category,
                    "body": body,
                    "wheel": wheel,
                    "color": color,
                    "mileage": mileage,
                    "number_of_owners": number_of_owners,
                    "release_year": release_year,
                    "price": price,
                    "picture": picture
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

    function findProducts(brand, model, body, release_year){
        release_year = Number(release_year)

        if (brand==="" && model!=="" && body!=="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.body === body && product.model === model && product.release_year === release_year))
        }
        if (brand!=="" && model==="" && body!=="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.body === body && product.brand === brand && product.release_year === release_year))
        }
        if (brand!=="" && model!=="" && body==="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.brand === brand && product.model === model && product.release_year === release_year))
        }
        if (brand!=="" && model!=="" && body!=="" && release_year === 0){
            setFilterProducts(allProducts.filter(product=>product.body === body && product.model === model && product.brand === brand))
        }

        if (brand==="" && model==="" && body!=="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.body === body && product.release_year === release_year))
        }
        if (brand==="" && model!=="" && body==="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.model === model && product.release_year === release_year))
        }
        if (brand==="" && model!=="" && body!=="" && release_year === 0){
            setFilterProducts(allProducts.filter(product=>product.body === body && product.model === model))
        }
        if (brand!=="" && model==="" && body==="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.release_year === release_year && product.brand === brand))
        }
        if (brand!=="" && model==="" && body!=="" && release_year === 0){
            setFilterProducts(allProducts.filter(product=>product.body === body && product.brand === brand))
        }
        if (brand!=="" && model!=="" && body==="" && release_year === 0){
            setFilterProducts(allProducts.filter(product=>product.model === model && product.brand === brand))
        }

        if (brand!=="" && model==="" && body==="" && release_year === 0){
            setFilterProducts(allProducts.filter(product=>product.brand === brand))
        }
        if (brand==="" && model!=="" && body==="" && release_year === 0){
            setFilterProducts(allProducts.filter(product=>product.model === model))
        }
        if (brand==="" && model==="" && body!=="" && release_year === 0){
            setFilterProducts(allProducts.filter(product=>product.body === body))
        }
        if (brand==="" && model==="" && body==="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.release_year === release_year))
        }

        if (brand!=="" && model!=="" && body!=="" && release_year !== 0){
            setFilterProducts(allProducts.filter(product=>product.body === body && product.model === model && product.release_year === release_year && product.brand === brand))
        }

        if (brand==="" && model==="" && body==="" && release_year === 0){
            setFilterProducts(allProducts)
        }
    }

    return(
        <div>
            <div className="container marg6 bborder">
                <div className="col-xs-12">
                    <h4 className="text-center ttext">Добавление автомобиля</h4>
                    <form onSubmit={addProduct}>
                        <Table>
                            <thead>
                            <th>
                                <p>ID: Auto</p>
                                <label>Тип авто:</label>
                                <Select
                                    placeholder = "Тип авто"
                                    value={data.find(obj => obj.value === category)}
                                    options={data}
                                    required
                                    onChange={e => {
                                        setCategory(e.value)
                                    }}
                                />
                                <input
                                    type="text"
                                    value={brand}
                                    placeholder="Бренд"
                                    required
                                    onChange={e => {
                                        setBrand(e.target.value)
                                    }}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    value={model}
                                    placeholder="Модель"
                                    required
                                    onChange={e => {
                                        setModel(e.target.value)
                                    }}
                                />
                                <input
                                    type="number"
                                    value={release_year}
                                    placeholder="Год выпуска"
                                    required
                                    onChange={e => {
                                        setRelease_Year(e.target.value)
                                    }}
                                />

                                {category === "SUP" &&
                                <>
                                    <input
                                        type="number"
                                        value={mileage}
                                        placeholder="Пробег"
                                        required
                                        onChange={e => {
                                            setMileage(e.target.value)
                                        }}
                                    />
                                </>
                                }
                            </th>
                            <th>
                                <input
                                    type="text"
                                    value={body}
                                    placeholder="Кузов"
                                    required
                                    onChange={e => {
                                        setBody(e.target.value)
                                    }}
                                />
                                <input
                                    type="text"
                                    value={color}
                                    placeholder="Цвет"
                                    required
                                    onChange={e => {
                                        setColor(e.target.value)
                                    }}
                                />
                                <input
                                    type="text"
                                    value={engine}
                                    placeholder="Двигатель"
                                    required
                                    onChange={e => {
                                        setEngine(e.target.value)
                                    }}
                                />
                            </th>
                            <th>
                                <input
                                    type="text"
                                    value={drive}
                                    placeholder="Коробка"
                                    required
                                    onChange={e => {
                                        setDrive(e.target.value)
                                    }}
                                />
                                <input
                                    type="text"
                                    value={wheel}
                                    placeholder="Руль"
                                    required
                                    onChange={e => {
                                        setWheel(e.target.value)
                                    }}
                                />
                                {category === "SUP" &&
                                <>
                                    <input
                                        type="number"
                                        value={number_of_owners}
                                        placeholder="Количество владельцев"
                                        required
                                        onChange={e => {
                                            setNumber_of_owners(e.target.value)
                                        }}
                                    />
                                </>
                                }
                            </th>
                            <th>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Цена"
                                    required
                                    onChange={e => {
                                        setPrice(e.target.value)
                                    }}
                                />
                                <input
                                    type="text"
                                    value={picture}
                                    placeholder="Картинка"
                                    required
                                    onChange={e => {
                                        setPicture(e.target.value)
                                    }}
                                />
                                <div className="text-center">
                                    <Button className="btn btn-success" type="submit">Создать</Button>
                                </div>
                            </th>
                            </thead>
                        </Table>
                    </form>
                    <h4 className="text-center ttext">Таблица автомобилей</h4>
                    <form className="marg4" onSubmit={findProducts}>
                        <div className="col-xs-12">
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg4"
                                    value={brandFilter}
                                    placeholder="Бренд"
                                    required
                                    onChange={e => {
                                        setBrandFilter(e.target.value)
                                        findProducts(e.target.value, modelFilter, bodyFilter, release_yearFilter)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg4"
                                    value={modelFilter}
                                    placeholder="Модель"
                                    required
                                    onChange={e => {
                                        setModelFilter(e.target.value)
                                        findProducts(brandFilter, e.target.value, bodyFilter, release_yearFilter)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg4"
                                    value={bodyFilter}
                                    placeholder="Кузов"
                                    required
                                    onChange={e => {
                                        setBodyFilter(e.target.value)
                                        findProducts(brandFilter, modelFilter, e.target.value, release_yearFilter)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="number"
                                    className="form-control marg4"
                                    value={release_yearFilter}
                                    placeholder="Год выпуска"
                                    required
                                    onChange={e => {
                                        setRelease_YearFilter(e.target.value)
                                        findProducts(brandFilter, modelFilter, bodyFilter, e.target.value)
                                    }}
                                />
                            </label>
                        </div>
                    </form>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Тип</th>
                            <th>Бренд</th>
                            <th>Модель</th>
                            <th>Пробег</th>
                            <th>Год</th>
                            <th>Кузов</th>
                            <th>Цвет</th>
                            <th>Двигатель</th>
                            <th>Коробка</th>
                            <th>Руль</th>
                            <th>Хозяева</th>
                            <th>Цена</th>
                            <th colSpan="2">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filterProducts.map(product => (
                            <tr key={null}>
                                <td>{product.id}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>{product.model}</td>
                                <td>{product.mileage}{product.category === 'SUP' &&
                                'км'}
                                </td>
                                <td>{product.release_year}</td>
                                <td>{product.body}</td>
                                <td>{product.color}</td>
                                <td>{product.engine}</td>
                                <td>{product.drive}</td>
                                <td>{product.wheel}</td>
                                <td>{product.number_of_owners}</td>
                                <td>{product.price}₽</td>
                                <td>
                                    <Button className="btn btn-success" onClick={() => navigate("/admin/products/"+product.id,{product})}>Изменить</Button>
                                </td>
                                <td>
                                    <Button className="btn btn-danger" onClick={() =>deleteProduct(product.id)}>Удалить</Button>
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

export default AdminProducts;