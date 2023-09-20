import React from "react";
import MainLayout from "src/layouts/view/MainLayout";
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  Switch,
  MenuItem,
  FormControlLabel,
  FormGroup,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
import { GetServerSideProps } from "next";
import { TranslationText } from "src/models/SharedModels";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { validateToken } from "src/utils/tokenUtils";

type NewIntegrationProps = {
  translations: TranslationText[];
}

const NewIntegration = ({
  translations
}: NewIntegrationProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const [type, setType] = React.useState("");
  const handleChange = (e: any) => {
    setType(e.target.value);
  };

  return (
    <>
      <MainLayout removeFooter translations={translations}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: { xs: 2, md: 4 },
          }}
        >
          <Typography variant="h4">New Integration</Typography>
          <TextField
            fullWidth
            label="Name"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            multiline
            label="Description"
            minRows={8}
            maxRows={8}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-standard-label" shrink={true}>
              Type
            </InputLabel>
            <Select
              notched={true}
              labelId="demo-simple-select-standard-label"
              value={type}
              placeholder="Type"
              onChange={handleChange}
              fullWidth
              label="Type"
            >
              <MenuItem value={10}>Email</MenuItem>
              <MenuItem value={20}>Webhook</MenuItem>
            </Select>
          </FormControl>
          <FormGroup sx={{ display: "inline" }}>
            <FormControlLabel
              label="Create"
              control={<Switch />}
            ></FormControlLabel>
            <FormControlLabel
              label="Read"
              control={<Switch />}
            ></FormControlLabel>
            <FormControlLabel
              label="Update"
              control={<Switch />}
            ></FormControlLabel>
            <FormControlLabel
              label="Delete"
              control={<Switch />}
            ></FormControlLabel>
          </FormGroup>
          <TextField
            fullWidth
            multiline
            label="Emails"
            minRows={4}
            maxRows={6}
            InputLabelProps={{ shrink: true }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined">Back to integrations</Button>
            <Button variant="contained">Save</Button>
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const verifyToken = await validateToken(context);

  if(verifyToken){
    return verifyToken;
  }

  return await getTranslations("integrations", context);
};

export default NewIntegration;