import React, { useState, useEffect, Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

// Import the components we need from @mantine/core
import { Modal } from "@mantine/core";
import { Input } from "@mantine/core";
import { Text } from "@mantine/core";
import { Image } from "@mantine/core";
import { Title } from "@mantine/core";

// Import the components we need from @mantine/ui
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mantine/core";
import Typography from "@mui/material/Typography";

// Import the components we need from @supabase/ui
import "./InviteUsers.css";

// Notifications
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";

// Import the supabase client
import { supabase } from "../../client";

// --------------------------------------------------
// function to go trough a list and console.log it
function inviteUsers(list: any[], listInvite: any[], updateList: any): void {
  for (let user of list) {
    if (user.owner === false) {
      listInvite.push(user);
    }
  }
  updateList(listInvite);
}

// --------------------------------------------------
// function to return the first letters of a user name
function stringAvatar(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

// --------------------------------------------------
/**
 * Function to add a user to a project
 * @param email - the email of the user to invite
 * @param projectId - the project where to add the user
 */
async function addUser(
  email: string,
  projectId: number,
  listInvite: any,
  updateList: any
) {
  const { data, error } = await supabase
    .from<any>("view_users")
    .select("*")
    .eq("email", email)
    .single();

  if (data) {
    let user = data;

    // Add the user to the project if the user exists
    if (user) {
      // Adding the user to the project
      const { data, error } = await supabase
        .from("project_access")
        .insert([{ projectId: projectId, userId: user.id }]);

      // Showing a notification if the user is added

      if (data) {
        listInvite.push({
          name: user.raw_user_meta_data,
          owner: user.owner,
          email: user.email,
        });
        updateList(listInvite);

        // Showing a notification if the user is added
        showNotification({
          message: "User added",
          color: "green",
          autoClose: 4000,
        });

        // Reload the page
        window.location.reload();
      }
      // Error Notification
      else {
        showNotification({
          message: "Error adding user",
          color: "red",
          autoClose: 6000,
        });
      }
    }

    // Show a notification if the user doesn't exist
  } else {
    showNotification({
      title: "Error - User not found",
      message: "R.I.P! This user doesn't exist 🤥",
      autoClose: 6200,
      color: "red",
    });
  }
}

// --------------------------------------------------
// function to remove a user from a project
async function deleteUser(userId: string, projectId: number) {
  // Delete the user from the project
  console.log(userId);
  console.log(projectId);

  const { data, error } = await supabase
    .from("project_access")
    .delete()
    .match({ projectId: projectId, userId: userId });
  // Error Notification
  if (error) {
    showNotification({
      title: "Error - What happened there...",
      message: "That should have work 🤥 - Try again",
      autoClose: 6200,
      color: "red",
    });
  }
  // Reload the page and show a notification if the user is deleted
  else {
    showNotification({
      message: "Here we go - this user is gone ! ",
      color: "green",
      autoClose: 4000,
    });
    window.location.reload();
  }
}

// --------------------------------------------------
export default function InviteUsers(props: any) {
  const [opened, setOpened] = useState(false);
  const [addable, setAddable] = useState(false);
  const [listInviteActive, setListInvite]: any[] = useState([]);
  let listInvite: any[] = [];
  let user: any[] = [];

  // effect to get the email of the user
  const [email, setEmail] = useState("");

  // Email validation
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  // handle submit form to add a user
  const handleSubmit = (event: any) => {
    event.preventDefault();
    addUser(email, props.projectId, listInvite, () => {
      setListInvite(listInvite);
    });
  };

  // useEffect to get the users of the project
  useEffect(() => {
    inviteUsers(props.listUsers, listInvite, () => {
      setListInvite(listInvite);
    });

    // get the connected user
    const user = supabase.auth.user();

    // if there is data
    if (user) {
      let userId = user.id;
      // Get the users of the project
      for (let user of props.listUsers) {
        // If the user is the owner of the project
        if (userId === user.id && user.owner === true) {
          // Set the addable to true
          setAddable(true);
        }
      }
    }
  }, []);

  return (
    <NotificationsProvider>
      {addable ? (
        <div className="add-user">
          <Tooltip title="Invite Users">
            <Avatar
              className="add-users"
              style={{ backgroundColor: "#24B47E" }}
              onClick={() => setOpened(true)}
            >
              <AddIcon />
            </Avatar>
          </Tooltip>
        </div>
      ) : null}

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        style={{ borderRadius: 50 }}
      >
        <div style={{ width: 80, marginLeft: "auto", marginRight: "auto" }}>
          <Image
            radius="md"
            src="https://cdn-icons-png.flaticon.com/512/4961/4961815.png"
            alt="Paper plane"
          />
        </div>
        <Title order={2} align="center">
          Invite people to this project
        </Title>
        <Text align="center">Add team members or invite new friends.</Text>

        {listInviteActive.length > 0 ? (
          <Text style={{ marginTop: 30 }} align="left">
            Already part of the project :
          </Text>
        ) : null}

        <List sx={{ width: "100%", maxWidth: 360, color: "#fff" }}>
          {listInviteActive.map((user: any) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#24B47E" }}>
                  {stringAvatar(user.name)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={
                  <Typography variant="subtitle2" style={{ color: "#fff" }}>
                    {user.email}
                  </Typography>
                }
              />

              <IconButton style={{ left: 40 }} edge="end" aria-label="delete">
                <Button
                  style={{ backgroundColor: "#24B47E" }}
                  onClick={() => deleteUser(user.id, props.projectId)}
                >
                  Remove
                </Button>
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Text style={{ marginTop: 30 }} align="left">
          Add new members :
        </Text>

        <form onSubmit={handleSubmit}>
          <Input
            placeholder="User email"
            sx={{
              width: "100%",

              marginTop: 20,
              marginBottom: 20,
            }}
            radius="md"
            className="input-invite"
            onChange={handleEmailChange}
            value={email}
          />
          <Button
            sx={{
              width: "100%",
              marginBottom: 20,
            }}
            style={{ backgroundColor: "#24B47E" }}
            type="submit"
          >
            Invite
          </Button>
        </form>
      </Modal>
    </NotificationsProvider>
  );
}
