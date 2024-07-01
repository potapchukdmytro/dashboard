import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/mainPage/MainPage";
import NotFound from "./pages/notFound/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./theming/lightTheme";

import "./App.css";
import CreateUserPage from "./pages/user/create/CreateUserPage";

const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
                <Navbar />
                <MainPage />
                <CreateUserPage />
                <Footer />
        </ThemeProvider>
    );
};

export default App;
