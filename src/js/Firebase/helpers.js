import firebase from './initialize';

export const auth = firebase.auth;

export function signOut() {
    auth().signOut();
}

export function isAuthed() {
    let user = auth().currentUser;
    if (user) {
        return true;
    }
    return false;
}