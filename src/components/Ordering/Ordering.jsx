import style from "./Ordering.module.css";
import {
  getTools,
  orderByName,
  orderByPrice,
  setCurrentPage,
} from "../../redux/actions";
import { useDispatch } from "react-redux";

const Ordering = () => {
  const dispatch = useDispatch();

  return (
    <div className={style.orderingContainer}>
      <div>
        <button
          onClick={() => {
            dispatch(getTools());
            dispatch(setCurrentPage(1));
          }}
        >
          Todos los productos
        </button>
      </div>
      <div className={style.alphabeticalOrder}>
        <h3>Ordenar de: </h3>
        <select
          name="orderByName"
          onChange={(e) => {
            dispatch(orderByName(e.target.value));
            dispatch(setCurrentPage(1));
          }}
        >
          {["A-Z", "Z-A"].map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <div className={style.orderByPrice}>
        <h3>Ordenar por: </h3>
        <select
          name="orderByPrice"
          onChange={(e) => {
            dispatch(orderByPrice(e.target.value));
            dispatch(setCurrentPage(1));
          }}
        >
          {["Mayor precio", "Menor precio"].map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Ordering;
