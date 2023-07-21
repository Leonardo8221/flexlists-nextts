import { Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { validateAccessKey } from "src/services/auth.service";

const VerifyKey = () => {
  const router = useRouter();
  const [verifyResult, setVerifyResult] = useState<string>('Verifying')

  useEffect(() => {
    async function verifyKey() {
      try {
        let verifyKeyResponse = await validateAccessKey(encodeURIComponent(router.query.key as string))
        if (isSucc(verifyKeyResponse) && verifyKeyResponse.data && verifyKeyResponse.data.viewId) {
          await router.push(`${PATH_MAIN.views}/${verifyKeyResponse.data.viewId}`)
          return
        }
        else {
          console.log(verifyKeyResponse.message)
          setVerifyResult(verifyKeyResponse.message)
        }

      }
      catch (err) {
        console.log(err);
      }

    }
    if (router.query.key) {
      verifyKey()
    }
  }, [router.query.key])
  return (
    <>

      <Typography>{verifyResult}</Typography>
    </>
  );
}
export default VerifyKey

