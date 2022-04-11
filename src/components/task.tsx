import React, { useState } from "react";
import styled, { StyledFunction } from "styled-components";

import { Draggable } from "react-beautiful-dnd";

// Import UpdateTask
import UpdateTask from "./UpdateTask/UpdateTask";

interface YourProps {
  isDragging: any;
}

const div: StyledFunction<any> = styled.div;

const Container: any = div`
    border: ${(props) =>
      props.isDragging ? "1px solid #24B47E" : "1px solid #292929"};
    padding: 4px;
    border-radius: 25px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #292929;
    height: 100%;
    min-height: 50px;
`;

interface MyState {
  key: any;
  task: any;
  index: any;
}

class Task extends React.Component<MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      opened: false,
    };
  }
  render(): any {
    return (
      <>
        <UpdateTask
          state={this.state}
          close={() => this.setState({ opened: false })}
          task={this.props.task}
        ></UpdateTask>
        <div onClick={() => this.setState({ opened: true })}>
          <Draggable draggableId={this.props.task.id} index={this.props.index}>
            {(provided, snapshot) => (
              <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  {this.props.task.content}{" "}
                </h3>
              </Container>
            )}
          </Draggable>
        </div>
      </>
    );
  }
}

export default Task;
