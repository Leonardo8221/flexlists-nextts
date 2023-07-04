import {
Alert,
AlertColor,
Snackbar
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setMessage } from "src/redux/actions/authAction";
type FlashMessageProps = {
   autoHideDuration?: number; 
   vertical?: 'top' | 'bottom';
   horizontal?: 'left' | 'center' | 'right';
   message:{message:string,type:string};
   setMessage: (message: {message:string,type:string}|undefined) => void;
};
const FlashMessage = ({autoHideDuration,vertical,horizontal,message,setMessage}:FlashMessageProps) => {
    const router = useRouter();
    const [flash, setFlash] = useState<{ message: string; type: string } | undefined>(undefined);
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
      
    return(
        <Snackbar 
             open={flash !== undefined} 
             anchorOrigin={{ vertical:vertical??'bottom', horizontal:horizontal??'left' }}
             autoHideDuration={autoHideDuration??6000} 
             onClose={flashHandleClose}>
          <Alert onClose={flashHandleClose} severity={flash?.type as AlertColor} sx={{ width: '100%' }}>
            {flash?.message}
          </Alert>
        </Snackbar>
    )
}
 
const mapStateToProps = (state: any) => ({
    message: state.auth.message,
  });
  
  const mapDispatchToProps = {
    setMessage,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);