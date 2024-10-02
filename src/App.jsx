import React, { useEffect, useState } from "react";
import MainPage from "./pages/mainPage/MainPage";
import NotFound from "./pages/notFound/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "./theming/lightTheme";
import darkTheme from "./theming/darkTheme";
import CreateUserPage from "./pages/user/create/CreateUserPage";
import SignInPage from "./pages/auth/singin/SignInPage";
import { Routes, Route } from "react-router-dom";
import DefaulLayout from "./components/layouts/default/DefaultLayout";
import UsersPage from "./pages/user/UsersPage";
import SignUpPage from "./pages/auth/singup/SignUpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import CharactersPage from "./pages/characters/CharactersPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CounterPage from "./pages/counterPage/CounterPage";
import { useSelector } from "react-redux";
import { useAction } from "./hooks/useAction";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "./locales/config";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    // theme
    const clientId =
        "47235399203-5dbvs4krmn7oao0p2fk1102dpam9vgsb.apps.googleusercontent.com";
    const { theme } = useSelector((state) => state.themingReducer);
    const currentTheme = theme === "dark" ? darkTheme : lightTheme;

    // sign in
    const { isAuth, user } = useSelector((store) => store.authReducer);
    const { authWithToken } = useAction();

    // get user location
    const successLocation = async (position) => {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bf89f3f10b52303587e748f50178cba8`;
        const response = await axios(apiUrl);

        const { data } = response;

        const cityName = data[0].name;
        localStorage.setItem("userCity", cityName);
    };

    const errorLocation = () => {
        // localStorage.setItem("userCity", "Kyiv");
        getUserIp();
        //console.log("Error get user location");
    };

    const getLocationByIp = (ip) => {
        const byIpUrl = `http://ip-api.com/json/${ip}`;
        axios(byIpUrl)
            .then((response) => {
                localStorage.setItem("userCity", response.data.city);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUserIp = async () => {
        try {
            const response = await axios.get(
                "https://api.ipify.org/?format=json"
            );
            const { data } = response;
            getLocationByIp(data.ip);
        } catch (error) {
            console.log(error);
        }
    };

    // localization
    useEffect(() => {
        const token = localStorage.getItem("auth");
        if (token != null) {
            authWithToken(token);
        }

        // get location by user location
        navigator.geolocation.getCurrentPosition(
            successLocation,
            errorLocation
        );

        // get location by user ip
        // axios
        //     .get("https://api.ipify.org/?format=json")
        //     .then((response) => {
        //         const { data } = response;
        //         setUserIp(data.ip);
        //         getLocationByIp(data.ip);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }, []);

    return (
        <ThemeProvider theme={currentTheme}>
            <GoogleOAuthProvider clientId={clientId}>
                <Routes>
                    <Route path="/" element={<DefaulLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="characters" element={<CharactersPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="counter" element={<CounterPage />} />
                        {isAuth && user.role === "admin" && (
                            <Route path="user">
                                <Route index element={<UsersPage />} />
                                <Route
                                    path="createuser"
                                    element={<CreateUserPage />}
                                />
                            </Route>
                        )}
                        <Route
                            path="/signin"
                            element={isAuth ? <MainPage /> : <SignInPage />}
                        />
                        <Route
                            path="/signup"
                            element={isAuth ? <MainPage /> : <SignUpPage />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={true}
                    closeOnClick
                    rtl={false}
                    theme={theme === "light" ? "dark" : "light"}
                    pauseOnHover={false}
                />
            </GoogleOAuthProvider>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </ThemeProvider>
    );
};

export default App;
