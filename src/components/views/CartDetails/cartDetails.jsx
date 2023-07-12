import './cartDetails.css';
import empty from '../img/emptyTrolley.gif';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CartDetails() {
    // obtiene la info del store y la renderiza ->
    // si no tiene info, muestra un carro vacío
    const trolley = useSelector(state => state.trolley)
    const navigate = useNavigate();

    return (
        <div className="overallDetail">
            {
                (!trolley) ? <div className='emptyTrolley'>
                    <h3>Parece que aún no has colocado nada en la cesta</h3>
                    <img src={empty} alt='The trolley is empty' className='emptyTrolleyImg' />
                    <button className="goShopping" onClick={() => navigate('/home')}>Go Shopping</button>
                </div>
                    : <div className="trolleyFull">
                        El carrito está lleno
                    </div>
            }

        </div>
    )
}