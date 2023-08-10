import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login, resGoogle} from "../../../redux/actions";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const errorLogin = useSelector((state) => state.errorLogin);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(inputs));
    setIsLoginFormSubmitted(true);
  };

  // const handleGoogleResponse = (response) => {
  //   dispatch(responseGoogle(response));
  // };

  const onSuccess = (response) => {
    const { email } = response.profileObj;
    setInputs((prevInputs) => ({
      ...prevInputs,
      email,
    }));
    dispatch(resGoogle(response));
    setIsLoginFormSubmitted(true);
    console.log ('response en onSuccess', response)
  };
  
  const responseGoogle = (response) => {
    // Aquí puedes enviar el token de Google al servidor para la autenticación
    console.log("Google response:", response);
  };


  useEffect(() => {
    if (isLoginFormSubmitted) {
      dispatch(login(inputs));
      console.log('inputs de segundo useEffect', inputs);
    }
  }, [isLoginFormSubmitted, dispatch, inputs]);


  useEffect(() => {
    if (isAuthenticated && isLoginFormSubmitted) {
      navigate("/userprofile");
    }
  }, [isAuthenticated, isLoginFormSubmitted, navigate]);



  return (
    <div className={styles.container}>
      <div className={styles.title}>Inicia sesión</div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-details"]}>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Email</span>
              <input
                type="text"
                placeholder="Ingresa tu email"
                name="email"
                value={inputs.email}
                onChange={handleInput}
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Contraseña</span>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={inputs.password}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className={styles.button}>
            <input type="submit" value="Inicia sesión" />
          </div>
        </form>
        {errorLogin && <div className={styles.error}>{errorLogin}</div>}

        <div className={styles["google-button"]}>
          <GoogleLogin
            clientId="770412625356-vul6o4cnqq4bj7j3klkh3qf69bbom7lv.apps.googleusercontent.com"
            buttonText="Inicia sesión con Google"
            onSuccess={onSuccess}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;


// import React, { useEffect, useState } from "react";
// import styles from "./login.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../../redux/actions";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   const errorLogin = useSelector((state) => state.errorLogin);
//   const isAuthenticated = useSelector((state) => state.isAuthenticated);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [isLoginFormSubmitted, setIsLoginFormSubmitted] = useState(false);

//   const handleInput = (event) => {
//     const { name, value } = event.target;
//     setInputs({
//       ...inputs,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     dispatch(login(inputs));
//     setIsLoginFormSubmitted(true);
//   };

//   useEffect(() => {
//     if (isAuthenticated && isLoginFormSubmitted) {
//       // Redirect the user to the profile's home page only if the form was submitted
//       navigate("/userprofile");
//     }
//   }, [isAuthenticated, isLoginFormSubmitted, navigate]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.title}>Inicia sesión</div>
//       <div className={styles.content}>
//         <form onSubmit={handleSubmit}>
//           <div className={styles["user-details"]}>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Email</span>
//               <input
//                 type="text"
//                 placeholder="Ingresa tu email"
//                 name="email"
//                 value={inputs.email}
//                 onChange={handleInput}
//               />
//             </div>
//             <div className={styles["input-box"]}>
//               <span className={styles.details}>Contraseña</span>
//               <input
//                 type="password"
//                 placeholder="Ingresa tu contraseña"
//                 name="password"
//                 value={inputs.password}
//                 onChange={handleInput}
//               />
//             </div>
//           </div>

//           <div className={styles.button}>
//             <input type="submit" value="Inicia sesión" />
//           </div>
//         </form>
//         {errorLogin && <div className={styles.error}>{errorLogin}</div>}
//       </div>
//     </div>
//   );
// }

// export default Login;
