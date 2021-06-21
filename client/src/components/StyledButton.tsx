import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginLeft: (alignRight) => (alignRight ? "auto" : "1em"),
    width: "147px",
    height: "35px",
    borderRadius: "2px",
    marginTop: "var(--top-bottom-margin)",
    fontWeight: 600,
    backgroundColor: "var(--primary-button-backgroundColor)",
    color: "var(--primary-button-color)",
    textTransform: "none",
    "&:hover": {
      boxShadow: "0 0 35px -2px rgba(0, 0, 0, 0.2)",
      backgroundColor: "var(--primary-button-backgroundColor)",
    },

    "&:not(:hover), :hover": {
      transition: "ease-in-out all 0.4s",
    },
  },
});

export const StyledButton: React.FC<any> = ({
  alignRight = false,
  children,
  ...rest
}) => {
  const styles = useStyles(alignRight);
  return (
    <Button className={styles.root} {...rest}>
      {children}
    </Button>
  );
};
