import React from "react";
import styles from "../Form/form.module.css"

function Form() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>Registro</div>
            <div className={styles.content}>
                <form action="#">
                    <div className={styles['user-details']}>
                        <div className={styles['input-box']}>
                            <span className={styles.details}>Nombre</span>
                            <input type="text" placeholder="Ingresa tu nombre" required />
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.details}>Apellido</span>
                            <input type="text" placeholder="Ingresa tu apellido" required />
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.details}>Email</span>
                            <input type="text" placeholder="Ingresa tu email" required />
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.details}>Número de Teléfono</span>
                            <input type="number" placeholder="Ingresa tu número de teléfono" required />
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.details}>Nombre de Usuario</span>
                            <input type="text" placeholder="Ingresa tu nombre de usuario" required />
                        </div>
                        <div className={styles['input-box']}>
                            <span className={styles.details}>Contraseña</span>
                            <input
                                type="text"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                        </div>
                    </div>
                    <div className={styles['rol-details']}>
                        <input type="radio" name="rol" id={styles['dot-1']} />
                        <input type="radio" name="rol" id={styles['dot-2']} />

                        <span className={styles['rol-title']}>Rol</span>
                        <div className={styles.category}>
                            <label htmlFor={styles['dot-1']}>
                                <span className={`${styles.dot} ${styles.one}`}></span>
                                <span className={styles.rol}>Hogar</span>
                            </label>
                            <label htmlFor={styles['dot-2']}>
                                <span className={`${styles.dot} ${styles.two}`}></span>
                                <span className={styles.rol}>Empresa</span>
                            </label>
                        </div>
                    </div>
                    <div className={styles.button}>
                        <input type="submit" value="Registrate" />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Form;