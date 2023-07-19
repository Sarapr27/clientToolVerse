import { useDispatch } from "react-redux";
import {
  changeFilterCategory,
  changeFilterBrand,
  setCurrentPage,
} from "../../redux/actions";
import style from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  return (
    <div className={style.filtersContainer}>
      <div className={style.filterCategory}>
        <h3>Filtrar por Categoría: </h3>
        <select
          onChange={(e) => {
            dispatch(changeFilterCategory(e.target.value));
            dispatch(setCurrentPage(1));
          }}
        >
          <option value="Eléctricos">Eléctricos</option>
          <option value="Manuales">Manuales</option>
          <option value="Inalámbricos">Inalámbricos</option>
          <option value="Neumáticos">Neumáticos</option>
          <option value="Hogar">Hogar</option>
        </select>
      </div>

      <div className={style.filterBrand}>
        <h3>Filtrar por Marca: </h3>
        <select
          onChange={(e) => {
            dispatch(changeFilterBrand(e.target.value));
            dispatch(setCurrentPage(1));
          }}
        >
          <option value="MAKITA">Makita</option>
          <option value="EINHELL">Einhell</option>
          <option value="DEWALT">DeWalt</option>
          <option value="TRUPER">Truper</option>
          <option value="STANLEY">Stanley</option>
          <option value="IRWIN">Irwin</option>
          <option value="BOSCH">Bosch</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
