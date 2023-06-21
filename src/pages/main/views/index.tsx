import { useTheme } from "@mui/material/styles";
import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import MainLayout from "src/layouts/view/MainLayout";
import Views from "src/sections/@view/views";
import { setMessage } from "src/redux/actions/viewActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

interface ListPageProps {
  message: any;
  setMessage: (message: any) => void;
}

function ListPage({ message, setMessage }: ListPageProps) {
  const theme = useTheme();
  // error handling 
  const [flash, setFlash] = useState<{ message: string, type: string } | undefined>(undefined);

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message)
      }
    }
    checkMessage()
  }, [message])

  const flashHandleClose = () => {
    setFlash(undefined)
    setMessage(null)
  }
  function setError(message: string) {
    setFlashMessage(message);
  }
  function setFlashMessage(message: string, type: string = 'error') {
    setFlash({ message: message, type: type })
    setMessage({ message: message, type: type })
  }

  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          width: "100%",
          height: { xs: "calc(100% - 8px)", lg: "100%" },
          overflow: "hidden",
        }}
      >
        <Snackbar open={flash !== undefined} autoHideDuration={6000} onClose={flashHandleClose}>
          <Alert onClose={flashHandleClose} severity={flash?.type as AlertColor} sx={{ width: '100%' }}>
            {flash?.message}
          </Alert>
        </Snackbar>
        <Views />
      </Box>
    </MainLayout>
  );
}
const mapStateToProps = (state: any) => ({

  message: state.view.message,
});

const mapDispatchToProps = {
  setMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);


