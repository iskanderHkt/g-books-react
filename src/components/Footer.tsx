import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2ecc709f",
        marginTop: "auto",
        boxShadow: "none",
      }}
    >
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography fontSize={'1.5rem'} variant="body2" color="inherit">
          © {new Date().getFullYear()} Books Website
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
