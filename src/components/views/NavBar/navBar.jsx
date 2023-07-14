import style from './navBar.module.css';
import { useNavigate } from 'react-router-dom';
import logoHome from './logoTry.png';
import logoCart from './logoCart.png';
import SearchBar from '../SearchBar/searchBar';

export default function Nav() {
    const navigate = useNavigate();

    return (
        <div className={style.navBar}>
            <button className={style.toHome} onClick={() => navigate('/home')}> <img src={logoHome} alt="logoHome" className={style.toHome} /> </button>
            <SearchBar className={style.searchBar} />
            <div className={style.logOnCart}>
                <button className={style.logOn} onClick={() => navigate('/form')}> Registro </button>
                <button className={style.logOn} onClick={() => navigate('/form')}> Inicia Sesión </button>
                <button className={style.cartBtn} onClick={() => navigate('/cart')}> <img src={logoCart} alt="logoCart" className={style.cartBtnImg} /> </button>
            </div>
        </div>
    )

}