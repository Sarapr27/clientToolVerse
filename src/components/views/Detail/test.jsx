import React, { useEffect, useState } from 'react';

const UserBuyCheck = ({ user, id }) => {
    const [productosPorId, setProductosPorId] = useState([]);

    useEffect(() => {
        const userDidBuyProd = async () => {
            if (!user) return; // Verifica si el usuario existe antes de continuar

            const userId = user.id;
            console.log('el id del user primero', userId);

            try {
                const usuario = await dispatch(actions.getUserById(userId));
                console.log('el usuario después del dispatch', usuario);

                const userCarts = usuario.purchaseCarts;
                console.log('los purchaseCarts, debería ser un array', userCarts);

                let productosPorIdArray = [];
                for (const cart of userCarts) {
                    console.log('el id del cart', cart.id);
                    const productos = await dispatch(actions.getProductsInCart(cart.id));
                    console.log('los productos en el cart. es un array!!!!!', productos);
                    productos.forEach((prod) => {
                        console.log('recorriendo el array de productos y devolviendo el id de cada uno', prod);
                        console.log('el id del prod', prod.productId);
                        productosPorIdArray.push(prod.productId);
                    });
                }

                console.log('el array productosPorId', productosPorIdArray);
                setProductosPorId(productosPorIdArray);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        userDidBuyProd();
    }, [user]);

    useEffect(() => {
        console.log('el tipo de dato del id de producto en el carrito. es un NUMBER', typeof id, id);
        console.log('el producto está en el array o no: true si está false si no:', productosPorId.includes(id));
    }, [productosPorId, id]);

    return (
        <div>
            {/* Renderizar cualquier contenido necesario */}
        </div>
    );
};

export default UserBuyCheck;
