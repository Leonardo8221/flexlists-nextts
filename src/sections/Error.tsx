import { connect } from 'react-redux';
import { ApiResponseStatus } from 'src/enums/ApiResponseStatus';
import Unauthorized from './Unauthorized';

type ErrorProps = {
  errorStatus: ApiResponseStatus
};

const Error = ({errorStatus}: ErrorProps) => {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
