const initialState = {
    isDark: false
};

export const ThemingReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE_THEME":
            return { ...state, isDark: !state.isDark }
        default:
            return state;
    }
}