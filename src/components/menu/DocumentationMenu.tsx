import * as React from "react";
import { Box, Link, Typography, Divider } from "@mui/material";
import { OndemandVideo as TutorialsIcon } from "@mui/icons-material/";
import { Topic as DocsIcon } from "@mui/icons-material/";
import { CoPresent as WebinarsIcon } from "@mui/icons-material/";
import { Newspaper as BlogIcon } from "@mui/icons-material/";
import { GetServerSideProps } from "next";
import { validateToken } from "src/utils/tokenUtils";
import { getTranslations, getTranslation } from "src/utils/i18n";
import { TranslationText } from "src/models/SharedModels";

const styles = {
  docsWrapper: {
    display: "flex",
    gap: 4,
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
  translations: TranslationText[];
};

const DocumentationMenu = ({
  translations
}: DocumentationMenuProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };

  return (
    <Box sx={styles?.docsWrapper}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DocsIcon sx={{ color: "#903cde" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            {t("Docs")}
          </Typography>
        </Box>
        <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation/docs/adding_new_list">
          {t("Adding New List")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/docs/inviting_users">
          {t("Inviting Users")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/docs/inviting_groups">
          {t("Inviting Groups")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/docs/key_sharing">
          {t("Key Sharing")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/docs/creating_new_view">
          {t("Creating New View")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/docs/view_permissions">
          {t("View Permissions")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/docs/comments_section">
          {t("Comments Section")}
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TutorialsIcon sx={{ color: "#deb33c" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            {t("Tutorials")}
          </Typography>
        </Box>
        <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation/tutorials/adding_new_list">
          {t("Adding New List")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/tutorials/inviting_users">
          {t("Inviting Users")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/tutorials/inviting_groups">
          {t("Inviting Groups")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/tutorials/key_sharing">
          {t("Key Sharing")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/tutorials/list_sharing">
          {t("List Sharing")}
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WebinarsIcon sx={{ color: "#3c8dde" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            {t("Webinars")}
          </Typography>
        </Box>
        <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation/webinars/adding_new_list">
          {t("Adding New List")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/webinars/inviting_users">
          {t("Inviting Users")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/webinars/inviting_groups">
          {t("Inviting Groups")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/webinars/key_sharing">
          {t("Key Sharing")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/webinars/list_sharing">
          {t("List Sharing")}
        </Link>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BlogIcon sx={{ color: "#de3c3c" }} />
          <Typography variant="subtitle2" sx={styles?.docsTitle}>
            {t("Blogs")}
          </Typography>
        </Box>
        <Divider light sx={{ my: 2 }}></Divider>
        <Link sx={styles?.docsLink} href="/documentation/blogs/adding_new_list">
          {t("Adding New List")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/blogs/inviting_users">
          {t("Inviting Users")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/blogs/inviting_groups">
          {t("Inviting Groups")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/blogs/key_sharing">
          {t("Key Sharing")}
        </Link>
        <Link sx={styles?.docsLink} href="/documentation/blogs/list_sharing">
          {t("List Sharing")}
        </Link>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const verifyToken = await validateToken(context);

  if(verifyToken){
    return verifyToken;
  }

  return await getTranslations("documentation menu", context);
};

export default DocumentationMenu;