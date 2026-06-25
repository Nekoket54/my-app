import { useState, useEffect } from "react";
import "../CSS/SaveWeather.css";
import { GrRefresh } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Dashboard from "./Dashboard";
import MoreInfo from "./MoreInfo";
import EightDaysWeather from "./EightDaysWeather";
import { db } from "../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

function SaveWeather({ user }) {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("berlin");
  const [weatherGroups, setWeatherGroups] = useState([]);
  const [selectedCityData, setSelectedCityData] = useState(null);
  const [forecastCity, setForecastCity] = useState(null);

  // 1. Автоматическая загрузка сохраненных городов из Firebase при входе пользователя
  useEffect(() => {
    async function loadUserCities() {
      if (!user) {
        setWeatherGroups([]); // Если пользователь вышел, очищаем экран
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().cities) {
          setWeatherGroups(docSnap.data().cities);
        } else {
          setWeatherGroups([]);
        }
      } catch (error) {
        console.error("Ошибка загрузки городов из Firestore:", error);
      }
    }

    loadUserCities();
  }, [user]);

  // Вспомогательная функция для синхронизации локального стейта с Firestore
  const saveToFirestore = async (updatedGroups) => {
    if (!user) return; // Если гость, в облако ничего не пишем
    try {
      await setDoc(doc(db, "users", user.uid), {
        cities: updatedGroups,
      });
    } catch (error) {
      console.error("Ошибка записи данных в Firestore:", error);
    }
  };
  ////////////

  useEffect(() => {
    const apiKey = "e7b19f30f0db787cef3ba188f0cc21c0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Помилка мережі: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(`Виникла помилка при отриманні даних:`, error);
      });
  }, [city]);

  useEffect(() => {
    if (!weatherData) return;
    const isAlreadyAdded = weatherGroups.some(
      (item) => item.name === weatherData.name,
    );
    if (!isAlreadyAdded) {
      const newWeather = {
        name: weatherData.name,
        country: weatherData.sys.country,
        time: timeString,
        date: dateString,
        dayOfTheWeek: dayOfWeek,
        icon: iconUrl,
        temp: weatherData.main.temp,

        feels_like: weatherData.main.feels_like,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        wind_speed: weatherData.wind.speed,
        visibility: weatherData.visibility,

        isFavorite: false,
      };
      const nextGroups = [...weatherGroups, newWeather];
      setWeatherGroups(nextGroups);
      saveToFirestore(nextGroups); /////////////////////////////////////
    }
  }, [weatherData]);

  if (!weatherData) {
    return (
      <>
        <Dashboard onAddCity={addCity} />
        <div className="loading">Loading weather...</div>
      </>
    );
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

  function addCity(newCityName) {
    if (newCityName.trim()) {
      setCity(newCityName);
    }
  }

  function seeMore(cityObj) {
    setSelectedCityData((prevCity) =>
      prevCity?.name === cityObj.name ? null : cityObj,
    );
  }

  function weeklyForecast(cityName) {
    setForecastCity((prevCity) => (prevCity === cityName ? null : cityName));
  }

  function favoritesCity(cityName) {
    const nextGroups = weatherGroups.map((item) =>
      item.name === cityName
        ? { ...item, isFavorite: !item.isFavorite }
        : item,
    );
    setWeatherGroups(nextGroups);
    saveToFirestore(nextGroups); /////////////////////////////////////////
  }

  function updateWeather(cityName) {
    const apiKey = "e7b19f30f0db787cef3ba188f0cc21c0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=en`;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const d = new Date((data.dt + data.timezone) * 1000);
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
        const currentIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const nextGroups = weatherGroups.map((item) => {
          if (item.name.toLowerCase() === cityName.toLowerCase()) {
            return {
              ...item,
              time: timeString,
              date: dateString,
              dayOfTheWeek: dayOfWeek,
              icon: currentIconUrl,
              temp: data.main.temp,
              feels_like: data.main.feels_like,
              temp_min: data.main.temp_min,
              temp_max: data.main.temp_max,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              wind_speed: data.wind.speed,
              visibility: data.visibility,
            };
          }
          return item;
        });

        setWeatherGroups(nextGroups);
        saveToFirestore(nextGroups); ///////////////////////////////

        setSelectedCityData((prevCity) => {
          if (
            prevCity &&
            prevCity.name.toLowerCase() === cityName.toLowerCase()
          ) {
            return {
              ...prevCity,
              time: timeString,
              date: dateString,
              dayOfTheWeek: dayOfWeek,
              icon: currentIconUrl,
              temp: data.main.temp,
              feels_like: data.main.feels_like,
              temp_min: data.main.temp_min,
              temp_max: data.main.temp_max,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              wind_speed: data.wind.speed,
              visibility: data.visibility,
            };
          }
          return prevCity;
        });
      })
      .catch((error) => {
        console.error(`Ошибка при обновлении города ${cityName}:`, error);
      });
  }

  function deleteWeather(cityName) {
    const targetCity = weatherGroups.find((item) => item.name === cityName);

    if (targetCity && targetCity.isFavorite) {
      return;
    }

    const updatedGroup = weatherGroups.filter((item) => item.name !== cityName);
    setWeatherGroups(updatedGroup);
    saveToFirestore(updatedGroup); ////////////////////////////////////////////////

    if (updatedGroup.length === 0) {
      setWeatherData(null);
      setCity("");
    } else if (city.toLocaleLowerCase() === cityName.toLocaleLowerCase()) {
      setCity("");
    }

    if (selectedCityData?.name === cityName) {
      setSelectedCityData(null);
    }
    if (forecastCity === cityName) {
      setForecastCity(null);
    }
  }

  return (
    <>
      <Dashboard onAddCity={addCity} />
      <section className="saveWeather">
        {weatherGroups.map((weatherGroup) => (
          <div className="saveWeather-container" key={weatherGroup.name}>
            <div className="saveWeather-container-box1">
              <p className="saveWeather-container-box1-textCity">
                {weatherGroup.name}
              </p>
              <p className="saveWeather-container-box1-textCountry">
                {weatherGroup.country}
              </p>
            </div>
            <p className="saveWeather-container-textTime">
              {weatherGroup.time}
            </p>
            <div className="saveWeather-container-box2">
              <button className="saveWeather-container-box2-btnHourly">
                Hourly forecast
              </button>
              <button
                className="saveWeather-container-box2-btnWeekly"
                onClick={() => weeklyForecast(weatherGroup.name)}
              >
                Weekly forecast
              </button>
            </div>
            <div className="saveWeather-container-box3">
              <p className="saveWeather-container-box3-textDate">
                {weatherGroup.date}
              </p>
              <p className="saveWeather-container-box3-textDay">
                {weatherGroup.dayOfTheWeek}
              </p>
            </div>
            <img
              src={weatherGroup.icon}
              alt=""
              className="saveWeather-container-icon"
            />
            <h2 className="saveWeather-container-name">
              {weatherGroup.temp}°C
            </h2>
            <div className="saveWeather-container-box4">
              <GrRefresh
                className="saveWeather-container-box4-refresh"
                onClick={() => updateWeather(weatherGroup.name)}
              />
              {weatherGroup.isFavorite ? (
                <FaHeart
                  className="saveWeather-container-box4-regHeart"
                  onClick={() => favoritesCity(weatherGroup.name)}
                />
              ) : (
                <FaRegHeart
                  className="saveWeather-container-box4-regHeart"
                  onClick={() => favoritesCity(weatherGroup.name)}
                />
              )}

              <button
                className="saveWeather-container-box4-btn"
                onClick={() => seeMore(weatherGroup)}
              >
                See more
              </button>
              <MdDelete
                className="saveWeather-container-box4-delete"
                onClick={() => deleteWeather(weatherGroup.name)}
              />
            </div>
          </div>
        ))}
      </section>
      <MoreInfo data={selectedCityData} />
      <EightDaysWeather cityName={forecastCity} />
    </>
  );
}

export default SaveWeather;
