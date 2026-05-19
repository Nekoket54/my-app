import "../CSS/App.css";
import "../CSS/reset.css";
import Nav from "./Nav"
import Dashboard from "./Dashboard"
import SaveWeather from "./SaveWeather"
import News from "./News";

function App(params) {
    return(
        <div>
            <Nav/>
            <Dashboard/>
            <SaveWeather/>
            <News/>
        </div>
    )
}

export default App