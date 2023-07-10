import './landing.module.css';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../Landing/saw.gif"
import image2 from "../Landing/ToolVerseText (2).png"

export default function Landing() {

    const navigate = useNavigate();
    const getStarted = () => {
        navigate('/home');
    }

    return (
        <div className="landing-container">
          
            <img src={image} alt="saw" className="saw" />
            <img src={image2} alt="ToolVerseText" className="text"/>
            
            <div className="button-container">
            <button className="button" onClick={getStarted}>
              Get Started!
            </button>
            </div>
            
          
        </div>
      );
    }