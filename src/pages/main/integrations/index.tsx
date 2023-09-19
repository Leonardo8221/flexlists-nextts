import React from "react";
import MainLayout from "src/layouts/view/MainLayout";
import {
  Box,
  Button,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";

interface IntegrationsProps {
  styles?: any;
}

function createData(
  name: any,
  description: any,
  type: any,
  trigger: any,
  email: any,
  manage: any
) {
  return { name, description, type, trigger, email, manage };
}

function manageRow() {
  return (
    <>
      <Button variant="text">Edit</Button>
      <Button sx={{ color: "#eb2027" }} variant="text">
        Delete
      </Button>
    </>
  );
}

const rows = [
  createData(
    "Email on change",
    "When a person do something notify everyoneWhen a person do something notify everyoneWhen a person do something notify everyoneWhen a person do something notify everyoneWhen a person do something notify everyone",
    "Email",
    "create, update, read, delete",
    "email@example.com",
    manageRow()
  ),
  createData("-", "-", "-", "-", "-", "-"),
  createData("-", "-", "-", "-", "-", "-"),
  createData("-", "-", "-", "-", "-", "-"),
];
export default function Integrations({ styles }: IntegrationsProps) {
  const router = useRouter();
  styles = {
    tableCell: {
      whiteSpace: { xs: "nowrap", md: "wrap" },
      overflow: "hidden",
      maxWidth: "256px",
      textOverflow: "ellipsis",
    },
    tableHeadCell: {
      color: "#333",
    },
  };
  return (
    <>
      <MainLayout removeFooter={true}>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" gutterBottom>
            Integrations
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to FlexLists integrations!
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 320 }} aria-label="simple table">
              <TableHead sx={{ background: "#fafafa" }}>
                <TableRow>
                  <TableCell sx={styles?.tableHeadCell}>Name</TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="left">
                    Descripiton
                  </TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="left">
                    Type
                  </TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="left">
                    Trigger
                  </TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="left">
                    Emails
                  </TableCell>
                  <TableCell sx={styles?.tableHeadCell} align="right">
                    Manage
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={styles?.tableCell}>{row.name}</TableCell>
                    <TableCell sx={styles?.tableCell} align="left">
                      {row.description}
                    </TableCell>
                    <TableCell sx={styles?.tableCell} align="left">
                      {row.type}
                    </TableCell>
                    <TableCell sx={styles?.tableCell} align="left">
                      {row.trigger}
                    </TableCell>
                    <TableCell sx={styles?.tableCell} align="left">
                      {row.email}
                    </TableCell>
                    <TableCell sx={styles?.tableCell} align="right">
                      {row.manage}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ mb: 2 }} />
          <Button
            onClick={() => {
              router.push(PATH_MAIN.newIntegration);
            }}
            variant="contained"
          >
            + Add integration
          </Button>
        </Box>
      </MainLayout>
    </>
  );
}
