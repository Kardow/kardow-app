import React, { useState, useEffect, Component } from "react";
import "./ProjetNavbar.css";

import { supabase } from "../../client";
import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";
import { UnstyledButton, Checkbox, Text, createStyles } from "@mantine/core";

import { ModalsProvider, useModals } from "@mantine/modals";

import { showNotification } from "@mantine/notifications";

import {
  Card,
  Image,
  Badge,
  Button,
  Group,
  useMantineTheme,
  Grid,
} from "@mantine/core";

// Modal
import { Modal } from "@mantine/core";

import ProjectModal from "./Components/project";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { Tooltip } from "@mantine/core";

// --------------------------------------------------
// function to return the first letters of a user name
function stringAvatar(name: string) {
  return name.slice(0, 1);
}

export default function ProjectNavbar(props: any) {
  const [dataProject, setDataProject] = useState<any[] | null>(null);
  const navigate = useNavigate();

  // using the modals hook
  const modals = useModals();

  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  // --------------------------------------------------
  // Menu right click properties
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 15,
            mouseY: event.clientY - 2,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  async function deleteProjectForever(projectId: any) {
    console.log(projectId);

    // Delete the project access
    const { data, error } = await supabase
      .from("project_access")
      .delete()
      .match({ projectId: projectId });

    // Delete the project - if there is no error
    if (data) {
      const deleteProject = await supabase
        .from("projects")
        .delete()
        .match({ id: projectId });

      // Reload the page and show a notification if the project is deleted
      if (deleteProject.data) {
        showNotification({
          title: "The project has been deleted",
          message: "Here you go - your project has been deleted forever",
          autoClose: 4000,
          color: "green",
        });

        // Reload the page - navigate to the projects page
        navigate("/projects");
        window.location.reload();
      } else {
        showNotification({
          title: "Error - What happened there...",
          message: "That should have work 🤥 - Try again",
          autoClose: 6200,
          color: "red",
        });
      }
    }
  }

  const deleteProject = (projectId: any) => {
    setContextMenu(null);
    modals.openConfirmModal({
      title: "Delete your project",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your project? This action is
          destructive and this project will be deleted forever.
        </Text>
      ),
      labels: { confirm: "Delete Project", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => setContextMenu(null),
      onConfirm: () => deleteProjectForever(projectId),
    });
  };

  // --------------------------------------------------
  // UseEffect to get the project
  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from("view_projects")
        .select(`*`)
        .eq("userId", props.user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setDataProject(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  function arrayList() {
    if (dataProject) {
      return dataProject.map((project: any) => (
        <>
          <li
            onContextMenu={handleContextMenu}
            style={{ cursor: "context-menu" }}
            className={`squircle purple-boi ${
              project.owner ? "squircle" : "squircle-owner"
            }`}
            key={project.id}
            onClick={() => {
              navigate("/project/" + project.projectId);
            }}
          >
            <Avatar style={{ backgroundColor: "inherit" }}>
              {stringAvatar(project.title)}
            </Avatar>
            <div className="popper-boi">
              <h4 className="popper-text">{project.title}</h4>
            </div>
          </li>
          <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            <MenuItem onClick={() => deleteProject(project.projectId)}>
              Delete The project
            </MenuItem>
          </Menu>
        </>
      ));
    } else {
      return <h1></h1>;
    }
  }
  // Managing a project has never been so easy. With Kardow, you can create, edit, and track your projects. You can also share your projects with your team and collaborate with your team members. What are you waiting for? Join us!

  return (
    <>
      <Modal
        opened={opened}
        centered
        size="xl"
        onClose={() => setOpened(false)}
        title="Create a new project"
      >
        <Grid>
          <Grid.Col span={6}>
            <ProjectModal
              projectTitle="Kanban Board"
              description={
                "Kanban boards use cards, columns, and continuous improvement to help technology and service teams commit to the right amount of work, and get it done!"
              }
              badge={"Most Popular"}
              button={"Choose that template"}
              imageUrl={"/projects/Kanban.svg"}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <ProjectModal
              projectTitle="ToDo Board"
              description={
                "ToDo boards are a great way to keep track of tasks that need to be done. They are great for tracking progress and keeping track of time spent on tasks."
              }
              badge={"New"}
              button={"Choose that template"}
              imageUrl={"/projects/ToDo.svg"}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <ProjectModal
              projectTitle="Issues Board"
              description={
                "Easily track and manage your software development issues with this board. It's a great way to get feedback from your team and to communicate with your stakeholders."
              }
              badge={null}
              button={"Choose that template"}
              imageUrl={"/projects/Issues.svg"}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <ProjectModal
              projectTitle="Empty Board"
              description={
                "With no templates, you can create your own project! Feel free to start with a blank board. Contribute to the project by adding a new card, or by adding a new column."
              }
              badge={null}
              button={"Choose that template"}
              imageUrl={"/projects/Empty.svg"}
            />
          </Grid.Col>
        </Grid>
      </Modal>
      <nav>
        <ul className="guilds-container">
          <Tooltip
            label="Go back to home page"
            color="#24b47e"
            position="right"
            withArrow
          >
            <li
              className="logo"
              style={{ marginLeft: 6 }}
              onClick={() => {
                navigate("/");
              }}
            >
              <img src="/Board.svg" style={{ width: 35 }} />
            </li>
          </Tooltip>
          <li className="divider"></li>

          {arrayList()}

          <li className="squircle green-boi" onClick={() => setOpened(true)}>
            <svg
              className="circleIcon-LvPL6c"
              aria-hidden="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
              ></path>
            </svg>
            <div className="popper-boi">
              <h4 className="popper-text">Add a project</h4>
            </div>
          </li>

          {/*<li className="squircle green-boi">
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
              ></path>
            </svg>
            <div className="popper-boi">
              <h4 className="popper-text">Explore</h4>
            </div>
          </li>*/}
        </ul>
      </nav>
    </>
  );
}
