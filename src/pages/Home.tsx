import React from 'react';
import Header from "../components/Search/Header.tsx";
import '../pages/home.scss';
import Sidebar from "../components/Sidebar/Sidebar.tsx";
import PostList from "../components/Page/PostList.tsx";




const Home: React.FC = () => {
    return (
        <div className="container">
            <div className="content-top">
                <Header />
            </div>
            <div className="content-center">
                <Sidebar />
                <PostList/>
            </div>
        </div>
    );
};

export default Home;