import http from "../../../http_common";
import { refreshTokens } from "../authReducer/actions";

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
        if(error.response.status === 401) {
            console.log(error);
            
            await refreshTokens();
        }

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

export const getUser = (id) => async(dispatch) => {
    try {
        const token = localStorage.getItem("auth");
        if(token === null) {
            return { success: false, message: "У вас недостатньо прав" };
        }

        const response = await http.get("user?id=" + id, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const { data } = response;
        return { success: true, user: data.payload };

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

export const loadRoles = () => async (dispatch) => {
    try {
        const response = await http.get("role/roles");

        const {data} = response;
        dispatch({type: "LOAD_ROLES", payload: data.payload});

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

export const updateUser = (model) => async (dispatch) => {
    try {
        const token = localStorage.getItem("auth");
        if(token === null) {
            return { success: false, message: "У вас недостатньо прав" };
        }

        const response = await http.put("user", model, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        return {success: true};

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

export const createUser = (model) => async (dispatch) => {
    try {
        const token = localStorage.getItem("auth");
        if(token === null) {
            return { success: false, message: "У вас недостатньо прав" };
        }

        const response = await http.post("user", model, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        return {success: true};
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