import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
  AlertColor
} from "@mui/material";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
import { GetServerSideProps } from "next";
import { TranslationText } from "src/models/SharedModels";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { validateToken } from "src/utils/tokenUtils";
import Head from 'next/head';
import { View, Integration } from "src/models/SharedModels";
import {
  FlexlistsError,
  FlexlistsSuccess,
  isErr,
  isSucc,
} from "src/models/ApiResponse";
import {
  getDefaultListViews,
  listViewService,
} from "src/services/listView.service";
import { setCurrentView, setMessage } from "src/redux/actions/viewActions";

type IntegrationsProps = {
  translations: TranslationText[];
  message: any;
  setMessage: (message: any) => void;
}

const createData = (
  name: any,
  description: any,
  type: any,
  trigger: any,
  email: any,
  manage: any
) => {
  return { name, description, type, trigger, email, manage };
}

const manageRow = () => {
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

const Integrations = ({ translations, message, setMessage }: IntegrationsProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [flash, setFlash] = useState<{ message: string; type: string } | undefined>(undefined);

  const styles = {
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

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message);
      }
    }
    checkMessage();
  }, [message]);

  useEffect(() => {
    async function fetchIntegrations() {
      let response: FlexlistsError | FlexlistsSuccess<View[]>;
      response = await getDefaultListViews();

      if (isSucc(response) && response.data) {
        if (response.data.length > 0) {
          setIntegrations(response.data);
        } else {
          setMessage({
            message:
              "No integrations yet, click Add Integration to create your first one!",
            type: "success",
          });
          await router.push(PATH_MAIN.newIntegration);
        }
      } else {
        setFlashMessage(response?.data?.message);
      }
    }

    fetchIntegrations();
  }, [router.isReady]);

  const flashHandleClose = () => {
    setFlash(undefined);
    setMessage(null);
  };

  const setFlashMessage = (message: string, type: string = "error") => {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  };

  return (
    <>
      <MainLayout removeFooter={true} translations={translations}>
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
        <Snackbar
          open={flash !== undefined}
          autoHideDuration={6000}
          onClose={flashHandleClose}
        >
          <Alert
            onClose={flashHandleClose}
            severity={flash?.type as AlertColor}
            sx={{ width: "100%" }}
          >
            {flash?.message}
          </Alert>
        </Snackbar>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const verifyToken = await validateToken(context);

  // if(verifyToken){
  //   return verifyToken;
  // }

  return await getTranslations("integrations", context);
};

export default Integrations;