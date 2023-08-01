import style from './cartForm.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import React, { useState } from "react";
import * as actions from "../../../redux/actions";
import { useDispatch } from "react-redux";

export function validate({ firstName, lastName, phone, address }) {
    let cartErrors = {};
    if (!firstName) cartErrors.firstName = 'Por favor coloca el nombre del receptor';
    if (!lastName) cartErrors.lastName = 'Por favor coloca el apellido del receptor';
    if (!phone) cartErrors.phone = 'Por favor coloca un número de contacto';
    if (!address) cartErrors.address = 'Por favor coloca una dirección a donde enviar los productos';
    return cartErrors;
}

export default function CartForm() {
    const dispatch = useDispatch();
    const login = useSelector(state => state.login)
    const [user, setUser] = useState({
        id: login.id,
        firstName: login.firstName,
        lastName: login.lastName,
        email: login.email,
        phone: login.phone,
        address: login.address
    });

    const [cartErrors, setCartErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(user);
        if (Object.values(errors).length === 0) {
            dispatch(actions.actualUser(user))
            alert('Información guardada con éxito')
        }
        else {
            setCartErrors(errors);
            alert('Por favor verifica que toda la información sea correcta')
        }
    }

    const handleInputChange = (event) => {
        const { value, name } = event.target;
        setUser({
            ...user,
            [name]: value
        })
        setCartErrors(
            validate({
                ...user,
                [name]: value
            })
        )
    };

    return (
        <div className={style.cartForm}>
            <div className={style.title}>Completa tus datos:</div>
            <form onSubmit={handleSubmit} className={style.cartForm}>
                <label className={style.labelForm}>Nombre: </label>
                <input type="text" className={style.inputGral} name='firstName' placeholder='Nombre del receptor' onChange={handleInputChange} value={user.firstName} />
                <span>  </span>
                {
                    cartErrors.firstName && <p className={style.warning}>{cartErrors.firstName}</p>
                }

                <label className={style.labelForm}>Apellido: </label>
                <input type="text" className={style.inputGral} name='lastName' placeholder='Apellido del receptor' onChange={handleInputChange} value={user.lastName} />
                <span>  </span>
                {
                    cartErrors.lastName && <p className={style.warning}>{cartErrors.lastName}</p>
                }

                <label className={style.labelForm}>Dirección postal: </label>
                <input type="text" className={style.inputGral} name='address' placeholder='Dirección postal del receptor' onChange={handleInputChange} value={user.address} />
                <span>  </span>
                {
                    cartErrors.address && <p className={style.warning}>{cartErrors.address}</p>
                }

                <label className={style.labelForm}>Email: </label>
                <input type="text" className={style.inputGral} name='email' placeholder='E-mail del receptor' onChange={handleInputChange} value={user.email} />
                <span>  </span>

                <label className={style.labelForm}>Teléfono: </label>
                <input type="text" className={style.inputGral} name='phone' placeholder='Teléfono del receptor' onChange={handleInputChange} value={user.phone} />
                <span>  </span>

                {
                    cartErrors.phone && <p className={style.warning}>{cartErrors.phone}</p>
                }

                <div className={style.button}>
                    <input type="submit" value=" Todos los datos son correctos" onClick={handleSubmit} />
                </div>
            </form>
        </div>
    )
}