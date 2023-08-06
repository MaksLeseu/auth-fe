import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {changeUrlAC} from "./store/reducers/header-reducer";
import {Dispatch} from "redux";

export const Header = () => {
    const urlValue = useSelector<AppStateType, string | null>(state => state.header.value)
    const dispatch: Dispatch = useDispatch()
    const urlString: string = window.location.href.slice(22)

    useEffect(() => {
        dispatch(changeUrlAC(urlString))
    }, [])

    const registrStr: string | null = urlValue === 'login' ? 'Registration' : null
    const loginStr: string | null = urlValue === 'registration' ? 'Login' : null
    const outStr: string | null = urlValue === '' ? 'Log Out' : null
    const logOutStr = urlValue === '' && 'login'

    const urlPath = registrStr?.toLowerCase() || loginStr?.toLowerCase() || logOutStr

    const changeUrlValue = () => {
        if (urlPath) dispatch(changeUrlAC(urlPath))
    }

    return (
        <div className={'header'}>
            <div className={'header__container'}>
                <p>Server</p>
                <NavLink
                    to={`/${urlPath}`}
                    onClick={changeUrlValue}
                    className={'header__container-button'}
                >{registrStr || loginStr || outStr}</NavLink>
            </div>
        </div>
    )
}