import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDisplayContext } from "../DisplayContext";
import { GiHamburgerMenu, GiBlackBook } from "react-icons/gi";
import categories from "../data/categories";
import { useEffect } from "react";

const drawerWidth = "18rem";

const AppDrawer = () => {
  const { display, setDisplay } = useDisplayContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Проверяем, существует ли event.target и у него есть ли метод closest
      if (target.closest && !target.closest("#drawer-container")) {
        // Проверяем, что не было клика по кнопке с исключением
        if (!target.closest("#exception-button")) {
          setDisplay("none");
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setDisplay]);

  return (
    <Container
      sx={{
        display: { display },
        overflowX: "hidden",
      }}
    >
      <Drawer
        sx={{
          display: { display },
          width: drawerWidth,
          flexShrink: 0,
          overflow: "hidden",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            overflowX: "hidden",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          id="exception-button"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2196f3",
            padding: "0.6rem 0 0.6rem 1.5rem",
          }}
        >
          <Typography component="div" className="logo-text">
            <Button
              onClick={() =>
                display === "none" ? setDisplay("block") : setDisplay("none")
              }
              color="inherit"
            >
              <Typography sx={{ marginTop: "1rem" }} variant={"h4"}>
                <GiHamburgerMenu style={{ transform: "rotate(90deg)" }} />
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
          </Typography>
        </Box>

        <Toolbar
          id="exception-button"
          sx={{ padding: "0.5rem", width: drawerWidth }}
        >
          <Typography variant="h5">books by category</Typography>
        </Toolbar>
        <Divider
          id="exception-button"
          sx={{
            borderTop: "1px solid #000",
            // Толщина и цвет верхней границы
          }}
        />
        <List sx={{ overflowX: "hidden", direction: "ltr" }}>
          {categories.map((category) => (
            <ListItem
              key={category}
              disablePadding
              sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
            >
              <Link
                onClick={() => setDisplay("none")}
                to={`/categoryBooks/${category}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItemButton
                  sx={{
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <ListItemText primary={category} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Container>
  );
};

export default AppDrawer;
