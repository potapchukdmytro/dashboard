import usersData from "../../../data/users.json";

export const loadUsers = () => (dispatch) => {
    try {
        dispatch({
            type: "LOAD_USERS",
            payload: usersData
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