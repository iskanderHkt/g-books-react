import { Container, Grid, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";
import base_api from '../data/base_api'

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: [string];
    categories: [string];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

interface CategorySectionProps {
  categoryName: string;
}

const apiKey = import.meta.env.VITE_NEW_API_KEY;

const CategorySection = ({ categoryName }: CategorySectionProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const cachedData = localStorage.getItem(`cachedData_${categoryName}`);

        if (cachedData) {
          setBooks(JSON.parse(cachedData));
        } else {
          const response = await axios.get(
            `${base_api}?q=subject:${categoryName}&orderBy=relevance&maxResults=9&key=${apiKey}`
          );
          const data = response.data.items || [];
          localStorage.setItem(
            `cachedData_${categoryName}`,
            JSON.stringify(data)
          );
          setBooks(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books: ", error);
        setLoading(false);
      }
    };

    getBooks();
  }, [categoryName]);

  const renderBookCards = () => {
    return books.map((elem) => (
      <Grid key={elem.id} item xs={12} sm={12} md={6} lg={4} xl={4}>
        <BookCard
          id={elem.id}
          title={elem.volumeInfo.title}
          authors={elem.volumeInfo.authors}
          imageLinks={elem.volumeInfo.imageLinks}
          categories={elem.volumeInfo.categories}
        />
      </Grid>
    ));
  };

  return (
    <Container maxWidth="xl" sx={{ width: "100%", margin: '5rem auto' }}>
      {loading ? (
        <Grid container sx={{ padding: "1rem 3rem" }} spacing={2} rowSpacing={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={4}>
              <Skeleton variant="rectangular" width={300} height={150} animation="wave" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Container maxWidth="xl" sx={{ width: "100%" }}>
          <Link to={`/categoryBooks/${categoryName}`} style={{ textDecoration: "none", color: "inherit", display: "block", width: "max-content" }}>
            <Typography sx={{ marginTop: "2rem", color:'#fff', marginLeft: "2.5rem", "&:hover": { cursor: "pointer", color: "#3498db" } }} variant="h4" component="p">
              Popular {categoryName} books
            </Typography>
          </Link>

          <Grid container sx={{ padding: "1rem 3rem" }} spacing={2} rowSpacing={2}>
            {renderBookCards()}
          </Grid>

          <Link to={`/categoryBooks/${categoryName}`} style={{ textDecoration: "none", color: "inherit", display: "block", width: "max-content", margin: "0 auto" }}>
            <Typography sx={{ textAlign: "center",  color:'#fff', "&:hover": { cursor: "pointer", color: "#3498db" } }} variant="h5" component="p">
              Show more
            </Typography>
          </Link>
        </Container>
      )}
    </Container>
  );
};

export default CategorySection;
