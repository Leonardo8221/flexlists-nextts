import {
Alert,
AlertColor,
Snackbar
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setMessage } from "src/redux/actions/authAction";
type FlashMessageProps = {
   message:FlashMessageModel|undefined;
   setMessage: (message: FlashMessageModel|undefined) => void;
};
const FlashMessage = ({message,setMessage}:FlashMessageProps) => {
    const router = useRouter();
    const [flash, setFlash] = useState<FlashMessageModel| undefined>(undefined);
    const flashHandleClose = () => {
        setFlash(undefined)
        setMessage(undefined)
      };
    useEffect(() => {
        function checkMessage() {
          if (message?.message) {
            setFlash(message)
          }
        }
        checkMessage()
      }, [message, router.isReady])
      
    return flash && flash.message ?(
        
        <Snackbar 
             open={flash !== undefined} 
             anchorOrigin={{ vertical:flash?.vertical??'bottom', horizontal:flash?.horizontal??'left' }}
             autoHideDuration={flash?.autoHideDuration??6000} 
             onClose={flashHandleClose}>
          <Alert onClose={flashHandleClose} severity={flash?.type as AlertColor} sx={{ width: '100%' }}>
            {flash?.message}
          </Alert>
        </Snackbar>
    ):
    <></>
}
 
const mapStateToProps = (state: any) => ({
    message: state.auth.message,
  });
  
  const mapDispatchToProps = {
    setMessage,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);