import React from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";

const RegistrationPage: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        margin: "10rem auto",
        padding: "5rem 2rem",
        backgroundColor: "#FFF",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        color={"#1fa755"}
        margin={"0 0 3rem 0"}
      >
        Registration
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1fa755", // Цвет границы при выделении
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1fa755", // Цвет текста при выделении
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1fa755", // Цвет границы при выделении
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1fa755", // Цвет текста при выделении
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1fa755", // Цвет границы при выделении
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1fa755", // Цвет текста при выделении
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1fa755", // Цвет границы при выделении
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1fa755", // Цвет текста при выделении
                },
              }}
            />
          </Grid>
          <Grid item xs={12} margin={"3rem 0 0 0"}>
            <Button
              sx={{ padding: "1.5rem 0", backgroundColor:'#1fa755' }}
              variant="contained"
              fullWidth
              type="submit"
            >
              <Typography variant="h5">Register</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegistrationPage;
