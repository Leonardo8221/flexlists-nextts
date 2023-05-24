import { useState } from "react";
import { Button, Box } from "@mui/material";
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
import UserList from "./UserList";
import { connect } from "react-redux";
import AddCommentPanel from "src/components/right-panel/AddCommentPanel";

type Props = {
  columns: any;
  rows: any;
};

const lists = [
  {
    label: "Rename list",
    value: "rename_list",
  },
  {
    label: "Delete list",
    value: "delete_list",
  },
  {
    label: "Duplicate",
    value: "duplicate",
  },
  {
    label: "Archive",
    value: "archive",
  },
];

const Header = (props: Props) => {
  const { columns, rows } = props;
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(true);
  const [open, setOpen] = useState(true);
  const isDesktop = useResponsive("up", "xl");
  const [visiblePanel, setVisiblePanel] = useState(false);

  // const handleNewRow = (values: any, action: string) => {
  //   rows.push(values);
  //   setRows([...rows]);
  // };

  const [showIcons, setShowIcons] = useState(false);

  const handleBoxClick = () => {
    setShowIcons(!showIcons);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
        px: { xs: 0.5, lg: 2 },
        py: { xs: 1, lg: 0 },
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: { xs: 20, md: 23 },
            height: { xs: 20, md: 23 },
            display: "flex",
            alignItems: "center",
            bgcolor: isFavorite ? "#FFD789" : "#666",
            mask: `url(/assets/icons/star.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/star.svg) no-repeat center / contain`,
            cursor: "pointer",
          }}
          onClick={() => {
            setIsFavorite(!isFavorite);
          }}
        />
        <Box
          sx={{
            fontSize: { xs: "16px", lg: "18px" },
            fontWeight: "600",
            lineHeight: "1.2",
            marginLeft: { xs: 0.3, md: 1 },
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: { xs: 160, lg: 88, xl: 256 },
          }}
        >
          Flexlists SaaS
        </Box>
        <CDropdown id="list_action" className="list_action">
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
            {lists.map((list) => (
              <CDropdownItem href="#" key={list.label}>
                {list.label}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
        </CDropdown>
      </Box>
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <ToolBar open={open} onOpen={setOpen} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "fit-content", mr: { xs: 2 } }}>
          {isDesktop && <UserList />}
        </Box>
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: { xs: 18, md: 22 },
            height: { xs: 18, md: 22 },
            display: "inline-block",
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            cursor: "pointer",
            marginRight: { xs: 2, md: 4 },
          }}
          onClick={() => {
            setVisiblePanel(true);
          }}
        />
        <Box
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
        />

        {/* ---PUBLISH & SHARE delete if needed--- */}

        <Box
          zIndex={10}
          sx={{
            position: "relative",
            cursor: "pointer",
            m: 0,
            p: 0,
          }}
          onClick={handleBoxClick}
        >
          <Box
            sx={{
              display: { xs: showIcons ? "none" : "block", md: "flex" },
              position: { xs: "absolute", md: "relative" },
              top: "100%",
              right: "0",
              width: "min-content",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              p: { xs: 1 },
              bg: "background.default",
              boxShadow: { xs: "0 0 24px 0 rgba(24,24,24,.2)", md: "none" },
              backgroundColor: "#fff",
            }}
          >
            <Button
              sx={{ mt: { xs: 1, md: 0 }, mr: { xs: 0, md: 2 } }}
              size="small"
              color="primary"
              variant="contained"
              startIcon={<Iconify icon={"eva:paper-plane-fill"} />}
            >
              Publish
            </Button>
            <Button
              sx={{ mt: { xs: 1, md: 0 } }}
              size="small"
              color="primary"
              variant="text"
              startIcon={<Iconify icon={"eva:share-outline"} />}
            >
              Share
            </Button>
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
              sx={{ width: 18, height: 18 }}
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
      <AddCommentPanel
        open={visiblePanel}
        onClose={() => setVisiblePanel(false)}
      />
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  rows: state.listContent.columns,
});

const mapDispatchToProps = {
  // setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
