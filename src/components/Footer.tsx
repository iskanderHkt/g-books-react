import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#2196f3",
        marginTop: "auto",
        boxShadow: "none",
      }}
    >
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="body2" color="inherit">
          © {new Date().getFullYear()} Your Website
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
