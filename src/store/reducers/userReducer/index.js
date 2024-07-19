const initUserState = {
    userList: [],
    usersLoaded: false
};

export const UserReducer = (state = initUserState, action) => {
    switch(action.type) {
        case "LOAD_USERS":
            return { ...state, usersLoaded: true, userList: action.payload }
        case "REMOVE_USER":
            return { ...state, userList: action.payload }
        default:
            return state;
    }
};