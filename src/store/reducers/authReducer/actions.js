import { DialerSip } from "@mui/icons-material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const signIn = (model) => async (dispatch) => {
    try {
        const response = await axios({
            method: "POST",
            url: "https://localhost:5000/account/signin",
            data: JSON.stringify(model),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(response.status == 200)
        {
            const { data } = response;
            const token = data.payload;
            localStorage.setItem("auth", token);
            const user = jwtDecode(token);
            dispatch({ type: "SIGN_IN", payload: user });

            return { success: true };
        }
    } catch (error) {
        console.error("sign in error: ", error);
        return { success: false }
    }
};

export const authWithToken = (token) => async (dispatch) => {
    try {
        localStorage.setItem("auth", token);
        const user = jwtDecode(token);
        dispatch({ type: "SIGN_IN", payload: user });
    }
    catch(error) {
        console.error("sign in error: ", error);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
};