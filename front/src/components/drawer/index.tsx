import React from "react";
import { Box, Drawer as DrawerMaterialUi, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IDrawer {
  title: string;
  open: boolean;
  children: any;
  actions?: any;
  onClose?: () => void;
}

const Drawer = (props: IDrawer) => {
  const { title, open, children, actions, onClose } = props;
  return (
    <DrawerMaterialUi
      anchor="right"
      open={open}
      onClose={() => onClose()}
      ModalProps={{ keepMounted: true }}
      sx={{
        position: "relative",
        "& .MuiDrawer-paper": { width: ["100%", "50%", "35%"] },
      }}
    >
      <Box
        sx={{
          position: "relative",
          padding: "1rem 2rem",
          marginBottom: "1rem",
        }}
      >
        <Typography sx={{ color: "text.secondary" }} variant="h6">
          {title}
        </Typography>
        <CloseIcon
          sx={{
            right: 20,
            top: "50%",
            position: "absolute",
            color: "text.secondary",
            transform: "translateY(-50%)",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => onClose()}
        />
      </Box>
      <Box px="2rem">{children}</Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          gap: "0.5rem",
          position: "absolute",
          bottom: 0,
          padding: "0.8rem",
          zIndex: 1,
        }}
      >
        {actions}
      </Box>
    </DrawerMaterialUi>
  );
};

export default Drawer;
