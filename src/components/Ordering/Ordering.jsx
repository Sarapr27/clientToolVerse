import style from './Ordering.module.css'
import {orderByName, orderByPrice} from '../../redux/actions'
import { useDispatch } from 'react-redux';

const Ordering = () => {
  const dispatch = useDispatch();

    return (
        <div className={style.orderingContainer}>
            <div className={style.ordenAlpha}>
          <select
            name="orderByName"
            onChange={(e) => {
              dispatch(orderByName(e.target.value));
            }}
          >
            <option value="" key="first" hidden>
              Orden alfabético
            </option>
            {["A-Z", "Z-A"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>
        <div className={style.ordenPop}>
          <select
            name="orderByPrice"
            onChange={(e) => {
              dispatch(orderByPrice(e.target.value));
            }}
          >
            <option value="" key="first" hidden>
              Orden por precio
            </option>

            {["Mayor precio", "Menor precio"].map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
        </div>
        </div>
    )
}

export default Ordering;