export let kanban = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Testing",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export let toDo = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: [],
    },
  },
  columnOrder: ["column-1"],
};

export let issues = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Development",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "Testing",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Production",
      taskIds: [],
    },
  },

  columnOrder: ["column-1", "column-2", "column-3"],
};

export let empty = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Default",
      taskIds: [],
    },
  },
  columnOrder: ["column-1"],
};
