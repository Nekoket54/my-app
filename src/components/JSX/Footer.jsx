import "../CSS/Footer.css";
import logo from "../IMG/logo.png";
import instagram from "../IMG/instagram.png"
import facebook from "../IMG/facebook.png"
import whatsapp from "../IMG/whatsapp.png"

function Footer(params) {
    return(
        <footer className="footer" id="contacts">
            <img src={logo} alt="" className="footer-logo" />
            <div className="footer-container1">
                <h2 className="footer-container1-name">Address</h2>
                <p className="footer-container1-text">Svobody str. 35<br/>Kyiv<br/>Ukraine</p>
            </div>
            <div className="footer-container2">
                <h2 className="footer-container2-name">Contact us</h2>
                <div className="footer-container2-box">
                    <a href="#" className="footer-container2-box-link"><img src={instagram} alt="" className="footer-container2-box-link-photo" /></a>
                    <a href="#" className="footer-container2-box-link"><img src={facebook} alt="" className="footer-container2-box-link-photo" /></a>
                    <a href="#" className="footer-container2-box-link"><img src={whatsapp} alt="" className="footer-container2-box-link-photo" /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
