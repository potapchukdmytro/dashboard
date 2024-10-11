import { jwtDecode } from "jwt-decode";
import http from "../../../http_common";

export const signIn = (model) => async (dispatch) => {
    try {        
        const response = await http.post("account/signin", model);

        const { data } = response;
        const accessToken = data.payload.accessToken;
        const refreshToken = data.payload.refreshToken;

        localStorage.setItem("auth", accessToken);
        localStorage.setItem("urt", refreshToken);

        const user = jwtDecode(accessToken);

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
        console.log(data);
        
        const accessToken = data.payload.accessToken;
        const refreshToken = data.payload.refreshToken;
        localStorage.setItem("auth", accessToken);
        localStorage.setItem("urt", refreshToken);
        const user = jwtDecode(accessToken);

        dispatch({ type: "SIGN_IN", payload: user });

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
    localStorage.removeItem("urt");
    dispatch({ type: "LOGOUT" });
};

export const refreshTokens = async () => {
    try {
        const tokensModel = {
            accessToken: localStorage.getItem("auth"),
            refreshToken: localStorage.getItem("urt")
        };

        const response = await http.post("account/RefreshTokens", tokensModel);
        const { data } = response;

        localStorage.setItem("auth", data.payload.accessToken);
        localStorage.setItem("urt", data.payload.refreshToken);
        
    } catch (error) {
        console.error(error);
    }
    

}
