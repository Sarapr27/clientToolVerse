import style from './miniProduct.module.css';
import bin from '../img/bin.png'
import { useSelector } from 'react-redux';

const MiniProduct = ({ id, image, name, model, brand, price, quantity, handleDelete}) => {
    const tools = useSelector((state)=> state.allTools)
    const product = tools.find((item)=> item.id === id)
    return (
        <div className={style.divMiniProd} key={id} >
            <div className={style.nameImgMini}>
                <div className={style.nameMiniProd}>{name}</div>
                <img src={image} alt="producto en el carrito" className={style.imgMiniProd} />
            </div>
            <div className={style.brandModelMini}>
                <div className={style.brandMiniProd}>{brand}</div>
                <div className={style.modelMiniProd}>{model}</div>
            </div>
            <div className={style.priceMiniProd}>{price}</div>
            <button className={style.deleteProd} onClick={() => handleDelete(id)}>
                <img src={bin} alt="bin" className={style.bin} />
            </button>
            <div className={style.trato}>Stock {product.stock}</div>
            <div className={style.trato}>Quantity {quantity}</div>       
        </div>
    )
};

export default MiniProduct;