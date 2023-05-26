import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

function ListAccess() {
  return (
    <>
      <Box sx={{ my: 2, display: "flex" }}>
        <Avatar sx={{ mr: 1, backgroundColor: "black" }}>SŠ</Avatar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="body1">Sead Šijerkić</Typography>
            <Typography variant="body2">email@example.com</Typography>
          </Box>
          <Typography variant="body2">Owner</Typography>
        </Box>
      </Box>
      <Box sx={{ my: 2, display: "flex" }}>
        <Avatar sx={{ mr: 1, backgroundColor: "darkblue" }}>JD</Avatar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="body1">John Doe</Typography>
            <Typography variant="body2">mail@example.com</Typography>
          </Box>
          <Typography variant="body2">Read/Edit</Typography>
        </Box>
      </Box>
    </>
  );
}

export default ListAccess;
