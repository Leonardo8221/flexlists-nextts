import { useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";

// ----------------------------------------------------------------------

type LoadingPageProps = {
  children: ReactNode;
  isLoading: boolean;
};

export function LoadingPage({ children, isLoading }: LoadingPageProps) {
  return (
    <>
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
       
      </Backdrop> */}
      {children}
    </>
  );
}
const mapStateToProps = (state: any) => ({
  isLoading: state.admin.isLoading,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
