import { jwtDecode } from "jwt-decode";

export const signIn = (token) => (dispatch) => {
    try {
        const user = jwtDecode(token);
        dispatch({ type: "SIGN_IN", payload: user });
    } catch (error) {
        console.error("sign in error: ", error);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
};