// 1. Добавляем нужные модули авторизации (auth) из пакетов firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- 1. Добавь этот импорт

const firebaseConfig = {
  apiKey: "AIzaSyBheWij9VMZr2vg9iN6ppxOqFjLK0dXJUw",
  authDomain: "diploma-project-5.firebaseapp.com",
  projectId: "diploma-project-5",
  storageBucket: "diploma-project-5.firebasestorage.app",
  messagingSenderId: "487425898034",
  appId: "1:487425898034:web:3cd767fc5a6a960097ee2b",
  measurementId: "G-S4REDER9TN"
};

// 2. Инициализируем приложение
const app = initializeApp(firebaseConfig);

// 3. Добавляем ключевое слово EXPORT перед каждой переменной, чтобы Nav.jsx мог их импортировать
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // <-- 2. Добавь экспорт этой переменной
export { signInWithPopup, signOut };