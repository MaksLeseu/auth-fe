export const loadToken = () => {
    try {
        const accessToken = localStorage.getItem('access-token')
        if (accessToken === null) return undefined
        return JSON.parse(accessToken)
    }
    catch (err) {
        return undefined
    }
}

export const _saveToken = (accessToken: string): void => {
    try {
        const serializedToken = JSON.stringify(accessToken);
        localStorage.setItem('access-token', serializedToken)
    } catch (error) {
        console.log(error)
    }
}

export const checkToken = () => {
    try {
        const accessToken = localStorage.getItem('access-token')
        if (accessToken) return true
        return undefined
    } catch (e) {
        return undefined
    }
}

export const _deleteToken = (): void => {
    try {
        localStorage.removeItem('access-token')
    } catch (e) {
        console.log(e)
    }
}
