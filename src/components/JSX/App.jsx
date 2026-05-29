import "../CSS/App.css";
import "../CSS/reset.css";
import Nav from "./Nav"
import Dashboard from "./Dashboard"
import SaveWeather from "./SaveWeather"
import News from "./News";
import Nature from "./Nature";
import Footer from "./Footer";

function App(params) {
    return(
        <div>
            <Nav/>
            <Dashboard />
            {/* onAddCity={addCity} */}
            <SaveWeather />
            <News/>
            <Nature/>
            <Footer/>
        </div>
    )
}

export default App