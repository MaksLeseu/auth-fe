import axios from "axios";
import {LoginType} from "../Login";
import {RegistrationType} from "../Registration";

type ConfigType = {
    headers: {Authorization: string}
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
})



export const config: ConfigType = {
    headers: {
        Authorization: ''
    }
}

export const usersApi = {
    getUsers() {
        return instance.get('users', config)
    }
}

export const authApi = {
    registration(data: RegistrationType) {
        return instance.post('registration', data)
    },
    login(data: LoginType) {
        return instance.post('login', data)
    }
}

export const setToken = (token: string) => {
    config.headers.Authorization = `Bearer ${token}`
}



