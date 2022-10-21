import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Profile from "../components/Profile.jsx";
import "../styles/transition.css";
import Link from "@mui/material/Link";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ uid, name }) {
  console.log(uid);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}

      {/* <Typography
        component={Link}
        onClick={handleClickOpen}
        uppercase={false}
        paragraph="true"
        sx={{
          autoCapitalize: "none",
          fontSize: "large",
          mb: 0,
          textAlign: "start",
          width: "100%",
        }}
        color="text.primary"
      >
        {name}
      </Typography> */}
      <Link
        href="#"
        underline="hover"
        sx={{ color: "black" }}
        onClick={handleClickOpen}
      >
        {" "}
        {name}
      </Link>

      <Dialog
        PaperProps={{ style: { backgroundColor: "#f0f2f5" } }}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Profile uid={uid}></Profile>
      </Dialog>
    </div>
  );
}
