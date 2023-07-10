import './searchBar.css';
import { useState } from 'react';
import lupa from './search.png';
import ex from './ex.png';
// import { useDispatch } from 'react-redux';
// import * as actions from '../../redux/actions';

export default function SearchBar() {
    //const dispatch = useDispatch();
    const [input, setInput] = useState('')

    const handleSearch = (event) => {
        let { value } = event.target;
        setInput(value)
    }

    const onSearch = (name) => {
        if (!name) return;
        console.log('el name en onSearch', name)
        // dispatch(actions.getToolsByName(name))
    }

    const onEx = () => {
        setInput('')
    }

    return (
        <div className='searchBar'>
            <button className="onSearch" onClick={() => onSearch(input)}> <img className='lupa' src={lupa} alt="lupa" /> </button>
            <input type='search' className="input" value={input.name} onChange={handleSearch} placeholder=' Busca una herramienta por nombre' />
            <button className="ex" onClick={() => onEx()}> <img src={ex} alt="ex" className="ex" /> </button>
            <span> </span>
        </div>
    )
}