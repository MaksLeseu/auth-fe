import axios from "axios";
import {LoginType} from "../Login";
import {RegistrationType} from "../Registration";

const instance = axios.create({
    baseURL: 'http://localhost:5000/auth/',
})

export const usersApi = {
    getUsers() {
        return instance.get('users')
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

