import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";

// Tabs import
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

/* TextArea */
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { CssBaseline } from "@mui/material";

import { RichTextEditor } from "@mantine/rte";

import { forwardRef } from "react";

// MultiSelect
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { ColorSwatch, Group, useMantineTheme } from "@mantine/core";
import { Button as ButtonMantine } from "@mantine/core";

// Import style
import "./AddTask.css";
import { supabase } from "../../client";

export default function AddTask(props: any) {
  const [open, setOpen] = React.useState(false);

  const [value, onChange] = useState("");

  const [name, setName] = useState(" ");

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  // -------------------------------------------------

  async function updateProject(state: any) {
    await supabase
      .from("projects")
      .update({ object: state })
      .match({ id: props.projectId });
  }

  /************************************************************** */
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    ["Bug", "#ff0000"],
    ["Documentation", "#7289da"],
    ["Duplicate", "#008744"],
    ["Enhancement", "#0057e7"],
    ["Good First Issue", "#d62d20"],
    ["Help Wanted", "#ffa700"],
    ["Invalid", "#fffb96"],
    ["Question", "#01cdfe"],
    ["Wontfix", "#ff71ce"],
    ["Urgent", "#f37735"],
  ];

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function addTask() {
    if (name.length > 2) {
      const nrbTasks = Object.keys(props.state.tasks).length + 1;
      const task = "task-" + nrbTasks;

      props.state.tasks[task] = {
        id: task,
        content: name,
        description: value,
        labels: personName,
      };

      props.state.columns[props.column].taskIds.push(task);
      const obj = props.state.columns[props.column].taskIds;
      console.log(obj);

      updateProject(props.state);
      props.forceUpdate();

      setName("");
      onChange("");
      setPersonName([]);
      setOpen(false);
    }
  }

  /****************************************************************************** */
  // RichText state

  const darkTheme = createTheme({
    shape: {
      borderRadius: 10,
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  /********************************** */

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  /************************************** */

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
      const nrbTasks = Object.keys(props.state.tasks).length + 1;
      const task = "task-" + nrbTasks;

      props.state.tasks[task] = {
        id: task,
        content: name,
      };

      props.state.columns[props.column].taskIds.push(task);
      const obj = props.state.columns[props.column].taskIds;
      console.log(obj);

      props.forceUpdate();

      setName("");
      setOpen(false);
    }
  };

  const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: #262626;
    }

    &:focus {
      color: #fff;
      border-radius: 3px;
      outline: 1px solid #565656;
      outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
      background-color: #262626;
      color: #fff;
      outline: 1px solid #565656;
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  return (
    <>
      <div className="border">
        <div onClick={handleClickOpen} className="task">
          <h3 style={{ color: "#54585A" }}>+ Add Task</h3>
        </div>
      </div>

      {/* Dialog to add a Column */}
      <ThemeProvider theme={darkTheme}>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xl"
          fullWidth={true}
          style={{ borderRadius: 25 }}
        >
          <DialogContent className="app-dialog">
            <Grid container spacing={0.5} className="grid-form">
              <Grid item xs={8} className="grid-project">
                <DialogTitle>Project / Create a task</DialogTitle>
                <DialogContentText sx={{ marginBottom: 2, marginTop: 2 }}>
                  What is the name of your new Task ?
                </DialogContentText>
                <TextField
                  autoFocus
                  onChange={handleInput}
                  margin="dense"
                  id="title"
                  label="Task's title"
                  type="text"
                  variant="outlined"
                  color="primary"
                  className="textField"
                  sx={{ width: "90%" }}
                />

                <DialogContentText sx={{ marginTop: 3 }}>
                  Description
                </DialogContentText>
                <RichTextEditor
                  value={value}
                  onChange={onChange}
                  sx={{
                    width: "90%",
                    marginTop: 20,
                    minHeight: 450,
                    color: "#fff",
                  }}
                />
              </Grid>
              {/* Contains the info to add to the ticket */}
              <Grid item xs={4} className="grid-info">
                <h4>Projects Info</h4>

                <DialogContentText sx={{ marginTop: 9 }}>
                  Make this project distinguishable by adding labels
                </DialogContentText>
                <div>
                  <FormControl sx={{ m: 1, width: 450, marginTop: 2 }}>
                    <InputLabel id="demo-multiple-chip-label">
                      Labels
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          id="select-multiple-chip"
                          label="Labels"
                        />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name[0]}
                          value={name[0]}
                          style={getStyles(name[0], personName, theme)}
                        >
                          <ColorSwatch
                            sx={{ marginRight: 8 }}
                            color={name[1]}
                          />{" "}
                          {name[0]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {/*<DialogContentText sx={{ marginTop: 7 }}>
                  Assign someone to this project
                      </DialogContentText>*/}

                <ButtonMantine
                  variant="default"
                  sx={{ position: "absolute", bottom: "60px", right: "155px" }}
                  className="buttons"
                  onClick={handleClose}
                >
                  Cancel
                </ButtonMantine>
                <ButtonMantine
                  variant="gradient"
                  sx={{ position: "absolute", bottom: "60px", right: "55px" }}
                  gradient={{ from: "teal", to: "lime", deg: 105 }}
                  onClick={() => addTask()}
                >
                  Add
                </ButtonMantine>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
}
