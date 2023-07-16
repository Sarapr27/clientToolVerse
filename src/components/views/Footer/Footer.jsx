import React from 'react';
import logo from "../NavBar/logoTry.png"
import styles from "./Footer.scss";
import {Link} from "react-router-dom";


const  Footer = () => {
   
    return (
        
        <footer className={styles.footer}>
        <section>
            <div className={styles['logo-container']}>
                {/* <Link to="/home">
                <img src={logo} alt="logo"/>
                </Link> */}
            </div>
            <div className={styles['links']}>
                <Link to="/about"><p>About Us</p></Link>
                
                <div className={styles['contact-us']}>
                <Link to="contactus">Contact Us</Link>
                </div>
                
            </div>
        </section>
            <div>
            
            </div>
            
            <p>Toolverse© 2023 Todos los derechos reservados.</p>
        </footer>

       
    )
};

export default Footer;
