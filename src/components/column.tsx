import React, { useState } from "react";
import styled, { StyledFunction } from "styled-components";

import { Droppable } from "react-beautiful-dnd";

import Task from "./task";
import { Button as SupabaseButton } from "@supabase/ui";
import { Badge } from "@supabase/ui";
import Grid from "@mui/material/Grid";

// Import OptionMenu
import OptionsMenu from "./OptionsMenu/OptionsMenu";

// Import AddTask
import AddTask from "./AddTask/AddTask";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
  color: "#24B47E";
`;

const Add = styled.div`
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: #1f1f1f;
`;

interface YourProps {
  isDraggingOver: any;
}

const div: StyledFunction<any> = styled.div;

const TaskList: any = div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${(props) =>
      props.isDraggingOver ? "#262626" : "#1F1F1F"};
    flex-grow: 1;
    min-height: 200px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`;

interface MyState {
  key: any;
  column: any;
  tasks: any;
  state: any;
  forceUpdate: any;
  projectId: any;
}

class Column extends React.Component<MyState> {
  addTask(state: any, column: string) {
    const nrbTasks = Object.keys(state.tasks).length + 1;
    const task = "task-" + nrbTasks;

    state.tasks[task] = {
      id: task,
      content: task,
    };

    state.columns[column].taskIds.push(task);
    const obj = state.columns[column].taskIds;
    console.log(obj);

    console.log(state.tasks);

    console.log(Object.keys(state.tasks).length);

    this.props.forceUpdate();
  }

  render(): any {
    return (
      <Container
        style={{
          backgroundColor: "#181818",
          border: "1px solid #181818",
          width: "352px",
          minWidth: "352px",
          position: "relative",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Title style={{ color: "#24B47E" }}>
              {this.props.column.title}
            </Title>
          </Grid>
          <Grid item xs={3} style={{ marginTop: 10 }}>
            <Badge size="large">
              {Object.keys(this.props.column.taskIds).length.toString()}
            </Badge>
            {/* Calling the Options Menu C*/}
            {/*<OptionsMenu />*/}
          </Grid>
        </Grid>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map(
                (task: { id: React.Key | null | undefined }, index: any) => (
                  <Task key={task.id} task={task} index={index} />
                )
              )}
              {provided.placeholder}
              {/*<SupabaseButton onClick={() => this.addTask(this.props.state, this.props.column.id)}>Add Task</SupabaseButton>*/}
            </TaskList>
          )}
        </Droppable>
        <Add>
          <AddTask
            state={this.props.state}
            column={this.props.column.id}
            forceUpdate={() => this.props.forceUpdate()}
            projectId={this.props.projectId}
          />
        </Add>
      </Container>
    );
  }
}

export default Column;
