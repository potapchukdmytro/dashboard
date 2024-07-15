import React from "react";
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

import "./App.css";
import CharactersPage from "./pages/characters/CharactersPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CounterPage from "./pages/counterPage/CounterPage";
import { useSelector } from "react-redux";

const App = () => {
    const clientId =
        "47235399203-5dbvs4krmn7oao0p2fk1102dpam9vgsb.apps.googleusercontent.com";
    const { isDark } = useSelector(state => state.themingReducer);
    const theme = isDark ? darkTheme : lightTheme;        

    return (
        <ThemeProvider theme={theme}>
            <GoogleOAuthProvider clientId={clientId}>
                <Routes>
                    <Route path="/" element={<DefaulLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="characters" element={<CharactersPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="counter" element={<CounterPage />} />
                        <Route path="user">
                            <Route index element={<UsersPage />} />
                            {/* <Route
                            path="createuser/:userId"
                            element={<CreateUserPage />}
                        /> */}
                            <Route
                                path="createuser"
                                element={<CreateUserPage />}
                            />
                        </Route>
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </GoogleOAuthProvider>
        </ThemeProvider>
    );
};

export default App;
