import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";

// Import style
import "./AddColumn.css";

export default function AddColumn(props: any) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState(" ");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const handleInput = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logValue = () => {
    if (name.length > 2) {
      console.log(props.state);

      // Getting the actual number of columns
      const nrbColumns = Object.keys(props.state.columns).length + 1;
      // Creating the new id name
      const column = "column-" + nrbColumns;

      // Create a new column
      props.state.columns[column] = {
        id: column,
        title: name,
        taskIds: [],
      };

      // Add the column as the last in the list
      props.state.columnOrder.push(column);

      console.log(props.state);

      props.forceUpdate();

      console.log(name.length);

      setName("");
      setOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={handleClickOpen}
        className="column"
        style={{
          backgroundColor: "#1F1F1F",
          width: "322px",
          minWidth: "322px",
          height: "83px",
          borderRadius: 25,
          marginTop: 50,
          paddingRight: "20px",
        }}
      >
        <h3
          style={{
            color: "#54585A",
            fontSize: 24,
            margin: 0,
            position: "relative",
            top: "25%",
            marginLeft: 30,
          }}
        >
          + Add Column
        </h3>
      </div>

      {/* Dialog to add a Column */}
      <ThemeProvider theme={darkTheme}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Adding a new Column</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name of the new column for the board
            </DialogContentText>
            <TextField
              autoFocus
              onChange={handleInput}
              margin="dense"
              id="title"
              label="Column Title"
              type="text"
              fullWidth
              variant="standard"
              color="primary"
            />
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={logValue}>Add</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
