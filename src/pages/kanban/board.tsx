import React, { useState, useEffect, Component } from "react";
import { ReactDOM } from "react";
import "../../App.css";
import initialData from "../../initial-data";
import Column from "../../components/column";
import styled, { StyledFunction } from "styled-components";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { response } from "../../services/Api";
import { supabase } from "../../client";

import Button from "@mui/material/Button";
import { Button as ButtonSupabase } from "@supabase/ui";
import { captureRejectionSymbol } from "events";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import ProjectNavbar from "../../components/ProjectNavbar/ProjectNavbar";
import TopAppBar from "../../components/AppBar/AppBar";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { Input } from "@supabase/ui";
import { Button as SupabaseButton } from "@supabase/ui";

import AddColumn from "../../components/AddColumn/AddColumn";

//import Error from "../../components/Error/Error";

import { useParams } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

import "./board.css";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Modal } from "@mantine/core";

import InviteUsers from "../../components/InviteUsers/InviteUsers";

import { Error } from "../../pages/error/error";

const Container = styled.div`
  display: flex;
`;

function stringAvatar(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

interface InitialTask {
  tasks: any[];
  columns: any[];
  columnOrder: any[];
}

interface MyState {
  initialDataTask: any;
  id: any;
  user: any;
  signOut: any;
}

class Board extends Component<MyState> {
  //const [taskColumns, setTaskColumns] = useState(columnsFromBackend);
  state: any;
  column: any;
  tasks: any;
  initialDataTask: any = [];
  error = false;

  inviteUsers: boolean = false;

  title: string = "";

  project: any;

  listUsers: any[] = [];

  constructor(props: any) {
    super(props);
  }

  /**
   * Function - when the component is called for the first time
   */
  async componentDidMount() {
    // Reinitialise the list of users with each update
    this.listUsers = [];
    this.error = false;

    this.project = await supabase
      .from<any>("view_projects")
      .select("*")
      .eq("projectId", this.props.id);

    if (this.project.status === 400) {
      this.error = true;
    }

    if (this.project.data) {
      this.initialDataTask = this.project.data[0].object;
      this.title = this.project.data[0].title;

      // Adding the connected users to the board
      for (let user of this.project.data) {
        this.listUsers.push({
          id: user.userId,
          name: user.raw_user_meta_data,
          owner: user.owner,
          email: user.email,
        });
      }
    }

    setTimeout(() => {
      this.setState(this.initialDataTask);
      this.forceUpdate();
    }, 500);
  }

  /**
   * Function to update the board when there is a new id
   * @param id
   */
  async updateBoard(id: string) {
    // Reinitialise the list of users with each update
    this.listUsers = [];
    this.error = false;

    this.project = await supabase
      .from<any>("view_projects")
      .select("*")
      .eq("projectId", id);

    if (this.project.status === 400) {
      this.error = true;
    }

    if (this.project.data) {
      this.initialDataTask = this.project.data[0].object;
      this.title = this.project.data[0].title;

      // Adding the connected users to the board
      for (let user of this.project.data) {
        this.listUsers.push({
          id: user.userId,
          name: user.raw_user_meta_data,
          owner: user.owner,
          email: user.email,
        });
      }
    }

    setTimeout(() => {
      this.setState(this.initialDataTask);
      this.forceUpdate();
    }, 500);
  }

  async updateProject(state: any) {
    return await supabase
      .from("projects")
      .update({ object: state })
      .match({ id: this.project.data[0].projectId });
  }

  /**
   * When receiving a new id - user switch of project page
   * @param nextProps
   */
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.id !== this.props.id) {
      this.initialDataTask.tasks = null;
      this.updateBoard(nextProps.id);
    }
  }

  addTask(state: any) {
    const nrbTasks = Object.keys(state.tasks).length + 1;
    const task = "task-" + nrbTasks;

    state.tasks[task] = {
      id: task,
      columns: {
        id: "column-1",
      },
      content: task,
    };

    state.columns["column-1"].taskIds.push(task);
    const obj = state.columns["column-1"].taskIds;

    this.forceUpdate();
  }

  // Reorder our columns
  onDragEnd = (result: any) => {
    document.body.style.color = "inherit";

    const { destination, source, draggableId } = result;

    // If the reposition is not valid - we won't change anything
    if (!destination) {
      return; //return null
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder the tasksId
    const start = this.state.columns[source.droppableId];

    const finish = this.state.columns[destination.droppableId];

    // If we are in the same column - we keep the same logic
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      // remove one item from the list
      newTaskIds.splice(source.index, 1);
      // Remove nothing and adding the draggableId
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    // Create a new state by switching to another column
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.updateProject(newState);

    this.setState(newState);
    return;
  };

  render(): any {
    if (this.initialDataTask.tasks) {
      if (this.state === null) {
        this.state = this.initialDataTask;
      }
      return (
        <>
          <Box sx={{ flexGrow: 1 }} className="scroll">
            <Grid item xs={10} style={{ zIndex: 5 }}>
              <h3
                style={{
                  color: "#24B47E",
                  fontSize: "58px",
                  marginLeft: "10px",
                }}
              >
                {this.title}
              </h3>

              <AvatarGroup total={this.listUsers.length} className="users">
                {this.listUsers.map((user: any) => (
                  <Tooltip
                    title={user.owner ? `${user.name} (Owner)` : user.name}
                  >
                    <Avatar
                      className={user.owner ? "owner" : "notOwner"}
                      alt="Allo"
                      style={{
                        backgroundColor: "#24B47E",
                        border: "1px solid #24B47E",
                      }}
                    >
                      {stringAvatar(user.name)}
                      {user.owner ? (
                        <img
                          className="crown"
                          src="https://cdn-icons-png.flaticon.com/512/6941/6941697.png"
                        />
                      ) : null}
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>

              <InviteUsers
                listUsers={this.listUsers}
                projectId={this.props.id}
              />

              <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                  {this.state.columnOrder.map((columnId: string) => {
                    const column = this.state.columns[columnId];
                    const tasks: any = column.taskIds.map(
                      (taskId: string | number) => this.state.tasks[taskId]
                    );

                    return (
                      <Column
                        key={column.id}
                        column={column}
                        tasks={tasks}
                        state={this.state}
                        projectId={this.props.id}
                        forceUpdate={() => this.forceUpdate()}
                      />
                    );
                  })}

                  <AddColumn
                    state={this.state}
                    forceUpdate={() => this.forceUpdate()}
                  />
                </Container>
              </DragDropContext>
            </Grid>
          </Box>
        </>
      );
    }
    if (!this.initialDataTask.tasks && this.error === false) {
      return (
        <>
          <Loader />
        </>
      );
    }

    if (this.error) {
      return <Error />;
    }
  }
}

export default Board;
