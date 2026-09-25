import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAagOy1tZj6I52dIsDdME_JuCofH2FHmtk",
    authDomain: "qashqarian-academy.firebaseapp.com",
    projectId: "qashqarian-academy",
    storageBucket: "qashqarian-academy.firebasestorage.app",
    messagingSenderId: "721394277628",
    appId: "1:721394277628:web:1ef8d62873a40bf53fcb79"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };