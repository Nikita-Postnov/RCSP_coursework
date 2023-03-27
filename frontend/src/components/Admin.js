import {NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";
import "../css/admin.css"

function Admin(){
    return (
        <div>
            <div className="container marg5 cont4">
                <div className="row text-center">
                    <div className="col-xs-4 colXs3border_">
                        <Nav.Link as={NavLink} className="navLink word" to="/admin/products">Автомобили</Nav.Link>
                    </div>
                    <div className="col-xs-4 colXs3border_">
                        <Nav.Link as={NavLink} className="navLink word" to="/admin/orders/">Заказы</Nav.Link>
                    </div>
                    <div className="col-xs-4">
                        <Nav.Link as={NavLink} className="navLink word" to="/admin/users">Пользователи</Nav.Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;