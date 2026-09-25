import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { auth } from "./firebase-config.js";

export async function registerUser(email, password) {
    return await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function loginUser(email, password) {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
}

export async function logoutUser() {
    return await signOut(auth);
}

export function watchAuthState(callback) {
    return onAuthStateChanged(auth, callback);
}