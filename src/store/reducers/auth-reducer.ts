import {authApi, usersApi} from "../../api/api";
import {LoginType} from "../../Login";
import {RegistrationType} from "../../Registration";
import {_deleteToken, _saveToken} from "../../common/localStorage/localStorage";

type GetUsersACType = {
    type: 'GET_USERS'
    users: UserType[]
}

type SetUsernameACType = {
    type: 'SET_USERNAME'
    username: string
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

type LoadingACType = {
    type: 'LOADING'
    value: boolean
}

type InitialStateType = {
    users: UserType[]
    isLoggedIn: boolean,
    errors: string
    successesAuth: string
    loading: boolean
    username: string | null
}

export type UserType = {
    email: string
    password: string
    posts: []
    username: string
    __v: number
    _id: number
}

const initialState: InitialStateType = {
    users: [],
    isLoggedIn: false,
    errors: '',
    successesAuth: '',
    loading: false,
    username: null
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
        case "LOADING":
            return {...state, loading: action.value}
        case 'SET_USERNAME':
            return {...state, username: action.username}
        default:
            return state
    }
}

// ActionCreator
const getUsersAC = (users: UserType[]): GetUsersACType => ({
    type: 'GET_USERS', users
})

export const changeIsLoggedInAC = (value: boolean): ChangeIsLoggedInACType => ({
    type: "CHANGE_IS_LOGGED_IN", value
})
const errorsAC = (error: string): ErrorsACType => ({
    type: "ERRORS", error
})
const successesAuthAC = (value: string): SuccessesAuthACType => ({
    type: "SUCCESSES_AUTH", value
})
const loadingAC = (value: boolean): LoadingACType => ({
    type: "LOADING", value
})

const setUsernameAC = (username: string): SetUsernameACType => ({
    type: "SET_USERNAME", username
})


// Thunks
export const getUsersTC: any = () => (dispatch: any) => {
    usersApi.getUsers()
        .then((res) => {
            if (res) dispatch(getUsersAC(res.data.users))
        })
        .catch((err) => {
            console.log(err)
        })
}
export const loginTC: any = (data: LoginType) => (dispatch: any) => {
    authApi.login(data)
        .then((res) => {
            const accessToken = res.data.userData.accessToken
            _saveToken(accessToken)
            dispatch(changeIsLoggedInAC(true))
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

export const logoutTC: any = () => (dispatch: any) => {
    authApi.logout()
        .then((res) => {
            if (res) {
                _deleteToken()
                dispatch(changeIsLoggedInAC(false))
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

export const refreshTC: any = () => (dispatch: any) => {
    dispatch(loadingAC(true))
    authApi.refresh()
        .then((res) => {
            if (res) dispatch(changeIsLoggedInAC(true))
            dispatch(loadingAC(false))
        })
        .catch((e) => {
            dispatch(loadingAC(false))
            _deleteToken()
            console.log(e)
        })
}

export const getUsernameTC: any = () => (dispatch: any) => {
    usersApi.username()
        .then((res) => {
            if (res) dispatch(setUsernameAC(res.data.userData.username))
        })
        .catch((e) => {
            console.log(e)
        })
}



type ActionType = GetUsersACType | ChangeIsLoggedInACType | ErrorsACType | SuccessesAuthACType | LoadingACType | SetUsernameACType