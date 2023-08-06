import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "./store/store";


export const Banner = () => {
    const error = useSelector<AppStateType, string>(state => state.auth.errors)
    const successes = useSelector<AppStateType, string>(state => state.auth.successesAuth)
    return (
        <div className={'banner'}>
            {successes
                ?
                <p className={'successes'}>{successes}</p>
                :
                <p className={'error'}>{error}</p>
            }
        </div>
    )
}