import React, { useState, useEffect } from "react";
import { supabase } from "./client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Board from "./pages/kanban/board";

import Project from "./pages/project/project";

import Projects from "./pages/projects/Projects";

import { MantineProvider } from "@mantine/core";

import initialData from "./initial-data";

import { Auth as AuthSupabase, Typography, Button } from "@supabase/ui";
import { Provider } from "@supabase/supabase-js";

import { NotificationsProvider } from "@mantine/notifications";

// Avatar
import { Avatar } from "@mantine/core";
import { Container as MantineContainer } from "@mantine/core";
import { Center } from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import { Image } from "@mantine/core";
import { Group } from "@mantine/core";

// Import landing page
import Landing from "./pages/landing/landing";
import data from "./data/landing.json";

import { Error } from "./pages/error/error";

import { ModalsProvider } from "@mantine/modals";

type Tasks = {
  id?: number;
  content: string;
  columnId: number;
};

interface InitialTask {
  tasks: any[];
  columns: any[];
  columnOrder: any[];
}

const Container = (props: any) => {
  const { user } = AuthSupabase.useUser();
  if (user)
    return (
      <div>
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <MantineProvider
            theme={{
              colorScheme: "dark",
              colors: {
                // override dark colors to change them for all components
                dark: [
                  "#d5d7e0",
                  "#acaebf",
                  "#8c8fa3",
                  "#666980",
                  "#212121",
                  "#2b2b2b",
                  "#212121",
                  "#212121",
                  "#212121",
                  "#121215",
                ],
              },
            }}
          >
            <NotificationsProvider>
              <Projects
                finalDataTask={props.finalDataTask}
                signOut={() => props.supabaseClient.auth.signOut()}
                user={user}
              />
            </NotificationsProvider>
          </MantineProvider>
        </ModalsProvider>
      </div>
    );
  return (
    <div className="container">
      <MantineContainer
        size="md"
        px="md"
        sx={{
          position: "absolute",
          top: "50%",
          margin: 0,
          transform: "translateY(-50%)",
        }}
      >
        <Center>
          <h1>Login with a provider</h1>
        </Center>
        <Center>
          <p>Which one do you want to use ?</p>
        </Center>

        {props.children}
      </MantineContainer>
    </div>
  );
};

function Auth(props: any) {
  return (
    <div>
      <AuthSupabase.UserContextProvider supabaseClient={supabase}>
        <Container
          supabaseClient={supabase}
          user={props.user}
          finalDataTask={props.finalDataTask}
        >
          <AuthSupabase
            redirectTo="http://localhost:3000/projects"
            supabaseClient={supabase}
            providers={["google", "github", "gitlab", "discord"]}
            socialColors={true}
            onlyThirdPartyProviders={true}
            socialLayout="horizontal"
          ></AuthSupabase>
        </Container>
      </AuthSupabase.UserContextProvider>
    </div>
  );
}

export default function App() {
  const { finalDataTask }: any = [];
  const { user }: any = [];

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          colorScheme: "dark",
          colors: {
            // override dark colors to change them for all components
            dark: [
              "#d5d7e0",
              "#acaebf",
              "#8c8fa3",
              "#666980",
              "#212121",
              "#2b2b2b",
              "#212121",
              "#212121",
              "#212121",
              "#121215",
            ],
          },
        }}
      >
        <Routes>
          {/*<Route path="/" element={<Board initialDataTask={finalDataTask}/>}></Route>*/}
          <Route path="/" element={<Landing links={data.links} />}></Route>

          <Route
            path="/projects"
            element={<Auth finalDataTask={finalDataTask} user={user} />}
          ></Route>

          <Route
            path="/project/:id"
            element={<Auth finalDataTask={finalDataTask} user={user} />}
          ></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}
