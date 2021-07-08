import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
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
import Button from "@material-ui/core/Button";

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

export const SocialMediaShareButton = React.forwardRef<HTMLButtonElement>(
  (props, ref) => {
    let [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    let { state } = usePollContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const url = `${HOST}/poll/${state.sessionID}`;

    return (
      <>
        <Button
          {...props}
          ref={ref}
          className={StyledShareButtonStyles().root}
          onClick={handleClick}
        >
          <ShareRoundedIcon />
        </Button>
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
          <RedditShareButton url={url}>
            <RedditIcon />
          </RedditShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon />
          </TelegramShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon />
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon />
          </WhatsappShareButton>
        </Popover>
      </>
    );
  }
);
