import React, { useState } from "react";
import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { flexbox } from "@mui/system";

import { Center, Anchor, Box } from "@mantine/core";

// Import the supabase client
import { supabase } from "../../../client";

// Notifications
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    maxWidth: 800,
    boxSizing: "border-box",
    backgroundColor: "#212121",
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 2.5,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: theme.spacing.xl * 1.5,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: "#181818",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    "&:hover": {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: "#1b1b1b",
    borderColor: theme.colors.gray[4],
    color: "#fff",

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: "#fff",
  },

  control: {
    backgroundColor: "#00ae7a",
    "&:hover": {
      backgroundColor: "#24B47E",
    },
  },
}));

const social = [FacebookIcon, TwitterIcon, YouTubeIcon];

async function sendEmail(
  name: string,
  email: string,
  message: string,
  setEmail: any,
  setMessage: any,
  setName: any
) {
  const { data, error } = await supabase
    .from("contact")
    .insert([{ name: name, message: message, email: email }]);
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
      message: "Thanks for your message! We'll get back to you soon.",
      color: "green",
      autoClose: 8000,
    });
    setName("");
    setEmail("");
    setMessage("");
  }
}

export function Contact() {
  const { classes } = useStyles();

  // effect to get the email of the user
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Email validation
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  // handle submit form to add a user
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  // handle submit form to add a user
  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  // handle submit form to add a user
  const handleSubmit = (event: any) => {
    event.preventDefault();
    sendEmail(
      name,
      email,
      message,
      () => setEmail(""),
      () => setName(""),
      () => setMessage("")
    );
  };

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
    >
      <PermContactCalendarIcon />
    </ActionIcon>
  ));

  return (
    <NotificationsProvider>
      <Center>
        <div className={classes.wrapper}>
          <SimpleGrid
            cols={2}
            spacing={50}
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            <div>
              <Title className={classes.title}>Contact us</Title>
              <Text className={classes.description} mt="sm" mb={30}>
                Leave your email and we will get back to you within 24 hours
              </Text>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={classes.form}>
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  required
                  onChange={handleEmailChange}
                  value={email}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <TextInput
                  label="Name"
                  placeholder="John Doe"
                  mt="md"
                  onChange={handleNameChange}
                  value={name}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />
                <Textarea
                  required
                  label="Your message"
                  placeholder="I have a question..."
                  minRows={4}
                  mt="md"
                  onChange={handleMessageChange}
                  value={message}
                  classNames={{
                    input: classes.input,
                    label: classes.inputLabel,
                  }}
                />

                <Group position="right" mt="md">
                  <Button className={classes.control} type="submit">
                    Send message
                  </Button>
                </Group>
              </div>
            </form>
          </SimpleGrid>
        </div>
      </Center>
    </NotificationsProvider>
  );
}
