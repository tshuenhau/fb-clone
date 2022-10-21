// src/pages/Home.js
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import LoginButton from "../components/LoginButton.jsx";

const People1 = () => {
  return (
    <Box
      direction="column"
      spacing={3}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      {" "}
      <LoginButton />
      <List sx={{ listStyleType: "disc" }}>
        <ListSubheader
          sx={{
            fontWeight: 700,
            lineHeight: "24px",
            fontSize: "16px",
            color: "black",
          }}
        >
          <Typography variant="h4">Admission Timeline</Typography>{" "}
        </ListSubheader>
      </List>
      <div style={{ textAlign: "left" }}>
        <ol>
          <li>Understanding Admission requirements</li>
          <li>Submit application online</li>
          <li>Upload supporting documents</li>
          <li>Make application fee payment</li>
          <li>Check application status </li>
        </ol>
      </div>
    </Box>
  );
};

export default People1;
