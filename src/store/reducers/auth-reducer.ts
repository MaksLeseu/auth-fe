import {authApi, usersApi} from "../../api/api";
import {LoginType} from "../../Login";
import {RegistrationType} from "../../Registration";

type GetUsersACType = {
    type: 'GET_USERS'
    users: UserType[]
}

type ChangeIsLoggedInACType = {
    type: 'CHANGE_IS_LOGGED_IN'
    value: boolean
}

type ErrorsACType = {
    type: 'ERRORS'
    error: string
}

type SuccessesAuthACType = {
    type: 'SUCCESSES_AUTH'
    value: string
}

type InitialStateType = {
    users: UserType[]
    isLoggedIn: boolean,
    errors: string
    successesAuth: string
}

export type UserType = {
    email: string
    password: string
    username: string
    roles: string[]
    __v: number
    _id: number
}

const initialState: InitialStateType = {
    users: [],
    isLoggedIn: false,
    errors: '',
    successesAuth: ''
}

export const AuthReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'GET_USERS':
            return {...state, users: action.users}
        case "CHANGE_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.value}
        case "ERRORS":
            return {...state, errors: action.error}
        case "SUCCESSES_AUTH":
            return {...state, successesAuth: action.value}
        default:
            return state
    }
}

// ActionCreator
const getUsersAC = (users: UserType[]): GetUsersACType => ({
    type: 'GET_USERS', users
})

const changeIsLoggedInAC = (value: boolean): ChangeIsLoggedInACType => ({
    type: "CHANGE_IS_LOGGED_IN", value
})
const errorsAC = (error: string): ErrorsACType => ({
    type: "ERRORS", error
})
const successesAuthAC = (value: string): SuccessesAuthACType => ({
    type: "SUCCESSES_AUTH", value
})


// Thunks
export const getUsersTC: any = () => (dispatch: any) => {
    usersApi.getUsers()
        .then((res) => {
            if (res) dispatch(getUsersAC(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
}
export const loginTC: any = (data: LoginType) => (dispatch: any) => {
    authApi.login(data)
        .then((res) => {
            if (res) dispatch(changeIsLoggedInAC(true))
        })
        .catch((err) => {
            dispatch(errorsAC(err.response.data.message))
            setTimeout(() => {
                dispatch(errorsAC(''))
            }, 4000)
        })
}
export const registrationTC: any = (data: RegistrationType) => (dispatch: any) => {
    authApi.registration(data)
        .then((res) => {
            if (res) {
                console.log('Регистрация прошла успешна.')
                dispatch(successesAuthAC('Регистрация прошла успешна.'))
                setTimeout(() => {
                    dispatch(successesAuthAC(''))
                }, 4000)
            }
        })
        .catch((err) => {
            dispatch(errorsAC(err.response.data.message))
            setTimeout(() => {
                dispatch(errorsAC(''))
            }, 4000)
        })
}



type ActionType = GetUsersACType | ChangeIsLoggedInACType | ErrorsACType | SuccessesAuthACType