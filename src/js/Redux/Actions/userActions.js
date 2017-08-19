// Login User
/*
*   email:      User Email      (string)
*   password:   User Password   (string)
*/
export function loginUser(email, password) {
    return {
        type: 'LOGIN_USER',
        payload: {
            email: email,
            password: password
        }
    }
}

// Check the Auth Status
export function checkAuthStatus() {
    return {
        type: 'CHECK_AUTH_STATUS'
    }
}

// Change the store user state
/*
*   user: user object given by Firebase (object)
*/
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

// Update User Metadata
/*
*   uid:    user uid            (string)
*   key:   metadata key        (string)
*   value:  new metadata value  (string | number)
*/
export function updateUserMetadata(uid, key, value) {
    return {
        type: 'UPDATE_USER_METADATA',
        payload: {
            uid: uid,
            key: key,
            value: value
        }
    }
}