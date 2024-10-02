import axios from "axios";
import http from "../../../http_common";

export const loadUsers = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("auth");
        if(token === null) {
            return { success: false, message: "У вас недостатньо прав" };
        }

        const response = await http.get("user", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        const {data} = response;

        dispatch({
            type: "LOAD_USERS",
            payload: data.payload
        });

        return { success: true, message: "Успіх" };
    } catch (error) {       
        const {data} = error.response;
        if(data.hasOwnProperty("errors")) {
            return { success: false, message: error.response.data.errors[0] };
        }
        else {
            return { success: false, message: error.message };
        }
    }
};

export const removeUser = (id) => async (dispatch) => {
    const token = localStorage.getItem("auth");
        if(token === null) {
            return { success: false, message: "У вас недостатньо прав" };
        }

    const response = await http.delete("user?id=" + id, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const {data} = response;
    
    await loadUsers();
};  

export const editUser = (newUser) => (dispatch) => {
    dispatch({
        type: "EDIT_USER",
        payload: newUser
    });
}