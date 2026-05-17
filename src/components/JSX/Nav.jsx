import "../CSS/Nav.css";
import logo from "../IMG/logo.png";
import user from "../IMG/user.png"

function Nav(params) {
  return (
    <nav className="nav">
      <img src={logo} alt="" className="nav-photo" />
      <div className="nav-container">
        <a className="nav-container1-link">Who we are</a>
        <a className="nav-container1-link">Contacts</a>
        <a className="nav-container1-link">Menu</a>
      </div>
      <div className="nav-container2">
        <button className="nav-container2-btn">Sign Up</button>
        <img src={user} alt="" className="nav-container2-userPhoto" />
      </div>
    </nav>
  );
}

export default Nav;
