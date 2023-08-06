import React from "react";
import {getUsersTC, UserType} from "./store/reducers/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import {Users} from "./Users";
import {Navigate} from "react-router-dom";

export const Content = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const users = useSelector<AppStateType, UserType[]>(state => state.auth.users)
    const dispatch = useDispatch()

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    const getUsers = () => dispatch(getUsersTC())
    return (
        <div style={{marginBottom: '20px'}}>
            <button className={'app-btn'} onClick={getUsers}>Get Users</button>
            <div>
                {users && users.map((u: UserType) =>
                    <Users
                        username={u.username}
                        email={u.email}
                        role={u.roles[0]}
                    />
                )}
            </div>
        </div>
    )
}