import { useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Rating, Box, Link } from "@mui/material";
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
        flexDirection: "column",
        minHeight: "600px",
        maxWidth: "60vw",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        alt="book-cover image"
        height="400"
        image={book?.volumeInfo.imageLinks.thumbnail}
        style={{ objectFit: "contain" }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "1rem",
        }}
      >
        <Typography variant="h6" component="div">
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
          Rating: <Rating value={book?.volumeInfo.averageRating || 5} readOnly />
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {book?.volumeInfo.description || "No description"}
        </Typography>
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
