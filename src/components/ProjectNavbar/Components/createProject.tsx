import React, { useState, useEffect, Component } from "react";
import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";
import { UnstyledButton, Checkbox, Text, createStyles } from "@mantine/core";

import { supabase } from "../../../client";

import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";

import {
  Card,
  Image,
  Badge,
  Button,
  Group,
  useMantineTheme,
  Grid,
  Input,
} from "@mantine/core";

// Import styles
import "./project.css";

// Modal
import { Modal } from "@mantine/core";

import { kanban, toDo, issues, empty } from "./projectData";

export default function CreateProject(props: any) {
  const [name, setName] = useState("");

  // handle name change
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  async function addProjetAccess(projectId: any, userId: string) {
    const { data, error } = await supabase
      .from("project_access")
      .insert([{ projectId: projectId, userId: userId, owner: true }]);

    if (data) {
      showNotification({
        message: "The project has been created",
        color: "green",
        autoClose: 4000,
      });

      window.location.reload();
    } else {
      showNotification({
        message: "There was an error adding the user to the project",
        color: "red",
        autoClose: 4000,
      });
    }
  }

  // create project
  async function createProject(title: string, userId: any, object: any) {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([{ title: title, userId: userId, object: object }]);

      // add the project to the user
      if (data) {
        const project: any = data[0];
        console.log(project);
        await addProjetAccess(project.id, project.userId);

        setName("");
      }
    } catch (error: any) {
      showNotification({
        message: "Error - the project could not be created",
        color: "red",
        autoClose: 4000,
      });
    }
  }

  // handle submit form to add a project
  const handleSubmit = (event: any) => {
    // prevent default form submit
    event.preventDefault();
    // get the user id
    const user = supabase.auth.user();

    console.log(props.title);

    // create project and add the user to the project
    if (user) {
      const projectTitle = props.title;
      // for kanban board
      if (projectTitle === "Kanban Board") {
        createProject(name, user.id, kanban);
      }
      // for to do board
      else if (projectTitle === "ToDo Board") {
        createProject(name, user.id, toDo);
      }
      // for issues board
      else if (projectTitle === "Issues Board") {
        createProject(name, user.id, issues);
      }
      // for empty board
      else if (projectTitle === "Empty Board") {
        createProject(name, user.id, empty);
      }
    }
  };

  return (
    <>
      <NotificationsProvider>
        <Modal
          opened={props.opened}
          centered
          size="lg"
          onClose={() => props.closed(true)}
          title={
            "Give your project a name (Using the template : " +
            props.title +
            ")"
          }
        >
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Project Name"
              onChange={handleNameChange}
              value={name}
            />
            <Group position="right">
              <Button type="submit" className="project-button">
                Creating the project
              </Button>
            </Group>
          </form>
        </Modal>
      </NotificationsProvider>
    </>
  );
}
