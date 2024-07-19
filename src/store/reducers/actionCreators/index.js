import * as authActions from "../authReducer/actions";
import * as themeActions from "../themingReducer/actions";
import * as userActions from "../userReducer/actions";

const actions = {
    ...authActions,
    ...themeActions,
    ...userActions
};

export default actions;