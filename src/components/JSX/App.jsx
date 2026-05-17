import "../CSS/App.css";
import "../CSS/reset.css";
import Nav from "./Nav"
import Dashboard from "./Dashboard"
import SaveWeather from "./SaveWeather"

function App(params) {
    return(
        <div>
            <Nav/>
            <Dashboard/>
            <SaveWeather/>
        </div>
    )
}

export default App