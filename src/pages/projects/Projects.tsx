import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Board from "../kanban/board";
import ProjectNavbar from "../../components/ProjectNavbar/ProjectNavbar";
import TopAppBar from "../../components/AppBar/AppBar";

import Grid from "@mui/material/Grid";
import { Title, Button } from "@mantine/core";
import Box from "@mui/material/Box";

import Project from "../../pages/project/project";
import { Center } from "@mantine/core";

// Modal
import { Modal } from "@mantine/core";
import { ModalsProvider, useModals } from "@mantine/modals";

import ProjectModal from "../../components/ProjectNavbar/Components/project";

import { Card, Image, Badge, Group, useMantineTheme } from "@mantine/core";

function Projects(props: any) {
  const { id } = useParams();

  // using the modals hook
  const modals = useModals();

  const [opened, setOpened] = useState(false);

  useEffect(() => {}, [{ id }]);

  function ProjectA() {
    if (typeof id !== "undefined") {
      return (
        <Project
          initialDataTask={props.finalDataTask}
          id={id}
          signOut={() => props.supabaseClient.auth.signOut()}
          user={props.user}
        />
      );
    } else {
      return (
        <>
          <Modal
            opened={opened}
            centered
            size="xl"
            onClose={() => setOpened(false)}
            title="Create a new project"
          >
            <Grid container>
              <Grid item xs={6}>
                <ProjectModal
                  projectTitle="Kanban Board"
                  description={
                    "Kanban boards use cards, columns, and continuous improvement to help technology and service teams commit to the right amount of work, and get it done!"
                  }
                  badge={"Most Popular"}
                  button={"Choose that template"}
                  imageUrl={"/projects/Kanban.svg"}
                />
              </Grid>

              <Grid item xs={6}>
                <ProjectModal
                  projectTitle="ToDo Board"
                  description={
                    "ToDo boards are a great way to keep track of tasks that need to be done. They are great for tracking progress and keeping track of time spent on tasks."
                  }
                  badge={"New"}
                  button={"Choose that template"}
                  imageUrl={"/projects/ToDo.svg"}
                />
              </Grid>

              <Grid item xs={6}>
                <ProjectModal
                  projectTitle="Issues Board"
                  description={
                    "Easily track and manage your software development issues with this board. It's a great way to get feedback from your team and to communicate with your stakeholders."
                  }
                  badge={null}
                  button={"Choose that template"}
                  imageUrl={"/projects/Issues.svg"}
                />
              </Grid>

              <Grid item xs={6}>
                <ProjectModal
                  projectTitle="Empty Board"
                  description={
                    "With no templates, you can create your own project! Feel free to start with a blank board. Contribute to the project by adding a new card, or by adding a new column."
                  }
                  badge={null}
                  button={"Choose that template"}
                  imageUrl={"/projects/Empty.svg"}
                />
              </Grid>
            </Grid>
          </Modal>

          <Center style={{ width: "90%", height: 800 }}>
            <Grid>
              <Grid item xs={12}>
                <Center>
                  <img
                    src="../projects/startup.svg"
                    style={{ width: 150 }}
                    alt="Add a project"
                  />
                </Center>
              </Grid>
              <Grid item xs={12}>
                <Title order={3} style={{ color: "#24B47E", marginTop: 20 }}>
                  Add a new project. You can add a project by clicking on the
                  button
                </Title>
              </Grid>
              <Grid item xs={12}>
                <Center style={{ marginTop: 20 }}>
                  <Button
                    variant="outline"
                    style={{ color: "#24B47E", borderColor: "#24B47E" }}
                    onClick={() => setOpened(true)}
                  >
                    Add a new project
                  </Button>
                </Center>
              </Grid>
            </Grid>
          </Center>
        </>
      );
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={1} style={{ borderBottom: "solid 2px #262626" }}>
            <ProjectNavbar user={props.user} />
          </Grid>
          <Grid item xs={11} style={{ borderBottom: "solid 2px #262626" }}>
            {/* Top bar for the infos about the project*/}
            <TopAppBar signOut={() => props.signOut()} user={props.user} />
          </Grid>

          <Grid item xs={1.5}></Grid>
          <Grid item xs={10} style={{ zIndex: 5 }}>
            {ProjectA()}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Projects;
