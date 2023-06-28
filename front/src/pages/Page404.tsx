import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";

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
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
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
