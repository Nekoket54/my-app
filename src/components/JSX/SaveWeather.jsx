import { useState, useEffect } from "react";
import "../CSS/SaveWeather.css";
import { GrRefresh } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function SaveWeather(params) {
  const [weatherData, setWeatherData] = useState(null);
  const [nameCity, setNameCity] = useState();
  const [groupCity, setGroupCity] = useState([]);

  useEffect(() => {
    const apiKey = "e7b19f30f0db787cef3ba188f0cc21c0";
    const city = "kharkiv";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Помилка мережі: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(`Виникла помилка при отриманні даних:`, error);
      });
  }, []);

  if (!weatherData) {
    return <div className="loading">Loading weather...</div>;
  }

  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const d = new Date((weatherData.dt + weatherData.timezone) * 1000);
  const dayOfWeek = d.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });

  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = d.getUTCFullYear();
  const dateString = `${day}.${month}.${year}`;

  const hours = d.getUTCHours().toString().padStart(2, "0");
  const minutes = d.getUTCMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  // function addCity({onAddCity}, evt) {
  //   console.log('p');
    
  // }

  return (
    <section className="saveWeather">
      <div className="saveWeather-container">
        <div className="saveWeather-container-box1">
          <p className="saveWeather-container-box1-textCity">
            {weatherData.name}
          </p>
          <p className="saveWeather-container-box1-textCountry">
            {weatherData.sys.country}
          </p>
        </div>
        <p className="saveWeather-container-textTime">{timeString}</p>
        <div className="saveWeather-container-box2">
          <button className="saveWeather-container-box2-btnHourly">
            Hourly forecast
          </button>
          <button className="saveWeather-container-box2-btnWeekly">
            Weekly forecast
          </button>
        </div>
        <div className="saveWeather-container-box3">
          <p className="saveWeather-container-box3-textDate">{dateString}</p>
          <p className="saveWeather-container-box3-textDay">{dayOfWeek}</p>
        </div>
        <img src={iconUrl} alt="" className="saveWeather-container-icon" />
        <h2 className="saveWeather-container-name">
          {weatherData.main.temp}°C
        </h2>
        <div className="saveWeather-container-box4">
          <GrRefresh className="saveWeather-container-box4-refresh" />
          <FaRegHeart className="saveWeather-container-box4-regHeart" />
          <button className="saveWeather-container-box4-btn">See more</button>
          <MdDelete className="saveWeather-container-box4-delete" />
        </div>
      </div>
    </section>
  );
}

export default SaveWeather;
