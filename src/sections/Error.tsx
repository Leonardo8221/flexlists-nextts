import { Box, Button, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { ApiResponseStatus } from 'src/enums/ApiResponseStatus';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';
import { setReturnUrl } from 'src/redux/actions/adminAction';
import Unauthorized from './Unauthorized';

type ErrorProps = {
  errorStatus: ApiResponseStatus,
  setReturnUrl: (returnUrl: string) => void
};

const Error = ({errorStatus,setReturnUrl}: ErrorProps) => {
 
  return (
    <>
    {
      errorStatus === ApiResponseStatus.Unauthorized &&
      <Unauthorized />
    }
    </>
    
    
  );
};

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
  setReturnUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
