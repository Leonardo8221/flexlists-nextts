import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ViewField } from "src/models/ViewField";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, Link } from "@mui/material";
import { listContentService } from "src/services/listContent.service";
import { isSucc } from "src/models/ApiResponse";
import { Theme, useTheme } from '@mui/material/styles';
import { connect } from "react-redux";
import { View } from "src/models/SharedModels";
import { useRouter } from "next/router";

type SublistFieldProps = {
  column: ViewField;
  isPrint: boolean;
  currentMode: string;
  values: any;
  submit: boolean;
  currentView: View;
  setValues: (values: any[]) => void;
};

const SublistField = ({
  column,
  isPrint,
  currentMode,
  values,
  submit,
  currentView,
  setValues
}: SublistFieldProps) => {
  const theme = useTheme();
  const [relationValues, setRelationValues] = useState<any[]>([]);
  const router = useRouter();
  const [ppid, setPpid] = useState('');

  useEffect(() => {
    if (router.query.cpid) {
      const oldPpid = router.query.ppid ? `${router.query.ppid};` : '';
      setPpid(`${oldPpid}${router.query.cpid}`);
    }
  }, [router.isReady]);

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

  const getStyles = (name: string, theme: Theme) => {
    return {
      fontWeight:
      !values || !values[column.id] || values[column.id].indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

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
        multiple
      >
        {column?.config?.values &&
          relationValues.map((value: any) => (
            <MenuItem
              key={value.id}
              value={value.id}
              style={getStyles(value.id, theme)}
            >
              {value[column.config.values.rightFieldId]}
            </MenuItem>
          ))}
      </Select>
      {values && values[column.id] && (currentMode === "view" || isPrint) && <Link sx={{ marginTop: 1, textAlign: 'right' }} href={`/main/views/${column.config.values.viewId}?${ppid ? 'ppid=' + ppid + '&' : ''}cpid=${currentView.id}-${column.id}-${values.id}`}>Subview</Link>}
    </FormControl>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView
});

export default connect(mapStateToProps)(SublistField);
