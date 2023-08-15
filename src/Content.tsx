import React, {useEffect} from "react";
import {changeIsLoggedInAC, getUsernameTC, getUsersTC, UserType} from "./store/reducers/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {Users} from "./Users";
import {Navigate} from "react-router-dom";
import {loadToken} from "./common/localStorage/localStorage";

export const Content = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const users = useSelector<AppStateType, UserType[]>(state => state.auth.users)
    const username = useSelector<AppStateType, string | null>(state => state.auth.username)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsernameTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    const getUsers = () => dispatch(getUsersTC())
    return (
        <div style={{marginBottom: '20px'}}>
            <div className={'username'}>{username}</div>
            <button className={'app-btn'} onClick={getUsers}>Get Users</button>
            <div>
                {users && users.map((u: UserType) =>
                    <Users
                        username={u.username}
                        email={u.email}
                    />
                )}
            </div>
        </div>
    )
}