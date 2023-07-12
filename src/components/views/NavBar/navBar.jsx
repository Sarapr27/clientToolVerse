import './navBar.css';
import { useNavigate } from 'react-router-dom';
import logoHome from './logoTry.png';
import logoCart from './logoCart.png';
import SearchBar from '../SearchBar/searchBar';

export default function Nav() {
    const navigate = useNavigate();

    // testeando commit y push

    return (
        <div className="navBar">
            <button className="toHome" onClick={() => navigate('/home')}> <img src={logoHome} alt="logoHome" className="toHome" /> </button>
            <SearchBar className="searchBar" />
            <div className="logOnCart">
                <button className="logOn" onClick={() => navigate('/form')}> Inicia Sesión </button>
                <button className="cartBtn" onClick={() => navigate('/cart')}> <img src={logoCart} alt="logoCart" className="cartBtn" /> </button>
            </div>
        </div>
    )

}