type InitialStateType = {
    value: string | null
}

const initialState: InitialStateType = {
    value: null
}

export const HeaderReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'CHANGE_URL':
            return {...state, value: action.value}
        default:
            return state
    }
}

// ActionCreator
export const changeUrlAC = (value: string): ChangeUrlACType => ({
    type: 'CHANGE_URL', value
})

type ChangeUrlACType = {
    type: 'CHANGE_URL'
    value: string
}


type ActionType = ChangeUrlACType