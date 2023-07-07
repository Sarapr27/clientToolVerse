import './landing.module.css';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {

    const navigate = useNavigate();
    const getStarted = () => {
        navigate('/home');
    }

    return (
        <div>
            <h1>Soy el Landing</h1>
            <button className="getStarted" onClick={() => { getStarted() }}>Get Started! </button>
        </div>
    )
}
