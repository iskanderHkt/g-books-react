import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, CardMedia, Container } from "@mui/material";
import base_api from "../data/base_api";

interface BookDetails {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      },
      {
        type: string;
        identifier: string;
      }
    ];
    pageCount: number;
    categories: string[];
    maturityRating: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      medium: string;
    };
  };
}

const apiKey = import.meta.env.VITE_NEW_API_KEY;

const BookPage = () => {
  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const cachedData = localStorage.getItem(`cachedBookDetails_${bookId}`);

        if (cachedData) {
          setBookDetail(JSON.parse(cachedData));
        }

        const response = await axios.get(`${base_api}/${bookId}?key=${apiKey}`);
        const data = response.data;

        setBookDetail(data);
        localStorage.setItem(
          `cachedBookDetails_${bookId}`,
          JSON.stringify(data)
        );
      } catch (error) {
        console.error("Error fetching book details: ", error);
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
  }, [bookId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Paper sx={{ padding: 5, margin: "10rem 15rem" }}>
      <Container>
        <CardMedia
          component="img"
          alt=""
          image={bookDetail?.volumeInfo.imageLinks.thumbnail}
          sx={{
            maxWidth: "200px",
            maxHeight: "300px",
            margin: "auto",
          }}
        />
      </Container>
      <Typography variant="h4" gutterBottom>
        Title: {bookDetail?.volumeInfo.title.replace(/\([^)]*\)/g, "")}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Author(s):{" "}
        {bookDetail?.volumeInfo.authors
          ? bookDetail.volumeInfo.authors.join(", ")
          : "Not available"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Publisher: {bookDetail?.volumeInfo.publisher}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Publish Date: {bookDetail?.volumeInfo.publishedDate}
      </Typography>
      <Typography variant="body1" paragraph>
        {bookDetail?.volumeInfo.description
          .replace(/<p[^>]*>/g, "")
          .replace(/<[/]p[^>]*>/g, "")
          .replace(/<br>/g, "\n")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        ISBN:{" "}
        {bookDetail?.volumeInfo.industryIdentifiers
          ? String(bookDetail.volumeInfo.industryIdentifiers[0].identifier)
          : "not provided"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Page Count: {bookDetail?.volumeInfo.pageCount}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Categories:{" "}
        {bookDetail?.volumeInfo.categories
          ? bookDetail.volumeInfo.categories.join(", ")
          : "Not available"}
      </Typography>
    </Paper>
  );
};

export default BookPage;
