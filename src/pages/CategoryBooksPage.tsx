import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import base_api from '../data/base_api'

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

const apiKey = import.meta.env.VITE_NEW_API_KEY;

const CategoryBooksPage = () => {
  const { category } = useParams();

  const [categoryBooks, setCategoryBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategoryBooks = async () => {
      try {
        const cachedData = localStorage.getItem(`cachedCategoryBooks_${category}`);

        if (cachedData) {
          setCategoryBooks(JSON.parse(cachedData));
        }

        const response = await axios.get(`
          ${base_api}?q=subject:${category}&orderBy=relevance&maxResults=15&key=${apiKey}
        `);

        const data = response.data.items || [];

        setCategoryBooks(data);

        localStorage.setItem(`cachedCategoryBooks_${category}`, JSON.stringify(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCategoryBooks();
  }, [category]);

  return (
    <Container maxWidth="xl" sx={{ width: "100%", margin: "10rem 0 10rem 18rem" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Popular {category} books
      </Typography>
      <Grid container spacing={2} rowSpacing={2}>
        {loading ? (
          <p>Loading...</p>
        ) : categoryBooks.length ? (
          categoryBooks.map((book) => (
            <Grid key={book.id} item xs={12} sm={12} md={6} lg={4} xl={4}>
              <BookCard
                id={book.id}
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors}
                imageLinks={book.volumeInfo.imageLinks}
                categories={book.volumeInfo.categories}
              />
            </Grid>
          ))
        ) : (
          <p>No books available for this category.</p>
        )}
      </Grid>
    </Container>
  );
};

export default CategoryBooksPage;
