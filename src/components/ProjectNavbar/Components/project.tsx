import React, { useState, useEffect, Component } from "react";
import Avatar from "@mui/material/Avatar";

import { useNavigate } from "react-router-dom";
import { UnstyledButton, Checkbox, Text, createStyles } from "@mantine/core";

import {
  Card,
  Image,
  Badge,
  Button,
  Group,
  useMantineTheme,
  Grid,
} from "@mantine/core";

// Import styles
import "./project.css";

import CreateProject from "./createProject";

// Modal
import { Modal } from "@mantine/core";

export default function ProjectModal(props: any) {
  const [openedCreate, setOpenedCreate] = useState(false);

  return (
    <>
      <CreateProject
        opened={openedCreate}
        closed={() => setOpenedCreate(false)}
        title={props.projectTitle}
      />
      <div style={{ width: 340, margin: "auto" }}>
        <Card shadow="sm" p="lg">
          <Card.Section>
            <Image src={props.imageUrl} height={160} alt={props.projectTitle} />
          </Card.Section>

          <Group position="apart" style={{ marginBottom: 5, marginTop: 10 }}>
            <Text weight={500}>{props.projectTitle}</Text>
            {props.badge !== null ? (
              <Badge color="green" variant="light">
                {props.badge}
              </Badge>
            ) : null}
          </Group>

          <Text size="sm" style={{ lineHeight: 1.5 }}>
            {props.description}
          </Text>

          <Button
            onClick={() => setOpenedCreate(true)}
            variant="light"
            color="dark"
            fullWidth
            className="project-button"
          >
            {props.button}
          </Button>
        </Card>
      </div>
    </>
  );
}
