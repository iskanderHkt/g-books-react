import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  authors: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  categories: string[];
}

const emptyImg =
  "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymxhbmt8ZW58MHx8MHx8fDA%3D";

const BookCard = ({ id, title, authors, imageLinks, categories }: BookCardProps) => {
  return (
    <Link to={`/book/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card elevation={6} sx={{
        display: "flex",
        width: "100%",
        height: "18em",
        borderWidth: "5px",
        justifyContent: "space-between",
        flexDirection: "column-reverse",
        maxHeight: "30em",
        alignItems: "center",
        '@media (min-width: 576px)': {
          flexDirection: "row",
          alignItems: "stretch",
        },
      }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", sm: "70%" } }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5" sx={{ fontSize: "1.5rem" }}>
              {title.replace(/\([^)]*\)/g, "")}
            </Typography>
            <Typography variant="subtitle1" color="text.primary" component="div">
              Authors: {authors && authors.length > 0 ? authors[0] : "Unknown"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Categories: {categories && categories.length > 0 ? categories.join(", ") : "Unknown"}
            </Typography>
          </CardContent>
          <Button sx={{
            width: "100%",
            marginTop: { xs: "1rem", sm: "auto" },
            backgroundColor: "#29b6f6",
            color: "#fff",
            border: "none",
            fontSize: "1rem",
            fontWeight: "600",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            '@media (min-width: 576px)': {
              width: "40%",
              marginLeft: "0.5rem",
              marginTop: "auto",
            },
            '&:hover': {
              backgroundColor: "#18a0f0",
            },
          }}>
            Buy
          </Button>
        </Box>
        <Box sx={{width: { xs: '100%', sm: '50%' }, backgroundColor: '#165a72'}}>
          <CardMedia
            component="img"
            image={imageLinks ? imageLinks.thumbnail : emptyImg}
            alt="book-cover image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }}
          />
        </Box>
      </Card>
    </Link>
  );
};

export default BookCard;
