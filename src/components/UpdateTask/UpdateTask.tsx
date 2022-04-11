import React, { useState, useEffect } from "react";

// Modal window
import { Drawer, Button, Group } from "@mantine/core";

// Import style
import "./UpdateTask.css";

// RichText Editor
import { RichTextEditor } from "@mantine/rte";
import { Breadcrumbs, Anchor } from "@mantine/core";

export default function UpdateTask(props: any) {
  // Is the drawer opened
  const [opened, setOpened] = useState(false);

  const initialValueRichText = props.task.description;

  // RichText
  const [value, onChange] = useState(initialValueRichText);

  return (
    <>
      <Drawer
        opened={props.state.opened}
        onClose={props.close}
        title={"/ Kardow / Update " + props.task.content}
        padding="xl"
        size="xl"
        position="right"
      >
        <h1>{props.task.content}</h1>

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
      </Drawer>
    </>
  );
}
