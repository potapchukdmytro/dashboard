import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/mainPage";
import NotFound from "./pages/notFound/NotFound";
import { ThemeProvider, useTheme } from "@mui/material/styles";

import "./App.css";

const App = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar />
                <MainPage />
                <Footer />
            </>
        </ThemeProvider>
    );
};

export default App;
