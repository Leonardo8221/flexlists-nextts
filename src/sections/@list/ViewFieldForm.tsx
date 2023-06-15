import { useState, useEffect } from "react";
import {
  Button,
  Stack,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ViewField } from "src/models/ViewField";
import { isSucc } from "src/models/ApiResponse";
import { ErrorConsts } from "src/constants/errorConstants";
import { fieldService } from "src/services/field.service";

interface ViewFieldFormProps {
  viewId: number;
  field: ViewField;
  onUpdate: (field: ViewField) => void;
  onClose: () => void;
}
export default function ViewFieldForm({
  viewId,
  field,
  onUpdate,
  onClose,
}: ViewFieldFormProps) {
  const theme = useTheme();
  const [currentField, setCurrentField] = useState<ViewField>(field);
  const [error, setError] = useState<string>("");

  const [submit, setSubmit] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setSubmit(false);
    if (field) {
      setCurrentField(field);
    }
  }, [field]);

  const handleSubmit = async () => {
    setSubmit(true);
    var updateViewFieldResponse = await fieldService.updateViewField(
      viewId,
      currentField.id,
      currentField.viewFieldColor,
      currentField.viewFieldName,
      currentField.viewFieldDetailsOnly,
      currentField.viewFieldVisible
    );
    if (isSucc(updateViewFieldResponse)) {
      onUpdate(currentField);
    } else {
      setError(ErrorConsts.InternalServerError);
      return;
    }

    onClose();
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newField = Object.assign({}, currentField);
    newField.viewFieldName = event.target.value;
    setCurrentField(newField);
  };
  const onDetailsOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newField = Object.assign({}, currentField);
    newField.viewFieldDetailsOnly = event.target.checked;
    setCurrentField(newField);
  };
  const onVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newField = Object.assign({}, currentField);
    newField.viewFieldVisible = event.target.checked;
    setCurrentField(newField);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack>
        <Box>{error && <Alert severity="error">{error}</Alert>}</Box>
      </Stack>
      <Stack
        sx={{
          // width: '100%',
          // minWidth: { xs: '300px', sm: '360px', md: '400px' },
          paddingTop: 1,
        }}
      >
        <TextField
          label="Name"
          name="name"
          size="small"
          value={currentField.viewFieldName}
          onChange={onNameChange}
          required
          error={submit && !currentField.viewFieldName}
        />
        <FormGroup sx={{ mt: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={currentField.viewFieldDetailsOnly}
                onChange={onDetailsOnlyChange}
                name="required"
              />
            }
            label="DetailsOnly"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={currentField.viewFieldVisible}
                onChange={onVisibleChange}
                name="required"
              />
            }
            label="Visible"
          />
        </FormGroup>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button onClick={onClose} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Update Field
        </Button>
      </Box>
    </form>
  );
}
