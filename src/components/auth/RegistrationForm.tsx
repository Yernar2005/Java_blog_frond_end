import React, {useContext, useState} from 'react';
import {Context} from "../../main.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";


import "../style/registration.scss"

const RegistrationForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {store} = useContext(Context)

    const navigate: NavigateFunction = useNavigate();

    const handleChangePage = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
          await store.registration(username, email, password, confirmPassword);
          console.log("Successfully sent")
      }
      catch (e){
          console.error("Error in registration: ", e)
      }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/auth/login')
    }



    return (
        <div className="registration-container">
            <div className="registration-card">
                <h1 className="registration-title">Зарегистрируйтесь и погрузитесь в музыку</h1>

                <form onSubmit={handleChangePage} className="registration-form">


                    <div className="form-group">
                        <label htmlFor="username">Никнейм</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите ваш никнейм"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите электронную почту"
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <div className="password-input-container">
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Пароль"
                                required
                            />
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <div className="password-input-container">
                            <input
                                id="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Пароль"
                                required
                            />
                        </div>
                    </div>


                    <button type="submit" className="registration-button" >
                        Регистрироваться
                    </button>

                </form>

                <div className="login-prompt">
                    <span>Есть аккаунт?</span>
                    <button className="login-link" onClick={handleLogin}>
                        Войти в MusicLover
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RegistrationForm;