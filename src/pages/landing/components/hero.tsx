import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
//import image from './image.svg';

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xs * 1,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    minWidth: 480,
    marginRight: theme.spacing.xl * 6,
    marginLeft: theme.spacing.xl * -5,

    [theme.fn.smallerThan("xl")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    backgroundColor: "#00ae7a",
    "&:hover": {
      backgroundColor: "#24B47E",
    },
  },

  controlDark: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba("#00ae7a", 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function Hero() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>modern</span> Project <br />{" "}
              management tool
            </Title>
            <Text color="dimmed" mt="md">
              Easily manage your projects and tasks with a modern, intuitive and
              easy to use interface. Kardow is easy to use, and has a clean and
              modern look. It also offers a lot of features that make managing
              your projects and tasks easier than ever.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <CheckCircleIcon />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Simplicity First</b> – Easily manage your projects and tasks
              </List.Item>
              <List.Item>
                <b>Dark Mode</b> – dark mode is the best - you will never want
                to switch back to light mode
              </List.Item>
              <List.Item>
                <b>Highly customisable</b> – You control everything, from the UI
                to the tasks. You are in control.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                onClick={() => navigate("/projects")}
              >
                Get started
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.controlDark}
                onClick={() =>
                  (window.location.href = "https://github.com/Kardow/kardow")
                }
              >
                Source code
              </Button>
            </Group>
          </div>
          <div>
            <Image
              src={"./kardow.png"}
              className={classes.image}
              width={800}
              height={420}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
