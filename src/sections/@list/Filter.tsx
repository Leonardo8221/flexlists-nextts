import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import { fetchRows, setCurrentView } from "../../redux/actions/viewActions";
import useResponsive from "../../hooks/useResponsive";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import {
  BooleanFilterOperatorLabel,
  ChoiceFilterOperatorLabel,
  ColorFilterOperatorLabel,
  DateFilterOperatorLabel,
  LinkFilterOperatorLabel,
  LookupFilterOperatorLabel,
  NumberFilterOperatorLabel,
  StringFilterOperatorLabel,
  UserFilterOperatorLabel,
} from "src/enums/ShareEnumLabels";
import { FlatWhere, View } from "src/models/SharedModels";
import {
  FieldType,
  FieldUiTypeEnum,
  FilterOperator,
} from "src/enums/SharedEnums";
import { isObject } from "src/utils/validateUtils";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { isArray } from "lodash";
import { getAmPm, getDateFormatString } from "src/utils/convertUtils";
import { getColumn, getDefaultFieldIcon } from "src/utils/flexlistHelper";
import { ViewField } from "src/models/ViewField";
import { fieldColors } from "src/constants/fieldColors";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type FilterProps = {
  translations: TranslationText[];
  currentView: View;
  columns: ViewField[];
  open: boolean;
  fetchRows: () => void;
  handleClose: () => void;
  setCurrentView: (view: View) => void;
  users: any[];
};

