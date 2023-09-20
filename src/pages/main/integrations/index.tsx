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
import { Integration } from "src/models/SharedModels";
import { isSucc } from "src/models/ApiResponse";
import { getDefaultListViews } from "src/services/listView.service";
import { setMessage } from "src/redux/actions/viewActions";
import { connect } from "react-redux";

type IntegrationsProps = {
  translations: TranslationText[];
  message: any;
  setMessage: (message: any) => void;
}

const dummyIntegrations = [
  {
    id: 1,
    name: "Email on change",
    description: "When a person do something notify everyoneWhen a person do something notify everyoneWhen a person do something notify everyoneWhen a person do something notify everyoneWhen a person do something notify everyone",
    type: "Email",
    trigger: "create,update,read,delete",
    email: "email@example.com"
  }
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
    const checkMessage = () => {
      if (message?.message) {
        setFlash(message);
      }
    };

    checkMessage();
  }, [message]);

  useEffect(() => {
    async function fetchIntegrations() {
      const response = await getDefaultListViews();

      if (isSucc(response) && response.data) {
        if (response.data.length > 0) {
          setIntegrations(dummyIntegrations);
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

  const editIntegration = (id: number) => {

  };

  const deleteIntegration = (id: number) => {
    
  };

  return (
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
              {integrations.map((integration: Integration) => (
                <TableRow
                  key={integration.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={styles?.tableCell}>{integration.name}</TableCell>
                  <TableCell sx={styles?.tableCell} align="left">
                    {integration.description}
                  </TableCell>
                  <TableCell sx={styles?.tableCell} align="left">
                    {integration.type}
                  </TableCell>
                  <TableCell sx={styles?.tableCell} align="left">
                    {integration.trigger}
                  </TableCell>
                  <TableCell sx={styles?.tableCell} align="left">
                    {integration.email}
                  </TableCell>
                  <TableCell sx={styles?.tableCell} align="right">
                    <Button variant="text" onClick={() => { editIntegration(integration.id) }}>Edit</Button>
                    <Button sx={{ color: "#eb2027" }} variant="text" onClick={() => { deleteIntegration(integration.id) }}>
                      Delete
                    </Button>
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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const verifyToken = await validateToken(context);

  // if(verifyToken){
  //   return verifyToken;
  // }

  return await getTranslations("integrations", context);
};

const mapStateToProps = (state: any) => ({
  message: state.view.message,
});

const mapDispatchToProps = {
  setMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Integrations);