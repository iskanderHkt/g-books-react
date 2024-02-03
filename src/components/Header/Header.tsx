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
import { GiBlackBook, GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";

import { useBooksContext } from "../../BookContext";
import { useNavigate } from "react-router-dom";
import { useDisplayContext } from "../../DisplayContext";

import "./HeaderStyles/Header.css";

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
    [theme.breakpoints.down("sm")]: { width: "30em" },
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const apiKey = import.meta.env.VITE_NEW_API_KEY;

const categories = ["all", "book", "author"];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { books, setBooks } = useBooksContext();
  const { display, setDisplay } = useDisplayContext();

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
          case "book":
            query = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${searchQuery}&orderBy=relevance&maxResults=9&key=${apiKey}`;
            break;
          case "author":
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
    navigate("/search-books");
  };

  return (
    <AppBar position="fixed" className="app-bar-container ">
      <Toolbar className="toolbar-container">
        <Box className="left-block">
          <Box
            className="logo-button"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              id="exception-button"
              onClick={() =>
                display === "none" ? setDisplay("block") : setDisplay("none")
              }
              color="inherit"
            >
              <Typography sx={{ marginTop: "1rem" }} variant={"h4"}>
                <GiHamburgerMenu />
              </Typography>
            </Button>
            <Button
              sx={{ margin: "0 1.5rem" }}
              color="inherit"
              component={Link}
              to="/"
            >
              <GiBlackBook size={"4rem"} />
              <Typography>books</Typography>
            </Button>
          </Box>
        </Box>

        <Box className="middle-block">
          <Search className="search-container">
            <SearchIconWrapper>
              <SearchIcon className="search-icon" />
            </SearchIconWrapper>
            <StyledInputBase
              className="search-input"
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
                sx={{ color: "#FFF", padding: "0.5rem" }}
                className="search-button"
                key={category}
                value={category}
              >
                {category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box className="right-block">
          <Button
            color="inherit"
            component={Link}
            to="/account"
            className="account-button"
          >
            <MdAccountCircle size={50} />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
