import style from './cartDetails.module.css';
import empty from '../img/emptyTrolley.gif';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import MiniProduct from '../MiniProduct/miniProduct';
import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import React, { useEffect, useState } from "react";

export default function CartDetails() {
    const trolley = useSelector(state => state.itemCart)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // QUIERO:
    // generar un estado local de donde renderizar la info que viene desde el store -> con un id para cada uno?
    // armar una fción que produzca un array para renderizar
    // Dicho array:
    // Determina la cantidad items de cada producto
    // El botón para eliminar borra uno de cada item

    // una función que cuente los elementos y muestre renderizada la cantidad -> que luego el botón elimine uno de esos elementos

    const [total, setTotal] = useState('')

    // const contador = (trolley) => {
    //     let carrito = trolley.map((product) => {
    //         return {
    //             id: product.id,
    //             name: product.name,
    //             image: product.image,
    //             model: product.model,
    //             brand: product.brand,
    //             price: product.price,
    //             stock: product.stock
    //         }
    //     })
    // }

    const handleDelete = (id) => {
        dispatch(actions.removeFromCart(id))
    }

    const calculateTotal = () => {
        let suma = 0;
        trolley.forEach((product) => {
            suma = suma + product.price
        })
        return setTotal(suma)
    }

    useEffect(() => {
        try {
            calculateTotal()
        } catch (error) {
            console.log("Error al calcular el total", error);
        }
    },);

    return (
        <div className={style.overallDetail}>
            {
                (trolley.length === 0) ? <div className={style.emptyTrolley}>
                    <h3>Parece que aún no has colocado nada en la cesta</h3>
                    <img src={empty} alt='The trolley is empty' className={style.emptyTrolleyImg} />
                    <button className={style.goShopping} onClick={() => navigate('/home')}>Go Shopping</button>
                </div>
                    : <div className={style.trolleyFull}>
                        {
                            trolley.map((product) => {
                                return <MiniProduct key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    model={product.model}
                                    brand={product.brand}
                                    price={product.price}
                                    handleDelete={handleDelete}
                                    stock={product.stock}
                                    quantity={product.quantity} />
                            })
                        }
                    </div>
            }
            <div className={style.summingTotal}>

                <div className={style.total}> Monto total ${total} </div>
                <div className={style.button}>
                    <input type="submit" value="Elige tu Método de Pago" />
                </div>
            </div>
        </div>
    )
}