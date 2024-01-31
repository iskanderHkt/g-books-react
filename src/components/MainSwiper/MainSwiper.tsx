import { CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';


import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "./MainSwiper.css";

import axios from "axios";
import MainSwiperContent from "./MainSwiperContent/MainSwiperContent";

import base_api from '../../data/base_api'

interface SliderBook {
  id: string;
}

const apiKey = import.meta.env.VITE_NEW_API_KEY;
const categoryName = 'fantasy'


const MainSwiper = () => {
  localStorage.clear()
  const [sliderBooks, setSliderBooks] = useState<SliderBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const getSliderBooks = async () => {
      try {
        const cachedData = localStorage.getItem("cachedSliderData");

        if (cachedData) {
          setSliderBooks(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await axios.get(
            `${base_api}?q=subject:${categoryName}&orderBy=relevance&maxResults=9&key=${apiKey}`
          );
          const data = (await response.data.items) || [];
          localStorage.setItem(`cachedSliderData`, JSON.stringify(data));

          setLoading(false);
          setSliderBooks(data);
        }
      } catch (error) {
        setError('Error, unsuccessful attempt to retrieve data ')
        setLoading(false);
        return [];
      }
    };

    getSliderBooks();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth={"xl"}
        style={{
          paddingTop: "5rem",
          margin: '5rem 0 0 18rem',
          textAlign: 'center'
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        maxWidth={"xl"}
        style={{
          paddingTop: "5rem",
          margin: '5rem 0 0 18rem',
          textAlign: 'center'
        }}
      >
        <Typography variant={'h5'} color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth={"xl"} style={{ paddingTop: "5rem", margin: '5rem 0 0 18rem' }}>
      <Typography variant="h2" sx={{ textAlign: "center", marginBottom: "2rem" }}>
        Most popular {categoryName} books
      </Typography>
      <Swiper
        style={{ width: "100%" }}
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        className="mySwiper"
        loop={true}
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
      >
        {sliderBooks.map((book) => (
          <SwiperSlide
            key={book.id}
            style={{
              maxWidth: "1920px",
            }}
          >
            <MainSwiperContent id={book.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
    </>
  );
};

export default MainSwiper;
