import firebase from '../../Firebase/initialize';
import { auth } from '../../Firebase/helpers';

const defaultState = {
    user: auth().currentUser
}

export default function reducer(state=defaultState, action) {

    switch(action.type) {
        case 'LOGIN_USER': {
            const { email, password } = action.payload;
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                return state;
            });
            break;
        }
        case 'CHECK_AUTH_STATUS': {
            console.log('checking...');
            let user = firebase.auth().currentUser;
            return {...state, user: user}
            break;
        }
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
        case 'UPDATE_USER_METADATA': {
            const { uid, name, value } = action.payload;
            

            return state;
            break;
        }
    }
    
    return state;
}
