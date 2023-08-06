import React from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {Navigate} from "react-router-dom";
import {registrationTC} from "./store/reducers/auth-reducer";
import {Banner} from "./Banner";

export type RegistrationType = {
    username: string
    email: string
    password: string
}

export const Registration = () => {
    const successes = useSelector<AppStateType, string>(state => state.auth.successesAuth)
    const error = useSelector<AppStateType, string>(state => state.auth.errors)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch(registrationTC(values))
            formik.resetForm()
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    const banner = successes || error

    return (
        <div className={'login'}>
            <h1>Registration</h1>
            <form onSubmit={formik.handleSubmit} className={'login__form'}>
                <div className={'reg__container'}>
                    <span>Username:</span>
                    <input
                        type={"text"}
                        className={'login__text'}
                        {...formik.getFieldProps('username')}
                    />
                </div>
                <div className={'reg__container'}>
                    <span>Email:</span>
                    <input
                        type={"text"}
                        className={'login__text'}
                        {...formik.getFieldProps('email')}
                    />
                </div>
                <div className={'reg__container reg__container-pass'}>
                    <span>Password:</span>
                    <input
                        type={"password"}
                        className={'login__password'}
                        {...formik.getFieldProps('password')}
                    />
                </div>
                <button className={'login__btn'}>Login</button>
            </form>

            <div style={{marginTop: '140px'}}>
                {banner && <Banner/>}
            </div>
        </div>
    )
}