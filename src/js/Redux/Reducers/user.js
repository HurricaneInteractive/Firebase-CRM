import firebase from '../../Firebase/initialize';
import { auth } from '../../Firebase/helpers';

// Default state
const defaultState = {
    user: auth().currentUser
}

export default function reducer(state=defaultState, action) {

    switch(action.type) {
        // LOGIN USER
        // Runs Firebase signInWithEmailAndPassword and returns state
        case 'LOGIN_USER': {
            const { email, password } = action.payload;
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                return state;
            });
            break;
        }
        // CHECK AUTH STATUS
        // Check if there is a current user and updates the store state
        case 'CHECK_AUTH_STATUS': {
            console.log('checking...');
            let user = firebase.auth().currentUser;
            return {...state, user: user}
            break;
        }
        // CHANGE USER STATE
        // Update the store state with payload user
        case 'CHANGE_USER_STATE': {
            const user = action.payload.user;
            return {...state, user: user}
            break;
        }
        case 'GET_USER_INFORMATION': {
            const uid = action.payload.uid;
            return state;
            break;
        }
        // UPDATE USER METADATA
        // Find reference in db and updates the value of the specified key
        case 'UPDATE_USER_METADATA': {
            const { uid, key, value } = action.payload;
            let userRef = firebase.database().ref().child('users/' + uid + '/metadata');
            userRef.update({
                [key]: value
            });

            return state;
            break;
        }
    }
    
    return state;
}
