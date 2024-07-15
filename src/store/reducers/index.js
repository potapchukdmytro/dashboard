import { combineReducers } from "@reduxjs/toolkit"
import { TestReducer } from "./templateReducer";
import { ThemingReducer } from "./themingReducer";

// наші редюсери
export const rootReducer = combineReducers({
    testReducer: TestReducer,
    themingReducer: ThemingReducer
});