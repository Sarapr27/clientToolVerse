import style from './cartForm.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import React, { useEffect, useState } from "react";
import * as actions from "../../../redux/actions";
import { useDispatch } from "react-redux";

export function validate({ firstName, lastName, phone, country, state, city, address, postalCode }) {
    let cartErrors = {};
    if (!firstName) cartErrors.firstName = 'Por favor coloca el nombre del receptor';
    if (!lastName) cartErrors.lastName = 'Por favor coloca el apellido del receptor';
    if (!phone) cartErrors.phone = 'Por favor coloca un número de contacto';
    if (!country) cartErrors.country = 'Por favor coloca un país';
    if (!state) cartErrors.state = 'Por favor coloca un estado';
    if (!city) cartErrors.city = 'Por favor coloca una ciudad';
    if (!address) cartErrors.address = 'Por favor coloca una dirección a donde enviar los productos';
    if (!postalCode) cartErrors.postalCode = 'Por favor coloca un código postal';
    return cartErrors;
}

export default function CartForm() {

    const dispatch = useDispatch();
    const login = useSelector(state => state.login)
    const address = useSelector(state => state.address)

    const [user, setUser] = useState({
        id: login.id,
        firstName: login.firstName,
        lastName: login.lastName,
        email: login.email,
        phone: login.phone,
        country: '',
        state: '',
        city: '',
        address: '',
        postalCode: '',
    });

    const [cartErrors, setCartErrors] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        address: '',
        postalCode: ''
    })

    useEffect(() => {
        try {
            if (!address) {
                dispatch(actions.getShippingAddressByUserId(login.id));
            }
            // Leer los datos de domicilio del usuario desde localStorage
            const savedAddress = JSON.parse(window.localStorage.getItem("userAddress"));
            if (savedAddress) {
                setUser((prevUser) => ({
                    ...prevUser,
                    country: savedAddress.country,
                    state: savedAddress.state,
                    city: savedAddress.city,
                    address: savedAddress.address,
                    postalCode: savedAddress.postalCode,
                }));
            }
        } catch (error) {
            console.log("No hay dirección postal", error);
        }
    }, [address, dispatch, login.id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate(user);
        if (Object.values(errors).length === 0) {
            let dirPostal = {
                country: user.country,
                state: user.state,
                city: user.city,
                address: user.address,
                postalCode: user.postalCode,
                userId: login.id
            }
            // country, state, city, address, postalCode, userId
            dispatch(actions.createShippingAddress(dirPostal));
            dispatch(actions.actualUser(user));
            window.localStorage.setItem("userAddress", JSON.stringify(dirPostal));
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
                <input type="text" className={style.inputGral} name='country' placeholder='País' onChange={handleInputChange} value={user.country} />
                {
                    cartErrors.country && <p className={style.warning}>{cartErrors.country}</p>
                }
                <input type="text" className={style.inputGral} name='state' placeholder='Estado' onChange={handleInputChange} value={user.state} />
                {
                    cartErrors.state && <p className={style.warning}>{cartErrors.state}</p>
                }
                <input type="text" className={style.inputGral} name='city' placeholder='Ciudad' onChange={handleInputChange} value={user.city} />
                {
                    cartErrors.city && <p className={style.warning}>{cartErrors.city}</p>
                }
                <input type="text" className={style.inputGral} name='address' placeholder='Calle y número' onChange={handleInputChange} value={user.address} />
                {
                    cartErrors.address && <p className={style.warning}>{cartErrors.address}</p>
                }
                <input type="text" className={style.inputGral} name='postalCode' placeholder='Código Postal' onChange={handleInputChange} value={user.postalCode} />
                {
                    cartErrors.postalCode && <p className={style.warning}>{cartErrors.postalCode}</p>
                }
                <span>  </span>

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