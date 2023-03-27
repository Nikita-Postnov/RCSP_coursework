import './App.css';
import './css/bootstrap.css';
import Registration from "./components/Registration";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import CarDetails from "./components/CarDetails";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Admin from "./components/Admin";
import Orders from "./components/Orders";
import Users from "./components/Users";
import AdminProducts from "./components/AdminProducts";
import OrderDetails from "./components/OrderDetails";
import UserDetails from "./components/UserDetails";
import ProductDetails from "./components/ProductDetails";

function ProductDetail() {
    return null;
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                        <Route path="/products/:id" element={<CarDetails/>}/>
                        <Route path="/admin/orders" element={<Orders/>}/>
                        <Route path="admin/users" element={<Users/>}/>
                        <Route path="admin/products" element={<AdminProducts/>}/>
                        <Route path="/admin/orders/:id" element={<OrderDetails/>}/>
                        <Route path="admin/users/:id" element={<UserDetails/>}/>
                        <Route path="admin/products/:id" element={<ProductDetails/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;