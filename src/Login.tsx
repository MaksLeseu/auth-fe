import React from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {Navigate} from "react-router-dom";
import {loginTC} from "./store/reducers/auth-reducer";
import {Banner} from "./Banner";

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const error = useSelector<AppStateType, string>(state => state.auth.errors)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <div className={'login'}>
            <h1>Login</h1>

            <form onSubmit={formik.handleSubmit} className={'login__form'}>
                <div className={'login__text-container'}>
                    <span>Email:</span>
                    <input
                        type={"text"}
                        className={'login__text'}
                        {...formik.getFieldProps('email')}
                    />
                </div>
                <div className={'login__password-container'}>
                    <span>Password:</span>
                    <input
                        type={"password"}
                        className={'login__password'}
                        {...formik.getFieldProps('password')}
                    />
                </div>
                <div className={'login__checkbox-container'}>
                    <input
                        type={"checkbox"}
                        className={'login__checkbox'}
                        checked={formik.values.rememberMe}
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <span>remember me</span>
                </div>
                <button className={'login__btn'}>Login</button>
            </form>
            <div style={{marginTop: '170px'}}>
                {error && <Banner/>}
            </div>

        </div>
    )
}