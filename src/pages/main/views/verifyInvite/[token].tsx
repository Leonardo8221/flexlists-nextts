import { Box, Stack, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { type } from "os";
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { ApiResponseStatus } from "src/enums/ApiResponseStatus";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { listViewService } from "src/services/listView.service";
import Error from 'src/sections/Error'

type VerifyInviteTokenProps = {
  apiResponseStatus: ApiResponseStatus;
}
const VerifyInviteToken = ({apiResponseStatus}:VerifyInviteTokenProps) => {
  const router = useRouter();
  const [verifyResult, setVerifyResult] = useState<string>('Verifying')
  const [isValidated, setIsValidated] = useState<boolean>(false);

  useEffect(() => {
    async function verifyEmailInvite() {
      try {
        let acceptInviteTokenResponse = await listViewService.acceptInvite(router.query.token as string)

        if (isSucc(acceptInviteTokenResponse) && acceptInviteTokenResponse.data && acceptInviteTokenResponse.data.viewId) {
          await router.push(`${PATH_MAIN.views}/${acceptInviteTokenResponse.data.viewId}`)
        }
        else {
          setVerifyResult(acceptInviteTokenResponse.message)
        }

      }
      catch (err) {
        console.log(err);
      }

    }
    if (router.query.token) {
      verifyEmailInvite()
    }
  }, [router.query.token])
  return apiResponseStatus === ApiResponseStatus.Success ?(
    <>

      <Typography>{verifyResult}</Typography>
      {/* {
        !isValidated &&
        <Stack >
          <Box>
            Please <Link href={`/auth/login`}>Login</Link>
          </Box>
        </Stack>
      } */}
    </>
  ):
  (
    <>
    <Error errorStatus={apiResponseStatus} />
    </>
  )
}
const mapStateToProps = (state: any) => ({
  apiResponseStatus: state.admin.apiResponseStatus
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyInviteToken);

