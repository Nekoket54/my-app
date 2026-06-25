import { useState, useEffect } from "react";
import "../CSS/App.css";
import "../CSS/reset.css";
import Nav from "./Nav"
import Dashboard from "./Dashboard"
import SaveWeather from "./SaveWeather"
import News from "./News";
import Nature from "./Nature";
import Footer from "./Footer";

import { auth } from "../../firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth";

function App(params) {

    const [currentUser, setCurrentUser] = useState(null);

  // Следим за тем, вошел пользователь или вышел
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // Пользователь залогинен
      } else {
        setCurrentUser(null); // Гость
      }
    });
    return () => unsubscribe();
  }, []);

    return(
        <div>
            <Nav currentUser={currentUser}/>
            <SaveWeather user={currentUser}/>
            <News/>
            <Nature/>
            <Footer/>
        </div>
    )
}

export default App