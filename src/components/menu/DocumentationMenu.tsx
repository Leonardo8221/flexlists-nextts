
import * as React from "react";
// material
import {
  Box,
  Link,
  Typography,
  Divider,
} from "@mui/material";
import { OndemandVideo as TutorialsIcon } from "@mui/icons-material/";
import { Topic as DocsIcon } from "@mui/icons-material/";
import { CoPresent as WebinarsIcon } from "@mui/icons-material/";
import { Newspaper as BlogIcon } from "@mui/icons-material/";
const styles = {
    docsWrapper: {
      position: "absolute",
      top: "96px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "white",
      width: "50%",
      color: "black",
      display: "flex",
      gap: 4,
      padding: 2,
      boxShadow: "0 12px 24px 0 rgba(0,0,0,.1)",
    },
    docsTitle: {
      textTransform: "uppercase",
      color: "#666",
      letterSpacing: "2px",
    },
    docsLink: {
      textDecoration: "none",
      color: "#111",
      py: 0.5,
      "&:hover": {
        opacity: 0.75,
      },
    },
  };
type DocumentationMenuProps = {
}
export default function DocumentationMenu({}: DocumentationMenuProps) {
   
   return (
    <Box sx={styles?.docsWrapper} >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DocsIcon sx={{ color: "#903cde" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            Docs
          </Typography>
        </Box>
         <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation">
          Adding new list
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting users
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting groups
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Key sharing
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Creating new view
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          View permissions
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Comments section
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TutorialsIcon sx={{ color: "#deb33c" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            Tutorials
          </Typography>
        </Box>
        <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation">
          Adding new list
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting users
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting groups
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Key sharing
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          List sharing
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WebinarsIcon sx={{ color: "#3c8dde" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            Webinars
          </Typography>
        </Box>
        <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation">
          Adding new list
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting users
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting groups
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Key sharing
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          List sharing
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BlogIcon sx={{ color: "#de3c3c" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            Blogs
          </Typography>
        </Box>
        <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation">
          Adding new list
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting users
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Inviting groups
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          Key sharing
        </Link>
        <Link sx={styles?.docsLink} href="/documentation">
          List sharing
        </Link>
      </Box>
    </Box>
  )
}