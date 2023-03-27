import {Button, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/products.css"

const Products = () => {
    let token = JSON.parse(localStorage.getItem("user"));
    let navigate = useNavigate();
    const [allNewProducts, setAllNewProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [allSupProducts, setAllSupProducts] = useState([]);
    const [supProducts, setSupProducts] = useState([]);
    const [brandNew, setBrandNew] = useState("");
    const [modelNew, setModelNew] = useState("");
    const [bodyNew, setBodyNew] = useState("");
    const [brandSup, setBrandSup] = useState("");
    const [modelSup, setModelSup] = useState("");
    const [bodySup, setBodySup] = useState("");
    const [release_yearSup, setRelease_yearSup] = useState(null);

    const getProducts = async () => {
        try {
            await axios.get("http://localhost:8080/api/products",{
                }).then((response) => {
                setNewProducts(response.data.filter(product=>product.category === "NEW" && product.order_id === null))
                setAllNewProducts(response.data.filter(product=>product.category === "NEW" && product.order_id === null))
                setSupProducts(response.data.filter(product=>product.category === "SUP" && product.order_id === null))
                setAllSupProducts(response.data.filter(product=>product.category === "SUP" && product.order_id === null))
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    function findProductsNew(brand, model, body){
        if (brand==="" && model!=="" && body!==""){
            setNewProducts(allNewProducts.filter(product=>product.body === body && product.model === model))
        }
        if (brand!=="" && model==="" && body!==""){
            setNewProducts(allNewProducts.filter(product=>product.brand === brand && product.body === body))
        }
        if (brand!=="" && model!=="" && body===""){
            setNewProducts(allNewProducts.filter(product=>product.brand === brand && product.model === model))
        }

        if (brand!=="" && model==="" && body===""){
            setNewProducts(allNewProducts.filter(product=>product.brand === brand))
        }
        if (brand==="" && model!=="" && body===""){
            setNewProducts(allNewProducts.filter(product=>product.model === model))
        }
        if (brand==="" && model==="" && body!==""){
            setNewProducts(allNewProducts.filter(product=>product.body === body))
        }

        if (brand!=="" && model!=="" && body!==""){
            setNewProducts(allNewProducts.filter(product=>product.brand === brand && product.model === model && product.body === body))
        }

        if (brand==="" && model==="" && body===""){
            setNewProducts(allNewProducts)
        }
    }

    function findProductsSup(brand, model, body, release_year){
        release_year = Number(release_year)

        if (brand==="" && model!=="" && body!=="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body && product.model === model && product.release_year === release_year))
        }
        if (brand!=="" && model==="" && body!=="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body && product.brand === brand && product.release_year === release_year))
        }
        if (brand!=="" && model!=="" && body==="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.brand === brand && product.model === model && product.release_year === release_year))
        }
        if (brand!=="" && model!=="" && body!=="" && release_year === 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body && product.model === model && product.brand === brand))
        }

        if (brand==="" && model==="" && body!=="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body && product.release_year === release_year))
        }
        if (brand==="" && model!=="" && body==="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.model === model && product.release_year === release_year))
        }
        if (brand==="" && model!=="" && body!=="" && release_year === 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body && product.model === model))
        }
        if (brand!=="" && model==="" && body==="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.release_year === release_year && product.brand === brand))
        }
        if (brand!=="" && model==="" && body!=="" && release_year === 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body && product.brand === brand))
        }
        if (brand!=="" && model!=="" && body==="" && release_year === 0){
            setSupProducts(allSupProducts.filter(product=>product.model === model && product.brand === brand))
        }

        if (brand!=="" && model==="" && body==="" && release_year === 0){
            setSupProducts(allSupProducts.filter(product=>product.brand === brand))
        }
        if (brand==="" && model!=="" && body==="" && release_year === 0){
            setSupProducts(allSupProducts.filter(product=>product.model === model))
        }
        if (brand==="" && model==="" && body!=="" && release_year === 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body))
        }
        if (brand==="" && model==="" && body==="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.release_year === release_year))
        }

        if (brand!=="" && model!=="" && body!=="" && release_year !== 0){
            setSupProducts(allSupProducts.filter(product=>product.body === body && product.model === model && product.release_year === release_year && product.brand === brand))
        }

        if (brand==="" && model==="" && body==="" && release_year === 0){
            setSupProducts(allSupProducts)
        }
    }

    useEffect(()=>{
        getProducts();
    }, []);

    return(
        <div className="container">
            <div className="row text-center">
                <div className="marg4">
                    <h2>Новые автомобили</h2>
                    <form className="marg4" onSubmit={findProductsNew}>
                        <div className="col-xs-12">
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg4"
                                    value={brandNew}
                                    placeholder="Бренд"
                                    required
                                    onChange={e => {
                                        setBrandNew(e.target.value)
                                        findProductsNew(e.target.value, modelNew, bodyNew)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg4"
                                    value={modelNew}
                                    placeholder="Модель"
                                    required
                                    onChange={e => {
                                        setModelNew(e.target.value)
                                        findProductsNew(brandNew, e.target.value, bodyNew)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg4"
                                    value={bodyNew}
                                    placeholder="Кузов"
                                    required
                                    onChange={e => {
                                        setBodyNew(e.target.value)
                                        findProductsNew(brandNew, modelNew, e.target.value)
                                    }}
                                />
                            </label>
                        </div>
                    </form>
                </div>
                <Table className="marg4">
                    <thead>
                    <tr>
                        <th>Бренд</th>
                        <th>Модель</th>
                        <th>Кузов</th>
                        <th>Цена</th>
                        <th>Детали</th>
                    </tr>
                    </thead>
                    <tbody>
                    {newProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.brand}</td>
                            <td>{product.model}</td>
                            <td>{product.body}</td>
                            <td>{product.price}₽</td>
                            <td>
                                <Button className="btn btn-success" onClick={() => navigate("/products/"+product.id,{product})}>Подробнее</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <h2>Подержанные автомобили</h2>
                <div className="marg4">
                    <form className="marg4" onSubmit={findProductsSup}>
                        <div className="col-xs-12">
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg3"
                                    value={brandSup}
                                    placeholder="Бренд"
                                    required
                                    onChange={e => {
                                        setBrandSup(e.target.value)
                                        findProductsSup(e.target.value, modelSup, bodySup, release_yearSup)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg3"
                                    value={modelSup}
                                    placeholder="Модель"
                                    required
                                    onChange={e => {
                                        setModelSup(e.target.value)
                                        findProductsSup(brandSup, e.target.value, bodySup, release_yearSup)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    className="form-control marg3"
                                    value={bodySup}
                                    placeholder="Кузов"
                                    required
                                    onChange={e => {
                                        setBodySup(e.target.value)
                                        findProductsSup(brandSup, modelSup, e.target.value, release_yearSup)
                                    }}
                                />
                            </label>
                            <label>
                                <input
                                    type="number"
                                    id = "only_num"
                                    className="form-control marg3"
                                    value={release_yearSup}
                                    placeholder="Год выпуска"
                                    required
                                    onChange={e => {
                                        setRelease_yearSup(e.target.value)
                                        findProductsSup(brandSup, modelSup, bodySup, e.target.value)
                                    }}
                                />
                            </label>
                        </div>
                    </form>
                </div>
                <Table className="marg4">
                    <thead>
                    <tr>
                        <th>Бренд</th>
                        <th>Модель</th>
                        <th>Кузов</th>
                        <th>Год выпуска</th>
                        <th>Цена</th>
                        <th>Детали</th>
                    </tr>
                    </thead>
                    <tbody>
                    {supProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.brand}</td>
                            <td>{product.model}</td>
                            <td>{product.body}</td>
                            <td>{product.release_year}</td>
                            <td>{product.price}₽</td>
                            <td>
                                <Button className="btn btn-success" onClick={() => navigate("/products/"+product.id,{product})}>Подробнее</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Products;