import  { FC } from 'react';
import { useNavigate, NavigateFunction } from "react-router-dom";


import "../styles/welcome.scss"
import logo from "../assets/Logo.png"

const Welcome: FC = () => {
    const navigate: NavigateFunction = useNavigate();

    const handleStartMessenger = (): void => {
        navigate('/auth/login');
    };

    return (
    <div className="content">
        <div className="logo">
            <img src ={logo} alt="#"/>
            <p>Miracle messenger</p>
        </div>
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to non-steal messenger</h1>
            <p className="welcome-subtitle">It's secure and fast(по возможности)</p>
            <button className="welcome-button" onClick={handleStartMessenger}>Начать общение</button>
        </div>
    </div>
    );
};

export default Welcome;