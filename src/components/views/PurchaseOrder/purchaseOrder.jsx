import style from './purchaseOrder.module.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
export default function PurchaseOrder() {
    const trolley = useSelector((state) => state.itemCart);

    return (
        <div className={style.overallCompra}>
            {trolley.length === 0 ? <div>Aún no has hecho ninguna compra </div>
                : <div>
                    <h1 className={style.titulo}>Compra:</h1>
                    {trolley.map((product) => {
                        return (
                            <div>
                                <div>{product.name}</div>
                                <div>{product.image}</div>
                                <div>{product.brand}</div>
                                <div>{product.model}</div>
                                <div>{product.price}</div>
                                <div>{product.feature}</div>
                                <div>{product.quantity}</div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}