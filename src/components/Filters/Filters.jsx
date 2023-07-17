import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  changeFilterCategory,
  changeFilterBrand,
  setCurrentPage,
  getTools,
  
} from "../../redux/actions";
 const Filters= ()=>{const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getTools())
        
    }, [dispatch])
    return (
        <div classname='container-filtros'>
                <h5>Filtrar por Categoria</h5>
                    <select onchange={(e)=>{dispatch(changeFilterCategory(e.target.value))
                        dispatch(setCurrentPage(1))}}>
                        <option value='Eléctricos'>Eléctricos</option>
                        <option value='Manuales'>Manuales</option>
                        <option value='Inalámbricos'>Inalámbricos</option>
                        <option value='Neumáticos'>Neumáticos</option>
                        <option value='Hogar'>Hogar</option>
                        
                    </select>
    
                    <h5>Filtrar por Marca</h5>
                    <select onchange={(e)=>{dispatch(changeFilterBrand(e.target.value))
                        dispatch(setCurrentPage(1))}}> 
                         <option value ='MAKITA'>Makita</option>
                         <option value='EINHELL'>Einhell</option>
                         <option value='DEWALT'>Dewalt</option>
                         <option value='TRUPER'>Truper</option>
                         <option value='STANLEY'>Stanley</option>
                         <option value='IRWIN'>Irwin</option>
                         <option value='BOSCH'>Bosh</option>
                    </select>
                
                    
                </div>
                
    )
    

}

export default Filters;


