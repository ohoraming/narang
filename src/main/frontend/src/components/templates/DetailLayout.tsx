import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useContext } from "react";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import CommentList from "../organisms/CommentList";
import UserInfo from "../organisms/UserInfo";
import { useNavigate } from "react-router-dom";
import { deleteDiaryById } from "../../apis/diary";
import { deleteEmotionByDid } from "../../apis/emotions";
import { UserContext } from "../../contexts/UserProvider";

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (
      domNode instanceof Element &&
      domNode.attribs &&
      domNode.attribs.class === "remove"
    ) {
      return <></>;
    }
  },
};

function DetailLayout({ diary, emotion }: { diary: any; emotion: any }) {
  const { id, uid, title, content, author, regdate, updates } = diary;
  const navigate = useNavigate();
  const [user, dispatch] = useContext(UserContext);

  const handleDeleteDiary = async (e: React.MouseEvent) => {
    await deleteDiaryById(id);
    await deleteEmotionByDid(id);
    navigate("/diary");
  };

  return (
    <Container maxWidth='lg'>
      <UserInfo author={author} regdate={regdate} />

      {/* title */}
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='flex-end'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-end'
          sx={{ flex: 1 }}>
          <Typography variant='h4' sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {user && user.id === uid && (
            <Button
              variant='contained'
              color='error'
              onClick={handleDeleteDiary}>
              일기 지우기
            </Button>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* contents */}
      <Typography
        component='div'
        variant='body1'
        sx={{
          fontWeigth: 300,
          minHeight: (theme) => theme.typography.pxToRem(300),
        }}>
        {parse(content, options)}
      </Typography>

      <Typography>긍정점수: {emotion.positive.score}</Typography>
      <Typography>부정점수: {emotion.negative.score}</Typography>
      <Typography>총 점수: {emotion.score}</Typography>
      <Typography>종합 이모지: {emotion.emoji}</Typography>
      <Divider sx={{ my: 2 }} />

      <CommentList comments={[]} />
    </Container>
  );
}

export default memo(DetailLayout);
