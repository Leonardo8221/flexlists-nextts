import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "../../components/iconify";
import ToolBar from "./ToolBar";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import useResponsive from "../../hooks/useResponsive";
import ViewUsersList from "./UserList";
import { connect } from "react-redux";
import ChatFormPanel from "src/sections/@list/chat/ChatFormPanel";
import PublishList from "./Publish";
import ShareList from "./Share";
import { View } from "src/models/SharedModels";
import RenameView from "./RenameView";
import DuplicateView from "./DuplicateView";
import DeleteView from "./DeleteView";
import { ChatType } from "src/enums/ChatType";
import { hasPermission } from "src/utils/permissionHelper";
import YesNoDialog from "src/components/dialog/YesNoDialog";
import { archiveView, unArchiveView } from "../../services/listView.service";
import { FlexlistsError, isSucc } from "src/utils/responses";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
import EditViewConfigForm from "../@listView/EditViewConfigForm";
import { ViewType } from "src/enums/SharedEnums";

type HeaderProps = {
  currentView: View;
  setFlashMessage:(message: FlashMessageModel)=>void
};


const Header = ({ currentView,setFlashMessage }: HeaderProps) => {
  const router = useRouter();
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(true);
  const [open, setOpen] = useState(true);
  const [openPublish, setOpenPublish] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const isDesktop = useResponsive("up", "xl");
  const [visiblePanel, setVisiblePanel] = useState(false);
  const [isRenameOpenModal, setIsRenameOpenModal] = useState<boolean>(false);
  const [isDuplicateOpenModal, setIsDuplicateOpenModal] =
    useState<boolean>(false);
  const [isDeleteOpenModal, setIsDeleteOpenModal] = useState<boolean>(false);
  const [isArchiveOpenModal, setIsArchiveOpenModal] = useState<boolean>(false);
  const [isEditViewConfigOpenModal, setIsEditViewConfigOpenModal] = useState<boolean>(false);
  // const handleNewRow = (values: any, action: string) => {
  //   rows.push(values);
  //   setRows([...rows]);
  // };

  const [showIcons, setShowIcons] = useState(false);

  const handleBoxClick = () => {
    setShowIcons(!showIcons);
  };
  const handleOpenPublish = () => {
    setOpenPublish(true);
  };
  const handleClosePublish = () => {
    setOpenPublish(false);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };
  const handleCloseShare = () => {
    setOpenShare(false);
  };
  const handleOpenRenameModal = () => {
    setIsRenameOpenModal(true);
  };
  const handleOpenDuplicateModal = () => {
    setIsDuplicateOpenModal(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteOpenModal(true);
  };
  const handleOpenArchiveModal = () => {
    setIsArchiveOpenModal(true);
  };
  const handleOpenEditViewConfigModal = () => {
    setIsEditViewConfigOpenModal(true);
  };
  const handleArchive = async() =>{
     setIsArchiveOpenModal(false);
     let response = await archiveView(currentView?.id);
     if(isSucc(response)){
        setFlashMessage({message:'View archived successfully',type:'success'});
        await router.push({pathname:PATH_MAIN.views});
     }
     else
     {
       setFlashMessage({message:(response as FlexlistsError).message,type:'error'});
     }
  }
  const handleUnArchive = async() =>{
    setIsArchiveOpenModal(false);
    let response = await unArchiveView(currentView?.id);
    if(isSucc(response)){
       setFlashMessage({message:'View unarchived successfully',type:'success'});
       await router.push({pathname:PATH_MAIN.views});
    }
    else
    {
      setFlashMessage({message:(response as FlexlistsError).message,type:'error'});
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
        px: { xs: 0.5, lg: 2 },
        py: { xs: 1, lg: 0 },
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: { xs: 20, md: 22 },
              height: { xs: 20, md: 22 },
              bgcolor: isFavorite ? "#FFD789" : "#666",
              mask: `url(/assets/icons/star.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/star.svg) no-repeat center / contain`,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsFavorite(!isFavorite);
            }}
          />
          <Typography
            variant="body1"
            sx={{
              marginLeft: { xs: 0.3, md: 1 },
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: { xs: 160, lg: 88, xl: 256 },
            }}
          >
            {currentView?.name}
          </Typography>
          {hasPermission(currentView?.role, 'All') && <CDropdown id="list_action" className="list_action">
            <CDropdownToggle
              color="secondary"
              style={{ paddingTop: 0, display: "flex" }}
            >
              <Box
                component="span"
                className="svg-color"
                sx={{
                  width: { xs: 12, lg: 16 },
                  height: { xs: 12, lg: 16 },
                  display: "inline-block",
                  bgcolor: "#16385C",
                  mask: `url(/assets/icons/dots.svg) no-repeat center / contain`,
                  WebkitMask: `url(/assets/icons/dots.svg) no-repeat center / contain`,
                  marginLeft: { xs: 0.5, lg: 1 },
                  cursor: "pointer",
                  transform: "rotate(90deg)",
                }}
              />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                href="#"
                key={"rename_list"}
                onClick={() => handleOpenRenameModal()}
              >
               {currentView?.isDefaultView?'Rename List':'Rename View'} 
              </CDropdownItem>
              {
                !currentView?.isDefaultView &&
                (
                  <>
                    <CDropdownItem
                      href="#"
                      key={"duplicate_list"}
                      onClick={() => handleOpenDuplicateModal()}
                      >
                        Duplicate View
                      </CDropdownItem>
                      <CDropdownItem
                        href="#"
                        key={"delete_list"}
                        onClick={() => handleOpenDeleteModal()}
                      >
                        Delete View
                      </CDropdownItem>
                      {
                        currentView?.isArchived ? 
                        <CDropdownItem
                        href="#"
                        key={"unarchive_list"}
                        onClick={() => handleUnArchive()}
                        >
                          UnArchive View
                        </CDropdownItem> :
                        <CDropdownItem
                        href="#"
                        key={"archive_list"}
                        onClick={() => handleOpenArchiveModal()}
                        >
                          Archive View
                        </CDropdownItem> 
                      }
                  </>
                )
                
              }
              {
                currentView && currentView?.type !== ViewType.List &&
                <CDropdownItem
                  href="#"
                  key={"edit_config"}
                  onClick={() => handleOpenEditViewConfigModal()}
                >
                Edit Config
                </CDropdownItem>
              }
              
            </CDropdownMenu>
          </CDropdown>}
        </Box>
        <Box sx={{ display: { xs: "none", md: "block", width: "100%" } }}>
          <ToolBar open={open} onOpen={setOpen} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 2,
          }}
        >
          {hasPermission(currentView?.role, 'All') && <ViewUsersList />}
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: { xs: 20, md: 22 },
              height: { xs: 20, md: 22 },
              display: "inline-block",
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
              cursor: "pointer",
            }}
            onClick={() => {
              setVisiblePanel(true);
            }}
          />
          {/* <Box
          component="span"
          className="svg-color"
          sx={{
            width: { xs: 18, md: 22 },
            height: { xs: 18, md: 22 },
            display: "inline-block",
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/header/history.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/header/history.svg) no-repeat center / contain`,
            cursor: "pointer",
            marginRight: { xs: 2, md: 4 },
          }}
        /> */}

          {/* ---PUBLISH & SHARE delete if needed--- */}

          <Box
            zIndex={10}
            sx={{
              position: "relative",
              cursor: "pointer",
              m: 0,
              p: 0,
              width: "auto",
            }}
            onClick={handleBoxClick}
          >
            <Box
              sx={{
                display: { xs: showIcons ? "block" : "none", md: "flex" },
                position: { xs: "absolute", md: "relative" },
                top: "100%",
                right: "0",
                width: "min-content",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                p: { xs: 1 },
                boxShadow: { xs: "0 0 24px 0 rgba(24,24,24,.2)", md: "none" },
                background: theme.palette.palette_style.background.paper,
              }}
            >
              <Button
                onClick={handleOpenPublish}
                sx={{
                  mt: { xs: 1, md: 0 },
                  mr: { xs: 0, md: 2 },
                  color: theme.palette.palette_style.text.white,
                }}
                size="small"
                variant="contained"
                startIcon={<Iconify icon={"eva:paper-plane-fill"} />}
              >
                Publish
              </Button>
              {hasPermission(currentView?.role, 'All') &&
                <Button
                  onClick={handleOpenShare}
                  sx={{ mt: { xs: 1, md: 0 } }}
                  size="small"
                  color="primary"
                  variant="text"
                  startIcon={<Iconify icon={"eva:share-outline"} />}
                >
                  Share
                </Button>}
            </Box>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
                bg: "primary.main",
              }}
            >
              <Iconify
                sx={{ width: 20, height: 20 }}
                icon={"material-symbols:share-outline"}
                color="#666"
              />
            </Box>
          </Box>

          {/* ---PUBLISH & SHARE delete if needed--- */}

          {/* <Box sx={{ display: { xs: "none", md: "none" } }}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<Iconify icon={"eva:paper-plane-fill"} />}
          >
            Publish
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "none" },
            marginLeft: { xs: 0.5, lg: 2 },
          }}
        >
          <Button
            size="small"
            color="primary"
            variant="text"
            startIcon={<Iconify icon={"eva:share-outline"} />}
          >
            Share
          </Button>
        </Box> */}
        </Box>
      </Box>

      <Box sx={{ display: { md: "none", width: "100%" } }}>
        <ToolBar open={open} onOpen={setOpen} />
      </Box>
      <ChatFormPanel
        chatType={ChatType.View}
        id={currentView.id}
        open={visiblePanel}
        onClose={() => setVisiblePanel(false)}
      />
      <>
        <PublishList
          id={currentView.id}
          name={currentView.name}
          open={openPublish}
          handleClose={() => {
            handleClosePublish();
          }}
        />
      </>
      <>
        <ShareList
          open={openShare}
          handleClose={() => {
            handleCloseShare();
          }}
        />
      </>
      {currentView && (
        <>
          <RenameView
            open={isRenameOpenModal}
            handleClose={() => setIsRenameOpenModal(false)}
          />
          <DuplicateView
            open={isDuplicateOpenModal}
            handleClose={() => setIsDuplicateOpenModal(false)}
          />
          <DeleteView
            viewId={currentView.id}
            open={isDeleteOpenModal}
            handleClose={() => setIsDeleteOpenModal(false)}
          />
          <EditViewConfigForm
           open = {isEditViewConfigOpenModal}
            handleClose = {()=>setIsEditViewConfigOpenModal(false)}
          />
          <YesNoDialog
          title="Archive View"
          submitText="Archive"
          message="Are you sure you want to archive selected view?"
          open={isArchiveOpenModal}
          handleClose={() => setIsArchiveOpenModal(false)}
          onSubmit={() => {
            handleArchive();
          }}
          />
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setFlashMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
