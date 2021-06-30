import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { StyledButton } from "../components/StyledButton";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";
import {
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { usePollContext } from "../globalProvider";
import { HOST } from "../config";

const StyledShareButtonStyles = makeStyles({
  root: {
    backgroundColor: "transparent",
    color: "currentColor",
    width: "30px",
    padding: 0,
    height: "inherit",
    marginTop: 0,
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
});

export const SocialMediaShareButton = () => {
  let [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  let { state } = usePollContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const url = `${HOST}/${state.sessionID}`;

  const socialMedia = [
    <RedditShareButton children={[<RedditIcon />]} url={url} />,
    <TelegramShareButton children={[<TelegramIcon />]} url={url} />,
    <TwitterShareButton children={[<TwitterIcon />]} url={url} />,
    <WhatsappShareButton children={[<WhatsappIcon />]} url={url} />,
  ];

  return (
    <>
      <StyledButton
        className={StyledShareButtonStyles().root}
        onClick={handleClick}
      >
        <ShareRoundedIcon />
      </StyledButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {socialMedia}
      </Popover>
    </>
  );
};
