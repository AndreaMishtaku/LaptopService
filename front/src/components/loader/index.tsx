import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      height={"100%"}
      alignItems={"center"}
    >
      <CircularProgress color="primary" size={70} />
    </Box>
  );
};

export default Loader;
