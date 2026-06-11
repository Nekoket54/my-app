import "../CSS/MoreInfo.css";
import feelsLike from "../IMG/feelsLike.svg"
import humidity from "../IMG/humidity.svg"
import pressure from "../IMG/pressure.svg"
import windSpeed from "../IMG/windSpeed.svg"
import visibility from "../IMG/visibility.svg"

function MoreInfo({data}) {

    if(!data){
        return null;
    }

    return(
        <section className="moreInfo">
            <div className="moreInfo-sensations container">
                <p className="moreInfo-sensations-text text">Feels like</p>
                <h2 className="moreInfo-sensations-name name">{data.main.feels_like}℃</h2>
                <img src={feelsLike} alt="" className="moreInfo-sensations-icon icon"/>
            </div>
            <div className="moreInfo-range container">
                <p className="moreInfo-range-text text">Min ℃</p>
                <h2 className="moreInfo-range-name name">{data.main.temp_min}℃</h2>
                <p className="moreInfo-range-text text">Max ℃</p>
                <h2 className="moreInfo-range-name name">{data.main.temp_max}℃</h2>
            </div>
            <div className="moreInfo-humidity container">
                <p className="moreInfo-humidity-text text">Humidity</p>
                <h2 className="moreInfo-humidity-name name">{data.main.humidity}%</h2>
                <img src={humidity} alt="" className="moreInfo-humidity-icon icon"/>
            </div>
            <div className="moreInfo-pressure container">
                <p className="moreInfo-pressure-text text">Pressure</p>
                <h2 className="moreInfo-pressure-name name">{data.main.pressure} Pa</h2>
                <img src={pressure} alt="" className="moreInfo-pressure-icon icon"/>
            </div>
            <div className="moreInfo-windSpeed container">
                <p className="moreInfo-windSpeed-text text">Wind speed</p>
                <h2 className="moreInfo-windSpeed-name name">{data.wind.speed} m/s</h2>
                <img src={windSpeed} alt="" className="moreInfo-windSpeed-icon icon"/>
            </div>
            <div className="moreInfo-visibility container">
                <p className="moreInfo-visibility-text text">Visibility</p>
                <h2 className="moreInfo-visibility-name name">{data.visibility}</h2>
                <img src={visibility} alt="" className="moreInfo-visibility-icon icon"/>
            </div>
        </section>
    )
}

export default MoreInfo