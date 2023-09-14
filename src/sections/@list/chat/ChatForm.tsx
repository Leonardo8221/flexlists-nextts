import { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { ChatType } from "src/enums/ChatType";
import { View, ViewChat } from "src/models/SharedModels";
import { useRouter } from "next/router";
import { listChatService } from "src/services/listChat.service";
import {
  FlexlistsError,
  FlexlistsSuccess,
  isSucc,
} from "src/models/ApiResponse";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserProfile } from "src/models/UserProfile";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import { getAvatarUrl } from "src/utils/flexlistHelper";

type ChatFormProps = {
  chatType: ChatType;
  id: number;
  currentView: View;
  userProfile: UserProfile;
  translations: TranslationText[];
}

const ChatForm = ({
  currentView,
  userProfile,
  chatType,
  id,
  translations
}: ChatFormProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter();
  const theme = useTheme();
  const [messages, setMessages] = useState<ViewChat[]>([]);
  const [message, setMessage] = useState("");
  const [windowHeight, setWindowHeight] = useState(0);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  const fetchData = async () => {
    let chatResponse: FlexlistsError | FlexlistsSuccess<ViewChat[]>;
    if (chatType === ChatType.View) {
      chatResponse = await listChatService.getViewChat(id, page, limit);
    } else {
      chatResponse = await listChatService.getContentChat(
        currentView.id,
        id,
        page,
        limit
      );
    }
    if (isSucc(chatResponse) && chatResponse.data) {
      if (chatResponse.data.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prevPosts) => [...prevPosts, ...chatResponse.data]);
        // setMessages((prevPosts) => [...prevPosts, ...chatResponse.data].sort((a: ViewChat, b: ViewChat) => {
        //   return getTime(a.createdAt) - getTime(b.createdAt);
        //   }));
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleMessage = async () => {
    const today = new Date();
    if (!message) return;
    let addChatResponse: FlexlistsError | FlexlistsSuccess<ViewChat>;
    if (chatType === ChatType.View) {
      addChatResponse = await listChatService.chatInView(id, message);
    } else {
      addChatResponse = await listChatService.chatInContent(
        currentView.id,
        id,
        message
      );
    }
    if (isSucc(addChatResponse)) {
      setMessages([addChatResponse.data, ...messages]);
    }
    setMessage("");
  };

  const handleMessageOver = (id: number, value: boolean) => {
    setMessages(
      messages.map((message: any) => {
        if (message.id === id) message.over = value;
        return message;
      })
    );
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      await handleMessage();
    }
  };

  const getDifference = (time?: Date) => {
    const now = dayjs();
    const difference = now.diff(time, "second");
    const min = Math.floor(difference / 60);
    const hour = Math.floor(min / 60);
    const date = Math.floor(hour / 24);

    return difference < 60
      ? "just now"
      : date
      ? `${date} day${date > 1 ? "s" : ""} ago`
      : hour
      ? `${hour} hour${hour > 1 ? "s" : ""} ago`
      : `${min} min${min > 1 ? "s" : ""} ago`;
  };

  const isOwner = (userId: number): boolean => {
    return userId === userProfile?.id;
  };

  const getTime = (date?: Date) => {
    return date != null ? new Date(date).getTime() : 0;
  };
  
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        {/* <Box
          component="span"
          className="svg-color"
          sx={{
            width: 22,
            height: 22,
            display: "inline-block",
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
            cursor: "pointer",
            marginRight: { xs: 1.5, md: 4 },
          }}
        /> */}
        <Typography variant="subtitle1">{t("Comments")}</Typography>
      </Box>
      <Box
        sx={{
          border: `1px solid ${theme.palette.palette_style.border.default}`,
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 1.5,
            borderTop: `1px solid ${theme.palette.palette_style.border.default}`,
            position: "relative",
            marginTop: 3,
          }}
        >
          <Box
            component="img"
            src={getAvatarUrl(userProfile?.avatarUrl)}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 50,
              marginRight: 1,
              marginTop: 1,
            }}
          />
          <form onSubmit={(e) => e.preventDefault()} id="new_message_form">
            <TextField
              label={t("Reply")}
              name="message"
              value={message}
              size="medium"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={(e) => handleKeyPress(e)}
              fullWidth
            />
            <Box
              sx={{
                borderRadius: 50,
                backgroundColor: "#54A6FB",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                width: 32,
                height: 32,
                top: 24,
                right: 22,
                cursor: "pointer",
              }}
            >
              <Box
                component="span"
                className="svg-color"
                sx={{
                  width: 16,
                  height: 16,
                  display: "inline-block",
                  bgcolor: "white",
                  mask: `url(/assets/icons/send.svg) no-repeat center / contain`,
                  WebkitMask: `url(/assets/icons/send.svg) no-repeat center / contain`,
                }}
                onClick={() => handleMessage()}
              />
            </Box>
          </form>
        </Box>
        <InfiniteScroll
          dataLength={messages.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>{t("Loading")}</h4>}
          height={"80vh"}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b></b>
            </p>
          }
        >
          {messages.map((message: ViewChat, index) => (
            <Box
              key={`${index}-${message.id}-message`}
              sx={{
                display: "flex",
                justifyContent: isOwner(message.ownerId) ? "right" : "left",
                p: 2,
                "&:hover": { backgroundColor: "#EEF7FF" },
                position: "relative",
              }}
              onMouseOver={() => {
                handleMessageOver(message.id, true);
              }}
              onMouseOut={() => {
                handleMessageOver(message.id, false);
              }}
            >
              <Box sx={{ width: "82%" }}>
                {!isOwner(message.ownerId) && (
                  <Box sx={{ display: "flex" }}>
                    <Box
                      component="img"
                      src={getAvatarUrl(message.ownerInfo?.avatarUrl)}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 50,
                        marginRight: 1,
                      }}
                    />
                    <Box
                      sx={{ marginTop: 0.2 }}
                    >{`${message.ownerInfo.firstName} ${message.ownerInfo.lastName}`}</Box>
                    {/* <Box sx={{ marginTop: 0.2 }}>{message.ownerId}</Box> */}
                  </Box>
                )}
                <Box
                  sx={{
                    marginTop: 1,
                    borderRadius: "10px",
                    backgroundColor: isOwner(message.ownerId)
                      ? "#54A6FB"
                      : "#003249",
                    color: "white",
                    p: 1.2,
                  }}
                >
                  {message.message}
                </Box>
                <Box
                  sx={{
                    marginTop: 1,
                    color: "rgba(102, 102, 102, 0.4)",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    textAlign: isOwner(message.ownerId) ? "right" : "left",
                  }}
                >
                  {getDifference(message.createdAt)}
                </Box>
              </Box>
              {message.over && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 24,
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 12,
                      height: 12,
                      display: "inline-block",
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/reply.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/reply.svg) no-repeat center / contain`,
                      cursor: "pointer",
                      marginRight: 1,
                    }}
                  />
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 12,
                      height: 12,
                      display: "inline-block",
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/check_circle.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/check_circle.svg) no-repeat center / contain`,
                      cursor: "pointer",
                      marginRight: 1,
                    }}
                  />
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 12,
                      height: 12,
                      display: "inline-block",
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/footer/delete_list.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/footer/delete_list.svg) no-repeat center / contain`,
                      cursor: "pointer",
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  userProfile: state.user.userProfile
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
