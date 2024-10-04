const initUserState = {
    userList: [],
    usersLoaded: false,
    roles: []
};

export const UserReducer = (state = initUserState, action) => {
    switch(action.type) {
        case "LOAD_USERS":
            return { ...state, usersLoaded: true, userList: action.payload }
        case "REMOVE_USER":
            return { ...state, userList: action.payload }
        case "EDIT_USER":
            const newUser = action.payload;
            const index = state.userList.findIndex(x => x.id === newUser.id);
            const newUsers = [...state.userList];
            newUsers[index] = newUser;
            return { ...state, userList: newUsers }
        case "LOAD_ROLES":
            return { ...state, roles: action.payload }
        default:
            return state;
    }
};