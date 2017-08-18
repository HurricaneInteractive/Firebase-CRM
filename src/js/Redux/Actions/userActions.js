export function loginUser(email, password) {
    console.log('login action called');
    return {
        type: 'LOGIN_USER',
        payload: {
            email: email,
            password: password
        }
    }
}

export function checkAuthStatus() {
    return {
        type: 'CHECK_AUTH_STATUS'
    }
}

export function changeUserState(user) {
    return {
        type: 'CHANGE_USER_STATE',
        payload: {
            user: user
        }
    }
}

export function getUserInformation(uid) {
    return {
        type: 'GET_USER_INFORMATION',
        payload: {
            uid: uid
        }
    }
}