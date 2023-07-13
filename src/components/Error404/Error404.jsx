import ErrorImg from "./Error_Img.gif"
import style from './Error404.module.css';

const Error404 = () => {
    return (
      <div className={style.errorContainer}>
        <img className={style.error} src={ErrorImg} alt="Error 404" />
      </div>
    );
  };
  
  export default Error404;