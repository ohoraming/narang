import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import MenuItem from "../../models/MenuItem";
import { LOGO_STYLE } from "../../tools/utils";
import FooterMenuList from "../molecules/FooterMenuList";

const LOGO_TEXT = "/logo/narang-color-full-text.png";

function Footer({ bottomFixed = false }: { bottomFixed?: boolean }) {
  const [user, dispatch] = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["token"]);
  const getTodayYear = (() => new Date().getFullYear())();
  const [isSignin, setIsSignin] = useState(false);
  const [menuList, setMenuList] = useState([
    {
      title: "Diary",
      items: [
        new MenuItem("프로필", "/auth/profile", null, isSignin),
        new MenuItem("일기", "/diary", null, !isSignin),
        new MenuItem("감정 그래프", "/diary/graph", null, isSignin),
        new MenuItem("오늘의 추천", "/diary/recommend", null, isSignin),
        new MenuItem("장바구니", "/diary/cart", null, isSignin),
      ],
    },
  ]);

  useEffect(() => {
    if (cookies.token) {
      setIsSignin(true);
      setMenuList(
        menuList.map((item) => ({
          title: item.title,
          items: item.items.map((menu) => menu.changeActive()),
        })),
      );
    } else {
      setMenuList([
        {
          title: "Diary",
          items: [
            new MenuItem("프로필", "/auth/profile", null, false),
            new MenuItem("일기", "/diary", null, true),
            new MenuItem("감정 그래프", "/diary/graph", null, false),
            new MenuItem("오늘의 추천", "/diary/recommend", null, false),
            new MenuItem("장바구니", "/diary/cart", null, false),
          ],
        },
      ]);
    }
  }, [cookies.token]);

  return (
    <Box
      component='footer'
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: "center",
        minHeight: 300,
        p: 10,
        backgroundColor: "#aeacb2",
        gap: 5,
      }}>
      <Box
        component={Link}
        to='/'
        sx={{
          display: "flex",
          alignItems: "center",
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        <Box component='img' src={LOGO_TEXT} loading='lazy' sx={LOGO_STYLE} />
      </Box>
      <Stack gap={3}>
        <Stack direction='row' gap={5}>
          <FooterMenuList menuList={menuList} />
        </Stack>
        <Stack sx={{ gap: 2 }}>
          <Typography>
            <code>Project Narang</code>은 일기를 쓰고 감정을 읽어서 나의 감정을
            그래프로 나타내며, 주 단위로 나를 돌아볼 수 있게 도움을 주는 웹
            서비스 입니다. 안면 인식으로 로그인을 쉽게 할 수 있습니다.
          </Typography>
          <Typography>
            Copyright {getTodayYear}. Project Narang. All rights reserved.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
