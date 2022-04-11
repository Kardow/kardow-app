import React, { useState } from "react";
import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
} from "@mantine/core";

// Import the supabase client
import { supabase } from "../../../client";

// Notifications
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";

import { Center, Anchor, Box } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    maxWidth: "60%",
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: "#00ae7a",

    "&:hover": {
      backgroundColor: "#24B47E",
    },
  },
}));

async function newsletter(email: string, setEmail: any) {
  if (email.length > 0) {
    const { data, error } = await supabase
      .from("newsletter")
      .insert([{ email: email }]);
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
        message: "Awesome! You are now subscribed to our newsletter.",
        color: "green",
        autoClose: 8000,
      });
      setEmail("");
    }
  } else {
    showNotification({
      title: "Sorry... You need to enter an email address",
      message: "you need to enter an email address",
      autoClose: 6200,
      color: "red",
    });
  }
}

export function EmailBanner() {
  const { classes } = useStyles();
  // effect to get the email of the user
  const [email, setEmail] = useState("");

  // Email validation
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  // handle submit form to add a user
  const handleSubmit = (event: any) => {
    event.preventDefault();
    newsletter(email, () => setEmail(""));
  };

  return (
    <NotificationsProvider>
      <Center style={{ marginBottom: 50 }}>
        <div className={classes.wrapper}>
          <div className={classes.body}>
            <Title className={classes.title}>Wait a minute...</Title>
            <Text weight={500} size="lg" mb={5} style={{ color: "#fff" }}>
              Subscribe to our newsletter!
            </Text>
            <Text size="sm" color="dimmed" style={{ color: "#fff" }}>
              You will never miss important product updates, latest news and
              community QA sessions. We promise not to spam you.
            </Text>

            <form onSubmit={handleSubmit}>
              <div className={classes.controls}>
                <TextInput
                  placeholder="Your email"
                  onChange={handleEmailChange}
                  value={email}
                  classNames={{
                    input: classes.input,
                    root: classes.inputWrapper,
                  }}
                />
                <Button type="submit" className={classes.control}>
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
          <Image src="/image.svg" className={classes.image} />
        </div>
      </Center>
    </NotificationsProvider>
  );
}
