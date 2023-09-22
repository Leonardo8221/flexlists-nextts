import { Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { validateAccessKey } from "src/services/auth.service";
import { motion } from "framer-motion";

const VerifyKey = () => {
  const router = useRouter();
  const [verifyResult, setVerifyResult] = useState<string>("Verifying");

  useEffect(() => {
    async function verifyKey() {
      try {
        let verifyKeyResponse = await validateAccessKey(
          encodeURIComponent(router.query.key as string)
        );
        if (
          isSucc(verifyKeyResponse) &&
          verifyKeyResponse.data &&
          verifyKeyResponse.data.viewId
        ) {
          await router.push(
            `${PATH_MAIN.views}/${verifyKeyResponse.data.viewId}`
          );
          return;
        } else {
          console.log(verifyKeyResponse.message);
          setVerifyResult(verifyKeyResponse.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (router.query.key) {
      verifyKey();
    }
  }, [router.query.key]);
  return (
    <>
    {
      verifyResult === "Verifying" &&
      <Box sx={{ display: "grid", placeContent: "center", minHeight: "100vh" }}>
        <Typography
          component={motion.div}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
          variant="h3"
        >
          {verifyResult}
        </Typography>
      </Box>
    }
    {
      verifyResult !== "Verifying" &&
      <Box sx={{ display: "grid", placeContent: "center", minHeight: "100vh" }}>
        <Typography
          component={motion.div}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
          variant="h3"
        >
          {verifyResult}
        </Typography>
      </Box>
    } 
    </>
  );
};
export default VerifyKey;
