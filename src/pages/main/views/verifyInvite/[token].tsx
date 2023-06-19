import { Box, Stack, Typography } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { listViewService } from "src/services/listView.service";

const VerifyInviteToken = () =>
{
    const router = useRouter();
    const [verifyResult,setVerifyResult] = useState<string>('Verifying')
    const [isValidated,setIsValidated] = useState<boolean>(false);
    
    useEffect(()=>{
      async function verifyEmailInvite()
      {
          try
          {
            let acceptInviteTokenResponse = await listViewService.acceptInvite(router.query.token as string)
            
            if(isSucc(acceptInviteTokenResponse) && acceptInviteTokenResponse.data && acceptInviteTokenResponse.data.viewId)
            {
                router.push(`${PATH_MAIN.views}/${acceptInviteTokenResponse.data.viewId}`)
            }
            else
            {
              setVerifyResult(acceptInviteTokenResponse.message)
            }
           
          }
          catch(err)
          {
             console.log('aaaa')
             console.log(err);
          }
          
      }
      if(router.query.token)
      {
         verifyEmailInvite()
      }
    },[router.query.token])
    return(
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
export default VerifyInviteToken

