import { Container, Grid, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { validateAccessKey } from "src/services/auth.service";
import { motion } from "framer-motion";
import KeyOffIcon from '@mui/icons-material/KeyOff';

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
      <Box sx={{position:"relative", display: "grid", placeContent: "center", minHeight: "100vh", overflow:"hidden" }}>
        <Box 
          component={motion.div} 
          animate={{width: ["200px", "8000px"], height:["200px", "8000px"]}} 
          transition={{ duration: 10 }}
          sx={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",background:"#54a6fb",borderRadius: "100%", display:"flex", alignItems:"center",justifyContent:"center", flexDirection:"column", gap:.5}}
          >
            <Typography
            component={motion.div}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity}}
            variant="h3"
            color={"#fff"}
          >
            {verifyResult}
          </Typography>
          <Typography variant="body1" color={"#fff"}>Please wait...</Typography>
        </Box>
      </Box>
    }
    {
      verifyResult !== "Verifying" &&
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight:"calc(100vh - 96px)",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems:"center",
              gap: { xs: 1, md: 3 },
            }}
          >
            <Box sx={{border:"1px solid #54a6fb", borderRadius:500}}>
              <KeyOffIcon sx={{fontSize: 96, color: "#54a6fb", m: 4}}/>
           </Box>
            <Typography
            variant="h1"
              sx={{
                fontWeight: 700,
                textAlign:"center"
              }}
            >
              Invalid key
            </Typography>
            <Typography variant="body1" gutterBottom textAlign={"center"}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat non illo quidem similique, nostrum nemo nisi. Magni accusamus officia eligendi.
            </Typography>
            <Box sx={{ display:"flex", gap: 2, alignItems:"center"}}>
              <Button  size="large" variant="contained">
                Login
              </Button>
              <Button size="large" variant="outlined">
                Register
              </Button>
            </Box>
            <Button size="large" variant="text">
                Back to homepage
            </Button>
          </Grid>
        </Grid>
      </Container>
    } 
    </>
  );
};
export default VerifyKey;
