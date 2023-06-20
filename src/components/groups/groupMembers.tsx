import React from "react";
import {
  Box,
  Typography,
  Grid,
  FormLabel,
  Button,
  TextField,
  Divider,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function GroupMembers() {
  return (
    <Box>
      <Typography
        variant="subtitle1"
        component={"h6"}
        sx={{ textTransform: "uppercase" }}
      >
        Add members
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField sx={{ my: 1 }} placeholder="Email address" fullWidth />

          <FormLabel
            sx={{
              fontSize: { xs: 12 },
            }}
            id="multiple-email-address"
          >
            (multiple emails separate using comma)
          </FormLabel>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
        >
          <Button
            disabled
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              height: "56px",
            }}
          >
            Add user(s)
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subtitle1"
          component={"h6"}
          sx={{ textTransform: "uppercase" }}
        >
          Members
        </Typography>
        <Typography
          variant="subtitle1"
          component={"span"}
          sx={{ textTransform: "uppercase" }}
        >
          (1)
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
          p: 1,
          borderRadius: 1,
          "&:hover": {
            background: "#eee",
          },
          "&:hover .deleteMember": {
            display: "block",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar>A</Avatar>
          <Typography variant="body1">John Doe</Typography>
        </Box>
        <CloseIcon
          sx={{ display: "none", cursor: "pointer" }}
          className="deleteMember"
        />
      </Box>
    </Box>
  );
}

export default GroupMembers;
