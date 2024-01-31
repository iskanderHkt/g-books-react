import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const categories = [
  "biography",
  "business",
  "children's",
  "christian",
  "classics",
  "cooking",
  "cryptocurrency",
  "economics",
  "education",
  "fantasy",
  "fiction",
  "food",
  "health",
  "history",
  "home",
  "humor",
  "language",
  "law",
  "literature",
  "mystery",
  "non-fiction",
  "parenting",
  "philosophy",
  "poetry",
  "programming",
  "religion",
  "romance",
  "science",
  "self-help",
  "sports",
  "technology",
  "travel",
  "young-adult",
];

const drawerWidth = "18rem";

const AppDrawer = () => {
  return (
    <Container>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            marginTop: "5rem",
            width: drawerWidth,
            boxSizing: "border-box",
            
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ padding: "1rem" }}>
          <Typography variant="h5">Relevant books by category</Typography>
        </Toolbar>
        <Divider
          sx={{
            borderTop: "1px solid #000", // Толщина и цвет верхней границы
          }}
        />
        <List>
          {categories.map((category) => (
            <ListItem
              key={category}
              disablePadding
              sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
            >
              <Link
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
