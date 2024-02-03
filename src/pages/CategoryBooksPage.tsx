import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import base_api from "../data/base_api";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Book {
  id: string;
  etag: string;
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
const itemsPerPage = 9;

const CategoryBooksPage = () => {
  const { category } = useParams();

  const [categoryBooks, setCategoryBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(6);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  if (totalPages === 7) {
    setTotalPages(6);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(event.target);

    setPage(value);
  };

  useEffect(() => {
    if (currentCategory !== category) {
      setCurrentCategory(category!);
      setPage(1);
    }

    const getCategoryBooks = async () => {
      try {
        const cachedData = localStorage.getItem(
          `cachedCategoryBooks_${category}_page_${page}`
        );

        if (cachedData) {
          setCategoryBooks(JSON.parse(cachedData));
        } else {
          const startIndex = (page - 1) * itemsPerPage;
          const response = await axios.get(
            `${base_api}?q=subject:${category}&orderBy=relevance&maxResults=9&startIndex=${startIndex}&key=${apiKey}`
          );

          const data = response.data.items || [];
          setCategoryBooks(data);

          localStorage.setItem(
            `cachedCategoryBooks_${category}_page_${page}`,
            JSON.stringify(data)
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getCategoryBooks();
  }, [category, page]);

  return (
    <Container maxWidth="xl" sx={{ width: "100%", margin: "10rem auto" }}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Popular {category} books
      </Typography>
      <Container
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          paddingBottom: "5rem",
        }}
      >
        <Stack
          sx={{ borderRadius: "20px", backgroundColor: "#fff" }}
          spacing={2}
        >
          <Pagination
            size="large"
            sx={{
              margin: "0 auto",
              color: "#fff",
              "& .Mui-selected": {
                backgroundColor: "#1fa755",
              },
            }}
            color="primary"
            count={totalPages}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Container>
      <Grid container spacing={2} rowSpacing={2}>
        {loading ? (
          <p>Loading...</p>
        ) : categoryBooks.length ? (
          categoryBooks.map((book) => (
            <Grid key={book.etag} item xs={12} sm={12} md={6} lg={4} xl={4}>
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
      <Container
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          paddingTop: "5rem",
        }}
      >
        <Stack
          sx={{ borderRadius: "20px", backgroundColor: "#fff" }}
          spacing={2}
        >
          <Pagination
            size="large"
            sx={{
              margin: "0 auto",
              color: "#fff",
              "& .Mui-selected": {
                backgroundColor: "#1fa755",
              },
            }}
            color="primary"
            count={totalPages}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Container>
    </Container>
  );
};

export default CategoryBooksPage;
