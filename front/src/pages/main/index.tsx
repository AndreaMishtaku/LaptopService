import {
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const image = require("../../assets/images/laconix.jpg");
const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="relative">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingInline: "1rem",
          }}
        >
          <Typography variant="h6" color="inherit" noWrap>
            L S
          </Typography>

          <Box display="flex" gap={3}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Laptop Service
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              Laptop parts for all models of laptops!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 6 }} maxWidth="md">
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image={image}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Laconix
                </Typography>
                <Typography>Laconix Project for laptop service</Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Worked by Andrea Mishtaku
        </Typography>
        <Copyright />
      </Box>
    </>
  );
};

export default MainPage;
