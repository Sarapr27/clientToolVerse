import style from './purchaseOrder.module.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import mercadoPago from '../img/MercadoPago.jpeg';
import axios from "axios";
import { CheckoutButton } from "../Paypal/CheckoutButton";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";

export default function PurchaseOrder() {
    const dispatch = useDispatch();
    const trolley = useSelector((state) => state.itemCart);
    const actualUser = useSelector((state) => state.actualUser);
    const actualCart = useSelector((state) => state.actualCart)
    console.log('el actualCart', actualCart)
    const [total, setTotal] = useState("");
    const [pagos, setPagos] = useState(false);

    const calculateTotal = () => {
        let suma = 0;
        trolley.forEach((product) => {
            suma = suma + product.price * product.quantity;
        });
        suma = parseFloat(suma.toFixed(2));
        return suma;
    };

    useEffect(() => {
        try {
            const totalAmount = calculateTotal();
            setTotal(totalAmount);
        } catch (error) {
            console.log("Error al calcular el total", error);
        }
    }, [total]);

    const handleMP = () => {
        axios.post('http://localhost:3001/payment', trolley.map((e) => e)).then((res) => window.location.href = res.data.response.body.init_point);
    }

    const exitStock = () => {
        trolley.forEach((product) => {
            const productId = product.id;
            const quantity = product.quantity;
            dispatch(actions.registerStockExit(productId, quantity)); // Registramos la salida del stock
            const newStock = product.stock - quantity; // Calculamos el nuevo stock después de la compra
            dispatch(actions.updateProductStock(productId, newStock)); // Actualizamos el stock en el estado global
        });
    };

    const confirm = () => {
        // control de stock -> esto se va a mover en el futuro al punto en el que el pago esté hecho
        exitStock();
        // para renderizar las plataformas de pago
        setPagos(true);

        // crea un Detalle de Compra que va a ser asociado al carrito creada antes
        // obtengo el array de los productos
        let products = []
        trolley.forEach((product) => {
            let producto = { productId: product.id, prodctName: product.name, quantity: product.quantity, price: product.price }
            products.push(producto)
        })
        // obtengo el idCart del carrito que he creado
        let purchaseCartId = actualCart.id
        console.log('el purchaseCartTd', purchaseCartId)

        // despacho la axn que crea la orden de compra y la asocia al carrito
        dispatch(actions.createDetail(purchaseCartId, products))
    }

    return (
        <div className={style.overallCompra}>
            {trolley.length === 0 ? <div>Aún no has hecho ninguna compra </div>
                : <div>
                    <h1 className={style.titulo}>Confirmando Compra:</h1>
                    <div>
                        <div className={style.detallesTotal}>
                            <div className={style.userDetails}>
                                <h4>Envío a:</h4>
                                <div>Nombre: {actualUser.firstName}</div>
                                <div>Apellido: {actualUser.lastName}</div>
                                <div>Email: {actualUser.email}</div>
                                <div>Teléfono: {actualUser.phone}</div>
                                <div>Dirección: {actualUser.address}</div>
                            </div>
                            <div>

                                {
                                    trolley.map((product) => {
                                        return (
                                            <div className={style.prodDetails}>
                                                <div className={style.nameImgMini}>
                                                    <div className={style.nameMiniProd}>{product.name}</div>
                                                    <img src={product.image} alt="producto" className={style.imgProd} />
                                                </div>
                                                <div className={style.brandModelMini}>
                                                    <div className={style.brandMiniProd}>{product.brand}</div>
                                                    <div className={style.modelMiniProd}>{product.model}</div>
                                                </div>
                                                <div className={style.priceMiniProd}>${product.price}</div>
                                                <div>Cantidad: {product.quantity}</div>
                                            </div>
                                        )

                                    })
                                }
                                <h2 className={style.total}> Total: ${total}</h2>
                            </div>
                        </div>
                        <div className={style.button}>
                            <input
                                type="submit"
                                value="Confirma la Compra"
                                onClick={() => confirm()}
                            />
                        </div>

                        {
                            pagos && <div className={style.metPago}>
                                <h2 className={style.elige}>Elige tu Método de Pago</h2>
                                <div className={style.toPay}>
                                    <button onClick={() => handleMP()} className={style.buttonPay}>
                                        <img src={mercadoPago} alt="Mercado Pago" className={style.mercadoPago} />
                                    </button>

                                    <div className={style.buttonPay}>
                                        <CheckoutButton totalAmount={total} />
                                    </div>

                                </div>
                            </div>
                        }

                    </div>
                </div>
            }
        </div>
    )
}
