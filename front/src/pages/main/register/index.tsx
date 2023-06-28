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
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { toast } from "react-hot-toast";

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

const Register = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (data: any) => {
    const response = await axios.post("/auth/register", { ...data });

    if (response.data.result) {
      toast.success(response.data.message);
      navigate("/login");
    }
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
        <Box textAlign={"center"} marginBottom={3}>
          <Typography variant="h4" gutterBottom>
            Register <PersonIcon />
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary" }}>
            Laptop Service
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name={"firstName"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="First name"
                  value={value}
                  size="small"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"lastName"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Last name"
                  value={value}
                  size="small"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"address"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Address"
                  size="small"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"education"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Education"
                  size="small"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name={"birthday"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => {
                return (
                  <Box display={"flex"} gap={2}>
                    <Typography>Birthday</Typography>
                    <input
                      type="date"
                      value={value}
                      onChange={onChange}
                      style={{ width: "100%" }}
                    />
                  </Box>
                );
              }}
            />
            <Controller
              control={control}
              name={"email"}
              rules={{ required: true }}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Email"
                  type="email"
                  size="small"
                  value={value}
                  onChange={onChange}
                />
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
                  size="small"
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

          <Box marginTop={3} textAlign={"center"}>
            <Button fullWidth size="large" type="submit" variant="contained">
              Register
            </Button>
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <Link to="/login">Go to login</Link>
          </Box>
        </form>
      </StyledCard>
    </Box>
  );
};

export default Register;
