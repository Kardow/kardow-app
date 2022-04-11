import React from "react";
import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Image,
} from "@mantine/core";

import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src="/KardowLogo.svg" width={150} />
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <YouTubeIcon style={{ color: "#00ae7a", marginRight: 20 }} />
          <TwitterIcon style={{ color: "#00ae7a", marginRight: 20 }} />
          <InstagramIcon style={{ color: "#00ae7a", marginRight: 20 }} />
        </Group>
      </Container>
    </div>
  );
}
