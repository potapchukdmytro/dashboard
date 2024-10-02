import { jwtDecode } from "jwt-decode";
import http from "../../../http_common";

export const signIn = (model) => async (dispatch) => {
    try {        
        const response = await http.post("account/signin", model);

        const { data } = response;
        const token = data.payload;
        localStorage.setItem("auth", token);
        const user = jwtDecode(token);
        console.log(user);

        dispatch({ type: "SIGN_IN", payload: user });

        return { success: true };
    } catch (error) {
        console.log("test error sign in", error);
        return { success: false, message: error.response.data.errors[0] };
    }
};

export const signUp = (model) => async (dispatch) => {
    try {        
        const response = await http.post("account/signup", model);

        const { data } = response;
        // const token = data.payload;
        // localStorage.setItem("auth", token);
        // const user = jwtDecode(token);
        // console.log(user);

        // dispatch({ type: "SIGN_IN", payload: user });

        return { success: true };
    } catch (error) {
        console.log("test error sign up", error);
        return { success: false, message: error.response.data.errors[0] };
    }
};

export const authWithToken = (token) => async (dispatch) => {
    try {
        localStorage.setItem("auth", token);
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
