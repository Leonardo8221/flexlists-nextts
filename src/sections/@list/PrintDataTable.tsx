import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { ViewField } from 'src/models/ViewField';
import { FieldUiTypeEnum } from 'src/enums/SharedEnums';
import { downloadFileUrl, getChoiceField, getDataColumnId } from 'src/utils/flexlistHelper';
import { getLocalDateTimeFromString, getLocalDateFromString } from "src/utils/convertUtils";

interface PrintDataTableProps {
    columns: ViewField[];
    rows: any[];
    renderCell?: (columnType: FieldUiTypeEnum, cellValue: any) => JSX.Element;
  }
  
  const PrintDataTable = ({ columns, rows,renderCell }:PrintDataTableProps) => {
    function renderFieldData(row:any,column: ViewField, cellValue: any) {
        const columnType = column.uiField;
        switch (columnType) {
          case FieldUiTypeEnum.Integer:
          case FieldUiTypeEnum.Float:
          case FieldUiTypeEnum.Decimal:
          case FieldUiTypeEnum.Double:
          case FieldUiTypeEnum.Money:
          case FieldUiTypeEnum.Percentage:
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue}
              </Box>
            );

          case FieldUiTypeEnum.DateTime:
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue && cellValue != null
                  ? getLocalDateTimeFromString(cellValue)
                  : ""}
              </Box>
            );
          case FieldUiTypeEnum.Date:
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue && cellValue != null
                  ? getLocalDateFromString(cellValue)
                  : ""}
              </Box>
            );
          case FieldUiTypeEnum.Time:
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue && cellValue != null
                  ? getLocalDateTimeFromString(cellValue)
                  : ""}
              </Box>
            );
          case FieldUiTypeEnum.Text:
          case FieldUiTypeEnum.LongText:
          case FieldUiTypeEnum.HTML:
          case FieldUiTypeEnum.Markdown:
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue}
              </Box>
            );
          case FieldUiTypeEnum.Choice:
            const choice = getChoiceField(cellValue, column);
            return (
              <Box
                key={row.id}
                sx={{
                  textAlign: "center",
                  bgcolor: choice?.color?.bg,
                  borderRadius: "20px",
                  color: choice?.color?.fill,
                  fontFamily: choice?.font,
                  px: 1.5,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {choice?.label}
              </Box>
            );
          case FieldUiTypeEnum.Boolean:
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue?.toString() === "true" ? "yes" : "no"}
              </Box>
            );
          case FieldUiTypeEnum.Image:
            return (
              <Box
                component="img"
                sx={
                  {
                    // height: 100,
                    width: 100,
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }
                }
                alt=""
                src={cellValue && cellValue.fileId ? downloadFileUrl(cellValue.fileId) : ''}
              />
            )
          case FieldUiTypeEnum.Video:
            return (
              <Box
                component="video"
                sx={
                  {
                    // height: 100,
                    width: 100,
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }
                }
                src={cellValue && cellValue.fileId ? downloadFileUrl(cellValue.fileId) : ''}
              />
            )
          case FieldUiTypeEnum.Document:
            return (
              <Box
                key={row.id}
                sx={{
                  minWidth: "100px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {cellValue?.fileName}
              </Box>
            );
          // return cellValue? (
          //   <Link href={downloadFileUrl(cellValue.fileId)}>{cellValue.fileName}</Link>
          // ):(<></>)
          default:
            return <></>;
        }
      }
    return (
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.viewFieldName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                row && <TableCell key={column.id}>{renderFieldData(row,column,row[getDataColumnId(column.id,columns)])}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default PrintDataTable;