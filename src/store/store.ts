import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {AuthReducer} from "./reducers/auth-reducer";
import thunkMiddleware from 'redux-thunk'
import {HeaderReducer} from "./reducers/header-reducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    header: HeaderReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;