import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { connect } from "react-redux";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import { ViewField } from "src/models/ViewField";
import { convertToInteger } from "src/utils/convertUtils";
import { Field, FieldUIType } from "src/models/SharedModels";
import CreateFieldModal from "./CreateFieldModal";
import { KanbanConfig } from "src/models/ViewConfig";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type KanbanViewConfigProps = {
  translations: TranslationText[];
  submit: boolean;
  updateConfig: (config: KanbanConfig) => void;
  columns: ViewField[];
  availableFieldUiTypes: FieldUIType[];
};

function KanbanViewConfig({
  translations,
  submit,
  updateConfig,
  columns,
  availableFieldUiTypes,
}: KanbanViewConfigProps) {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const [boardColumnId, setBoardColumnId] = useState<number>(0);
  const [orderColumnId, setOrderColumnId] = useState<number>(0);
  const [titleFieldId, setTitleFieldId] = useState<number>(0);
  const [isOpenBoardFieldModal, setIsOpenBoardFieldModal] =
    useState<boolean>(false);
  const [isOpenOrderFieldModal, setIsOpenOrderFieldModal] =
    useState<boolean>(false);
  const [isOpenTitleFieldModal, setIsOpenTitleFieldModal] =
    useState<boolean>(false);
  const boardFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Choice
  );
  const orderFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Integer
  );
  const titleFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Text
  );

  const getBoardFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Choice);
  };
  const getOrderFields = (): ViewField[] => {
    return columns.filter(
      (x) => x.uiField === FieldUiTypeEnum.Integer && x.name !== "id"
    );
  };
  const getTitleFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text);
  };

  const [boardFields, setBoardFields] = useState<ViewField[]>(getBoardFields());
  const [orderFields, setOrderFields] = useState<ViewField[]>(getOrderFields());
  const [titleFields, setTitleFields] = useState<ViewField[]>(getTitleFields());

  const newBoardField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Choice,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };

  const newOrderField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Integer,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };

  const newTitleField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Text,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };

  const reloadColumns = () => {
    const newBoardFields: ViewField[] = getBoardFields();
    const newOrderFields: ViewField[] = getOrderFields();
    const newTitleFields: ViewField[] = getTitleFields();

    const defaultBoardId =
      boardColumnId && !isOpenBoardFieldModal
        ? boardColumnId
        : newBoardFields.length > 0
        ? newBoardFields[0].id
        : 0;
    const defaultOrderId =
      orderColumnId && !isOpenOrderFieldModal
        ? orderColumnId
        : newOrderFields.length > 0
        ? newOrderFields[0].id
        : 0;
    const defaultTitleId =
      titleFieldId && !isOpenTitleFieldModal
        ? titleFieldId
        : newTitleFields.length > 0
        ? newTitleFields[0].id
        : 0;

    if (newBoardFields.length > 0) {
      setBoardColumnId(defaultBoardId);
    }

    if (newOrderFields.length > 0) {
      setOrderColumnId(defaultOrderId);
    }

    if (newTitleFields.length > 0) {
      setTitleFieldId(defaultTitleId);
    }

    setBoardFields(newBoardFields);
    setOrderFields(newOrderFields);
    setTitleFields(newTitleFields);
    updateKanbanConfig(
      defaultBoardId,
      defaultOrderId,
      defaultTitleId
    );
  };

  useEffect(() => {
    reloadColumns();
  }, [columns]);

  const onBoardFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (value === "-1") {
      setIsOpenBoardFieldModal(true);
      return;
    }
    setBoardColumnId(convertToInteger(value));
    updateKanbanConfig(convertToInteger(value), orderColumnId, titleFieldId);
  };

  const onOrderFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (value === "-1") {
      setIsOpenOrderFieldModal(true);
      return;
    }
    setOrderColumnId(convertToInteger(value));
    updateKanbanConfig(boardColumnId, convertToInteger(value), titleFieldId);
  };

  const onTitleFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    if (value === "-1") {
      setIsOpenTitleFieldModal(true);
      return;
    }
    setTitleFieldId(convertToInteger(value));
    updateKanbanConfig(boardColumnId, orderColumnId, convertToInteger(value));
  };
  const updateKanbanConfig = (
    newBoardColumnId: number,
    newOrderColumnId: number,
    newTitleId: number
  ) => {
    updateConfig({
      boardColumnId: newBoardColumnId,
      orderColumnId: newOrderColumnId,
      titleId: newTitleId,
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <FormControl fullWidth>
          <InputLabel required id="select-board-label">
            {t("Board")}
          </InputLabel>
          <Select
            label={t("Board")}
            labelId="select-board-label"
            value={`${boardColumnId}`}
            onChange={onBoardFieldChange}
            required
            error={submit && (!boardColumnId || boardColumnId === 0)}
            fullWidth
            // sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
          >
            {boardFields.map((viewColumn: ViewField) => (
              <MenuItem key={`${viewColumn.id}`} value={`${viewColumn.id}`}>
                {viewColumn.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              {t("Create New Field")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel required id="select-order-label">
            {t("Order")}
          </InputLabel>
          <Select
            label={t("Order")}
            labelId="select-order-label"
            value={`${orderColumnId}`}
            onChange={onOrderFieldChange}
            required
            error={submit && (!orderColumnId || orderColumnId === 0)}
            fullWidth
            // sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
          >
            {orderFields.map((viewColumn: ViewField) => (
              <MenuItem key={`${viewColumn.id}`} value={`${viewColumn.id}`}>
                {viewColumn.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              {t("Create New Field")}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel required id="select-title-label">
            {t("Title")}
          </InputLabel>
          <Select
            label={t("Title")}
            labelId="select-title-label"
            value={`${titleFieldId}`}
            required
            error={submit && (!titleFieldId || titleFieldId === 0)}
            onChange={onTitleFieldChange}
            fullWidth
            // sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
          >
            {titleFields.map((titleColumn: ViewField) => (
              <MenuItem key={`${titleColumn.id}`} value={`${titleColumn.id}`}>
                {titleColumn.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              {t("Create New Field")}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isOpenBoardFieldModal && (
        <CreateFieldModal
          field={newBoardField}
          fieldUiTypes={boardFieldUiTypes}
          open={isOpenBoardFieldModal}
          handleClose={() => setIsOpenBoardFieldModal(false)}
        />
      )}
      {isOpenOrderFieldModal && (
        <CreateFieldModal
          field={newOrderField}
          fieldUiTypes={orderFieldUiTypes}
          open={isOpenOrderFieldModal}
          handleClose={() => setIsOpenOrderFieldModal(false)}
        />
      )}
      {isOpenTitleFieldModal && (
        <CreateFieldModal
          field={newTitleField}
          fieldUiTypes={titleFieldUiTypes}
          open={isOpenTitleFieldModal}
          handleClose={() => setIsOpenTitleFieldModal(false)}
        />
      )}
    </>
  );
}
const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanViewConfig);
