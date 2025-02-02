import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MessageBox from "../molecules/MessageBox";
import DrawerBlock from "../organisms/DrawerBlock";
import Footer from "../organisms/Footer";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

function DiaryLayout(props: Props) {
  const { window } = props;
  const [bgBlack, setBgBlack] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const locate = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    document.body.scrollIntoView(true);
    // 경로가 auth/profile일 때 부분 다크 모드 적용
    if (locate.pathname === "/auth/profile") {
      setBgBlack(true);
    } else {
      setBgBlack(false);
    }
  }, [locate.pathname]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position='fixed'
        sx={{
          ml: { sm: `${drawerWidth}px` },
          color: bgBlack ? "#ffffff" : "#000000",
          backgroundColor: bgBlack ? "#353535" : "#ffffff",
        }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          {/* <SearchBar /> */}
          <Box sx={{ flex: 1 }} />
          <MessageBox />
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'>
        <SwipeableDrawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#111827",
              color: "white",
            },
            "& svg.MuiSvgIcon-root": {
              color: "white",
            },
          }}
          onOpen={() => {}}>
          <DrawerBlock />
        </SwipeableDrawer>
        <SwipeableDrawer
          variant='permanent'
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#111827",
              color: "white",
            },
            "& svg.MuiSvgIcon-root": {
              color: "white",
            },
          }}
          open
          onOpen={() => {}}
          onClose={() => {}}>
          <DrawerBlock />
        </SwipeableDrawer>
      </Box>
      <Box>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: bgBlack ? "#252525" : "#ffffff",
            minHeight: "50%",
          }}>
          <Toolbar />
          <Outlet />
        </Box>
        <Footer bottomFixed />
      </Box>
    </Box>
  );
}

export default DiaryLayout;
