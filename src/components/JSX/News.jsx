import { useState, useEffect } from "react";
import "../CSS/News.css";

function News(params) {
  const [newsData, setNewsData] = useState(null);
  const [numberOfNews, setNumberOfNews] = useState(4);

  useEffect(() => {
    const apiKey = "74ebc76ef0ff4d90873ae8f47932b039";
    const category = "catastrophe";
    const url = `https://newsapi.org/v2/everything?qInTitle=${category}&sortBy=publishedAt&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Помилка мережі: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data.articles);
        setNewsData(data.articles);
      })
      .catch((error) => {
        console.error(`Виникла помилка при отриманні даних:`, error);
      });
  }, []);

  function moreNews(params) {
    setNumberOfNews((numberOfNews) => numberOfNews + 4);
  }
  function hideNews(params) {
    setNumberOfNews(4);
  }

  return (
    <section className="news">
      <h2 className="news-name">Interacting with our pets</h2>
      <div className="news-container">
        {newsData === null ? (
          <p>Завантаження новин...</p>
        ) : (
          newsData
            .filter((newData) => newData.urlToImage)
            .slice(0, numberOfNews)
            .map((newData, index) => {
              return (
                <div className="news-container-box" key={newData.url || index}>
                  <img
                    src={newData.urlToImage}
                    alt=""
                    className="news-container-box-photo"
                  />
                  <p className="news-container-box-text">{newData.title}</p>
                </div>
              );
            })
        )}
      </div>
      <div className="news-container2">
        <button className="news-container2-btn" onClick={moreNews}>
          See more
        </button>
        <button
          className="news-container2-btnHide"
          style={{ display: numberOfNews > 4 ? "block" : "none" }}
          onClick={hideNews}
        >
          Hide All
        </button>
      </div>
    </section>
  );
}

export default News;
