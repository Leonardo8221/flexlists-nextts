import { Box, Button, Tab, Tabs } from "@mui/material";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import saveAs from "file-saver";
import {
  exportContentManagement,
  importContentManagement,
} from "src/services/admin/contentManagement.service";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { setFlashMessage } from "src/redux/actions/authAction";
import { useRouter } from "next/router";
import MainLayout from "src/layouts/admin";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import ContentsBuilder from "src/sections/contentManagement/contentsBuilder";
import ContentEditor from "src/sections/contentManagement/contentsEditor";
import { Construction as BuilderIcon } from "@mui/icons-material/";
import { EditNote as EditorIcon } from "@mui/icons-material/";
import FlashMessage from "src/components/FlashMessage";
import { b64toBlob } from "src/utils/convertUtils";



type ContentMangementProps = {
  setFlashMessage: (message: FlashMessageModel | undefined) => void;
};

const ContentManagement = ({ setFlashMessage }: ContentMangementProps) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("Content Builder");
  const [key, setKey] = useState(Date.now());
  const tabs: any[] = [
    {
      value: "Content Builder",
      icon: <BuilderIcon />,
      component: <ContentsBuilder />,
    },
    {
      value: "Content Editor",
      icon: <EditorIcon />,
      component: <ContentEditor />,
    },
  ];
  const changeTab = (value: any) => {
    setCurrentTab(value);
  };
  const exportContentManagementFile = async () => {
    var response = await exportContentManagement();
    if (isSucc(response)) {
      const blob = b64toBlob(response.data, "application/json");
      saveAs(blob, `contentManagement.json`);
      setFlashMessage({
        message: "Exporting Content Management Successfully",
        type: "success",
      });
    } else {
      setFlashMessage({
        message: (response as FlexlistsError).message,
        type: "error",
      });
    }
  };
  const handleImportContentManagement = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }
    setKey(Date.now());
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      var response = await importContentManagement(formData);
      if (isSucc(response)) {
        setFlashMessage({
          message: "Importing Content Management Successfully",
          type: "success",
        });
      } else {
        setFlashMessage({
          message: (response as FlexlistsError).message,
          type: "error",
        });
      }
    }
  };

  return (
    <MainLayout removeFooter={true}>
      <FlashMessage />
      <Box>
        <Box sx={{ float: "right", marginTop: 2, mr: 2 }}>
          <Button
            component="label"
            variant="contained"
            sx={{ marginRight: "1rem" }}
          >
            Import{" "}
            <input
              key={key}
              type="file"
              accept=".json"
              hidden
              onChange={handleImportContentManagement}
            />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              exportContentManagementFile();
            }}
          >
            Export
          </Button>
        </Box>
        <Box borderBottom={"solid 1px"} borderColor={"divider"}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => changeTab(value)}
          >
            {tabs.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                value={tab.value}
                sx={{ minWidth: "fit-content", flex: 1 }}
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ mb: 5 }} />
        {tabs.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Box>
    </MainLayout>
  );
};

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
  setFlashMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentManagement);
