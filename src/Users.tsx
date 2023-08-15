import React from "react";

type UsersPropsType = {
    username: string
    email: string
}

export const Users = (props: UsersPropsType) => {
    return (
        <div style={{marginBottom: '20px'}}>
            <div style={{textDecoration: 'underline', fontWeight: '700'}}>User</div>
            <div>{props.username}</div>
            <div>{props.email}</div>
        </div>
    )
}