const Filter = ({
  translations,
  currentView,
  columns,
  open,
  fetchRows,
  setCurrentView,
  handleClose,
  users,
}: FilterProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [windowHeight, setWindowHeight] = useState(0);
  const stringFilterOperators: { key: string; value: string }[] = Array.from(
    StringFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const numberFilterOperators: { key: string; value: string }[] = Array.from(
    NumberFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const dateFilterOperators: { key: string; value: string }[] = Array.from(
    DateFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const choiceFilterOperators: { key: string; value: string }[] = Array.from(
    ChoiceFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const booleanFilterOperators: { key: string; value: string }[] = Array.from(
    BooleanFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const colorFilterOperators: { key: string; value: string }[] = Array.from(
    ColorFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const userFilterOperators: { key: string; value: string }[] = Array.from(
    UserFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const lookupFilterOperators: { key: string; value: string }[] = Array.from(
    LookupFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
  const linkFilterOperators: { key: string; value: string }[] = Array.from(
    LinkFilterOperatorLabel,
    function (item) {
      return { key: item[0], value: item[1] };
    }
  );
    
  const condtionOperators: string[] = [t("And"), t("Or")];
  const booleanValues: string[] = [t("True"), t("False")];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  // const getColumn = (column_id: any) => {

  //   const column = columns.find(
  //     (item: any) =>
  //       item.id === convertToInteger(column_id) ||
  //       item.name === column_id
  //     // (!item.system && item.id === convertToInteger(column_id)) ||
  //     // (item.system &&
  //     //   (item.name === "createdAt" || item.name === "updatedAt") &&
  //     //   item.name === column_id)
  //   );
  //   return column;
  // };

  const handleFilters = (index: number, key: string, value: any) => {
    var newView: View = Object.assign({}, currentView);
    newView.conditions = currentView.conditions?.map(
      (filter: any, i: number) => {
        if (index === i) {
          if (key === "cmp") {
            filter[key] = value;
            if (value === FilterOperator.in || value === FilterOperator.nin) {
              filter["right"] = [];
            }
          }
          //set right value for filter
          if (key === "right") {
            if (
              filter["cmp"] === FilterOperator.in ||
              filter["cmp"] === FilterOperator.nin
            ) {
              let column = getColumn(filter.left, columns);
              if (column?.uiField !== FieldUiTypeEnum.Choice) {
                filter[key] = value;
              } else {
                if (isArray(value)) {
                  filter[key] = value.map((item: any) => item.id);
                }
              }
            } else {
              filter[key] = value;
            }
          }

          //if left field changed, reset right field
          if (key === "left") {
            filter[key] = value;
            filter["cmp"] = getFilter({ left: value })[0];
            filter["right"] = getFilter({ left: value })[3];
          }
        }
        return filter;
      }
    );
    setCurrentView(newView);
  };
  const handleConditionOperationFilters = (index: number, value: string) => {
    var newView: View = Object.assign({}, currentView);
    newView.conditions = currentView.conditions?.map(
      (filter: any, i: number) => {
        if (index === i) filter = value;
        return filter;
      }
    );
    setCurrentView(newView);
  };
  const removeFilter = (index: number) => {
    var newView: View = Object.assign({}, currentView);
    newView.conditions = currentView.conditions?.filter(
      (filter: any, i: number) => {
        if (index === 0) {
          return i !== index && i !== index + 1;
        } else {
          return i !== index && i !== index - 1;
        }
      }
    );
    setCurrentView(newView);
  };

  const getChoiceValues = (filter: any) => {
    const column = getColumn(filter.left, columns);
    let choices: any[] = [];
    if (
      filter.right &&
      filter.right.length > 0 &&
      column?.uiField === FieldUiTypeEnum.Choice &&
      column?.config?.values &&
      column?.config?.values.length > 0
    ) {
      choices = column?.config?.values.filter((x: any) =>
        filter.right?.includes(x.id)
      );
    }
    return choices;
  };

  const getFilter = (
    filter: any,
    index?: number
  ): [string, { key: string; value: string }[], any, any] => {
    const column = getColumn(filter.left, columns);
    const columnUiType = column?.uiField;
    let defaultConditionOperator: string = FilterOperator.eq;
    let conditionOperators: { key: string; value: string }[] = [];
    let defaultValue: any = "";
    let render: any = <></>;
    switch (columnUiType) {
      case FieldUiTypeEnum.Integer:
      case FieldUiTypeEnum.Float:
      case FieldUiTypeEnum.Decimal:
      case FieldUiTypeEnum.Double:
      case FieldUiTypeEnum.Money:
      case FieldUiTypeEnum.Percentage:
        defaultConditionOperator = numberFilterOperators[0].key;
        conditionOperators = numberFilterOperators;
        render = (
          <TextField
            size="small"
            type={"number"}
            onChange={(e) => {
              handleFilters(index ?? 0, "right", e.target.value);
            }}
            value={filter.right}
            sx={{
              width: { md: "168px" },
              marginLeft: { xs: "8px", md: "30px" },
            }}
          />
        );
        break;
      case FieldUiTypeEnum.Date:
      case FieldUiTypeEnum.DateTime:
      case FieldUiTypeEnum.Time:
        defaultConditionOperator = dateFilterOperators[0].key;
        conditionOperators = dateFilterOperators;
        render = (
          <LocalizationProvider dateAdapter={AdapterDayjs} key={column?.id}>
            <DateTimePicker
              value={dayjs(filter.right)}
              onChange={(e: any) => {
                handleFilters(
                  index ?? 0,
                  "right",
                  e.format("MM/DD/YYYY HH:mm:ss")
                );
              }}
              sx={{
                width: { md: "168px" },
                marginLeft: { xs: "8px", md: "30px" },
              }}
              ampm={getAmPm()}
              format={`${getDateFormatString(window.navigator.language)} ${getAmPm() ? 'hh' : 'HH'}:mm:ss${getAmPm() ? ' a' : ''}`}
            />
          </LocalizationProvider>
        );
        break;
      case FieldUiTypeEnum.Text:
        defaultConditionOperator = stringFilterOperators[0].key;
        conditionOperators = stringFilterOperators;
        defaultValue = "";
        render = (
          <TextField
            size="small"
            type={"text"}
            onChange={(e) => {
              handleFilters(index ?? 0, "right", e.target.value);
            }}
            value={filter.right}
            sx={{
              width: { md: "168px" },
              marginLeft: { xs: "8px", md: "30px" },
            }}
          />
        );
        break;
      case FieldUiTypeEnum.Choice:
        defaultConditionOperator = choiceFilterOperators[0].key;
        conditionOperators = choiceFilterOperators;
        defaultValue =
          column?.config?.values.length > 0 ? column?.config?.values[0].id : "";

        render =
          filter.cmp !== FilterOperator.in &&
          filter.cmp !== FilterOperator.nin ? (
            <Select
              value={filter.right}
              onChange={(e) => {
                handleFilters(index ?? 0, "right", e.target.value);
              }}
              size="small"
              sx={{
                width: { md: "168px" },
                marginLeft: { xs: "8px", md: "30px" },
              }}
            >
              {column?.config?.values.map((choice: any) => (
                <MenuItem key={choice.id} value={choice.id}>
                  {choice.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Autocomplete
              multiple
              id="tags-choice"
              size="small"
              onChange={(event, newValue) => {
                handleFilters(index ?? 0, "right", newValue);
              }}
              value={getChoiceValues(filter)}
              options={column?.config?.values}
              getOptionLabel={(option: any) => option?.label}
              filterSelectedOptions
              sx={{
                width: { md: "168px" },
                marginLeft: { xs: "8px", md: "30px" },
              }}
              renderInput={(params) => (
                <TextField {...params} variant="standard" placeholder="" />
              )}
            />
          );
        break;
      case FieldUiTypeEnum.Boolean:
        defaultConditionOperator = "false";
        conditionOperators = booleanFilterOperators;
        defaultValue = false;
        render = (
          <Select
            value={filter.right?.toString()}
            onChange={(e) => {
              handleFilters(index ?? 0, "right", e.target.value == "true");
            }}
            size="small"
            sx={{
              width: { md: "168px" },
              marginLeft: { xs: "8px", md: "30px" },
            }}
          >
            {booleanValues.map((value: any) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        );
        break;
      case FieldUiTypeEnum.Color:
        defaultConditionOperator = colorFilterOperators[0].key;
        conditionOperators = colorFilterOperators;
        defaultValue = fieldColors[0];
        render = (
          <Select
            value={filter.right}
            onChange={(e) => {
              handleFilters(index ?? 0, "right", e.target.value);
            }}
            size="small"
            sx={{
              width: { md: "168px" },
              marginLeft: { xs: "8px", md: "30px" },
            }}
          >
            {fieldColors.map((color: any) => (
              <MenuItem key={color} value={color}>
                <Box
                  sx={{
                    color: color ?? "#000000",
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: color ?? "#000000",
                      borderRadius: "100px",
                    }}
                  ></div>
                  <span style={{ color: color??"#000000" }}>
                    {color}
                  </span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          )
          break;
        case FieldUiTypeEnum.User:
          defaultConditionOperator = userFilterOperators[0].key;
          conditionOperators = userFilterOperators;
          defaultValue = users[0]?.userId
          render =
          (
            <Select
              value={filter.right}
              onChange={(e) => {
                handleFilters(index ?? 0, "right", e.target.value);
              }}
              size="small"
              sx={{
                width: { md: "168px" },
                marginLeft: { xs: "8px", md: "30px" },
              }}
            >
              {users.map((user: any) => (
                <MenuItem key={user.userId} value={user.userId}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          )
          break;
        case FieldUiTypeEnum.Lookup:
          defaultConditionOperator = lookupFilterOperators[0].key;
          conditionOperators = lookupFilterOperators;
          defaultValue = "";
          render = (
            <TextField
              size="small"
              type={"text"}
              onChange={(e) => {
                handleFilters(index ?? 0, "right", e.target.value);
              }}
              value={filter.right}
              sx={{
                width: { md: "168px" },
                marginLeft: { xs: "8px", md: "30px" },
              }}
            />
          );
        case FieldUiTypeEnum.Link:
          defaultConditionOperator = linkFilterOperators[0].key;
          conditionOperators = linkFilterOperators;
          defaultValue = "";
          render = (
            <TextField
              size="small"
              type={"text"}
              onChange={(e) => {
                handleFilters(index ?? 0, "right", e.target.value);
              }}
              value={filter.right}
              sx={{
                width: { md: "168px" },
                marginLeft: { xs: "8px", md: "30px" },
              }}
            />
          );
          break;
      default:
        break;
    }
    return [defaultConditionOperator, conditionOperators, render, defaultValue];
  };
  const addFilter = () => {
    let newView: View = Object.assign({}, currentView);
    let filter: FlatWhere = {
      left: columns[0].id,
      leftType: "Field",
      right: getFilter({ left: columns[0].id })[3],
      rightType: "SearchString",
      cmp: getFilter({ left: columns[0].id })[0],
    } as FlatWhere;
    if (newView.conditions && newView.conditions.length > 0) {
      newView.conditions.push("And");
      newView.conditions.push(filter);
    } else {
      newView.conditions = [filter];
    }
    setCurrentView(newView);
  };
  const onsubmit = async () => {
    let newView: View = Object.assign({}, currentView);
    // newView.query = undefined;
    setCurrentView(newView);
    fetchRows();
    handleClose();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "100%", md: "645px" },
    backgroundColor: "white",
    py: 2,
    px: { xs: 0.5, md: 2 },
    boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
    border: "none",
  };
  const filteredColumns = (columns: ViewField[]) => {
    return columns.filter((column: ViewField) => {
      return (
        column.uiField !== FieldUiTypeEnum.Video &&
        column.uiField !== FieldUiTypeEnum.Document &&
        column.uiField !== FieldUiTypeEnum.Image
      );
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
            paddingBottom: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2">{t("Show Fields")}</Typography>
          <Box
            component="span"
            className="svg-color add_choice"
            sx={{
              width: 18,
              height: 18,
              display: "inline-block",
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/table/Close.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/table/Close.svg) no-repeat center / contain`,
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
        </Box>
        {currentView.conditions && currentView.conditions.length > 0 && (
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
              py: 2,
              maxHeight: `${windowHeight - 108}px`,
              overflow: "auto",
            }}
          >
            {currentView.conditions.map((filter: any, index: number) => {
              return isObject(filter) ? (
                <Box key={index} sx={{ marginBottom: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Select
                      value={filter.left}
                      onChange={(e) => {
                        handleFilters(index, "left", e.target.value);
                      }}
                      size="small"
                      sx={{
                        width: { md: "168px" },
                        textTransform: "capitalize",
                      }}
                      className="sort_column"
                    >
                      {filteredColumns(columns).map((column: any) => {
                        var columnValue =
                          column.system &&
                          (column.name === "createdAt" ||
                            column.name === "updatedAt")
                            ? column.name
                            : column.id;
                        let coloumIcon =
                          column.icon ?? getDefaultFieldIcon(column.uiField);
                        return (
                          <MenuItem
                            key={`${column.id}`}
                            value={columnValue}
                            sx={{ display: "flex" }}
                          >
                            <Box
                              component="span"
                              className="svg-color"
                              sx={{
                                width: 14,
                                height: 14,
                                display: "inline-block",
                                bgcolor:
                                  theme.palette.palette_style.text.primary,
                                mask: `url(/assets/icons/table/${coloumIcon}.svg) no-repeat center / contain`,
                                WebkitMask: `url(/assets/icons/table/${coloumIcon}.svg) no-repeat center / contain`,
                                marginRight: { xs: 0.2, md: 1 },
                              }}
                            />
                            <Box>{column.system ? t(column.name) : column.name}</Box>
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Select
                      value={filter.cmp}
                      onChange={(e) => {
                        handleFilters(index, "cmp", e.target.value);
                      }}
                      size="small"
                      sx={{
                        width: { md: "168px" },
                        marginLeft: { xs: "8px", md: "30px" },
                      }}
                    >
                      {getFilter(filter)[1].map((compare) => {
                        return (
                          <MenuItem key={`${compare.key}`} value={compare.key}>
                            {compare.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {getFilter(filter, index)[2]}
                    <Box
                      component="span"
                      className="svg-color add_choice"
                      sx={{
                        width: { xs: 50, md: 18 },
                        height: 18,
                        display: "inline-block",
                        bgcolor: theme.palette.palette_style.text.primary,
                        mask: `url(/assets/icons/table/Close.svg) no-repeat center / contain`,
                        WebkitMask: `url(/assets/icons/table/Close.svg) no-repeat center / contain`,
                        maskPosition: { xs: "right", md: "inherit" },
                        cursor: "pointer",
                        marginTop: 1.5,
                        marginLeft: { xs: "8px", md: "30px" },
                      }}
                      onClick={() => {
                        removeFilter(index);
                      }}
                    />
                  </Box>
                </Box>
              ) : index ? (
                <Select
                  key={index}
                  value={filter}
                  onChange={(e) => {
                    handleConditionOperationFilters(index, e.target.value);
                  }}
                  size="small"
                  sx={{ width: { md: "168px" }, marginBottom: 1 }}
                >
                  {condtionOperators.map((operator) => {
                    return (
                      <MenuItem key={operator} value={operator}>
                        {operator}
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                <></>
              );
            })}
          </Box>
        )}

        <Box
          sx={{
            paddingTop: 2,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="span"
              className="svg-color"
              sx={{
                width: 14,
                height: 14,
                display: "inline-block",
                bgcolor: theme.palette.palette_style.text.selected,
                mask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
                WebkitMask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
                cursor: "pointer",
                // marginTop: 0.5,
                marginRight: 1,
              }}
            />
            <Typography
              variant="body1"
              sx={{ color: theme.palette.palette_style.text.selected }}
              onClick={addFilter}
            >
              {t("Add Condition")}
            </Typography>
          </Box>

          <Button
            sx={{ ml: 10 }}
            variant="contained"
            onClick={() => onsubmit()}
          >
            {t("Submit")}
          </Button>
        </Box>
        {/* <Box>
          <Typography variant="subtitle2">Predefined & Saved filters:</Typography>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.palette_style.text.selected, cursor: "pointer", }}
                onClick={() => {
                  var newView: View = Object.assign({}, currentView);
                  const archived = columns.find((x: any) => x.name === "___archived");
                  newView.conditions = [{ "left": archived.id, "leftType": "Field", "right": false, "rightType": "SearchString", "cmp": "eq" }, "Or", { "left": archived.id, "leftType": "Field", "right": true, "rightType": "SearchString", "cmp": "eq" }] as any
                  setCurrentView(newView);
                  fetchRows();
                  handleClose();
                }}
              >
                Show All
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.palette_style.text.selected, cursor: "pointer", }}
                onClick={() => {
                  var newView: View = Object.assign({}, currentView);
                  const archived = columns.find((x: any) => x.name === "___archived");
                  newView.conditions = [{ "left": archived.id, "leftType": "Field", "right": true, "rightType": "SearchString", "cmp": "eq" }] as any
                  newView.query = undefined;
                  setCurrentView(newView);
                  fetchRows();
                  handleClose();
                }}
              >
                Archived
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.palette_style.text.selected, cursor: "pointer", }}
                onClick={() => {
                  var newView: View = Object.assign({}, currentView);
                  const archived = columns.find((x: any) => x.name === "___archived");
                  newView.conditions = [{ "left": archived.id, "leftType": "Field", "right": false, "rightType": "SearchString", "cmp": "eq" }] as any
                  setCurrentView(newView);
                  fetchRows();
                  handleClose();
                }}
              >
                Unarchived
              </Typography>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  currentView: state.view.currentView,
  users: state.view.users,
});

const mapDispatchToProps = {
  fetchRows,
  setCurrentView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
