import { combineReducers } from "@reduxjs/toolkit"
import { TestReducer } from "./templateReducer";
import { ThemingReducer } from "./themingReducer";
import { AuthReducer } from "./authReducer";
import { UserReducer } from "./userReducer";

// наші редюсери
export const rootReducer = combineReducers({
    testReducer: TestReducer,
    themingReducer: ThemingReducer,
    authReducer: AuthReducer,
    userReducer: UserReducer
});