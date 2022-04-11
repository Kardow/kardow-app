import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple, green } from "@mui/material/colors";

// Import the supabase client
import { supabase } from "../../client";

//#24B47E
import { Button } from "@supabase/ui";

function stringAvatar(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function TopAppBar(props: any) {
  console.log(props.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#181818",
          height: "80px",
          boxShadow: "0px 0px 0px",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ color: "#24B47E", marginLeft: "-7vh", marginTop: 20 }}
          ></Typography>

          <Box sx={{ flexGrow: 0 }} style={{ marginRight: 20, marginTop: 20 }}>
            <Tooltip title={props.user.email}>
              <IconButton sx={{ p: 0 }}>
                <Avatar style={{ backgroundColor: "#24B47E" }}>
                  {stringAvatar(props.user.user_metadata.name)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <div style={{ marginTop: 20 }}>
            <Button block onClick={() => props.signOut()}>
              Sign out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
