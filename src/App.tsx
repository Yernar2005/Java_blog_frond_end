import {Routes, Route} from "react-router-dom";
import Welcome from "./components/Welcome.tsx";


import './App.css'
import LoginForm from "./components/auth/LoginForm.tsx";
import {observer} from "mobx-react-lite";
import RegistrationForm from "./components/auth/RegistrationForm.tsx";
import Home from "./pages/Home.tsx";
import PostModal from "./components/PostModal/index.tsx";


function App() {


    return (
        <Routes>
            <Route path="/Welcome" element={<Welcome/>}/>
            <Route path="/auth/login" element={<LoginForm/>}/>
            <Route path={"/auth/registration"} element={<RegistrationForm/>}/>
            <Route path={"/main"} element={<Home/>}/>
            <Route path={"/main/postModel"} element={<PostModal/>}/>
        </Routes>
    )
}

export default observer(App)
