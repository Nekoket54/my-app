import { useState, useEffect } from "react";
import "../CSS/EightDaysWeather.css";

function EightDaysWeather({ cityName }) {
  const [weatherEightData, setWeatherEightData] = useState(null);

  useEffect(() => {
    if (!cityName){
      setWeatherEightData(null);
      return;
    };

    const apiKey = "e7b19f30f0db787cef3ba188f0cc21c0";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Помилка мережі: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherEightData(data);
      })
      .catch((error) => {
        console.error(`Виникла помилка при отриманні даних:`, error);
      });
  }, [cityName]);

  if(!cityName){
    return null;
  }

  if (!weatherEightData) {
    return (
      <>
        <div className="loading">Loading weather...</div>
      </>
    );
  }

  return (
    <section className="eightDaysWeather">
      <h2 className="eightDaysWeather-name">5-day forecast</h2>

      <div className="eightDaysWeather-list-wrapper">
        {weatherEightData.list
          .filter((_, index) => index % 8 === 0)
          .map((item) => {
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const date = new Date(item.dt * 1000);

            const formattedDate = date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

            return (
              <div key={item.dt} className="eightDaysWeather-container">
                <p className="eightDaysWeather-container-text">
                  {formattedDate}
                </p>
                <div className="eightDaysWeather-container-box">
                  <img
                    src={iconUrl}
                    alt=""
                    className="eightDaysWeather-container-box-icon"
                  />
                  <p className="eightDaysWeather-container-box-text">
                    {Math.round(item.main.temp_max)}/
                    {Math.round(item.main.temp_min)}℃
                  </p>
                </div>
                <p className="eightDaysWeather-container-text2">
                  {item.weather[0].description}
                </p>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default EightDaysWeather;
