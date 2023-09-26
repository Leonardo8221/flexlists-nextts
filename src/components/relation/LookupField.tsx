import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ViewField } from "src/models/ViewField";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { listContentService } from "src/services/listContent.service";
import { isSucc } from "src/models/ApiResponse";

type LookupFieldProps = {
  column: ViewField;
  isPrint: boolean;
  currentMode: string;
  values: any;
  submit: boolean;
  setValues: (values: any[]) => void;
};

const LookupField = ({
  column,
  isPrint,
  currentMode,
  values,
  submit,
  setValues
}: LookupFieldProps) => {
  const [relationValues, setRelationValues] = useState<any[]>([]);

  useEffect(() => {
    const getFieldValues = async () => {
      const response = await listContentService.searchContents(
        column.config.values.viewId
      );
      
      const contents: any[] = [];
  
      if (isSucc(response) && response.data && response.data.content) {
        for (const row of response.data.content) {
          contents.push(Object.fromEntries(row))
        }
        
        setRelationValues(contents);
      }
    };

    getFieldValues();
  }, []);

  return (
    <FormControl key={column.id} required={column.required} sx={{ width: '100%' }}>
      <InputLabel id={`${column.id}`} sx={{ top: "-5px" }}>
        {column.name}
      </InputLabel>
      <Select
        key={column.id}
        disabled={currentMode === "view" || isPrint}
        label={column.name}
        id={`${column.id}`}
        value={values && values[column.id] ? values[column.id] : []}
        onChange={(e) =>
          setValues({ ...values, [column.id]: e.target.value })
        }
        size="small"
        error={submit && column.required && !values && !values[column.id]}
      >
        {column?.config?.values &&
          relationValues.map((value: any) => (
            <MenuItem
              key={value.id}
              value={value.id}
            >
              {value[column.config.values.rightFieldId]}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default LookupField;
