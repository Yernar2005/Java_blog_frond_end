import React, {useContext, useState} from 'react';
import {EyeOff, Eye} from "lucide-react"


import '../style/loginForm.scss'
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";
import {NavigateFunction, useNavigate} from "react-router-dom";

const LoginForm: React.FC = () => {
    // const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {store} = useContext(Context)

    const navigate: NavigateFunction = useNavigate();

    // useEffect(() => {
    //     const checkToken = async () => {
    //         try {
    //             if (localStorage.getItem('token')) {
    //                 await store.checkAuth();
    //             }
    //         } catch (e) {
    //             console.log("It cannot find token", e.message)
    //         }
    //     }
    //     checkToken()
    // }, [store])
    const handleChangePage = () => {
        navigate('/auth/registration')
    }

    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();

        try {
           await store.login(username, password)

            if(store.isAuth){
                navigate('/main')
            }
        }
        catch (e) {
            console.log("Ошибка при авторизации: ", e)
        }

    }

    // const userStateDisplay = () => {
    //     if(store.isAuth && store.user && store.user.username){
    //         return `User authorized ${store.user.username}`
    //         }
    //         return `User do not authorize`
    // }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="login-container">
            <div className="login-card">
                {/*<SpotifyLogo/>*/}
                <h1 className="login-title">Войти в MusicLover</h1>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Электронная почта или имя пользователя</label>
                        <input
                            type="text"
                            id="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите электронную почту"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Пароль"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                    </div>


                    <div className="form-group-button">
                        <button type="submit" className="login-button">
                            Войти
                        </button>
                    </div>
                </form>

                <div className="forgot-password">
                    <a href="#">Забыли пароль?</a>
                </div>

                <div className="registration-prompt">
                    <span>Нет аккаунта?</span>
                    <button className="registration-link" onClick={handleChangePage}>
                        Регистрация в MusicLover
                    </button>
                </div>
            </div>
        </div>
    )
}

export default observer(LoginForm);