import React from "react";
import Task from "./Task";

const TaskPage = ({ params }) => {
  const { milestoneId, userId } = params;
  return (
    <>
      <Task  />
    </>
  );
};

export default TaskPage;
