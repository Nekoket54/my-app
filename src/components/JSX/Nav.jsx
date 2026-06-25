import { useState, useEffect } from "react";
// Импортируем настройки Firebase (убедитесь, что путь к файлу firebaseConfig правильный)
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
} from "../../firebaseConfig";

import "../CSS/Nav.css";
import logo from "../IMG/logo.png";
import defaultUserPic from "../IMG/user.png"; // Переименовал в defaultUserPic, чтобы не путать с состоянием

function Nav({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Функция для обработки входа
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Ошибка авторизации через Google:", error);
    }
  };

  // Функция для выхода
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };

  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="nav-photo" />

      <button
        className={`nav-toggle ${isOpen ? "is-active" : ""}`}
        onClick={toggleMenu}
      >
        Menu <span className="arrow">{isOpen ? "〉" : "∨"}</span>
      </button>

      <div className={`nav-menu-wrapper ${isOpen ? "is-open" : ""}`}>
        <div className="nav-container">
          <a className="nav-container1-link">Who we are</a>
          <a className="nav-container1-link" href="#contacts">
            Contacts
          </a>
          <a className="nav-container1-link">Menu</a>
        </div>

        <div className="nav-container2">
          {currentUser ? (
            // Код, который сработает, ЕСЛИ ПОЛЬЗОВАТЕЛЬ ВОШЕЛ
            <>
              <span
                className="nav-user-name"
                style={{ marginRight: "10px", color: "#333" }}
              >
                {currentUser.displayName}
              </span>
              <img
                src={currentUser.photoURL || defaultUserPic}
                alt="User Avatar"
                className="nav-container2-userPhoto"
                onClick={handleLogout} // Клик по аватарке разлогинит (как вариант), либо можно сделать отдельную кнопку
                title="Нажмите, чтобы выйти"
                referrerPolicy="no-referrer"
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </>
          ) : (
            // Код, который сработает, ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ ВОШЕЛ
            <>
              <button className="nav-container2-btn" onClick={handleLogin}>
                Sign In
              </button>
              <img
                src={defaultUserPic}
                alt="Default User"
                className="nav-container2-userPhoto"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
