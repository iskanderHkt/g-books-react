import { useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Link,
} from "@mui/material";
import base_api from "../../../data/base_api";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      extraLarge: string;
      large: string;
      medium: string;
      small: string;
      smallThumbnail: string;
      thumbnail: string;
    };
    categories: string[];
    averageRating: number;
    description: string;
  };
}

interface MSContentProps {
  id: string;
}

const apiKey = import.meta.env.VITE_NEW_API_KEY;

const MainSwiperContent = ({ id }: MSContentProps) => {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const description = book?.volumeInfo.description
    ?.replace(/<p[^>]*>/g, "")
    .replace(/<[/]p[^>]*>/g, "")
    .replace(/<br>/g, "\n")
    .replace(/<i[^>]*>/g, "")
    .replace(/<[/]i[^>]*>/g, "");

  const truncatedDescription =
    description && description.length > 900
      ? `${description.slice(0, 1000)} ...`
      : description;

  useEffect(() => {
    const getCachedData = () => {
      const cachedData = localStorage.getItem(`cachedBook_${id}`);
      if (cachedData) {
        setBook(JSON.parse(cachedData));
        setIsLoading(false);
      }
    };

    const getBookDetails = async () => {
      try {
        const response = await axios.get(`${base_api}/${id}?key=${apiKey}`);
        const data = response.data;
        setBook(data);
        localStorage.setItem(`cachedBook_${id}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching book details: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Пытаемся получить данные из кэша
    getCachedData();

    // Если данных в кэше нет, выполняем запрос
    if (!book) {
      getBookDetails();
    }
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!book) {
    return <h1>Error loading book details</h1>;
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: "no-gap",
        alignItems: "center",
        maxHeight: "70vh",
        minHeight: "70vh",
        minWidth: "55vw",
        height: "100%",
        margin: "0 auto",
        backgroundColor: "#FFF",
        "@media (max-width: 576px)": {
          width: "100vw",
        },
      }}
    >
      <CardMedia
        component="img"
        alt="book-cover image"
        image={book?.volumeInfo.imageLinks.thumbnail}
        sx={{
          width: "20vw",
          height: "60vh",
          objectFit: "cover",
          border: "5px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          "@media (max-width: 768px)": {
            width: "100%",
            objectFit: "contain",
            padding: "2rem 0",
          },
          "@media (max-width: 576px)": {
            width: "100%",
            objectFit: "contain",
            padding: "2rem 0",
          },
        }}
      />

      <CardContent
        sx={{
          maxWidth: "20vw",
          width: "100%",
          borderRadius: "10px" /* Радиус скругления углов */,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          maxHeight: "30rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "1rem",
          color: "#17202A ",
          "@media (max-width: 768px)": {
            display: "none",
          },
          "@media (max-width: 576px)": {
            display: "none",
          },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ whiteSpace: "pre-line" }}
        >
          {book?.volumeInfo.title || "No Title"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {book?.volumeInfo.categories &&
            book.volumeInfo.categories.map((category) => (
              <Typography
                key={category}
                variant="subtitle2"
                color="text.secondary"
                sx={{ mr: 1 }}
              >
                {category}
              </Typography>
            ))}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Rating:{" "}
          <Rating value={book?.volumeInfo.averageRating || 5} readOnly />
        </Typography>
        <div
          style={{
            textOverflow: "ellipsis",
            maxWidth: "100%", // Ширина блока будет 100%, но с учетом padding
            boxSizing: "border-box", // Чтобы padding не увеличивал ширину блока
            paddingRight: "1rem",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-line", overflow: "hidden" }}
          >
            {truncatedDescription || "No description"}
          </Typography>
        </div>
        <Link
          component={RouterLink}
          to={`/book/${id}`}
          color="primary"
          underline="hover"
          sx={{ mt: "auto" }}
        >
          Learn More
        </Link>
      </CardContent>
    </Card>
  );
};

export default MainSwiperContent;
