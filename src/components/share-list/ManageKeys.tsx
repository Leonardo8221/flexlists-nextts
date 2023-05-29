import React from "react";
import {
  Grid,
  Button,
  FormLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";

function ManageKeys() {
  const [age, setAge] = React.useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <Grid container spacing={2} sx={{ alignItems: "flex-end" }}>
        <Grid item xs={2} sx={{ display: "flex", flexDirection: "column" }}>
          <FormLabel>
            <Typography variant="body2">Access / Role</Typography>
          </FormLabel>
          <Select value={age} onChange={handleSelectChange}>
            <MenuItem value="1">Role 1</MenuItem>
            <MenuItem value="2">Role 2</MenuItem>
            <MenuItem value="3">Role 3</MenuItem>
          </Select>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <FormLabel>
            <Typography variant="body2">Key Link</Typography>
          </FormLabel>
          <TextField
            placeholder="https://flexlists.com/key/klsdghjlsjkdghjshkjfgsahljfda"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <ContentCopyIcon sx={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormLabel>
            <Typography variant="body2">Info</Typography>
          </FormLabel>
          <TextField
            placeholder="Key for John Doe - Sales person"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <EditIcon sx={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Button
            fullWidth
            variant="text"
            sx={{ borderColor: "red", color: "red", height: "56px" }}
          >
            Delete Key
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ManageKeys;
