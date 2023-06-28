import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, you are not authorized for this page!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, you need to have an account to access this page!!!
          </Typography>

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
            sx={{ mx: "auto", my: { xs: 5, sm: 10 } }}
          >
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
