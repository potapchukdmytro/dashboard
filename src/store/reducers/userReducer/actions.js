import axios from "axios";
import usersData from "../../../data/users.json";

export const loadUsers = () => async (dispatch) => {
    try {
        const response = await axios.get("https://localhost:5000/user/getall");
        const {data} = response;
        console.log(data);

        dispatch({
            type: "LOAD_USERS",
            payload: data.payload
        });
    } catch (error) {
        console.log("Error load user data: ", error);
    }
};

export const removeUser = (id, users) => (dispatch) => {
    const newData = users.filter(u => u.id != id);
    
    dispatch({
        type: "REMOVE_USER",
        payload: newData === undefined ? [] : newData
    });
};  

export const editUser = (newUser) => (dispatch) => {
    dispatch({
        type: "EDIT_USER",
        payload: newUser
    });
}