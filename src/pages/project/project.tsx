import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Board from "../kanban/board";

function Project(props: any) {
    const { id } = useParams();
    console.warn(props.finalDataTask);

    return (
        <Board initialDataTask={props.finalDataTask} id={id} signOut={() => props.supabaseClient.auth.signOut()} user={props.user} />
    );
}

export default Project;