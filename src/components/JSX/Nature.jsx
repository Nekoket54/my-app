import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/effect-coverflow";

import "../CSS/Nature.css";

function Nature(params) {
  const [naturesData, setNaturesData] = useState(null);

  useEffect(() => {
    const apiKey = "54839845-ecc702470be11698bbf4f3867";
    const category = "forest";
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${category}&image_type=photo`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Помилка мережі: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data.hits);
        setNaturesData(data);
      })
      .catch((error) => {
        console.error(`Виникла помилка при отриманні даних:`, error);
      });
  }, []);

  return (
    <section className="nature">
      <h2 className="nature-name">Beautiful nature</h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        slidesPerGroup={1}
        loop={true}
        speed={600}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        className="mySwiper"
      >
        {naturesData === null ? (
          <p>Завантаження зображеннь...</p>
        ) : (
          naturesData.hits.map((natureData, index) => {
            return (
              <SwiperSlide>
                <img
                  src={natureData.webformatURL}
                  alt="nature"
                  loading="eager"
                />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </section>
  );
}

export default Nature;
