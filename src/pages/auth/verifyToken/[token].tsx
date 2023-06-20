import { Box, Stack, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { isSucc } from "src/models/ApiResponse";
import { authService } from "src/services/auth.service";

const VerifyEmailToken = () => {
  const router = useRouter();
  const [verifyResult, setVerifyResult] = useState<string>('Verifying')
  const [isValidated, setIsValidated] = useState<boolean>(false);

  useEffect(() => {
    async function verifyEmail() {
      try {
        let verifyResponse = await authService.verifySignup(router.query.token as string, router.query.email as string)
        if (isSucc(verifyResponse) && verifyResponse.data && verifyResponse.data.isValidated) {
          setVerifyResult("Verify successfully")
          setIsValidated(true)
        }
        else {
          setVerifyResult("Verify fail")
        }
      }
      catch (err) {
        console.log(err)
        setVerifyResult("Verify fail")
      }

    }
    if (router.query.token) {
      verifyEmail()
    }
  }, [router.query.token])
  return (
    <>

      <Typography>{verifyResult}</Typography>
      {
        isValidated &&
        <Stack >
          <Box>
            Please <Link href={`/auth/login`}>Login</Link>
          </Box>
        </Stack>
      }
    </>
  );
}
export default VerifyEmailToken

