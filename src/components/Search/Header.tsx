import React, {useContext} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";


import UserIcon from '../../assets/userIcon.png';

import '../Search/header.scss';
import {Context} from "../../main.tsx";


const Header: React.FC = () => {

    const {store} = useContext(Context)


    const navigate: NavigateFunction = useNavigate();

    const handleStartPage = () => navigate('/');
    const onRegister = () => navigate('/auth/registration');
    const onLogin = () => navigate('/auth/login');
    const onLogout = async () => {
        await store.logout();
        navigate('/');
    };

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/main/postModel")
    }

    const [search, setSearch] = React.useState<string>('');

    return (


        <div className="header">
            <div className="header-left">
                <button className="header-button" type="button">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Поиск по названию…"
                        className="search-input"/>
                </button>
                <div className="btn" onClick={handlePost}>
                    <div className="btn_item">
                        <span>Загрузить пост</span>
                    </div>
                </div>
            </div>

            <div className="header-right">
                {store.isAuth ? (
                    <div className="btn btn_center" onClick={onLogout}>
                        <div className="btn_item">
                            <span>Выйти</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="btn">
                            <div className="btn_item" onClick={onRegister}>
                                <span>Регистрация</span>
                            </div>
                        </div>
                        <div className="btn">
                            <div className="btn_item" onClick={onLogin}>
                                <span>Войти</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;