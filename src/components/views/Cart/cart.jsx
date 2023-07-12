import './cart.css';
import CartDetails from '../CartDetails/cartDetails';
import userDetails from '../UserDetails/userDetails';
import UserDetails from '../UserDetails/userDetails';

// este componente debería tener:
// un área donde poner ver/poner los datos del usuario
// un área donde ver la info obtenida del carrito de compras 
// un botón para confirmar la compra y habilitar el pago

export default function Cart() {
    return (
        <div>
            <h1>Soy el Carrito de Compras</h1>
            <div className="userDetails">
                <UserDetails />
                <CartDetails />
            </div>
        </div>
    )
}
