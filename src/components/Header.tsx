import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  styled,
  alpha,
  InputBase,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { GiBlackBook } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { useBooksContext } from "../BookContext";
import { useNavigate } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));




const apiKey = import.meta.env.VITE_NEW_API_KEY;

const categories = ["all", "by book", "by author"];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { books, setBooks} = useBooksContext();
  const navigate = useNavigate();

  useEffect(() => {
    // useEffect для отслеживания изменений в books и вывода в консоль
    console.log(books);
  }, [books]);

  const getBooks = async () => {
    let query = "";
    try {
      const cachedData = localStorage.getItem("cachedData");

      if (cachedData) {
        setBooks(JSON.parse(cachedData));
      } else {
        switch (categoryFilter) {
          case "all":
            query = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=relevance&maxResults=9&key=${apiKey}`;
            break;
          case "by book":
            query = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${searchQuery}&orderBy=relevance&maxResults=9&key=${apiKey}`;
            break;
          case "by author":
            query = `https://www.googleapis.com/books/v1/volumes?q=+inauthor:${searchQuery}&orderBy=relevance&maxResults=9&key=${apiKey}`;
            break;
          default:
            break;
        }
        console.log(query);

        const response = await axios.get(query);
        const data = (await response.data.items) || [];
        localStorage.setItem(
          `cachedData_${categoryFilter}`,
          JSON.stringify(data)
        );
        setBooks(data || []);
      }
    } catch (error) {
      console.error("Error fetching books: ", error);
      setBooks([]);
    }
  };

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const onCategoryBtnClick = (value: any) => {
    setCategoryFilter(value);
  };

  const handleSearchSubmit = () => {
    getBooks();
    navigate('/search-books')
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#2196f3" }}>
      <Toolbar style={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "2rem",
            gap: "20rem",
            padding: "0.5rem",
            alignItems: "center",
            borderRadius: "10px",
            margin: "1rem 0",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Button color="inherit" component={Link} to="/">
              <Typography sx={{ marginTop: "1rem" }} variant={"h4"}>
                O
              </Typography>
            </Button> */}
            <Typography component="div">
              <Button color="inherit" component={Link} to="/">
                <GiBlackBook style={{ marginRight: "1rem" }} size={50} />
                <Typography sx={{ marginTop: "1rem" }} variant={"h4"}>
                  books
                </Typography>
              </Button>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ width: "30em" }}
                placeholder="Search books"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
            </Search>
            <ToggleButtonGroup
              value={categoryFilter}
              exclusive
              onChange={(_event, value) => onCategoryBtnClick(value)}
            >
              {categories.map((category) => (
                <ToggleButton
                  key={category}
                  value={category}
                  sx={{ color: "#fff" }}
                >
                  {category}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ display: "flex", marginLeft: '5rem' }}>
            <Button color="inherit" component={Link} to="/account">
              <MdAccountCircle size={50} />
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
