import axios from "axios";
import {LoginType} from "../Login";
import {RegistrationType} from "../Registration";
import {_saveToken, loadToken} from "../common/localStorage/localStorage";

const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/jwt/',
    withCredentials: true
})


instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${loadToken()}`
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(config => {
        return config
    }, async error => {
        const originRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originRequest._isRetry = true
            try {
                const response = await authApi.refresh()
                _saveToken(response.data.userData.accessToken)
                return instance.request(originRequest)
            } catch (e) {
                console.log('Not Auth')
            }
        }
        throw error
    }
)

export const usersApi = {
    getUsers() {
        return instance.get('users')
    },
    username() {
        return instance.get('username')
    }
}

export const authApi = {
    registration(data: RegistrationType) {
        return instance.post('registration', data)
    },
    login(data: LoginType) {
        return instance.post('login', data)
    },
    logout() {
        return instance.post('logout')
    },
    refresh() {
        return instance.get('refresh')
    },
}




