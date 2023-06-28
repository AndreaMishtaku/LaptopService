import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import useGetUser from "../../../hooks/useGetUser";
const AdminDashboard = () => {
  const user = useGetUser();
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Card
        sx={{
          maxWidth: 500,
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Pershendetje {user.firstName} {user.lastName}!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
            quod amet adipisci! Dolor veritatis molestiae minima nihil. Sapiente
            repellendus autem fuga veniam ullam. Velit tenetur molestias
            eligendi similique, quia fuga?
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
