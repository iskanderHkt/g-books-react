import { Container, Typography, Grid } from "@mui/material";
import BookCard from "../components/BookCard";
import { useBooksContext } from "../BookContext";

const SearchBooksPage = () => {
  const { books } = useBooksContext();

  return (
    <Container
      maxWidth="xl"
      sx={{ width: "100%", margin: "10rem 0 10rem 18rem" }}
    >
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Books by your search
      </Typography>
      <Grid container spacing={2} rowSpacing={2}>
        {books.map((book) => (
          <Grid key={book.etag} item xs={12} sm={12} md={6} lg={4} xl={4}>
            <BookCard
              id={book.id}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors}
              imageLinks={book.volumeInfo.imageLinks}
              categories={book.volumeInfo.categories}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchBooksPage;
