import React from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";

import PencilIcon from '../../assets/pencilIcon.png';
import BellIcon from '../../assets/bellIcon.png';
import SearchIcon from '../../assets/searchIcon.png';
import UserIcon from '../../assets/userIcon.png';

import '../Search/header.scss';


const Header: React.FC = () => {

    const navigate: NavigateFunction = useNavigate();

    const handlePost = (e: React.FormEvent) =>{
        e.preventDefault();
        navigate("/main/postModel")
    }
    return (
        <div className="header">
            <div className="header__logo">
            </div>
            <div className="header__controls">
                <button className="header__btn header__btn--icon" aria-label="Поиск">
                    <img src={SearchIcon} alt="" />
                </button>
                <button className="header__btn header__btn--icon" aria-label="Уведомления">
                    <img src={BellIcon} alt="" />
                </button>
                <button className="header__btn header__btn--write" onClick={handlePost}>
                    <img src={PencilIcon} alt="" />
                    <p>Написать</p>
                </button>
                <div className="header__avatar header__btn header__btn--write">
                    <img src={UserIcon} alt="Аватар" />
                </div>
            </div>

        </div>
    );
};

export default Header;