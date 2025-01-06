import React from "react";
import Task from "./Task";

const TaskPage = async({ params }) => {
  const { milestoneId, userId } = await params;
  return (
    <>
      <Task  />
    </>
  );
};

export default TaskPage;
