import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Box,
  Divider,
  Typography,
  Card,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import LoginIcon from "@mui/icons-material/Login";
import { login } from "../../../redux/stores/user";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "auto",
  alignItems: "center",
  flexDirection: "column",
  padding: "2rem",
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "55%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "30%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "25%",
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { control, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (data: any) => {
    await dispatch(login(data)).then((res: any) => {
      if (!res.error) {
        navigate(`/${res.payload.role?.toLowerCase()}/dashboard`);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <StyledCard>
        <Box textAlign={"center"} marginBottom={5}>
          <Typography variant="h4" gutterBottom>
            Sign in <LoginIcon fontSize="small" />
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary" }}>
            Laptop Service
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack spacing={3}>
            <Controller
              control={control}
              name={"email"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField label="Email" value={value} onChange={onChange} />
              )}
            />

            <Controller
              control={control}
              name={"password"}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Stack>

          <Box marginTop={5} textAlign={"center"}>
            <Button fullWidth size="large" type="submit" variant="contained">
              Login
            </Button>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <Typography>
              Dont have an account <Link to="/register">Register</Link>
            </Typography>
            <Link to="/">Back to home page</Link>
          </Box>
        </form>
      </StyledCard>
    </Box>
  );
};

export default Login;
