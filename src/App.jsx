import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/mainPage";
import NotFound from "./pages/notFound/NotFound";

import "./App.css";

const App = () => {
    return (
        <>
            <Navbar logo="Dashlogo" title="Dashboard"/>
            <MainPage />
            <Footer title="Dashboard footer"/>
        </>
    );
};

export default App;
